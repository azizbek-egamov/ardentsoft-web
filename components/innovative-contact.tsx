"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, MessageSquare, Zap, Shield, Award } from "lucide-react"

interface ContactProps {
  translations: any
  language: string
}

export function InnovativeContact({ translations, language }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState("")

  const t = translations[language as keyof typeof translations]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Успешно
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });

      // Автоматически убрать сообщение через 3 сек
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Не удалось отправить сообщение. Проверьте подключение к серверу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t.contact.phone,
      value: "+998 90 123 45 67",
      description: "24/7 qo'llab-quvvatlash",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      action: () => window.open("tel:+998901234567"),
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t.contact.email,
      value: "info@ardentsoft.uz",
      description: "Tezkor javob kafolati",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      action: () => window.open("mailto:info@ardentsoft.uz"),
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.contact.address,
      value: "Toshkent, O'zbekiston",
      description: "Ofisga tashrif buyuring",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      action: () => window.open("https://maps.google.com"),
    },
  ]

  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "24 soat ichida javob",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Ma'lumotlar xavfsizligi",
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Professional maslahat",
    },
  ]

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Biz bilan bog'laning</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.contact.subtitle}</p>
        </div>

        {/* Contact Methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              onClick={method.action}
            >
              <CardContent className="p-8 relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {method.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 mb-2">{method.value}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>

                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span>Bog'lanish</span>
                    <Zap className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <Card className="shadow-2xl border-0 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.contact.form.title}</h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Xabar yuborildi!</h4>
                  <p className="text-gray-600">Tez orada siz bilan bog'lanamiz.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.form.name}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField("")}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${activeField === "name"
                          ? "border-blue-500 ring-4 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                        placeholder={t.contact.form.namePlaceholder}
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.contact.form.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        onFocus={() => setActiveField("phone")}
                        onBlur={() => setActiveField("")}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${activeField === "phone"
                          ? "border-blue-500 ring-4 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                        placeholder={t.contact.form.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField("")}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${activeField === "email"
                        ? "border-blue-500 ring-4 ring-blue-100"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.form.message}</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField("")}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 resize-none ${activeField === "message"
                        ? "border-blue-500 ring-4 ring-blue-100"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                      placeholder={t.contact.form.messagePlaceholder}
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Yuborilmoqda...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>{t.contact.form.submit}</span>
                        <Send className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Features & Info */}
          <div className="space-y-8">
            {/* Features */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Nega bizni tanlash kerak?</h4>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <span className="font-semibold text-gray-800">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Bizning natijalar</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      98%
                    </div>
                    <p className="text-sm text-gray-600">Mijozlar mamnunligi</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      24h
                    </div>
                    <p className="text-sm text-gray-600">Javob vaqti</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                      50+
                    </div>
                    <p className="text-sm text-gray-600">Loyihalar</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      5+
                    </div>
                    <p className="text-sm text-gray-600">Yillik tajriba</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
