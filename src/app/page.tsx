"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { TrendingUp, Users, Wallet2, ChevronRight, Sparkles, BarChart3, ArrowUpRight } from 'lucide-react'
import AnimatedBackground from "@/components/AnimatedBackground"
import ParticleEffect from "@/components/ParticleEffect"
import CountUp from "@/components/CountUp"
import TrendChart from "@/components/TrendChart"

const MotionLink = motion(Link)

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  
  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
    springConfig
  )
  
  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0]),
    springConfig
  )

  // Mouse movement için değişkenler
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  // Mouse hareketi takibi
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) * -0.01
    const rotateYValue = (e.clientX - centerX) * 0.01

    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const stats = [
    { 
      icon: Users, 
      label: "Aktif Yatırımcı", 
      value: 10000, 
      prefix: "", 
      suffix: "+", 
      growth: "+25% artış",
      trend: [30, 40, 35, 50, 49, 60, 70, 91, 87, 100]
    },
    { 
      icon: Wallet2, 
      label: "Toplam Yatırım", 
      value: 25, 
      prefix: "₺", 
      suffix: "M", 
      growth: "Bu ay",
      trend: [40, 43, 45, 60, 65, 63, 68, 75, 80, 85]
    },
    { 
      icon: TrendingUp, 
      label: "Ortalama Getiri", 
      value: 18, 
      suffix: "%", 
      growth: "Yıllık",
      trend: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
    },
    { 
      icon: BarChart3, 
      label: "Başarılı Kampanya", 
      value: 150, 
      suffix: "+", 
      growth: "Tamamlandı",
      trend: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
  ]

  const featuredCampaigns = [
    {
      id: 1,
      title: "TechStart AI",
      description: "Yapay zeka destekli müşteri hizmetleri platformu",
      raised: 850000,
      goal: 1000000,
      progress: 85,
      daysLeft: 12,
      category: "Teknoloji",
      trend: "trending_up",
      investors: 234,
    },
    {
      id: 2,
      title: "GreenEnergy",
      description: "Yenilenebilir enerji çözümleri",
      raised: 420000,
      goal: 500000,
      progress: 84,
      daysLeft: 8,
      category: "Enerji",
      trend: "trending_up",
      investors: 150,
    },
    {
      id: 3,
      title: "HealthTech",
      description: "Dijital sağlık teknolojileri",
      raised: 650000,
      goal: 1000000,
      progress: 65,
      daysLeft: 15,
      category: "Sağlık",
      trend: "trending_down",
      investors: 100,
    },
  ]

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <ParticleEffect />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0">
          {/* Dinamik arka plan desenleri */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
            <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          </div>
          
          {/* Izgara deseni */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        </div>
        
        <motion.div
          onMouseMove={handleMouseMove}
          style={{
            scale: scaleProgress,
            opacity: opacityProgress,
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="container mx-auto px-4 py-16 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
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
                Yatırımın Geleceği Burada
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
              className="text-5xl md:text-7xl font-bold mb-6 relative"
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
                Geleceğin Şirketlerine
              </motion.span>
              <br />
              <span className="inline-block mt-2 relative">
                Yatırım Yapın
                <motion.div
                  className="absolute -right-12 -top-12 text-blue-500/20 dark:text-blue-400/20"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    <defs>
                      <path id="circle" d="M50 0 A50 50 0 1 1 49.999999999999986 0" />
                    </defs>
                    <text>
                      <textPath href="#circle" textLength="310">
                        İkincil Piyasa • İkincil Piyasa • İkincil Piyasa • İkincil Piyasa • İkincil Piyasa •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
            >
              Türkiye&apos;nin en güvenilir kitle fonlama platformunda
              <br />
              yenilikçi girişimlere ortak olun.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <MotionLink
                href="/campaigns"
                className="group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium flex items-center gap-2 overflow-hidden"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center gap-2">
                    Kampanyaları Keşfet
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </motion.div>
              </MotionLink>

              <MotionLink
                href="/about"
                className="group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition duration-500"
                />
                <motion.div className="relative px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-xl font-medium border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    Nasıl Çalışır?
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </motion.div>
              </MotionLink>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="text-gray-400 dark:text-gray-500"
          >
            <ChevronRight className="w-8 h-8 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative">
        {/* Arka plan efektleri */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group animate-float"
                whileHover={{ scale: 1.02 }}
              >
                {/* Arka plan efekti */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 group-hover:duration-200" />
                
                {/* Ana kart */}
                <div className="relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 h-full">
                  {/* Üst kısım */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl border border-white/10">
                          <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          {stat.label}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {stat.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sayı */}
                  <div className="mb-6">
                    <div className="relative">
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-shimmer" style={{ backgroundSize: '200% 100%' }}>
                        <CountUp
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          duration={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grafik */}
                  <div className="h-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-800/50 rounded-lg" />
                    <TrendChart 
                      data={stat.trend} 
                      height={64}
                      color="url(#stats-gradient)"
                    />
                    <defs>
                      <linearGradient id="stats-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(37, 99, 235, 0.5)" />
                        <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
                      </linearGradient>
                    </defs>
                  </div>
                </div>

                {/* Hover efekti */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 relative">
        {/* Dinamik arka plan */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
          {/* Animasyonlu blob'lar */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-conic from-purple-500/30 via-purple-500/0 to-purple-500/30 
              blur-3xl rounded-full mix-blend-multiply animate-blob opacity-70" />
            <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-conic from-blue-500/30 via-blue-500/0 to-blue-500/30 
              blur-3xl rounded-full mix-blend-multiply animate-blob animation-delay-2000 opacity-70" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Öne Çıkan Kampanyalar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              En çok ilgi gören yatırım fırsatlarını keşfedin
            </p>
          </motion.div>

          {/* Kampanya Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
                className="relative group"
                style={{ perspective: "1000px" }}
              >
                {/* Arka plan efektleri */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 group-hover:duration-200" />
                
                {/* Ana kart */}
                <motion.div
                  className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Üst kısım - Görsel ve Kategori */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:to-gray-800/80 z-10" />
                    
                    {/* Animasyonlu arka plan */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    {/* Kategori etiketi */}
                    <motion.div
                      className="absolute top-4 left-4 z-20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                        {campaign.category}
                      </span>
                    </motion.div>

                    {/* Trend ve yatırımcı sayısı */}
                    <motion.div
                      className="absolute top-4 right-4 z-20 flex items-center gap-2"
                      animate={campaign.trend === "trending_up" ? 
                        { y: [0, -4, 0], scale: [1, 1.1, 1] } : 
                        { y: [0, 4, 0], scale: [1, 0.9, 1] }
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg flex items-center gap-1">
                        {campaign.trend === "trending_up" ? "↗" : "↘"}
                        {campaign.investors} yatırımcı
                      </span>
                    </motion.div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    {/* Başlık */}
                    <motion.h3
                      className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
                      style={{ transformStyle: "preserve-3d" }}
                      whileHover={{ translateZ: 20 }}
                    >
                      {campaign.title}
                    </motion.h3>

                    {/* Açıklama */}
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2"
                      style={{ transformStyle: "preserve-3d" }}
                      whileHover={{ translateZ: 10 }}
                    >
                      {campaign.description}
                    </motion.p>

                    {/* İlerleme bilgisi */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Hedef</span>
                        <motion.span
                          className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ₺{campaign.goal.toLocaleString()}
                        </motion.span>
                      </div>

                      {/* İlerleme çubuğu */}
                      <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)",
                            backgroundSize: "200% 100%",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${campaign.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 0%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>

                      {/* Alt bilgiler */}
                      <div className="flex justify-between items-center">
                        <motion.div
                          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {campaign.daysLeft} gün kaldı
                        </motion.div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          %{campaign.progress} tamamlandı
                        </span>
                      </div>
                    </div>

                    {/* Detay butonu */}
                    <Link href={`/campaigns/${campaign.id}`} className="block mt-6">
                      <motion.button
                        className="w-full relative group/button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-70 blur transition duration-200 group-hover/button:opacity-100 group-hover/button:duration-200" />
                        <div className="relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity rounded-lg overflow-hidden">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                            Detayları Gör
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                          </span>
                        </div>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Tüm kampanyalar butonu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/campaigns">
              <motion.button
                className="relative group inline-block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl opacity-50 blur transition duration-200 group-hover:opacity-75 group-hover:duration-200" />
                <div className="relative px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-lg font-medium border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-700 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Tüm Kampanyaları Gör
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

