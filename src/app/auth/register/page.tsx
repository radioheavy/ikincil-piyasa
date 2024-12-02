"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { z } from "zod"
import * as Form from '@radix-ui/react-form'
import { ArrowRight, CheckCircle2, AlertCircle, User, Mail, Phone, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import AnimatedBackground from "@/components/AnimatedBackground"

const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Şifreler eşleşmiyor",
  path: ["passwordConfirm"],
})

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  const springConfig = { stiffness: 150, damping: 15 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('form-card')?.getBoundingClientRect()
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
    setLoading(true)

    try {
      registerSchema.parse(formData)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Bir hata oluştu")
      router.push("/auth/login?registered=true")
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

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      rotateY: 10,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
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
          id="form-card"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 1200,
          }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 dark:border-gray-700/20 transform-gpu"
        >
          {/* Progress Steps */}
          <div className="p-8 pb-0">
            <div className="flex justify-between items-center relative">
              <div className="absolute h-0.5 bg-gray-200 dark:bg-gray-700 w-full top-1/2 -translate-y-1/2" />
              {[1, 2, 3].map((stepNumber) => (
                <motion.div
                  key={stepNumber}
                  className="relative z-10 flex flex-col items-center gap-2"
                  initial={false}
                  animate={{
                    scale: step === stepNumber ? 1.1 : 1,
                    opacity: step >= stepNumber ? 1 : 0.5,
                  }}
                  whileHover={{ scale: step >= stepNumber ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium relative
                      ${step >= stepNumber 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-white dark:bg-gray-800 text-gray-400'
                      } backdrop-blur-sm border border-white/20`}
                    whileHover={step >= stepNumber ? {
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    } : {}}
                  >
                    {step > stepNumber ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <>
                        {stepNumber}
                        {step === stepNumber && (
                          <motion.div
                            className="absolute -right-1 -top-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-6 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: step === stepNumber ? 1 : 0,
                      y: step === stepNumber ? 0 : -10
                    }}
                  >
                    {stepNumber === 1 && "Kişisel Bilgiler"}
                    {stepNumber === 2 && "İletişim"}
                    {stepNumber === 3 && "Güvenlik"}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <Form.Root onSubmit={handleSubmit} className="space-y-6">
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

                  {step === 1 && (
                    <motion.div variants={itemVariants} className="space-y-4">
                      <Form.Field name="name">
                        <div className="relative group">
                          <motion.div
                            className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"
                            style={{ filter: "blur(8px)" }}
                          />
                          <div className="relative">
                            <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                              Ad Soyad
                            </Form.Label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <User className="w-full h-full" />
                              </div>
                              <Form.Control asChild>
                                <input
                                  type="text"
                                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
                                  value={formData.name}
                                  onChange={(e) => updateFormData("name", e.target.value)}
                                  placeholder="John Doe"
                                />
                              </Form.Control>
                            </div>
                          </div>
                        </div>
                      </Form.Field>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div variants={itemVariants} className="space-y-4">
                      <Form.Field name="email">
                        <div className="relative group">
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
                      </Form.Field>

                      <Form.Field name="phone">
                        <div className="relative group">
                          <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Telefon Numarası
                          </Form.Label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Phone className="w-full h-full" />
                            </div>
                            <Form.Control asChild>
                              <input
                                type="tel"
                                className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
                                value={formData.phone}
                                onChange={(e) => updateFormData("phone", e.target.value)}
                                placeholder="5XX XXX XX XX"
                              />
                            </Form.Control>
                          </div>
                        </div>
                      </Form.Field>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div variants={itemVariants} className="space-y-4">
                      <Form.Field name="password">
                        <div className="relative group">
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
                      </Form.Field>

                      <Form.Field name="passwordConfirm">
                        <div className="relative group">
                          <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Şifre Tekrar
                          </Form.Label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Lock className="w-full h-full" />
                            </div>
                            <Form.Control asChild>
                              <input
                                type={showPasswordConfirm ? "text" : "password"}
                                className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
                                value={formData.passwordConfirm}
                                onChange={(e) => updateFormData("passwordConfirm", e.target.value)}
                              />
                            </Form.Control>
                            <button
                              type="button"
                              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </Form.Field>

                      <div className="flex items-start mt-6">
                        <input
                          id="terms"
                          type="checkbox"
                          className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          <span>
                            <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400">
                              Kullanım Koşulları
                            </Link>
                            {" "}ve{" "}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400">
                              Gizlilik Politikası
                            </Link>
                            'nı okudum ve kabul ediyorum
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                  >
                    {step > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="group flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                        Geri
                      </motion.button>
                    )}
                    
                    {step < 3 ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        className="relative group ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        İleri
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="relative group ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
                            Kaydediliyor...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Hesap Oluştur
                          </>
                        )}
                      </motion.button>
                    )}
                  </motion.div>
                </Form.Root>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Zaten hesabınız var mı?{" "}
            <Link 
              href="/auth/login" 
              className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium"
            >
              Giriş Yapın
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </main>
  )
} 