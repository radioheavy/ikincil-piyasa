import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  phone: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // E-posta kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanımda" },
        { status: 400 }
      )
    }

    // Şifre hashleme
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(validatedData.password, salt)

    // Kullanıcı oluşturma
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        name: validatedData.name,
        phone: validatedData.phone,
      },
    })

    // Hassas bilgileri çıkar
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Kayıt başarılı",
        user: userWithoutPassword,
      },
      { status: 201 }
    )
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