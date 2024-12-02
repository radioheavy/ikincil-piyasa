"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, ArrowUp, Clock, Settings, Wallet, History, ChartBar, Info, List, BarChart } from "lucide-react"
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

// Örnek veri - Derinlik grafiği için daha fazla veri
const depthData = {
  asks: [
    { price: 126.50, amount: 3500, total: 442750, cumulative: 442750 },
    { price: 126.25, amount: 2800, total: 353500, cumulative: 796250 },
    { price: 126.15, amount: 4200, total: 529830, cumulative: 1326080 },
    { price: 126.00, amount: 1500, total: 189000, cumulative: 1515080 },
    { price: 125.90, amount: 2200, total: 276980, cumulative: 1792060 },
    { price: 125.85, amount: 1800, total: 226530, cumulative: 2018590 },
  ],
  bids: [
    { price: 125.50, amount: 2500, total: 313750, cumulative: 313750 },
    { price: 125.45, amount: 1800, total: 225810, cumulative: 539560 },
    { price: 125.40, amount: 3200, total: 401280, cumulative: 940840 },
    { price: 125.35, amount: 2700, total: 338445, cumulative: 1279285 },
    { price: 125.30, amount: 1900, total: 238070, cumulative: 1517355 },
    { price: 125.25, amount: 3500, total: 438375, cumulative: 1955730 },
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
  const [orderBookView, setOrderBookView] = useState<'list' | 'depth'>('list')
  
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

  // Derinlik grafiği için maksimum değerleri hesapla
  const maxCumulative = Math.max(
    depthData.asks[depthData.asks.length - 1].cumulative,
    depthData.bids[depthData.bids.length - 1].cumulative
  )

  return (
    <main className="min-h-screen pt-16">
      <AnimatedBackground />
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
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
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4 h-[600px] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <TradingViewWidget />
            </div>

            {/* Açık Emirler */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  Açık Emirler
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1">
                  <Settings className="w-4 h-4" />
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
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Alış/Satış Seçimi */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-800/50 backdrop-blur-sm rounded-xl">
                <button
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    tradeType === "buy"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                  Alış
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    tradeType === "sell"
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  Satış
                </button>
              </div>

              {/* Limit/Piyasa Seçimi */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-800/50 backdrop-blur-sm rounded-xl">
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    orderType === "limit"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    orderType === "market"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  Piyasa
                </button>
              </div>

              <div className="space-y-4">
                {orderType === "limit" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Fiyat
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-800/50 text-gray-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-500"
                        placeholder="0.00"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        TRY
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">
                    Miktar
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-800/50 text-gray-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-500"
                      placeholder="0.00"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      İP
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="py-2 text-sm bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium border border-gray-700/50 hover:border-gray-600/50"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>

                {/* Toplam ve Komisyon Bilgisi */}
                {(amount || price) && (
                  <div className="mt-4 p-4 bg-gray-800/30 rounded-xl space-y-2 border border-gray-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Toplam</span>
                      <span className="text-gray-200 font-medium">₺{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Komisyon (%0.1)</span>
                      <span className="text-gray-200 font-medium">₺{(total * 0.001).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-700/50">
                      <span className="text-gray-300">Ödenecek Tutar</span>
                      <span className="text-gray-100">₺{(total * 1.001).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                      tradeType === "buy"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/20"
                        : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/20"
                    }`}
                  >
                    {tradeType === "buy" ? (
                      <>
                        <ArrowDown className="w-5 h-5" />
                        Satın Al
                      </>
                    ) : (
                      <>
                        <ArrowUp className="w-5 h-5" />
                        Sat
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Emir Defteri */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <ChartBar className="w-5 h-5 text-blue-400" />
                  Emir Defteri
                </h2>
                <div className="flex items-center gap-2 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                  <button
                    onClick={() => setOrderBookView('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      orderBookView === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setOrderBookView('depth')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      orderBookView === 'depth'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <BarChart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {orderBookView === 'list' ? (
                <>
                  {/* Liste Görünümü */}
                  <div className="space-y-1.5 mb-4">
                    {depthData.asks.map((order, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 text-sm items-center bg-red-500/5 p-2 rounded-lg hover:bg-red-500/10 transition-colors duration-200"
                      >
                        <span className="text-red-400 font-medium">₺{order.price}</span>
                        <span className="text-right text-gray-300">{order.amount.toLocaleString()}</span>
                        <span className="text-right text-gray-400">₺{order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Güncel Fiyat */}
                  <div className="text-center py-3 border-y border-gray-800 my-4 bg-blue-500/5 rounded-lg">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-gray-100">₺{marketData.currentPrice}</span>
                      <span className={`text-sm ${marketData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ({marketData.priceChangePercent}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {depthData.bids.map((order, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 text-sm items-center bg-green-500/5 p-2 rounded-lg hover:bg-green-500/10 transition-colors duration-200"
                      >
                        <span className="text-green-400 font-medium">₺{order.price}</span>
                        <span className="text-right text-gray-300">{order.amount.toLocaleString()}</span>
                        <span className="text-right text-gray-400">₺{order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Derinlik Grafiği */}
                  <div className="relative h-[400px] mt-4">
                    {/* Satış Emirleri (Kırmızı Alan) */}
                    <div className="absolute inset-0">
                      {depthData.asks.map((order, index) => {
                        const width = (order.cumulative / maxCumulative) * 100
                        return (
                          <div
                            key={`ask-${index}`}
                            className="absolute h-[1px] bg-red-500/20"
                            style={{
                              bottom: `${(index / depthData.asks.length) * 100}%`,
                              right: 0,
                              width: `${width}%`,
                            }}
                          >
                            <div className="absolute right-0 -top-3 text-xs text-gray-400">
                              ₺{order.price.toLocaleString()}
                            </div>
                            <div className="absolute left-2 -top-3 text-xs text-gray-400">
                              {order.amount.toLocaleString()}
                            </div>
                          </div>
                        )
                      })}
                      <div className="absolute inset-0 bg-gradient-to-l from-red-500/10 to-transparent" />
                    </div>

                    {/* Alış Emirleri (Yeşil Alan) */}
                    <div className="absolute inset-0">
                      {depthData.bids.map((order, index) => {
                        const width = (order.cumulative / maxCumulative) * 100
                        return (
                          <div
                            key={`bid-${index}`}
                            className="absolute h-[1px] bg-green-500/20"
                            style={{
                              top: `${(index / depthData.bids.length) * 100}%`,
                              left: 0,
                              width: `${width}%`,
                            }}
                          >
                            <div className="absolute left-0 -top-3 text-xs text-gray-400">
                              ₺{order.price.toLocaleString()}
                            </div>
                            <div className="absolute right-2 -top-3 text-xs text-gray-400">
                              {order.amount.toLocaleString()}
                            </div>
                          </div>
                        )
                      })}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
                    </div>

                    {/* Orta Fiyat Çizgisi */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-500/50" />
                    
                    {/* Güncel Fiyat */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                      ₺{marketData.currentPrice.toLocaleString()}
                    </div>

                    {/* Açıklama */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-red-500/20 to-transparent" />
                        <span className="text-gray-400">Satış Derinliği</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-green-500/20 to-transparent" />
                        <span className="text-gray-400">Alış Derinliği</span>
                      </div>
                    </div>

                    {/* Hacim Bilgisi */}
                    <div className="absolute bottom-4 left-4 bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                      <div className="text-sm text-gray-400">
                        Toplam Hacim: <span className="text-gray-200 font-medium">₺{(maxCumulative).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Son İşlemler */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-400" />
                Son İşlemler
              </h2>
              <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm items-center bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <span className={`font-medium ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      ₺{trade.price}
                    </span>
                    <span className="text-right text-gray-300">{trade.amount.toLocaleString()}</span>
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