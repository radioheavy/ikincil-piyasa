import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getUser } from "@/lib/auth"

const walletTransactionSchema = z.object({
  type: z.enum(["deposit", "withdraw"]),
  amount: z.number().min(1, "Miktar 0'dan büyük olmalıdır"),
  // Gerçek bir ödeme sistemi entegrasyonunda kullanılacak alanlar:
  // paymentMethod: z.enum(["credit_card", "bank_transfer"]),
  // paymentDetails: z.object({
  //   cardNumber: z.string(),
  //   expiryDate: z.string(),
  //   cvv: z.string(),
  // }).optional(),
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

    return NextResponse.json({
      balance: user.walletBalance,
    })
  } catch {
    return NextResponse.json(
      { error: "Bakiye bilgisi alınırken bir hata oluştu" },
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

    // KYC kontrolü
    if (user.kycStatus !== "approved") {
      return NextResponse.json(
        { error: "İşlem yapabilmek için KYC sürecini tamamlamanız gerekiyor" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { type, amount } = walletTransactionSchema.parse(body)

    // Para çekme işlemi için bakiye kontrolü
    if (type === "withdraw") {
      if (user.walletBalance < amount) {
        return NextResponse.json(
          { error: "Yetersiz bakiye" },
          { status: 400 }
        )
      }
    }

    // Bakiyeyi güncelle
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        walletBalance: {
          increment: type === "deposit" ? amount : -amount,
        },
      },
    })

    // TODO: Gerçek bir ödeme sistemi entegrasyonunda:
    // 1. Para yatırma: Ödeme işlemini başlat ve onay bekle
    // 2. Para çekme: Banka transferini başlat
    // 3. İşlem geçmişini kaydet
    // 4. E-posta bildirimi gönder

    return NextResponse.json({
      message: type === "deposit" ? "Para yatırma işlemi başarılı" : "Para çekme işlemi başarılı",
      balance: updatedUser.walletBalance,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "İşlem sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
} 