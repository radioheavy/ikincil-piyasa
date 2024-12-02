"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { z } from "zod"
import * as Form from '@radix-ui/react-form'
import { Mail, Lock, Eye, EyeOff, LogIn, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import AnimatedBackground from "@/components/AnimatedBackground"

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get("registered") === "true"
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(justRegistered ? "Kayıt başarılı! Şimdi giriş yapabilirsiniz." : "")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // 3D Card Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  const springConfig = { stiffness: 150, damping: 15 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('login-card')?.getBoundingClientRect()
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      loginSchema.parse(formData)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Giriş yapılamadı")
      
      router.push("/")
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Bir hata oluştu")
      }
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.div
          id="login-card"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 1200,
          }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 dark:border-gray-700/20 transform-gpu"
        >
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="relative inline-block mb-4">
                <motion.div
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Hoş Geldiniz
                </motion.div>
                <motion.div
                  className="absolute -right-6 -top-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Hesabınıza giriş yapın
              </p>
            </motion.div>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-green-50 dark:bg-green-900/30 backdrop-blur-sm text-green-600 dark:text-green-300 p-4 rounded-xl flex items-center gap-2 border border-green-100 dark:border-green-900/50"
              >
                <CheckCircle2 className="w-5 h-5" />
                {success}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 dark:bg-red-900/30 backdrop-blur-sm text-red-600 dark:text-red-300 p-4 rounded-xl flex items-center gap-2 border border-red-100 dark:border-red-900/50"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            <Form.Root onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Form.Field name="email">
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"
                      style={{ filter: "blur(8px)" }}
                    />
                    <div className="relative">
                      <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                        E-posta Adresi
                      </Form.Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                          <Mail className="w-full h-full" />
                        </div>
                        <Form.Control asChild>
                          <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            placeholder="ornek@email.com"
                          />
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                </Form.Field>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Form.Field name="password">
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"
                      style={{ filter: "blur(8px)" }}
                    />
                    <div className="relative">
                      <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                        Şifre
                      </Form.Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                          <Lock className="w-full h-full" />
                        </div>
                        <Form.Control asChild>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                          />
                        </Form.Control>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form.Field>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Beni hatırla
                  </span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:hover:text-blue-400"
                >
                  Şifremi unuttum
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="relative group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Giriş yapılıyor...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Giriş Yap
                    </>
                  )}
                </motion.button>
              </motion.div>
            </Form.Root>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Hesabınız yok mu?{" "}
            <Link 
              href="/auth/register" 
              className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium"
            >
              Hemen Kaydolun
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </main>
  )
} 