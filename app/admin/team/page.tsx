"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Search, Users } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  role: {
    uz: string
    ru: string
    en: string
  }
  description: {
    uz: string
    ru: string
    en: string
  }
  skills: string[]
  experience: string
  projects: string
  image: string
  email: string
  linkedin: string
  createdAt: string
}

export default function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Akmal Karimov",
      role: {
        uz: "Senior Full-Stack Developer",
        ru: "Старший Full-Stack Разработчик",
        en: "Senior Full-Stack Developer",
      },
      description: {
        uz: "Full-stack development va cloud architecture bo'yicha ekspert. Enterprise loyihalar ustida ishlagan.",
        ru: "Эксперт по full-stack разработке и облачной архитектуре. Работал над корпоративными проектами.",
        en: "Expert in full-stack development and cloud architecture. Worked on enterprise projects.",
      },
      skills: ["React", "Node.js", "Python", "AWS"],
      experience: "5+ yil",
      projects: "25+",
      image: "/placeholder.svg?height=300&width=300&text=AK",
      email: "akmal@ardentsoft.uz",
      linkedin: "https://linkedin.com/in/akmal-karimov",
      createdAt: "2024-01-01",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    role: { uz: "", ru: "", en: "" },
    description: { uz: "", ru: "", en: "" },
    skills: "",
    experience: "",
    projects: "",
    image: "",
    email: "",
    linkedin: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      role: { uz: "", ru: "", en: "" },
      description: { uz: "", ru: "", en: "" },
      skills: "",
      experience: "",
      projects: "",
      image: "",
      email: "",
      linkedin: "",
    })
    setEditingMember(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const memberData: TeamMember = {
      id: editingMember ? editingMember.id : Date.now(),
      name: formData.name,
      role: formData.role,
      description: formData.description,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      experience: formData.experience,
      projects: formData.projects,
      image: formData.image || "/placeholder.svg?height=300&width=300&text=" + formData.name.charAt(0),
      email: formData.email,
      linkedin: formData.linkedin,
      createdAt: editingMember ? editingMember.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingMember) {
      setTeamMembers(teamMembers.map((m) => (m.id === editingMember.id ? memberData : m)))
    } else {
      setTeamMembers([...teamMembers, memberData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      skills: member.skills.join(", "),
      experience: member.experience,
      projects: member.projects,
      image: member.image,
      email: member.email,
      linkedin: member.linkedin,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu jamoa a'zosini o'chirishni xohlaysizmi?")) {
      setTeamMembers(teamMembers.filter((m) => m.id !== id))
    }
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.uz.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="text-3xl font-bold text-gray-900">Jamoa Boshqaruvi</h1>
            <p className="text-gray-600 mt-1">Jamoa a'zolarini qo'shish, tahrirlash va boshqarish</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi A'zo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMember ? "A'zoni Tahrirlash" : "Yangi A'zo Qo'shish"}</DialogTitle>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      <Label htmlFor="description-uz">Tavsif (O'zbek)</Label>
                      <Textarea
                        id="description-uz"
                        value={formData.description.uz}
                        onChange={(e) =>
                          setFormData({ ...formData, description: { ...formData.description, uz: e.target.value } })
                        }
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
                      <Label htmlFor="description-ru">Описание (Русский)</Label>
                      <Textarea
                        id="description-ru"
                        value={formData.description.ru}
                        onChange={(e) =>
                          setFormData({ ...formData, description: { ...formData.description, ru: e.target.value } })
                        }
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
                      <Label htmlFor="description-en">Description (English)</Label>
                      <Textarea
                        id="description-en"
                        value={formData.description.en}
                        onChange={(e) =>
                          setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })
                        }
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Ko'nikmalar (vergul bilan ajrating)</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="React, Node.js, Python"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Tajriba</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="5+ yil"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projects">Loyihalar soni</Label>
                    <Input
                      id="projects"
                      value={formData.projects}
                      onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                      placeholder="25+"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Rasm URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/placeholder.svg?height=300&width=300&text=Name"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit">{editingMember ? "Yangilash" : "Qo'shish"}</Button>
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
                placeholder="Ism yoki lavozim bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role.uz}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.description.uz}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="font-semibold text-blue-600">{member.experience}</div>
                    <div className="text-gray-600">Tajriba</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="font-semibold text-green-600">{member.projects}</div>
                    <div className="text-gray-600">Loyihalar</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Tahrirlash
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    O'chirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Jamoa a'zolari topilmadi</h3>
              <p className="text-gray-500">Qidiruv shartlaringizni o'zgartiring yoki yangi a'zo qo'shing.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
