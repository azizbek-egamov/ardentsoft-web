"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Search, Star, MessageSquare } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: {
    uz: string
    ru: string
    en: string
  }
  company: string
  text: {
    uz: string
    ru: string
    en: string
  }
  rating: number
  image: string
  createdAt: string
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Hamid Safarov",
      role: {
        uz: "MUHANDIS",
        ru: "ИНЖЕНЕР",
        en: "ENGINEER",
      },
      company: "TechCorp",
      text: {
        uz: "Juda yaxshi jamoa, ishonchli hamyonbop, va asosiysi o'z vaqtida bajarishadi! Loyihamiz kutilganidan ham yaxshi chiqdi.",
        ru: "Очень хорошая команда, надежная и доступная, и главное выполняют в срок! Наш проект получился лучше ожидаемого.",
        en: "Very good team, reliable and affordable, and most importantly they deliver on time! Our project turned out better than expected.",
      },
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=HS",
      createdAt: "2024-01-15",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    role: { uz: "", ru: "", en: "" },
    company: "",
    text: { uz: "", ru: "", en: "" },
    rating: 5,
    image: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      role: { uz: "", ru: "", en: "" },
      company: "",
      text: { uz: "", ru: "", en: "" },
      rating: 5,
      image: "",
    })
    setEditingTestimonial(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const testimonialData: Testimonial = {
      id: editingTestimonial ? editingTestimonial.id : Date.now(),
      name: formData.name,
      role: formData.role,
      company: formData.company,
      text: formData.text,
      rating: formData.rating,
      image: formData.image || "/placeholder.svg?height=80&width=80&text=" + formData.name.charAt(0),
      createdAt: editingTestimonial ? editingTestimonial.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingTestimonial) {
      setTestimonials(testimonials.map((t) => (t.id === editingTestimonial.id ? testimonialData : t)))
    } else {
      setTestimonials([...testimonials, testimonialData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      text: testimonial.text,
      rating: testimonial.rating,
      image: testimonial.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu fikrni o'chirishni xohlaysizmi?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id))
    }
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === "all" || testimonial.rating.toString() === filterRating

    return matchesSearch && matchesRating
  })

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth")
    if (!isAuth) {
      window.location.href = "/admin"
    }
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mijozlar Fikri</h1>
            <p className="text-gray-600 mt-1">Mijozlar fikrlarini qo'shish, tahrirlash va boshqarish</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi Fikr
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? "Fikrni Tahrirlash" : "Yangi Fikr Qo'shish"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">To'liq ism</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Kompaniya</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Tabs defaultValue="uz" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="uz">O'zbek</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="uz" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-uz">Lavozim (O'zbek)</Label>
                      <Input
                        id="role-uz"
                        value={formData.role.uz}
                        onChange={(e) => setFormData({ ...formData, role: { ...formData.role, uz: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-uz">Fikr matni (O'zbek)</Label>
                      <Textarea
                        id="text-uz"
                        value={formData.text.uz}
                        onChange={(e) => setFormData({ ...formData, text: { ...formData.text, uz: e.target.value } })}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="ru" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-ru">Должность (Русский)</Label>
                      <Input
                        id="role-ru"
                        value={formData.role.ru}
                        onChange={(e) => setFormData({ ...formData, role: { ...formData.role, ru: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-ru">Текст отзыва (Русский)</Label>
                      <Textarea
                        id="text-ru"
                        value={formData.text.ru}
                        onChange={(e) => setFormData({ ...formData, text: { ...formData.text, ru: e.target.value } })}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-en">Position (English)</Label>
                      <Input
                        id="role-en"
                        value={formData.role.en}
                        onChange={(e) => setFormData({ ...formData, role: { ...formData.role, en: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-en">Review Text (English)</Label>
                      <Textarea
                        id="text-en"
                        value={formData.text.en}
                        onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Reyting</Label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 yulduz</SelectItem>
                        <SelectItem value="4">4 yulduz</SelectItem>
                        <SelectItem value="3">3 yulduz</SelectItem>
                        <SelectItem value="2">2 yulduz</SelectItem>
                        <SelectItem value="1">1 yulduz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Rasm URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/placeholder.svg?height=80&width=80&text=Name"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit">{editingTestimonial ? "Yangilash" : "Qo'shish"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Ism yoki kompaniya bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Reyting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha reyting</SelectItem>
                    <SelectItem value="5">5 yulduz</SelectItem>
                    <SelectItem value="4">4 yulduz</SelectItem>
                    <SelectItem value="3">3 yulduz</SelectItem>
                    <SelectItem value="2">2 yulduz</SelectItem>
                    <SelectItem value="1">1 yulduz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role.uz}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{testimonial.text.uz}</p>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Tahrirlash
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    O'chirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fikrlar topilmadi</h3>
              <p className="text-gray-500">Qidiruv shartlaringizni o'zgartiring yoki yangi fikr qo'shing.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
