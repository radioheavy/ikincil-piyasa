import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth"

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
        { error: "İşlem yapabilmek için KYC sürecini tamamlamanız gerekiyor" },
        { status: 403 }
      )
    }

    // İşlemi bul
    const trade = await prisma.trade.findUnique({
      where: { id: params.id },
      include: {
        share: true,
        campaign: true,
      },
    })

    if (!trade) {
      return NextResponse.json(
        { error: "İşlem bulunamadı" },
        { status: 404 }
      )
    }

    // İşlem durumu kontrolü
    if (trade.status !== "pending") {
      return NextResponse.json(
        { error: "Bu işlem artık geçerli değil" },
        { status: 400 }
      )
    }

    // Kendinden alım kontrolü
    if (trade.sellerId === user.id) {
      return NextResponse.json(
        { error: "Kendi satış emrinizi alamazsınız" },
        { status: 400 }
      )
    }

    // Toplam tutarı hesapla
    const totalAmount = trade.price * trade.quantity

    // Bakiye kontrolü
    if (user.walletBalance < totalAmount) {
      return NextResponse.json(
        { error: "Yetersiz bakiye" },
        { status: 400 }
      )
    }

    // Transaction başlat
    const result = await prisma.$transaction(async (tx) => {
      // Alıcının bakiyesini düşür
      await tx.user.update({
        where: { id: user.id },
        data: { walletBalance: { decrement: totalAmount } },
      })

      // Satıcının bakiyesini artır
      await tx.user.update({
        where: { id: trade.sellerId },
        data: { walletBalance: { increment: totalAmount } },
      })

      // Payları transfer et
      const existingShare = await tx.share.findFirst({
        where: {
          campaignId: trade.campaignId,
          ownerId: user.id,
        },
      })

      if (existingShare) {
        // Mevcut paylara ekle
        await tx.share.update({
          where: { id: existingShare.id },
          data: {
            quantity: { increment: trade.quantity },
            currentPrice: trade.price,
          },
        })
      } else {
        // Yeni pay oluştur
        await tx.share.create({
          data: {
            campaignId: trade.campaignId,
            ownerId: user.id,
            quantity: trade.quantity,
            purchasePrice: trade.price,
            currentPrice: trade.price,
          },
        })
      }

      // Satıcının paylarını güncelle
      await tx.share.update({
        where: { id: trade.shareId },
        data: {
          quantity: { decrement: trade.quantity },
        },
      })

      // İşlemi tamamla
      const updatedTrade = await tx.trade.update({
        where: { id: trade.id },
        data: {
          buyerId: user.id,
          status: "completed",
        },
      })

      return updatedTrade
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: "İşlem sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
} 