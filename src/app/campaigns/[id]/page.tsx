import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kampanya Detayı | PayBorsa",
  description: "Kitlesel fonlama kampanyası detaylı bilgileri",
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">TechStart A.Ş.</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Yapay zeka destekli müşteri hizmetleri platformu
                </p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">
                Aktif Kampanya
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Finansal Bilgiler</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Hedef:</span>
                    <span className="font-medium">₺5,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Toplanan:</span>
                    <span className="font-medium">₺3,750,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Pay Fiyatı:</span>
                    <span className="font-medium">₺100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Minimum Yatırım:</span>
                    <span className="font-medium">₺1,000</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kampanya Bitiş: 15 gün
                </p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">Şirket Hakkında</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  TechStart, yapay zeka teknolojilerini kullanarak işletmelerin müşteri hizmetleri
                  süreçlerini otomatize eden yenilikçi bir platformdur. Şirketimiz, 2021 yılında
                  kurulmuş olup, şu ana kadar 50'den fazla kurumsal müşteriye hizmet vermektedir.
                </p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Öne Çıkan Noktalar:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>%300 yıllık büyüme oranı</li>
                    <li>50+ kurumsal müşteri</li>
                    <li>15+ kişilik uzman ekip</li>
                    <li>2 patent başvurusu</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold mb-4">Yatırım Yap</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Yatırım Miktarı (₺)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      step="100"
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                      placeholder="Minimum 1,000 ₺"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pay Adedi
                    </label>
                    <input
                      type="number"
                      min="10"
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                      placeholder="Minimum 10 pay"
                    />
                  </div>
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Yatırım Yap
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Önemli Bilgiler</h3>
                  <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Minimum yatırım tutarı: ₺1,000</li>
                    <li>• Minimum pay adedi: 10</li>
                    <li>• Pay başına değer: ₺100</li>
                    <li>• İşlem ücreti: %1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 