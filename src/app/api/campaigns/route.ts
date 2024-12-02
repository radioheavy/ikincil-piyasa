import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const campaignSchema = z.object({
  name: z.string().min(2, "Kampanya adı en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  targetAmount: z.number().min(1, "Hedef tutar 0'dan büyük olmalıdır"),
  sharePrice: z.number().min(1, "Pay fiyatı 0'dan büyük olmalıdır"),
  totalShares: z.number().min(1, "Toplam pay sayısı 0'dan büyük olmalıdır"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  category: z.string(),
})

// Kampanya listesi
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    const where = {
      ...(category && { category }),
      ...(status && { status }),
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { shares: true }
        }
      }
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    return NextResponse.json(
      { error: "Kampanyalar yüklenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Yeni kampanya oluşturma
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = campaignSchema.parse(body)

    // Toplam pay değeri ile hedef tutarın uyumluluğunu kontrol et
    if (validatedData.sharePrice * validatedData.totalShares !== validatedData.targetAmount) {
      return NextResponse.json(
        { error: "Pay fiyatı ve toplam pay sayısı, hedef tutarla uyuşmuyor" },
        { status: 400 }
      )
    }

    const campaign = await prisma.campaign.create({
      data: {
        ...validatedData,
        remainingShares: validatedData.totalShares,
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Kampanya oluşturulurken bir hata oluştu" },
      { status: 500 }
    )
  }
} 