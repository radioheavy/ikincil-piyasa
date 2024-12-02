import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getUser } from "@/lib/auth"

const kycDocumentSchema = z.object({
  title: z.string().min(2, "Doküman başlığı en az 2 karakter olmalıdır"),
  type: z.enum(["financial", "legal", "other"]),
  url: z.string().url("Geçerli bir URL giriniz"),
})

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
      orderBy: { uploadDate: "desc" },
    })

    return NextResponse.json(documents)
  } catch {
    return NextResponse.json(
      { error: "Dokümanlar yüklenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    // KYC durumu kontrolü
    if (user.kycStatus === "approved") {
      return NextResponse.json(
        { error: "KYC süreciniz zaten onaylanmış" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = kycDocumentSchema.parse(body)

    // Dokümanı kaydet
    const document = await prisma.document.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    })

    // Kullanıcının KYC durumunu güncelle
    await prisma.user.update({
      where: { id: user.id },
      data: { kycStatus: "pending" },
    })

    return NextResponse.json({
      message: "Doküman başarıyla yüklendi",
      document,
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Doküman yüklenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// KYC durumu güncelleme (admin için)
export async function PATCH(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    // TODO: Admin kontrolü yapılacak
    // if (!user.isAdmin) {
    //   return NextResponse.json(
    //     { error: "Bu işlem için yetkiniz yok" },
    //     { status: 403 }
    //   )
    // }

    const body = await request.json()
    const { userId, status } = z.object({
      userId: z.string(),
      status: z.enum(["pending", "approved", "rejected"]),
    }).parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: status },
    })

    return NextResponse.json({
      message: "KYC durumu güncellendi",
      user: updatedUser,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "KYC durumu güncellenirken bir hata oluştu" },
      { status: 500 }
    )
  }
} 