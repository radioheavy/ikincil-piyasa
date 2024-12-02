import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Token cookie'sini sil
    cookies().delete("token")

    return NextResponse.json({
      message: "Başarıyla çıkış yapıldı",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Çıkış yapılırken bir hata oluştu" },
      { status: 500 }
    )
  }
} 