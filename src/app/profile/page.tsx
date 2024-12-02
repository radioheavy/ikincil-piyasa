import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profilim | PayBorsa",
  description: "Kullanıcı profili ve cüzdan bilgileri",
}

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Panel - Profil Bilgileri */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">AO</span>
              </div>
              <h2 className="text-xl font-bold">Ahmet Oktay</h2>
              <p className="text-gray-600 dark:text-gray-300">ahmet@email.com</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">KYC Durumu</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Onaylandı
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">Üyelik Tarihi</span>
                <span>01.03.2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">İşlem Sayısı</span>
                <span>12</span>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Profili Düzenle
            </button>
          </div>

          {/* Orta Panel - Cüzdan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Cüzdan</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Toplam Bakiye</p>
                <p className="text-2xl font-bold">₺25,750.00</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Hızlı İşlemler</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Para Yatır
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    Para Çek
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Son İşlemler</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">Para Yatırma</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">28.02.2024</p>
                    </div>
                    <span className="text-green-600">+₺5,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">Pay Alımı</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">27.02.2024</p>
                    </div>
                    <span className="text-red-600">-₺2,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel - Portföy */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Portföy</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Toplam Portföy Değeri</p>
                <p className="text-2xl font-bold">₺42,500.00</p>
                <p className="text-sm text-green-600">+5.2% (Son 30 gün)</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Sahip Olunan Paylar</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">TechStart A.Ş.</p>
                      <span className="text-sm text-green-600">+2.5%</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>250 Pay</span>
                      <span>₺25,000</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">HealthTech A.Ş.</p>
                      <span className="text-sm text-red-600">-1.2%</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>200 Pay</span>
                      <span>₺17,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 