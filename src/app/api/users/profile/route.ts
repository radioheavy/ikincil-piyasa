import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getUser } from "@/lib/auth"
import bcrypt from "bcryptjs"

const updateProfileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").optional(),
  phone: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, "Yeni şifre en az 8 karakter olmalıdır").optional(),
}).refine((data) => {
  // Eğer yeni şifre varsa, mevcut şifre de olmalı
  if (data.newPassword && !data.currentPassword) {
    return false
  }
  return true
}, {
  message: "Şifre değiştirmek için mevcut şifrenizi girmelisiniz",
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

    return NextResponse.json(user)
  } catch {
    return NextResponse.json(
      { error: "Profil bilgileri alınırken bir hata oluştu" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // Şifre değişikliği varsa kontrol et
    if (validatedData.newPassword) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      })

      if (!dbUser) {
        return NextResponse.json(
          { error: "Kullanıcı bulunamadı" },
          { status: 404 }
        )
      }

      const isValidPassword = await bcrypt.compare(
        validatedData.currentPassword!,
        dbUser.passwordHash
      )

      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Mevcut şifreniz hatalı" },
          { status: 400 }
        )
      }

      // Yeni şifreyi hashle
      const salt = await bcrypt.genSalt(10)
      const newPasswordHash = await bcrypt.hash(validatedData.newPassword, salt)

      // Şifreyi güncelle
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newPasswordHash },
      })
    }

    // Diğer profil bilgilerini güncelle
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
      },
    })

    // Hassas bilgileri çıkar
    const { passwordHash: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json({
      message: "Profil başarıyla güncellendi",
      user: userWithoutPassword,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Profil güncellenirken bir hata oluştu" },
      { status: 500 }
    )
  }
} 