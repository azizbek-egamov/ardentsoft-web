"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Eye, Trash2, Clock, User, Phone } from "lucide-react"

interface Message {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Akmal Karimov",
      email: "akmal@example.com",
      phone: "+998901234567",
      message: "Salom, bizning kompaniya uchun veb-sayt yaratish kerak. Batafsil ma'lumot olsam bo'ladimi?",
      status: "new",
      createdAt: "2024-07-16T10:30:00",
    },
    {
      id: 2,
      name: "Nilufar Abdullayeva",
      email: "nilufar@company.uz",
      phone: "+998907654321",
      message: "Mobil ilova ishlab chiqish xizmatingiz haqida ma'lumot kerak. Narxlar qanday?",
      status: "read",
      createdAt: "2024-07-15T14:20:00",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)

    // Mark as read if it's new
    if (message.status === "new") {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" as const } : m)))
    }
  }

  const handleStatusChange = (messageId: number, newStatus: "new" | "read" | "replied") => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, status: newStatus } : m)))
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu xabarni o'chirishni xohlaysizmi?")) {
      setMessages(messages.filter((m) => m.id !== id))
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800"
      case "read":
        return "bg-blue-100 text-blue-800"
      case "replied":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Yangi"
      case "read":
        return "O'qilgan"
      case "replied":
        return "Javob berilgan"
      default:
        return "Noma'lum"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("uz-UZ") +
      " " +
      date.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Xabarlar</h1>
            <p className="text-gray-600 mt-1">Mijozlardan kelgan xabarlarni ko'rish va boshqarish</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {messages.filter((m) => m.status === "new").length} yangi
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {messages.filter((m) => m.status === "read").length} o'qilgan
              </Badge>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Ism, email yoki xabar matni bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Holati" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha holat</SelectItem>
                    <SelectItem value="new">Yangi</SelectItem>
                    <SelectItem value="read">O'qilgan</SelectItem>
                    <SelectItem value="replied">Javob berilgan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`hover:shadow-md transition-shadow ${message.status === "new" ? "border-l-4 border-l-green-500" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">{message.name}</span>
                      </div>
                      <Badge className={getStatusColor(message.status)}>{getStatusText(message.status)}</Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{message.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 line-clamp-2">{message.message}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Select
                      value={message.status}
                      onValueChange={(value: "new" | "read" | "replied") => handleStatusChange(message.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Yangi</SelectItem>
                        <SelectItem value="read">O'qilgan</SelectItem>
                        <SelectItem value="replied">Javob berilgan</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" onClick={() => handleViewMessage(message)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Ko'rish
                    </Button>

                    <Button variant="destructive" size="sm" onClick={() => handleDelete(message.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Xabarlar topilmadi</h3>
              <p className="text-gray-500">Qidiruv shartlaringizni o'zgartiring.</p>
            </CardContent>
          </Card>
        )}

        {/* Message Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Xabar Tafsilotlari</DialogTitle>
            </DialogHeader>

            {selectedMessage && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Ism</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sana</label>
                    <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Xabar</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Yopish
                  </Button>
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedMessage.id, "replied")
                      setIsDialogOpen(false)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Javob berilgan deb belgilash
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
