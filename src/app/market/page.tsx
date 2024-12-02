import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pazar Yeri | PayBorsa",
  description: "Kitlesel fonlama paylarının alım satım işlemleri",
}

export default function MarketPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pazar Yeri</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Alış Emri Ver
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Satış Emri Ver
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Panel - Aktif Paylar */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Aktif Paylar</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3">Şirket</th>
                    <th className="text-right py-3">Son Fiyat</th>
                    <th className="text-right py-3">Değişim</th>
                    <th className="text-right py-3">Hacim</th>
                    <th className="text-right py-3">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-3">TechStart A.Ş.</td>
                    <td className="text-right">₺125.50</td>
                    <td className="text-right text-green-600">+2.5%</td>
                    <td className="text-right">₺1.2M</td>
                    <td className="text-right">
                      <button className="text-blue-600 hover:underline">
                        İncele
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-3">InnoTech A.Ş.</td>
                    <td className="text-right">₺85.75</td>
                    <td className="text-right text-red-600">-1.2%</td>
                    <td className="text-right">₺950K</td>
                    <td className="text-right">
                      <button className="text-blue-600 hover:underline">
                        İncele
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sağ Panel - Emir Defteri */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Emir Defteri</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Alış Emirleri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₺124.50</span>
                    <span>1,500 adet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>₺124.25</span>
                    <span>2,200 adet</span>
                  </div>
                </div>
              </div>

              <div className="py-2 border-y dark:border-gray-700">
                <div className="text-center font-semibold">
                  ₺125.50
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    Son İşlem
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Satış Emirleri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₺126.00</span>
                    <span>1,800 adet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>₺126.25</span>
                    <span>1,000 adet</span>
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