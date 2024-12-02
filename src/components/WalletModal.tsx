"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, X, Plus, ArrowDown, ArrowUp, Copy, ExternalLink, CreditCard, Bank, Sparkles } from "lucide-react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

// Örnek veri
const walletData = {
  balance: 25000,
  address: "0x1234...5678",
  transactions: [
    { id: 1, type: "deposit", amount: 5000, date: "2024-02-20", status: "completed" },
    { id: 2, type: "withdraw", amount: 2000, date: "2024-02-19", status: "completed" },
    { id: 3, type: "deposit", amount: 10000, date: "2024-02-18", status: "completed" },
  ]
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "deposit" | "withdraw">("overview")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")

  // Para yatırma işlemi
  const handleDeposit = () => {
    // API isteği yapılacak
    console.log("Deposit:", amount)
  }

  // Para çekme işlemi
  const handleWithdraw = () => {
    // API isteği yapılacak
    console.log("Withdraw:", amount)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with animated background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[100%] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-[gradient_8s_linear_infinite] blur-[100px] opacity-50" />
            </div>
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-[10%] -translate-x-1/2 w-full max-w-2xl max-h-[80vh] bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl z-50 border border-gray-800/50"
          >
            {/* Animated background patterns */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-conic from-blue-500/30 via-transparent to-transparent blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-conic from-purple-500/30 via-transparent to-transparent blur-2xl animate-spin-slow" />
            </div>

            {/* Header - Sabit */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-800/50 bg-gray-900/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 blur animate-pulse" />
                  <div className="relative p-2 bg-gray-900 rounded-full">
                    <Wallet className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Cüzdan
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="relative p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "overview"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  Genel Bakış
                </button>
                <button
                  onClick={() => setActiveTab("deposit")}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "deposit"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  Para Yatır
                </button>
                <button
                  onClick={() => setActiveTab("withdraw")}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "withdraw"
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  Para Çek
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Balance Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-1000" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-800/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          <span className="text-sm text-gray-400">Toplam Bakiye</span>
                        </div>
                        <span className="text-sm text-gray-400">TRY</span>
                      </div>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        ₺{walletData.balance.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>

                  {/* Address Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-50 blur group-hover:opacity-75 transition duration-1000" />
                    <div className="relative p-4 bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Cüzdan Adresi</span>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-gray-800/50 rounded-lg group"
                          >
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-gray-800/50 rounded-lg group"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="mt-1 font-mono text-gray-300">{walletData.address}</div>
                    </div>
                  </motion.div>

                  {/* Transaction History */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      İşlem Geçmişi
                    </h3>
                    <div className="space-y-3">
                      {walletData.transactions.map((tx, index) => (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div className={`absolute -inset-0.5 rounded-lg opacity-50 blur transition duration-1000 ${
                            tx.type === "deposit"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          } opacity-0 group-hover:opacity-50`} />
                          <div className="relative flex items-center justify-between p-4 bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-800/50">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                tx.type === "deposit" ? "bg-green-500/20" : "bg-red-500/20"
                              }`}>
                                {tx.type === "deposit" ? (
                                  <ArrowDown className="w-4 h-4 text-green-400" />
                                ) : (
                                  <ArrowUp className="w-4 h-4 text-red-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-200">
                                  {tx.type === "deposit" ? "Para Yatırma" : "Para Çekme"}
                                </div>
                                <div className="text-sm text-gray-400">{tx.date}</div>
                              </div>
                            </div>
                            <div className={`font-medium ${
                              tx.type === "deposit" ? "text-green-400" : "text-red-400"
                            }`}>
                              {tx.type === "deposit" ? "+" : "-"}₺{tx.amount.toLocaleString()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Deposit Tab */}
              {activeTab === "deposit" && (
                <div className="space-y-6">
                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod("card")}
                      className={`relative group ${
                        paymentMethod === "card"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gray-800/50 hover:bg-gray-700/50"
                      } p-4 rounded-xl`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className={`w-5 h-5 ${
                          paymentMethod === "card" ? "text-white" : "text-gray-400"
                        }`} />
                        <span className={paymentMethod === "card" ? "text-white" : "text-gray-300"}>
                          Kredi Kartı
                        </span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod("bank")}
                      className={`relative group ${
                        paymentMethod === "bank"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gray-800/50 hover:bg-gray-700/50"
                      } p-4 rounded-xl`}
                    >
                      <div className="flex items-center gap-3">
                        <Bank className={`w-5 h-5 ${
                          paymentMethod === "bank" ? "text-white" : "text-gray-400"
                        }`} />
                        <span className={paymentMethod === "bank" ? "text-white" : "text-gray-300"}>
                          Havale/EFT
                        </span>
                      </div>
                    </motion.button>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-75 blur group-hover:opacity-100 transition duration-1000" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-800/50">
                      <div className="flex items-center gap-2 text-green-400 mb-6">
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Para Yatır</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Miktar
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-500 transition-colors"
                              placeholder="0.00"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                              TRY
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[100, 500, 1000, 5000].map((value) => (
                            <motion.button
                              key={value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAmount(value.toString())}
                              className="py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-300 transition-colors"
                            >
                              ₺{value}
                            </motion.button>
                          ))}
                        </div>

                        <motion.button
                          onClick={handleDeposit}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium text-white shadow-lg"
                        >
                          Para Yatır
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdraw Tab */}
              {activeTab === "withdraw" && (
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-75 blur group-hover:opacity-100 transition duration-1000" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-800/50">
                      <div className="flex items-center gap-2 text-red-400 mb-6">
                        <ArrowUp className="w-5 h-5" />
                        <span className="font-medium">Para Çek</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Miktar
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-red-500 transition-colors"
                              placeholder="0.00"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                              TRY
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[100, 500, 1000, 5000].map((value) => (
                            <motion.button
                              key={value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAmount(value.toString())}
                              className="py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-300 transition-colors"
                            >
                              ₺{value}
                            </motion.button>
                          ))}
                        </div>

                        <motion.button
                          onClick={handleWithdraw}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg font-medium text-white shadow-lg"
                        >
                          Para Çek
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 