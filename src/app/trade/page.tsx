"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, ArrowUp, Clock, Settings, Wallet, History, ChartBar, Info } from "lucide-react"
import dynamic from "next/dynamic"
import AnimatedBackground from "@/components/AnimatedBackground"
import WalletModal from "@/components/WalletModal"

// TradingView widget'ı dinamik olarak import ediyoruz
const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
)

// Örnek veri
const marketData = {
  currentPrice: 125.75,
  priceChange: 2.5,
  priceChangePercent: 2.1,
  volume: 1250000,
  high24h: 127.80,
  low24h: 122.30,
  marketCap: 125750000,
  totalVolume24h: 15000000,
}

const orderBook = {
  asks: [
    { price: 126.00, amount: 1500, total: 189000 },
    { price: 125.90, amount: 2200, total: 276980 },
    { price: 125.85, amount: 1800, total: 226530 },
  ],
  bids: [
    { price: 125.50, amount: 2500, total: 313750 },
    { price: 125.45, amount: 1800, total: 225810 },
    { price: 125.40, amount: 3200, total: 401280 },
  ]
}

const recentTrades = [
  { price: 125.75, amount: 500, time: "14:32:15", type: "buy" },
  { price: 125.70, amount: 800, time: "14:32:10", type: "sell" },
  { price: 125.75, amount: 300, time: "14:32:05", type: "buy" },
]

const openOrders = [
  { 
    id: "1",
    type: "buy",
    price: 124.50,
    amount: 1000,
    filled: 0,
    total: 124500,
    time: "14:30:00"
  },
  {
    id: "2",
    type: "sell",
    price: 126.50,
    amount: 1500,
    filled: 500,
    total: 189750,
    time: "14:25:00"
  }
]

export default function TradePage() {
  const [orderType, setOrderType] = useState<"market" | "limit">("limit")
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [showTooltip, setShowTooltip] = useState("")
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  
  // Mouse takibi için
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Mouse hareketini takip et
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Toplam tutarı hesapla
  const total = Number(amount) * (orderType === "market" ? marketData.currentPrice : Number(price))

  return (
    <main className="min-h-screen bg-gray-950">
      <AnimatedBackground />
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-100">İP/TRY</h1>
                  <span className={`flex items-center ${marketData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {marketData.priceChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {Math.abs(marketData.priceChangePercent)}%
                  </span>
                </div>
                <span className="text-3xl font-bold text-gray-100">₺{marketData.currentPrice}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">24s Hacim</span>
                <span className="font-medium text-gray-200">₺{marketData.volume.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">24s Yüksek</span>
                <span className="font-medium text-gray-200">₺{marketData.high24h}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">24s Düşük</span>
                <span className="font-medium text-gray-200">₺{marketData.low24h}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">Piyasa Değeri</span>
                <span className="font-medium text-gray-200">₺{marketData.marketCap.toLocaleString()}</span>
              </div>
              <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Alt Menü */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => setIsWalletOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
            >
              <Wallet className="w-4 h-4" />
              <span>Cüzdan</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300">
              <History className="w-4 h-4" />
              <span>İşlem Geçmişi</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300">
              <ChartBar className="w-4 h-4" />
              <span>İstatistikler</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
              onMouseEnter={() => setShowTooltip("info")}
              onMouseLeave={() => setShowTooltip("")}
            >
              <Info className="w-4 h-4" />
              <span>Bilgi</span>
            </button>

            {/* Tooltip */}
            {showTooltip === "info" && (
              <motion.div
                className="absolute z-50 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-lg max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  left: smoothMouseX,
                  top: smoothMouseY,
                }}
              >
                <h3 className="font-semibold mb-2">İkincil Piyasa Token Hakkında</h3>
                <p className="text-sm text-gray-400">
                  İkincil Piyasa (İP) tokeni, platform üzerindeki kampanyalara yatırım yapmak ve pay alım satımı gerçekleştirmek için kullanılır.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sol Panel - Grafik */}
          <div className="col-span-8 space-y-6">
            {/* Grafik */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4 h-[600px]">
              <TradingViewWidget />
            </div>

            {/* Açık Emirler */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-100">Açık Emirler</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Tümünü İptal Et
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-400">
                      <th className="text-left py-2">Tarih</th>
                      <th className="text-left py-2">Tip</th>
                      <th className="text-right py-2">Fiyat</th>
                      <th className="text-right py-2">Miktar</th>
                      <th className="text-right py-2">Dolan</th>
                      <th className="text-right py-2">Toplam</th>
                      <th className="text-right py-2">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-800">
                        <td className="py-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            {order.time}
                          </div>
                        </td>
                        <td className={`py-3 ${order.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                          {order.type === 'buy' ? 'Alış' : 'Satış'}
                        </td>
                        <td className="text-right py-3 text-gray-200">₺{order.price}</td>
                        <td className="text-right py-3 text-gray-200">{order.amount}</td>
                        <td className="text-right py-3 text-gray-200">{order.filled}</td>
                        <td className="text-right py-3 text-gray-200">₺{order.total}</td>
                        <td className="text-right py-3">
                          <button className="text-red-400 hover:text-red-300">
                            İptal
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sağ Panel - Alım/Satım ve Emir Defteri */}
          <div className="col-span-4 space-y-6">
            {/* Alım/Satım Formu */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    tradeType === "buy"
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Alış
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    tradeType === "sell"
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Satış
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    orderType === "limit"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    orderType === "market"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Piyasa
                </button>
              </div>

              <div className="space-y-4">
                {orderType === "limit" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Fiyat
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="0.00"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        TRY
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Miktar
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-blue-500"
                      placeholder="0.00"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      İP
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>

                {/* Toplam ve Komisyon Bilgisi */}
                {(amount || price) && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Toplam</span>
                      <span className="text-gray-200">₺{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Komisyon (%0.1)</span>
                      <span className="text-gray-200">₺{(total * 0.001).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-700">
                      <span className="text-gray-300">Ödenecek Tutar</span>
                      <span className="text-gray-100">₺{(total * 1.001).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-medium text-white ${
                      tradeType === "buy"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {tradeType === "buy" ? "Satın Al" : "Sat"}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Emir Defteri */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">Emir Defteri</h2>
              
              {/* Satış Emirleri */}
              <div className="space-y-1 mb-4">
                {orderBook.asks.map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm"
                  >
                    <span className="text-red-400">{order.price}</span>
                    <span className="text-right text-gray-300">{order.amount}</span>
                    <span className="text-right text-gray-400">{order.total}</span>
                  </div>
                ))}
              </div>

              {/* Güncel Fiyat */}
              <div className="text-center py-2 border-y border-gray-800">
                <span className="text-lg font-bold text-gray-100">₺{marketData.currentPrice}</span>
              </div>

              {/* Alış Emirleri */}
              <div className="space-y-1 mt-4">
                {orderBook.bids.map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm"
                  >
                    <span className="text-green-400">{order.price}</span>
                    <span className="text-right text-gray-300">{order.amount}</span>
                    <span className="text-right text-gray-400">{order.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Son İşlemler */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">Son İşlemler</h2>
              <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm"
                  >
                    <span className={trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                      {trade.price}
                    </span>
                    <span className="text-right text-gray-300">{trade.amount}</span>
                    <span className="text-right text-gray-400">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 