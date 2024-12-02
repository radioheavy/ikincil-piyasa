"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Şifreler eşleşmiyor",
  path: ["passwordConfirm"],
})

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        password: formData.get("password") as string,
        passwordConfirm: formData.get("passwordConfirm") as string,
      }

      // Form validasyonu
      registerSchema.parse(data)

      // API isteği
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu")
      }

      // Başarılı kayıt sonrası login sayfasına yönlendir
      router.push("/auth/login?registered=true")
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
          <h1 className="text-3xl font-bold mb-2">Hesap Oluştur</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Kitlesel fonlama dünyasına adım atın
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  placeholder="+90"
                  required
                />
              </div>
            </div>

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
              <p className="mt-1 text-sm text-gray-500">
                En az 8 karakter, bir büyük harf ve bir rakam içermelidir
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="passwordConfirm">
                Şifre Tekrar
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-1 text-blue-600 rounded border-gray-300"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                <span>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Kullanım Koşulları
                  </Link>
                  {" "}ve{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Gizlilik Politikası
                  </Link>
                  'nı okudum ve kabul ediyorum
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Kaydediliyor..." : "Hesap Oluştur"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Zaten hesabınız var mı?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Giriş Yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 