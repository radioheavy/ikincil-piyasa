import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getUser } from "@/lib/auth"

const investSchema = z.object({
  amount: z.number().min(1, "Yatırım tutarı 0'dan büyük olmalıdır"),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    // KYC kontrolü
    if (user.kycStatus !== "approved") {
      return NextResponse.json(
        { error: "Yatırım yapabilmek için KYC sürecini tamamlamanız gerekiyor" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { amount } = investSchema.parse(body)

    // Kampanyayı bul
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    })

    if (!campaign) {
      return NextResponse.json(
        { error: "Kampanya bulunamadı" },
        { status: 404 }
      )
    }

    // Kampanya durumu kontrolü
    if (campaign.status !== "active") {
      return NextResponse.json(
        { error: "Bu kampanyaya artık yatırım yapılamaz" },
        { status: 400 }
      )
    }

    // Kullanıcı bakiyesi kontrolü
    if (user.walletBalance < amount) {
      return NextResponse.json(
        { error: "Yetersiz bakiye" },
        { status: 400 }
      )
    }

    // Pay sayısı hesaplama
    const shareCount = Math.floor(amount / campaign.sharePrice)
    
    if (shareCount === 0) {
      return NextResponse.json(
        { error: "Yatırım tutarı en az bir pay alımı için yeterli olmalıdır" },
        { status: 400 }
      )
    }

    if (shareCount > campaign.remainingShares) {
      return NextResponse.json(
        { error: "Kampanyada yeterli pay bulunmuyor" },
        { status: 400 }
      )
    }

    // Transaction başlat
    const result = await prisma.$transaction(async (tx) => {
      // Kullanıcı bakiyesini güncelle
      await tx.user.update({
        where: { id: user.id },
        data: { walletBalance: { decrement: amount } },
      })

      // Kampanya bilgilerini güncelle
      const updatedCampaign = await tx.campaign.update({
        where: { id: campaign.id },
        data: {
          collectedAmount: { increment: amount },
          remainingShares: { decrement: shareCount },
        },
      })

      // Pay oluştur
      const share = await tx.share.create({
        data: {
          campaignId: campaign.id,
          ownerId: user.id,
          quantity: shareCount,
          purchasePrice: campaign.sharePrice,
          currentPrice: campaign.sharePrice,
        },
      })

      // Kampanya tamamlandı mı kontrol et
      if (updatedCampaign.remainingShares === 0) {
        await tx.campaign.update({
          where: { id: campaign.id },
          data: { status: "completed" },
        })
      }

      return share
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Yatırım işlemi sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
} 