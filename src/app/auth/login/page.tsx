"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  // Kayıt başarılı mesajını göster
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Kayıt başarılı! Lütfen giriş yapın.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }

      // Form validasyonu
      loginSchema.parse(data)

      // API isteği
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu")
      }

      // Başarılı giriş sonrası ana sayfaya yönlendir
      router.push("/")
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Bir hata oluştu")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Hesabınıza giriş yaparak işlemlerinize devam edin
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Beni Hatırla
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Şifremi Unuttum
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Henüz hesabınız yok mu?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Hemen Kaydolun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 