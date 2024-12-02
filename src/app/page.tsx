"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Wallet2, ChevronRight, Sparkles, BarChart3, ArrowUpRight } from 'lucide-react'
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
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
              Lorem Ipsum
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
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Lorem Ipsum
              </span>
              <br />
              <span className="inline-block mt-2 relative">
                Dolor Amet
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
                    <path
                      d="M50 0 A50 50 0 1 1 49.999999999999986 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dy=".3em"
                      className="text-xs font-medium"
                      fill="currentColor"
                    >

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Vestibulum pulvinar sed eros nec ullamcorper.
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
                  Lorem Ipsum
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
                  Lorem Ipsum
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{ filter: "blur(8px)" }}
                />
                <div className="relative p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl">
                      <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.growth}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="h-12">
                    <TrendChart data={stat.trend} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Öne Çıkan Kampanyalar
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              En çok ilgi gören yatırım fırsatlarını keşfedin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{ filter: "blur(8px)" }}
                />
                <div className="relative p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="mb-4">
                    <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                      {campaign.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {campaign.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Toplanan</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          ₺{campaign.raised.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${campaign.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {campaign.daysLeft} gün kaldı
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        %{campaign.progress}
                      </span>
                    </div>
                  </div>
                  <Link href={`/campaigns/${campaign.id}`}>
                    <motion.button
                      className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all group overflow-hidden relative"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="flex items-center justify-center gap-2">
                        Detayları Gör
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/campaigns">
              <motion.button
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-700/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Tüm Kampanyaları Gör
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
