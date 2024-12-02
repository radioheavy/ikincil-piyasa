import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateCampaignSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  sharePrice: z.number().min(1).optional(),
  status: z.enum(["active", "completed", "failed"]).optional(),
  category: z.string().optional(),
})

// Kampanya detayı
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
      include: {
        shares: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        documents: true,
        _count: {
          select: {
            shares: true,
            trades: true,
          },
        },
      },
    })

    if (!campaign) {
      return NextResponse.json(
        { error: "Kampanya bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(campaign)
  } catch (error) {
    return NextResponse.json(
      { error: "Kampanya yüklenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Kampanya güncelleme
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateCampaignSchema.parse(body)

    const campaign = await prisma.campaign.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(campaign)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Kampanya güncellenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Kampanya silme
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Kampanyanın aktif payları var mı kontrol et
    const shares = await prisma.share.findMany({
      where: { campaignId: params.id },
    })

    if (shares.length > 0) {
      return NextResponse.json(
        { error: "Aktif paylara sahip kampanya silinemez" },
        { status: 400 }
      )
    }

    await prisma.campaign.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: "Kampanya başarıyla silindi" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Kampanya silinirken bir hata oluştu" },
      { status: 500 }
    )
  }
} 