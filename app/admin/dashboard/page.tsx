"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, FolderOpen, MessageSquare, Building, TrendingUp, Eye, Star, Filter } from "lucide-react"

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"]

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  })
  const [stats, setStats] = useState({
    totalProjects: 50,
    totalTeamMembers: 15,
    totalTestimonials: 25,
    totalPartners: 8,
    totalViews: 12500,
    avgRating: 4.8,
  })

  const projectsData = [
    { month: "Jan", projects: 3, completed: 2 },
    { month: "Feb", projects: 5, completed: 4 },
    { month: "Mar", projects: 4, completed: 3 },
    { month: "Apr", projects: 6, completed: 5 },
    { month: "May", projects: 8, completed: 7 },
    { month: "Jun", projects: 7, completed: 6 },
    { month: "Jul", projects: 9, completed: 8 },
    { month: "Aug", projects: 6, completed: 5 },
    { month: "Sep", projects: 8, completed: 7 },
    { month: "Oct", projects: 10, completed: 9 },
    { month: "Nov", projects: 7, completed: 6 },
    { month: "Dec", projects: 5, completed: 4 },
  ]

  const categoryData = [
    { name: "Web Development", value: 35, color: "#3B82F6" },
    { name: "Mobile Apps", value: 25, color: "#8B5CF6" },
    { name: "E-commerce", value: 20, color: "#10B981" },
    { name: "CRM Systems", value: 15, color: "#F59E0B" },
    { name: "AI/ML", value: 5, color: "#EF4444" },
  ]

  const viewsData = [
    { date: "2024-01", views: 1200 },
    { date: "2024-02", views: 1500 },
    { date: "2024-03", views: 1800 },
    { date: "2024-04", views: 2100 },
    { date: "2024-05", views: 2400 },
    { date: "2024-06", views: 2200 },
    { date: "2024-07", views: 2800 },
    { date: "2024-08", views: 2600 },
    { date: "2024-09", views: 3100 },
    { date: "2024-10", views: 3400 },
    { date: "2024-11", views: 3200 },
    { date: "2024-12", views: 3600 },
  ]

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth")
    if (!isAuth) {
      window.location.href = "/admin"
    }
  }, [])

  const handleFilterApply = () => {
    // Apply date range filter logic here
    console.log("Filtering data from", dateRange.startDate, "to", dateRange.endDate)
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Boshqaruv paneli statistikalari</p>
          </div>

          {/* Date Filter */}
          <Card className="xl:w-auto">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Boshlanish sanasi
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    className="w-full sm:w-auto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium">
                    Tugash sanasi
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    className="w-full sm:w-auto"
                  />
                </div>
                <Button onClick={handleFilterApply} className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Loyihalar</p>
                  <p className="text-3xl font-bold">{stats.totalProjects}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Jamoa</p>
                  <p className="text-3xl font-bold">{stats.totalTeamMembers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Fikrlar</p>
                  <p className="text-3xl font-bold">{stats.totalTestimonials}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Hamkorlar</p>
                  <p className="text-3xl font-bold">{stats.totalPartners}</p>
                </div>
                <Building className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Ko'rishlar</p>
                  <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-medium">Reyting</p>
                  <p className="text-3xl font-bold">{stats.avgRating}</p>
                </div>
                <Star className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Projects Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Oylik Loyihalar Statistikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#3B82F6" name="Jami" />
                  <Bar dataKey="completed" fill="#10B981" name="Tugallangan" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Loyihalar Kategoriyasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Sayt Ko'rishlar Statistikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
