"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react"
import Link from "next/link"
import AnimatedBackground from "@/components/AnimatedBackground"
import ParticleEffect from "@/components/ParticleEffect"

const categories = [
  { id: "all", name: "Tümü" },
  { id: "technology", name: "Teknoloji" },
  { id: "health", name: "Sağlık" },
  { id: "energy", name: "Enerji" },
  { id: "finance", name: "Finans" },
  { id: "education", name: "Eğitim" },
]

const sortOptions = [
  { id: "trending", name: "Trend" },
  { id: "newest", name: "En Yeni" },
  { id: "mostFunded", name: "En Çok Fon" },
  { id: "endingSoon", name: "Yakında Bitiyor" },
]

export default function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("trending")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Örnek kampanya verileri
  const campaigns = [
    {
      id: 1,
      title: "EcoTech Solutions",
      description: "Sürdürülebilir enerji depolama çözümleri geliştiren yenilikçi startup",
      category: "technology",
      raised: 750000,
      goal: 1000000,
      progress: 75,
      daysLeft: 15,
      investors: 320,
      trend: "up",
      company: {
        name: "EcoTech Inc.",
        logo: "/company-logos/ecotech.png"
      }
    },
    // Diğer kampanyalar...
  ]

  const getCategoryButtonClass = (categoryId: string) => {
    return selectedCategory === categoryId
      ? "relative px-6 py-2.5 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white text-sm font-medium backdrop-blur-sm border border-white/10 rounded-full shadow-lg"
      : "relative px-6 py-2.5 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-sm font-medium backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg"
  }

  const getSortOptionClass = (optionId: string) => {
    return selectedSort === optionId
      ? "w-full px-4 py-2.5 text-left text-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400 font-medium"
      : "w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
  }

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <ParticleEffect />

      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-block mb-6"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <span className="relative px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white text-sm font-medium backdrop-blur-sm border border-white/10">
                  Yatırım Fırsatları
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </motion.div>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 relative"
              >
                <motion.span 
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Aktif Kampanyalar
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-12"
              >
                Geleceğin şirketlerine bugünden yatırım yapın
              </motion.p>

              {/* Arama ve Filtreler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-3xl mx-auto relative"
              >
                {/* Arama Çubuğu */}
                <div className="relative mb-8">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition duration-500" />
                  <div className="relative flex items-center bg-white/90 dark:bg-gray-800/90 rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Kampanya ara..."
                        className="w-full px-6 py-4 bg-transparent outline-none text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Search className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtreler */}
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  {/* Kategoriler */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={getCategoryButtonClass(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>

                  {/* Sıralama */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="relative px-6 py-2.5 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-sm font-medium backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Filter className="w-4 h-4" />
                      Sırala
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>

                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 backdrop-blur-sm"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSelectedSort(option.id)
                              setIsFilterOpen(false)
                            }}
                            className={getSortOptionClass(option.id)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Kampanya Listesi */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Ana kart */}
                  <div className="relative w-full h-full">
                    {/* Arka plan efektleri */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
                    <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-gray-800 overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-500/[0.02] dark:from-blue-500/[0.05] dark:to-purple-500/[0.05]" />
                    </div>

                    {/* Kart içeriği */}
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                      {/* Üst kısım */}
                      <div className="relative">
                        {/* Dekoratif arka plan */}
                        <div className="absolute inset-0">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-30"
                            animate={{
                              backgroundPosition: ["0% 0%", "100% 0%"],
                            }}
                            transition={{
                              duration: 15,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "linear",
                            }}
                            style={{ backgroundSize: "200% 100%" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-800/80 dark:to-gray-800" />
                        </div>

                        {/* Logo ve trend */}
                        <div className="relative pt-8 px-6">
                          <div className="flex items-start justify-between">
                            {/* Logo container */}
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="relative w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-lg p-2 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                                <img
                                  src={campaign.company.logo}
                                  alt={campaign.company.name}
                                  className="w-full h-full object-contain relative z-10"
                                />
                              </div>
                            </motion.div>

                            {/* Trend göstergesi */}
                            <motion.div
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                              animate={
                                campaign.trend === "up"
                                  ? { y: [0, -4, 0], scale: [1, 1.1, 1] }
                                  : { y: [0, 4, 0], scale: [1, 0.9, 1] }
                              }
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {campaign.trend === "up" ? "↗" : "↘"}
                              <span>{campaign.investors} yatırımcı</span>
                            </motion.div>
                          </div>

                          {/* Şirket adı */}
                          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {campaign.company.name}
                          </h3>
                        </div>

                        {/* Kampanya başlığı ve açıklaması */}
                        <div className="px-6 py-4">
                          <motion.h4
                            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
                            whileHover={{ scale: 1.02 }}
                          >
                            {campaign.title}
                          </motion.h4>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {campaign.description}
                          </p>
                        </div>
                      </div>

                      {/* Alt kısım */}
                      <div className="p-6 pt-0">
                        {/* İstatistikler */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <motion.div
                            className="relative group/stat"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                            <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100/50 dark:border-blue-800/50">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Kalan Süre
                              </div>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                  {campaign.daysLeft}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  gün
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="relative group/stat"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                            <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100/50 dark:border-purple-800/50">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                İlerleme
                              </div>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                                  %{campaign.progress}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* İlerleme çubuğu */}
                        <div className="mb-6">
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Toplanan
                            </span>
                            <div className="flex flex-col items-end">
                              <motion.span
                                className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                ₺{campaign.raised.toLocaleString()}
                              </motion.span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Hedef: ₺{campaign.goal.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="relative h-3">
                            {/* Arka plan */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full" />
                            
                            {/* İlerleme */}
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                              initial={{ width: 0 }}
                              animate={{ width: `${campaign.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            >
                              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 relative">
                                {/* Animasyonlu parıltı efekti */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0"
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Detay butonu */}
                        <Link href={`/campaigns/${campaign.id}`}>
                          <motion.button
                            className="relative w-full group/button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-70 blur transition duration-200 group-hover/button:opacity-100" />
                            <div className="relative h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-[1px]">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover/button:opacity-100 transition-opacity" />
                              <div className="relative h-full rounded-[6px] bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.08] to-purple-500/[0.08] dark:from-blue-500/[0.15] dark:to-purple-500/[0.15]" />
                                <span className="relative flex items-center gap-2 font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                  Detayları Gör
                                  <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 