"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home,
  BarChart2,
  Wallet,
  Users,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield
} from "lucide-react"

const menuItems = [
  {
    title: "Ana Sayfa",
    href: "/",
    icon: Home
  },
  {
    title: "Kampanyalar",
    href: "/campaigns",
    icon: Users
  },
  {
    title: "Piyasa",
    href: "/trade",
    icon: BarChart2
  }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              İkincil Piyasa
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.title}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 dark:bg-white/10 rounded-lg -z-10"
                        layoutId="navbar-active"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              className="p-2 rounded-lg text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {/* Wallet */}
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet className="w-4 h-4" />
              <span>Cüzdan</span>
            </motion.button>

            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                className="flex items-center gap-2 p-2 rounded-lg text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 dark:bg-gray-900 border border-gray-800 dark:border-gray-800 shadow-xl py-1"
                  >
                    <Link 
                      href="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                    >
                      <User className="w-4 h-4" />
                      Profil
                    </Link>
                    <Link 
                      href="/kyc" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                    >
                      <Shield className="w-4 h-4" />
                      KYC Doğrulama
                    </Link>
                    <Link 
                      href="/settings" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                    >
                      <Settings className="w-4 h-4" />
                      Ayarlar
                    </Link>
                    <div className="border-t border-gray-800 dark:border-gray-800 my-1" />
                    <button 
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300 hover:bg-white/10 dark:hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                  >
                    <Icon className="w-5 h-5" />
                    {item.title}
                  </Link>
                )
              })}
              <div className="border-t border-gray-800 dark:border-gray-800 pt-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                  <Wallet className="w-5 h-5" />
                  Cüzdan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 