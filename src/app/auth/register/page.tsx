"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import * as Form from '@radix-ui/react-form'
import { ArrowRight, CheckCircle2, AlertCircle, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
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

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex-1 flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-400'
                    } backdrop-blur-sm border border-white/20`}
                  animate={{
                    scale: step === stepNumber ? 1.1 : 1,
                    opacity: step === stepNumber ? 1 : 0.8,
                  }}
                >
                  {stepNumber}
                </motion.div>
                {stepNumber < 3 && (
                  <div className="flex-1 h-0.5 mx-2">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: "0%" }}
                      animate={{
                        width: step > stepNumber ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 dark:border-gray-700/20"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {step === 1 && "Kişisel Bilgiler"}
              {step === 2 && "İletişim Bilgileri"}
              {step === 3 && "Güvenlik"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {step === 1 && "Size nasıl hitap edelim?"}
              {step === 2 && "Size nasıl ulaşalım?"}
              {step === 3 && "Hesabınızı güvence altına alın"}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 dark:bg-red-900/30 backdrop-blur-sm text-red-600 dark:text-red-300 p-4 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          <Form.Root className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Form.Field name="name">
                  <div className="relative">
                    <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                      Ad Soyad
                    </Form.Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Form.Control asChild>
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          placeholder="John Doe"
                        />
                      </Form.Control>
                    </div>
                  </div>
                </Form.Field>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Form.Field name="email">
                  <div className="relative">
                    <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                      E-posta Adresi
                    </Form.Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Form.Control asChild>
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="ornek@email.com"
                        />
                      </Form.Control>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field name="phone">
                  <div className="relative">
                    <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                      Telefon Numarası
                    </Form.Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Form.Control asChild>
                        <input
                          type="tel"
                          className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Form.Field name="password">
                  <div className="relative">
                    <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                      Şifre
                    </Form.Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Form.Control asChild>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full pl-10 pr-12 py-2.5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
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
                  <div className="relative">
                    <Form.Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                      Şifre Tekrar
                    </Form.Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Form.Control asChild>
                        <input
                          type={showPasswordConfirm ? "text" : "password"}
                          className="w-full pl-10 pr-12 py-2.5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
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

            <div className="flex justify-between items-center mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Geri
                </button>
              )}
              
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  İleri
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
            </div>
          </Form.Root>
        </motion.div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Zaten hesabınız var mı?{" "}
            <Link 
              href="/auth/login" 
              className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
} 