import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Aktif Kampanyalar | PayBorsa",
  description: "Yatırım yapabileceğiniz aktif kitlesel fonlama kampanyaları",
}

export default function CampaignsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Aktif Kampanyalar</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-lg dark:bg-gray-800">
              <option value="">Tüm Kategoriler</option>
              <option value="technology">Teknoloji</option>
              <option value="health">Sağlık</option>
              <option value="finance">Finans</option>
              <option value="retail">Perakende</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kampanya Kartı 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">TechStart A.Ş.</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Aktif
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                Yapay zeka destekli müşteri hizmetleri platformu geliştiren teknoloji şirketi.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Hedef:</span>
                  <span className="font-medium">₺5,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Toplanan:</span>
                  <span className="font-medium">₺3,750,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Pay Fiyatı:</span>
                  <span className="font-medium">₺100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Kalan Süre: 15 gün
                </span>
                <Link
                  href="/campaigns/1"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Detayları Gör
                </Link>
              </div>
            </div>
          </div>

          {/* Kampanya Kartı 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">HealthTech A.Ş.</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Aktif
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                Dijital sağlık hizmetleri ve telemedicine platformu.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Hedef:</span>
                  <span className="font-medium">₺3,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Toplanan:</span>
                  <span className="font-medium">₺1,500,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Pay Fiyatı:</span>
                  <span className="font-medium">₺75</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Kalan Süre: 25 gün
                </span>
                <Link
                  href="/campaigns/2"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Detayları Gör
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 