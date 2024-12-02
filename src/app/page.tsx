"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { useState } from "react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAppStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push("/auth/login")
    } catch (error) {
      console.error("Çıkış yapılırken bir hata oluştu:", error)
      // Hata durumunda kullanıcıya bilgi verilebilir
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <header className="flex justify-between items-center mb-16">
          <Link href="/" className="text-2xl font-bold">
            PayBorsa
          </Link>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">
                  Hoş geldin, {user?.name}
                </span>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition"
                >
                  Profilim
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 text-red-600 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Kitlesel Fonlama Payları Borsası
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Türkiye&apos;nin ilk kitlesel fonlama pay alım satım platformu
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/market"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Pazar Yerini Keşfet
            </Link>
            <Link
              href="/campaigns"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Aktif Kampanyalar
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Güvenli İşlem</h3>
            <p className="text-gray-600 dark:text-gray-300">
              SPK düzenlemeleri çerçevesinde güvenli alım satım imkanı
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">7/24 İşlem</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dilediğiniz zaman alım satım yapabilme esnekliği
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Kolay Kullanım</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Kullanıcı dostu arayüz ile hızlı işlem deneyimi
            </p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-semibold mb-2">Üye Ol</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hızlı üyelik süreciyle platformumuza katılın
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="font-semibold mb-2">Kimlik Doğrulama</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                KYC sürecini tamamlayarak işlemlere başlayın
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="font-semibold mb-2">Bakiye Yükle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Güvenli ödeme yöntemleriyle hesabınıza bakiye ekleyin
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
              <h3 className="font-semibold mb-2">İşlem Yap</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pay alım satım işlemlerinizi gerçekleştirin
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
