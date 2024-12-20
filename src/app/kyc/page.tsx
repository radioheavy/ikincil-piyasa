"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  Scan
} from "lucide-react"
import AnimatedBackground from "@/components/AnimatedBackground"

type KYCStep = "personal" | "address" | "documents" | "verification" | "complete"
type DocumentStep = "front" | "back" | "selfie" | "address"

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState<KYCStep>("personal")
  const [currentDocStep, setCurrentDocStep] = useState<DocumentStep>("front")
  const [frontScanning, setFrontScanning] = useState(false)
  const [backScanning, setBackScanning] = useState(false)
  const [selfieScanning, setSelfieScanning] = useState(false)
  const [frontProgress, setFrontProgress] = useState(0)
  const [backProgress, setBackProgress] = useState(0)
  const [selfieProgress, setSelfieProgress] = useState(0)
  const [frontVerified, setFrontVerified] = useState(false)
  const [backVerified, setBackVerified] = useState(false)
  const [selfieVerified, setSelfieVerified] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    nationality: "",
    idNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    idFront: null as File | null,
    idBack: null as File | null,
    selfie: null as File | null,
    proofOfAddress: null as File | null,
  })

  const steps: { id: KYCStep; title: string; description: string }[] = [
    {
      id: "personal",
      title: "Kişisel Bilgiler",
      description: "Kimlik bilgilerinizi doğrulayın"
    },
    {
      id: "address",
      title: "Adres Bilgileri",
      description: "İkamet adresinizi doğrulayın"
    },
    {
      id: "documents",
      title: "Belgeler",
      description: "Gerekli belgeleri yükleyin"
    },
    {
      id: "verification",
      title: "Doğrulama",
      description: "Bilgilerinizi onaylayın"
    },
    {
      id: "complete",
      title: "Tamamlandı",
      description: "KYC süreciniz tamamlandı"
    }
  ]

  const documentSteps: { id: DocumentStep; title: string; description: string }[] = [
    {
      id: "front",
      title: "Kimlik Ön Yüz",
      description: "Kimliğinizin ön yüzünü yükleyin"
    },
    {
      id: "back",
      title: "Kimlik Arka Yüz",
      description: "Kimliğinizin arka yüzünü yükleyin"
    },
    {
      id: "selfie",
      title: "Selfie",
      description: "Kimliğinizle birlikte selfie çekin"
    },
    {
      id: "address",
      title: "İkametgah",
      description: "İkametgah belgenizi yükleyin"
    }
  ]

  const startScanning = (side: 'front' | 'back') => {
    const setScanning = side === 'front' ? setFrontScanning : setBackScanning
    const setProgress = side === 'front' ? setFrontProgress : setBackProgress
    const setVerified = side === 'front' ? setFrontVerified : setBackVerified
    
    setScanning(true)
    setProgress(0)
    setVerified(false)
    
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setScanning(false)
          setProgress(0)
          setVerified(true)
        }, 500)
      }
    }, 50)
  }

  const startSelfieAnalysis = () => {
    setSelfieScanning(true)
    setSelfieProgress(0)
    setSelfieVerified(false)
    
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setSelfieProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setSelfieScanning(false)
          setSelfieProgress(0)
          setSelfieVerified(true)
        }, 500)
      }
    }, 50)
  }

  const handleFileUpload = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.files![0]
      }))
      
      if (field === 'idFront') {
        startScanning('front')
      } else if (field === 'idBack') {
        startScanning('back')
      } else if (field === 'selfie') {
        startSelfieAnalysis()
      }
    }
  }

  const handleSubmit = async () => {
    console.log("Form data:", formData)
    setCurrentStep("complete")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 py-8">
      <AnimatedBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mx-auto relative z-10"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-gray-900 ring-1 ring-gray-800/50 rounded-xl backdrop-blur-xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Kimlik Doğrulama
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Güvenli işlemler için kimlik doğrulama sürecini tamamlayın
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        steps.findIndex(s => s.id === currentStep) >= index
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                      animate={{
                        scale: currentStep === step.id ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.5, repeat: currentStep === step.id ? Infinity : 0 }}
                    >
                      {steps.findIndex(s => s.id === currentStep) > index ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className={`absolute left-1/2 w-full h-0.5 ${
                        steps.findIndex(s => s.id === currentStep) > index
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gray-800"
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Personal Information Step */}
              {currentStep === "personal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Ad</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                          placeholder="Adınız"
                        />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Soyad</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                          placeholder="Soyadınız"
                        />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">E-posta</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="ornek@email.com"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Telefon</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="+90 555 123 4567"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Doğum Tarihi</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setCurrentStep("address")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white mt-6"
                  >
                    Devam Et
                  </motion.button>
                </div>
              )}

              {/* Address Step */}
              {currentStep === "address" && (
                <div className="space-y-4">
                  {/* NVI Butonu */}
                  <motion.button
                    onClick={() => {
                      // NVI entegrasyonu eklenecek
                      console.log("NVI'den veri alınıyor...")
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 mb-4"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-white rounded-full opacity-30 blur animate-pulse" />
                      <FileText className="w-4 h-4 relative" />
                    </div>
                    NVI Sisteminden Bilgileri Al
                  </motion.button>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Adres</label>
                    <div className="relative">
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        rows={2}
                        placeholder="Tam adresiniz"
                      />
                      <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Şehir</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="Şehir"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">İlçe</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="İlçe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Ülke</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="Ülke"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Posta Kodu</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                        placeholder="34000"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={() => setCurrentStep("personal")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                    >
                      Geri
                    </motion.button>
                    <motion.button
                      onClick={() => setCurrentStep("documents")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                    >
                      Devam Et
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Documents Step */}
              {currentStep === "documents" && (
                <div className="space-y-6">
                  {/* Document Progress Steps */}
                  <div className="flex justify-between mb-6">
                    {documentSteps.map((step, index) => (
                      <div key={step.id} className="flex-1">
                        <div className="relative flex items-center justify-center">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              documentSteps.findIndex(s => s.id === currentDocStep) >= index
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-800 text-gray-400"
                            }`}
                            animate={{
                              scale: currentDocStep === step.id ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.5, repeat: currentDocStep === step.id ? Infinity : 0 }}
                          >
                            {documentSteps.findIndex(s => s.id === currentDocStep) > index ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </motion.div>
                          {index < documentSteps.length - 1 && (
                            <div className={`absolute left-1/2 w-full h-0.5 ${
                              documentSteps.findIndex(s => s.id === currentDocStep) > index
                                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                : "bg-gray-800"
                            }`} />
                          )}
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-xs font-medium text-gray-300">{step.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Document Upload Forms */}
                  <motion.div
                    key={currentDocStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Kimlik Ön Yüz */}
                    {currentDocStep === "front" && (
                      <div>
                        <div className="text-sm font-medium mb-4">Kimlik Kartı Ön Yüz</div>
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-25 group-hover:opacity-50 transition duration-1000" />
                          <div className="relative">
                            {formData.idFront ? (
                              <div className="relative w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div 
                                    className={`w-[280px] h-[180px] rounded-lg border-2 border-dashed relative ${
                                      frontVerified 
                                        ? "border-emerald-500 bg-emerald-900/20" 
                                        : "border-gray-600 bg-gray-700/50"
                                    }`}
                                  >
                                    {/* Kimlik Şablonu */}
                                    <motion.div 
                                      className={`absolute top-4 left-4 w-24 h-32 rounded ${
                                        frontVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                      }`}
                                      animate={frontVerified ? {
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [1, 1.02, 1],
                                      } : {}}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                    <motion.div 
                                      className={`absolute top-4 right-4 w-32 h-8 rounded ${
                                        frontVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                      }`}
                                      animate={frontVerified ? {
                                        opacity: [0.5, 0.8, 0.5],
                                      } : {}}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                      }}
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 h-16 space-y-2">
                                      {[1, 2, 3].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          className={`w-${4-i}/4 h-3 rounded ${
                                            frontVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                          }`}
                                          animate={frontVerified ? {
                                            opacity: [0.5, 0.8, 0.5],
                                          } : {}}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.3 * (i + 1)
                                          }}
                                        />
                                      ))}
                                    </div>
                                    
                                    {/* Tarama Animasyonu */}
                                    {frontScanning && (
                                      <>
                                        <motion.div 
                                          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                                          animate={{
                                            y: [0, 180, 0],
                                          }}
                                          transition={{
                                            duration: 2,
                                            ease: "linear",
                                            repeat: Infinity,
                                          }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                            <Scan className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs text-emerald-500">Analiz Ediliyor... {frontProgress}%</span>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    {/* Onay Animasyonu */}
                                    {frontVerified && !frontScanning && (
                                      <motion.div 
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", duration: 0.5 }}
                                      >
                                        <div className="bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-emerald-500/50">
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                          <span className="text-xs text-emerald-500">Doğrulandı</span>
                                        </div>
                                      </motion.div>
                                    )}
                                  </motion.div>
                                </div>
                              </div>
                            ) : (
                              <label className="block p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer group-hover:bg-gray-800/70 transition-colors">
                                <input
                                  type="file"
                                  onChange={handleFileUpload("idFront")}
                                  className="hidden"
                                  accept="image/*"
                                />
                                <div className="flex items-center justify-center gap-3">
                                  <Upload className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-400">
                                    Kimlik ön yüzünü yükleyin
                                  </span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <motion.button
                            onClick={() => setCurrentStep("address")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                          >
                            Geri
                          </motion.button>
                          <motion.button
                            onClick={() => setCurrentDocStep("back")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                          >
                            Devam Et
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {/* Kimlik Arka Yüz */}
                    {currentDocStep === "back" && (
                      <div>
                        <div className="text-sm font-medium mb-4">Kimlik Kartı Arka Yüz</div>
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-25 group-hover:opacity-50 transition duration-1000" />
                          <div className="relative">
                            {formData.idBack ? (
                              <div className="relative w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div 
                                    className={`w-[280px] h-[180px] rounded-lg border-2 border-dashed relative ${
                                      backVerified 
                                        ? "border-emerald-500 bg-emerald-900/20" 
                                        : "border-gray-600 bg-gray-700/50"
                                    }`}
                                  >
                                    {/* Kimlik Arka Yüz Şablonu */}
                                    <motion.div 
                                      className={`absolute top-4 left-4 right-4 h-24 rounded ${
                                        backVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                      }`}
                                      animate={backVerified ? {
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [1, 1.02, 1],
                                      } : {}}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                    <motion.div 
                                      className={`absolute bottom-4 left-4 w-40 h-16 rounded ${
                                        backVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                      }`}
                                      animate={backVerified ? {
                                        opacity: [0.5, 0.8, 0.5],
                                      } : {}}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                      }}
                                    />
                                    <motion.div 
                                      className={`absolute bottom-4 right-4 w-24 h-16 rounded ${
                                        backVerified ? "bg-emerald-500/50" : "bg-gray-600/50"
                                      }`}
                                      animate={backVerified ? {
                                        opacity: [0.5, 0.8, 0.5],
                                      } : {}}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.6
                                      }}
                                    />
                                    
                                    {/* Tarama Animasyonu */}
                                    {backScanning && (
                                      <>
                                        <motion.div 
                                          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                                          animate={{
                                            y: [0, 180, 0],
                                          }}
                                          transition={{
                                            duration: 2,
                                            ease: "linear",
                                            repeat: Infinity,
                                          }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                            <Scan className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs text-emerald-500">Analiz Ediliyor... {backProgress}%</span>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    {/* Onay Animasyonu */}
                                    {backVerified && !backScanning && (
                                      <motion.div 
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", duration: 0.5 }}
                                      >
                                        <div className="bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-emerald-500/50">
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                          <span className="text-xs text-emerald-500">Doğrulandı</span>
                                        </div>
                                      </motion.div>
                                    )}
                                  </motion.div>
                                </div>
                              </div>
                            ) : (
                              <label className="block p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer group-hover:bg-gray-800/70 transition-colors">
                                <input
                                  type="file"
                                  onChange={handleFileUpload("idBack")}
                                  className="hidden"
                                  accept="image/*"
                                />
                                <div className="flex items-center justify-center gap-3">
                                  <Upload className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-400">
                                    Kimlik arka yüzünü yükleyin
                                  </span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <motion.button
                            onClick={() => setCurrentDocStep("front")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                          >
                            Geri
                          </motion.button>
                          <motion.button
                            onClick={() => setCurrentDocStep("selfie")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                            disabled={!backVerified}
                          >
                            Devam Et
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {/* Selfie */}
                    {currentDocStep === "selfie" && (
                      <div>
                        <div className="text-sm font-medium mb-4">Selfie</div>
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-25 group-hover:opacity-50 transition duration-1000" />
                          <div className="relative">
                            {formData.selfie ? (
                              <div className="relative w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                                {/* Yüklenen Görsel Arka Planı */}
                                <div 
                                  className="absolute inset-0 bg-center bg-cover bg-no-repeat blur-sm"
                                  style={{
                                    backgroundImage: `url(${URL.createObjectURL(formData.selfie)})`,
                                    filter: 'brightness(0.5) contrast(1.2)'
                                  }}
                                />
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {/* Görsel Önizleme */}
                                  <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden">
                                    <div 
                                      className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${URL.createObjectURL(formData.selfie)})`
                                      }}
                                    />
                                    
                                    {/* Analiz Katmanı */}
                                    <motion.div 
                                      className={`absolute inset-0 rounded-full ${
                                        selfieVerified 
                                          ? "bg-emerald-500/10 backdrop-blur-[2px]" 
                                          : "bg-gray-900/20 backdrop-blur-[2px]"
                                      }`}
                                    >
                                      {/* Yüz Analiz Çerçevesi */}
                                      <motion.div 
                                        className={`absolute inset-4 rounded-full border-2 ${
                                          selfieVerified ? "border-emerald-500" : "border-gray-400"
                                        }`}
                                        animate={selfieVerified ? {
                                          opacity: [0.5, 0.8, 0.5],
                                          scale: [1, 1.02, 1],
                                        } : {}}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "easeInOut"
                                        }}
                                      />
                                      
                                      {/* Yüz Hatları Animasyonu */}
                                      {selfieScanning && (
                                        <>
                                          {/* Yatay Tarama Çizgisi */}
                                          <motion.div 
                                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                                            animate={{
                                              y: [0, 180, 0],
                                            }}
                                            transition={{
                                              duration: 2,
                                              ease: "linear",
                                              repeat: Infinity,
                                            }}
                                          />
                                          
                                          {/* Yüz Tanıma Noktaları */}
                                          <motion.div 
                                            className="absolute inset-8"
                                            initial={false}
                                            animate={{
                                              opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                              duration: 1.5,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                            }}
                                          >
                                            {/* Göz Noktaları */}
                                            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                            
                                            {/* Burun ve Ağız Noktaları */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                            
                                            {/* Yüz Çerçevesi */}
                                            <motion.div 
                                              className="absolute inset-0 border-2 border-dashed border-emerald-500/50 rounded-full"
                                              animate={{
                                                rotate: 360,
                                              }}
                                              transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear",
                                              }}
                                            />

                                            {/* Yüz Ölçüm Çizgileri */}
                                            <motion.div
                                              className="absolute inset-0"
                                              animate={{
                                                opacity: [0, 1, 0],
                                              }}
                                              transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 0.5,
                                              }}
                                            >
                                              <div className="absolute top-1/3 left-1/4 right-1/4 h-[1px] bg-emerald-500/50" />
                                              <div className="absolute top-1/2 left-1/3 right-1/3 h-[1px] bg-emerald-500/50" />
                                              <div className="absolute bottom-1/3 left-1/3 right-1/3 h-[1px] bg-emerald-500/50" />
                                              <div className="absolute top-1/4 bottom-1/4 left-1/3 w-[1px] bg-emerald-500/50" />
                                              <div className="absolute top-1/4 bottom-1/4 right-1/3 w-[1px] bg-emerald-500/50" />
                                            </motion.div>
                                          </motion.div>

                                          {/* Progress Göstergesi */}
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                              <Scan className="w-4 h-4 text-emerald-500" />
                                              <span className="text-xs text-emerald-500">Yüz Analizi... {selfieProgress}%</span>
                                            </div>
                                          </div>
                                        </>
                                      )}

                                      {/* Onay Animasyonu */}
                                      {selfieVerified && !selfieScanning && (
                                        <motion.div 
                                          className="absolute inset-0 flex items-center justify-center"
                                          initial={{ opacity: 0, scale: 0.5 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ type: "spring", duration: 0.5 }}
                                        >
                                          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-emerald-500/50">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs text-emerald-500">Yüz Doğrulandı</span>
                                          </div>
                                        </motion.div>
                                      )}
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label className="block p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer group-hover:bg-gray-800/70 transition-colors">
                                <input
                                  type="file"
                                  onChange={handleFileUpload("selfie")}
                                  className="hidden"
                                  accept="image/*"
                                />
                                <div className="flex items-center justify-center gap-3">
                                  <Camera className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-400">
                                    Selfie çekin veya yükleyin
                                  </span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <motion.button
                            onClick={() => setCurrentDocStep("back")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                          >
                            Geri
                          </motion.button>
                          <motion.button
                            onClick={() => setCurrentDocStep("address")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                            disabled={!selfieVerified}
                          >
                            Devam Et
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {/* İkametgah */}
                    {currentDocStep === "address" && (
                      <div>
                        <div className="text-sm font-medium mb-4">İkametgah Belgesi</div>
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-25 group-hover:opacity-50 transition duration-1000" />
                          <label className="relative block p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer group-hover:bg-gray-800/70 transition-colors">
                            <input
                              type="file"
                              onChange={handleFileUpload("proofOfAddress")}
                              className="hidden"
                              accept="image/*,application/pdf"
                            />
                            <div className="flex items-center justify-center gap-3">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-400">
                                {formData.proofOfAddress ? formData.proofOfAddress.name : "Dosya seçin"}
                              </span>
                            </div>
                          </label>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <motion.button
                            onClick={() => setCurrentDocStep("selfie")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                          >
                            Geri
                          </motion.button>
                          <motion.button
                            onClick={() => setCurrentStep("verification")}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                          >
                            Devam Et
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Verification Step */}
              {currentStep === "verification" && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium">Kişisel Bilgiler</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-gray-400">Ad Soyad</div>
                        <div className="text-gray-200">{formData.firstName} {formData.lastName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">E-posta</div>
                        <div className="text-gray-200">{formData.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Telefon</div>
                        <div className="text-gray-200">{formData.phone}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Doğum Tarihi</div>
                        <div className="text-gray-200">{formData.birthDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium">Adres Bilgileri</h3>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-200">{formData.address}</div>
                      <div className="text-gray-200">
                        {formData.city}, {formData.state} {formData.postalCode}
                      </div>
                      <div className="text-gray-200">{formData.country}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium">Yüklenen Belgeler</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-200">Kimlik Ön Yüz</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-200">Kimlik Arka Yüz</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-200">Selfie</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-200">İkametgah Belgesi</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Yukarıdaki bilgilerin doğruluğunu onaylıyorum. Yanlış veya eksik bilgi vermem durumunda başvurumun reddedilebileceğini kabul ediyorum.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={() => setCurrentStep("documents")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300"
                    >
                      Geri
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                    >
                      Onayla ve Gönder
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Complete Step */}
              {currentStep === "complete" && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-lg font-semibold mb-2">KYC Başvurunuz Alındı</h2>
                  <p className="text-sm text-gray-400 mb-6">
                    Başvurunuz incelemeye alınmıştır. Sonuç size e-posta ile bildirilecektir.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white"
                    onClick={() => window.location.href = "/"}
                  >
                    Ana Sayfaya Dön
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 