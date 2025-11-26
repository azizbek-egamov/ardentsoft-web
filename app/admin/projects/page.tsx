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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Search, FolderOpen } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: {
    uz: string
    ru: string
    en: string
  }
  category: string
  description: {
    uz: string
    ru: string
    en: string
  }
  client: string
  year: string
  duration: string
  team: string
  status: "completed" | "inProgress"
  technologies: string[]
  image: string
  createdAt: string
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: {
        uz: "YOBIUM E-commerce Platform",
        ru: "YOBIUM E-commerce Платформа",
        en: "YOBIUM E-commerce Platform",
      },
      category: "E-commerce",
      description: {
        uz: "Zamonaviy e-commerce platformasi React va Node.js texnologiyalari bilan yaratilgan.",
        ru: "Современная e-commerce платформа, созданная с использованием React и Node.js.",
        en: "Modern e-commerce platform built with React and Node.js technologies.",
      },
      client: "YOBIUM LLC",
      year: "2024",
      duration: "6 oy",
      team: "8 kishi",
      status: "completed",
      technologies: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
      image: "/placeholder.svg?height=200&width=300&text=YOBIUM",
      createdAt: "2024-01-15",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [formData, setFormData] = useState({
    title: { uz: "", ru: "", en: "" },
    category: "",
    description: { uz: "", ru: "", en: "" },
    client: "",
    year: "",
    duration: "",
    team: "",
    status: "inProgress" as "completed" | "inProgress",
    technologies: "",
    image: "",
  })

  const categories = ["Web", "Mobile", "E-commerce", "CRM", "AI/ML", "IoT"]

  const resetForm = () => {
    setFormData({
      title: { uz: "", ru: "", en: "" },
      category: "",
      description: { uz: "", ru: "", en: "" },
      client: "",
      year: "",
      duration: "",
      team: "",
      status: "inProgress",
      technologies: "",
      image: "",
    })
    setEditingProject(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData: Project = {
      id: editingProject ? editingProject.id : Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      client: formData.client,
      year: formData.year,
      duration: formData.duration,
      team: formData.team,
      status: formData.status,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      image: formData.image || "/placeholder.svg?height=200&width=300&text=Project",
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString().split("T")[0],
    }

    try {
      const response = await fetch(
        editingProject
          ? `/api/projects/${editingProject.id}`  // обновление
          : `/api/projects`,                      
        {
          method: editingProject ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        }
      )

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }

      const savedProject = await response.json()

      if (editingProject) {
        setProjects(projects.map((p) => (p.id === savedProject.id ? savedProject : p)))
      } else {
        setProjects([...projects, savedProject])
      }

      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Ошибка при сохранении проекта:", error)
      alert("Произошла ошибка при сохранении проекта. Проверьте соединение с сервером.")
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      client: project.client,
      year: project.year,
      duration: project.duration,
      team: project.team,
      status: project.status,
      technologies: project.technologies.join(", "),
      image: project.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu loyihani o'chirishni xohlaysizmi?")) {
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.uz.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || project.category === filterCategory
    const matchesStatus = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
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
            <h1 className="text-3xl font-bold text-gray-900">Loyihalar Boshqaruvi</h1>
            <p className="text-gray-600 mt-1">Loyihalarni qo'shish, tahrirlash va boshqarish</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi Loyiha
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Loyihani Tahrirlash" : "Yangi Loyiha Qo'shish"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="uz" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="uz">O'zbek</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="uz" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-uz">Loyiha nomi (O'zbek)</Label>
                      <Input
                        id="title-uz"
                        value={formData.title.uz}
                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, uz: e.target.value } })}
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
                      <Label htmlFor="title-ru">Название проекта (Русский)</Label>
                      <Input
                        id="title-ru"
                        value={formData.title.ru}
                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ru: e.target.value } })}
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
                      <Label htmlFor="title-en">Project Title (English)</Label>
                      <Input
                        id="title-en"
                        value={formData.title.en}
                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
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
                    <Label htmlFor="category">Kategoriya</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategoriyani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">Mijoz</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Yil</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Davomiyligi</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team">Jamoa</Label>
                    <Input
                      id="team"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Holati</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "completed" | "inProgress") => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inProgress">Jarayonda</SelectItem>
                        <SelectItem value="completed">Tugallangan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Texnologiyalar (vergul bilan ajrating)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Rasm URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/placeholder.svg?height=200&width=300&text=Project"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit">{editingProject ? "Yangilash" : "Qo'shish"}</Button>
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
                    placeholder="Loyiha yoki mijoz nomi bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategoriya" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha kategoriya</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Holati" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha holat</SelectItem>
                    <SelectItem value="completed">Tugallangan</SelectItem>
                    <SelectItem value="inProgress">Jarayonda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title.uz}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={project.status === "completed" ? "default" : "destructive"}>
                    {project.status === "completed" ? "Tugallangan" : "Jarayonda"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title.uz}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description.uz}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mijoz:</span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Yil:</span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Jamoa:</span>
                    <span className="font-medium">{project.team}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Tahrirlash
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    O'chirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loyihalar topilmadi</h3>
              <p className="text-gray-500">Qidiruv shartlaringizni o'zgartiring yoki yangi loyiha qo'shing.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
