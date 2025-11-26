"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Users, Code, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { InnovativeNavbar } from "@/components/innovative-navbar"

const translations = {
  uz: {
    nav: {
      about: "Biz Haqimizda",
      services: "Xizmatlar",
      projects: "Loyihalar",
      team: "Jamoa",
      contact: "Bog'lanish",
    },
    projects: {
      title: "Barcha Loyihalarimiz",
      subtitle:
        "Biz yaratgan har bir loyiha - bu innovatsiya va professional yondashuvning namunasi",
      backToHome: "Bosh sahifaga qaytish",
      viewDetails: "Batafsil Ko'rish",
      category: "Kategoriya",
      duration: "Davomiyligi (oy)",
      team: "Jamoa hajmi",
      technologies: "Texnologiyalar",
      client: "Mijoz",
      year: "Yil",
      status: "Holati",
      completed: "Yakunlangan",
      inProgress: "Jarayonda",
      filterAll: "Barchasi",
      filterWeb: "Web Loyihalar",
      filterMobile: "Mobil Ilovalar",
      filterEcommerce: "E-commerce",
      filterCRM: "CRM Tizimlari",
    },
  },
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      projects: "Проекты",
      team: "Команда",
      contact: "Контакты",
    },
    projects: {
      title: "Все Наши Проекты",
      subtitle:
        "Каждый созданный нами проект - это образец инноваций и профессионального подхода",
      backToHome: "Вернуться на главную",
      viewDetails: "Подробнее",
      category: "Категория",
      duration: "Длительность (мес.)",
      team: "Команда",
      technologies: "Технологии",
      client: "Клиент",
      year: "Год",
      status: "Статус",
      completed: "Завершен",
      inProgress: "В процессе",
      filterAll: "Все",
      filterWeb: "Веб Проекты",
      filterMobile: "Мобильные Приложения",
      filterEcommerce: "E-commerce",
      filterCRM: "CRM Системы",
    },
  },
}

export default function ProjectsPage() {
  const [language, setLanguage] = useState("uz")
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [filter, setFilter] = useState("all")
  const [mounted, setMounted] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const t = translations[language as keyof typeof translations].projects

  // ---------------- Загружаем проекты ----------------
  useEffect(() => {
    setMounted(true)

    fetch("https://api.ardentsoft.uz/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("API error:", err))
  }, [])

  useEffect(() => {
    fetch("https://api.ardentsoft.uz/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Categories load error:", err))
  }, [])

  // ---------------- Проверяем URL-параметр (id проекта) ----------------
  useEffect(() => {
    if (!mounted) return
    const params = new URLSearchParams(window.location.search)
    const projectId = params.get("id")
    if (projectId) {
      fetch(`https://api.ardentsoft.uz/api/projects/${projectId}/`)
        .then((res) => res.json())
        .then((data) => setSelectedProject(data))
        .catch((err) => console.error("Project load error:", err))
    }
  }, [mounted])

  if (!mounted) return null

  // ---------------- Фильтрация ----------------
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true

    const projectCategory =
      project.category?.name?.toLowerCase().replace(/\s+/g, "-") || ""

    return projectCategory === filter
  })

  const filters = [
    { key: "all", label: t.filterAll },
    ...categories.map((cat) => ({
      key: cat.name.toLowerCase().replace(/\s+/g, "-"), // делаем ключ на основе name
      label: cat.name,
    })),
  ]

  // ---------------- Детальная страница проекта ----------------
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-white">
        <InnovativeNavbar
          key="projects-navbar"
          language={language}
          setLanguage={setLanguage}
          translations={translations}
          scrollToContact={() => (window.location.href = "/#contact")}
        />

        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => {
                setSelectedProject(null)
                window.history.pushState({}, "", "/projects")
              }}
              variant="outline"
              className="mb-8 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full mb-4">
                  <span className="text-blue-600 font-medium text-sm">
                    {selectedProject.category?.name}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
                  {selectedProject.title}
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      {t.client}
                    </h4>
                    <p className="text-gray-600">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      {t.year}
                    </h4>
                    <p className="text-gray-600">{selectedProject.year}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Code className="w-4 h-4 mr-2 text-blue-600" />
                      {t.duration}
                    </h4>
                    <p className="text-gray-600">{selectedProject.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      {t.team}
                    </h4>
                    <p className="text-gray-600">
                      {selectedProject.staff_size} kishi
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {t.technologies}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technology?.map((tech: any, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Xususiyatlar
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.characteristics?.map(
                      (feature: string, i: number) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-[80%] h-[220px] bg-white rounded-2xl shadow-md flex items-center justify-center">
                  <Image
                    src={selectedProject.logo || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={300}
                    height={200}
                    className="rounded-lg object-contain max-h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ---------------- Главная страница с проектами ----------------
  return (
    <div className="min-h-screen bg-white">
      <InnovativeNavbar
        key="projects-navbar"
        language={language}
        setLanguage={setLanguage}
        translations={translations}
        scrollToContact={() => (window.location.href = "/#contact")}
      />

      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/">
              <Button variant="outline" className="mb-8 flex items-center space-x-2 mx-auto bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToHome}</span>
              </Button>
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* --- фильтры --- */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((f) => (
              <Button
                key={f.key}
                onClick={() => setFilter(f.key)}
                variant={filter === f.key ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${filter === f.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "hover:bg-blue-50"
                  }`}
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* --- список проектов --- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={project.logo || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {project.category?.name}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.year}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {project.staff_size} kishi
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedProject(project)
                      window.history.pushState({}, "", `/projects?id=${project.id}`)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
