import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı" },
        { status: 401 }
      )
    }

    // Şifre kontrolü
    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.passwordHash
    )

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı" },
        { status: 401 }
      )
    }

    // JWT oluştur
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    // Cookie'ye token'ı kaydet
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 saat
    })

    // Hassas bilgileri çıkar
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Giriş başarılı",
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
      { error: "Bir hata oluştu" },
      { status: 500 }
    )
  }
} 