"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, Sparkles, Users, Clock, TrendingUp, ChartBar, FileText, Share2 } from "lucide-react"
import Link from "next/link"
import AnimatedBackground from "@/components/AnimatedBackground"
import ParticleEffect from "@/components/ParticleEffect"

// Örnek veri - Gerçek uygulamada API'den gelecek
const campaignData = {
  id: "1",
  title: "EcoTech Solutions",
  description: "Sürdürülebilir enerji depolama çözümleri geliştiren yenilikçi startup. Yenilenebilir enerji kaynaklarından elde edilen fazla enerjiyi depolayarak, enerji verimliliğini artırmayı ve karbon ayak izini azaltmayı hedefliyoruz.",
  company: {
    name: "EcoTech Inc.",
    logo: "/company-logos/ecotech.png",
    description: "2020 yılında kurulan EcoTech Inc., sürdürülebilir enerji çözümleri alanında öncü bir teknoloji şirketidir.",
    team: [
      { name: "Ahmet Yılmaz", role: "CEO", image: "/team/ceo.png" },
      { name: "Ayşe Demir", role: "CTO", image: "/team/cto.png" },
    ]
  },
  financials: {
    targetAmount: 1000000,
    collectedAmount: 750000,
    sharePrice: 100,
    totalShares: 10000,
    remainingShares: 2500,
    investors: 320,
    minInvestment: 1000,
  },
  timeline: {
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    daysLeft: 15,
  },
  documents: [
    { title: "Finansal Rapor", type: "financial", url: "#" },
    { title: "İş Planı", type: "business", url: "#" },
    { title: "Yasal Belgeler", type: "legal", url: "#" },
  ],
  updates: [
    {
      date: "2024-01-15",
      title: "Yeni Teknoloji Patenti",
      content: "Enerji depolama sistemimiz için yeni patent başvurusu onaylandı."
    },
    {
      date: "2024-01-10",
      title: "Üretim Tesisi Anlaşması",
      content: "İlk üretim tesisimiz için kiralama anlaşması imzalandı."
    }
  ]
}

export default function CampaignDetailPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <ParticleEffect />

      {/* Hero Section */}
      <section className="relative pt-8">
        <div className="container mx-auto px-4">
          {/* Geri butonu */}
          <div className="mb-8">
            <Link href="/campaigns">
              <motion.button
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Kampanyalara Dön</span>
              </motion.button>
            </Link>
          </div>

          {/* Başlık ve Şirket Bilgisi */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-500/[0.02] dark:from-blue-500/[0.05] dark:to-purple-500/[0.05] rounded-2xl" />
            
            <div className="relative">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-24 h-24 rounded-full bg-white dark:bg-gray-900 shadow-lg p-4 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    <img
                      src={campaignData.company.logo}
                      alt={campaignData.company.name}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>
                </motion.div>

                {/* Başlık ve Açıklama */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative inline-block mb-4"
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
                    <span className="relative px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white text-sm font-medium backdrop-blur-sm border border-white/10">
                      Aktif Kampanya
                      <motion.div
                        className="absolute -right-1 -top-1"
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
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    </span>
                  </motion.div>

                  <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                    {campaignData.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                    {campaignData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Users,
                label: "Yatırımcı",
                value: campaignData.financials.investors,
                suffix: "+",
                color: "blue"
              },
              {
                icon: Clock,
                label: "Kalan Süre",
                value: campaignData.timeline.daysLeft,
                suffix: " gün",
                color: "purple"
              },
              {
                icon: TrendingUp,
                label: "Toplanan",
                value: campaignData.financials.collectedAmount,
                prefix: "₺",
                color: "emerald"
              },
              {
                icon: ChartBar,
                label: "Tamamlanma",
                value: Math.round((campaignData.financials.collectedAmount / campaignData.financials.targetAmount) * 100),
                suffix: "%",
                color: "amber"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-200`} />
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sekmeler */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
            {[
              { id: "overview", label: "Genel Bakış" },
              { id: "financials", label: "Finansallar" },
              { id: "team", label: "Ekip" },
              { id: "documents", label: "Belgeler" },
              { id: "updates", label: "Güncellemeler" }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sekme İçeriği */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-500/[0.02] dark:from-blue-500/[0.05] dark:to-purple-500/[0.05] rounded-2xl" />
            
            {/* Genel Bakış */}
            {selectedTab === "overview" && (
              <div className="relative space-y-8">
                {/* Şirket Hakkında */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Şirket Hakkında</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {campaignData.company.description}
                  </p>
                </div>

                {/* Yatırım Detayları */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Yatırım Detayları</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { label: "Pay Fiyatı", value: `₺${campaignData.financials.sharePrice}` },
                      { label: "Minimum Yatırım", value: `₺${campaignData.financials.minInvestment}` },
                      { label: "Kalan Pay", value: campaignData.financials.remainingShares },
                    ].map((detail) => (
                      <div
                        key={detail.label}
                        className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100/50 dark:border-blue-800/50"
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {detail.label}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {detail.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yatırım Yap Butonu */}
                <div className="flex justify-center pt-4">
                  <motion.button
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-70 blur transition duration-200 group-hover:opacity-100" />
                    <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="relative flex items-center gap-2 text-white font-medium text-lg">
                        Yatırım Yap
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Finansallar */}
            {selectedTab === "financials" && (
              <div className="relative space-y-8">
                {/* Finansal Özet */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Finansal Özet</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hedef ve Toplanan */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100/50 dark:border-blue-800/50">
                      <h3 className="text-lg font-semibold mb-4">Kampanya İlerlemesi</h3>
                      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="absolute h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${(campaignData.financials.collectedAmount / campaignData.financials.targetAmount) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="text-gray-500 dark:text-gray-400">Toplanan</div>
                          <div className="text-lg font-bold">₺{campaignData.financials.collectedAmount.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500 dark:text-gray-400">Hedef</div>
                          <div className="text-lg font-bold">₺{campaignData.financials.targetAmount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Pay Bilgileri */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100/50 dark:border-blue-800/50">
                      <h3 className="text-lg font-semibold mb-4">Pay Bilgileri</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Toplam Pay</span>
                          <span className="font-bold">{campaignData.financials.totalShares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Kalan Pay</span>
                          <span className="font-bold">{campaignData.financials.remainingShares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Pay Fiyatı</span>
                          <span className="font-bold">₺{campaignData.financials.sharePrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yatırım Koşulları */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Yatırım Koşulları</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Minimum Yatırım",
                        value: `₺${campaignData.financials.minInvestment.toLocaleString()}`,
                        description: "Yapabileceğiniz en düşük yatırım tutarı"
                      },
                      {
                        title: "Yatırımcı Sayısı",
                        value: campaignData.financials.investors,
                        description: "Şu ana kadar yatırım yapan kişi sayısı"
                      },
                      {
                        title: "Tahmini Getiri",
                        value: "12-18%",
                        description: "Yıllık tahmini getiri oranı"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {item.value}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Ekip */}
            {selectedTab === "team" && (
              <div className="relative space-y-8">
                <h2 className="text-2xl font-bold mb-6">Yönetim Ekibi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {campaignData.company.team.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-200" />
                      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-200" />
                            <img
                              src={member.image}
                              alt={member.name}
                              className="relative w-20 h-20 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-600 dark:text-gray-300">
                            {member.role === "CEO" 
                              ? "Şirketin vizyoner lideri ve stratejik yönetiminden sorumlu."
                              : "Teknoloji ve ürün geliştirme süreçlerinin lideri."}
                          </p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                          >
                            LinkedIn
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium"
                          >
                            Twitter
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Danışmanlar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: "Prof. Dr. Mehmet Yılmaz", role: "Teknoloji Danışmanı" },
                      { name: "Zeynep Kaya", role: "Finansal Danışman" },
                      { name: "Dr. Ali Demir", role: "Ar-Ge Danışmanı" },
                      { name: "Ayşe Öztürk", role: "Hukuk Danışmanı" }
                    ].map((advisor, index) => (
                      <motion.div
                        key={advisor.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <h3 className="font-semibold">{advisor.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{advisor.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Belgeler */}
            {selectedTab === "documents" && (
              <div className="relative space-y-8">
                <h2 className="text-2xl font-bold mb-6">Önemli Belgeler</h2>
                <div className="grid grid-cols-1 gap-4">
                  {campaignData.documents.map((doc, index) => (
                    <motion.div
                      key={doc.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-200" />
                      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            doc.type === 'financial' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                            doc.type === 'business' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                            'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{doc.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {doc.type === 'financial' ? 'Finansal dökümanlar ve raporlar' :
                               doc.type === 'business' ? 'İş planı ve stratejiler' :
                               'Yasal belgeler ve sözleşmeler'}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                        >
                          İndir
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                  <h3 className="text-lg font-semibold mb-2">Önemli Not</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tüm belgeler gizlilik sözleşmesi kapsamındadır. İndirdiğiniz belgeleri üçüncü şahıslarla paylaşmayınız.
                  </p>
                </div>
              </div>
            )}

            {/* Güncellemeler */}
            {selectedTab === "updates" && (
              <div className="relative space-y-8">
                <h2 className="text-2xl font-bold mb-6">Proje Güncellemeleri</h2>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600" />
                  <div className="space-y-8">
                    {campaignData.updates.map((update, index) => (
                      <motion.div
                        key={update.date}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-16"
                      >
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-1/2 mt-1.5">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-75" />
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{update.title}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(update.date).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{update.content}</p>
                          <div className="mt-4 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                            >
                              Detaylar
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium"
                            >
                              <Share2 className="w-4 h-4" />
                              Paylaş
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                  >
                    Tüm Güncellemeleri Gör
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
} 