"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Building } from "lucide-react"
import Image from "next/image"

interface Partner {
  id: number
  name: string
  logo: string
  website: string
  description: string
  category: string
  createdAt: string
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 1,
      name: "Microsoft",
      logo: "/placeholder.svg?height=80&width=120&text=Microsoft",
      website: "https://microsoft.com",
      description: "Global technology company",
      category: "Technology",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Google",
      logo: "/placeholder.svg?height=80&width=120&text=Google",
      website: "https://google.com",
      description: "Search engine and cloud services",
      category: "Technology",
      createdAt: "2024-01-02",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    description: "",
    category: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      website: "",
      description: "",
      category: "",
    })
    setEditingPartner(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const partnerData: Partner = {
      id: editingPartner ? editingPartner.id : Date.now(),
      name: formData.name,
      logo: formData.logo || "/placeholder.svg?height=80&width=120&text=" + formData.name,
      website: formData.website,
      description: formData.description,
      category: formData.category,
      createdAt: editingPartner ? editingPartner.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingPartner) {
      setPartners(partners.map((p) => (p.id === editingPartner.id ? partnerData : p)))
    } else {
      setPartners([...partners, partnerData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
      description: partner.description,
      category: partner.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu hamkorni o'chirishni xohlaysizmi?")) {
      setPartners(partners.filter((p) => p.id !== id))
    }
  }

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <h1 className="text-3xl font-bold text-gray-900">Hamkorlar Boshqaruvi</h1>
            <p className="text-gray-600 mt-1">Hamkorlarni qo'shish, tahrirlash va boshqarish</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi Hamkor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPartner ? "Hamkorni Tahrirlash" : "Yangi Hamkor Qo'shish"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Kompaniya nomi</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoriya</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Technology, Finance, etc."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Veb-sayt</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Tavsif</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Qisqa tavsif"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="/placeholder.svg?height=80&width=120&text=Logo"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit">{editingPartner ? "Yangilash" : "Qo'shish"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Hamkor nomi yoki kategoriya bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="mx-auto object-contain h-16"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{partner.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{partner.description}</p>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Tahrirlash
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(partner.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    O'chirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Hamkorlar topilmadi</h3>
              <p className="text-gray-500">Qidiruv shartlaringizni o'zgartiring yoki yangi hamkor qo'shing.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
