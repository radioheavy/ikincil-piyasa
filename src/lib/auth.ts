import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { prisma } from "./prisma"

export async function getUser() {
  try {
    const token = cookies().get("token")?.value

    if (!token) return null

    // Token'ı doğrula
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )

    if (!payload.userId) return null

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: {
        shares: true,
        documents: true,
      },
    })

    if (!user) return null

    // Hassas bilgileri çıkar
    const { passwordHash, ...userWithoutPassword } = user

    return userWithoutPassword
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
} 