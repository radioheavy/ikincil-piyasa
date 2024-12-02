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

    // İşlemi bul
    const trade = await prisma.trade.findUnique({
      where: { id: params.id },
    })

    if (!trade) {
      return NextResponse.json(
        { error: "İşlem bulunamadı" },
        { status: 404 }
      )
    }

    // İşlem sahibi kontrolü
    if (trade.sellerId !== user.id) {
      return NextResponse.json(
        { error: "Bu işlemi iptal etme yetkiniz yok" },
        { status: 403 }
      )
    }

    // İşlem durumu kontrolü
    if (trade.status !== "pending") {
      return NextResponse.json(
        { error: "Bu işlem artık iptal edilemez" },
        { status: 400 }
      )
    }

    // İşlemi iptal et
    const updatedTrade = await prisma.trade.update({
      where: { id: trade.id },
      data: { status: "cancelled" },
    })

    return NextResponse.json(updatedTrade)
  } catch (error) {
    return NextResponse.json(
      { error: "İşlem iptal edilirken bir hata oluştu" },
      { status: 500 }
    )
  }
} 