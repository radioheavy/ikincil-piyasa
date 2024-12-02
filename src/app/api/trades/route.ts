import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getUser } from "@/lib/auth"

const createTradeSchema = z.object({
  shareId: z.string(),
  quantity: z.number().min(1, "En az 1 pay satılmalıdır"),
  price: z.number().min(0.01, "Geçerli bir fiyat giriniz"),
})

// İşlem listesi
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const campaignId = searchParams.get("campaignId")

    const where = {
      ...(status && { status }),
      ...(campaignId && { campaignId }),
    }

    const trades = await prisma.trade.findMany({
      where,
      include: {
        share: true,
        campaign: {
          select: {
            name: true,
            company: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(trades)
  } catch (error) {
    return NextResponse.json(
      { error: "İşlemler yüklenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Yeni satış emri oluşturma
export async function POST(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createTradeSchema.parse(body)

    // Payı kontrol et
    const share = await prisma.share.findUnique({
      where: { id: validatedData.shareId },
      include: { campaign: true },
    })

    if (!share) {
      return NextResponse.json(
        { error: "Pay bulunamadı" },
        { status: 404 }
      )
    }

    // Pay sahibi kontrolü
    if (share.ownerId !== user.id) {
      return NextResponse.json(
        { error: "Bu payın sahibi değilsiniz" },
        { status: 403 }
      )
    }

    // Yeterli pay miktarı kontrolü
    if (share.quantity < validatedData.quantity) {
      return NextResponse.json(
        { error: "Yeterli pay miktarınız bulunmuyor" },
        { status: 400 }
      )
    }

    // Satış emri oluştur
    const trade = await prisma.trade.create({
      data: {
        shareId: share.id,
        campaignId: share.campaignId,
        sellerId: user.id,
        quantity: validatedData.quantity,
        price: validatedData.price,
        status: "pending",
      },
    })

    return NextResponse.json(trade, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Satış emri oluşturulurken bir hata oluştu" },
      { status: 500 }
    )
  }
} 