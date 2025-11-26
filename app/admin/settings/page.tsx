"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, Globe, Mail, Phone, MapPin } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "ARDENT SOFT",
    siteDescription: "Kelajakni bugun yaratamiz",
    contactEmail: "info@ardentsoft.uz",
    contactPhone: "+998 90 123 45 67",
    contactAddress: "Toshkent, O'zbekiston",
    socialMedia: {
      facebook: "https://facebook.com/ardentsoft",
      twitter: "https://twitter.com/ardentsoft",
      linkedin: "https://linkedin.com/company/ardentsoft",
      instagram: "https://instagram.com/ardentsoft",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: "Sayt texnik ishlar olib borilmoqda. Tez orada qaytamiz!",
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Sozlamalar saqlandi!")
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
            <h1 className="text-3xl font-bold text-gray-900">Sozlamalar</h1>
            <p className="text-gray-600 mt-1">Sayt sozlamalarini boshqarish</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Umumiy</TabsTrigger>
            <TabsTrigger value="contact">Aloqa</TabsTrigger>
            <TabsTrigger value="social">Ijtimoiy</TabsTrigger>
            <TabsTrigger value="system">Tizim</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Umumiy Sozlamalar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Sayt nomi</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Sayt tavsifi</Label>
                    <Input
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Aloqa Ma'lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefon
                    </Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactAddress" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Manzil
                  </Label>
                  <Input
                    id="contactAddress"
                    value={settings.contactAddress}
                    onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Ijtimoiy Tarmoqlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={settings.socialMedia.facebook}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socialMedia: { ...settings.socialMedia, facebook: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={settings.socialMedia.twitter}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socialMedia: { ...settings.socialMedia, twitter: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socialMedia: { ...settings.socialMedia, linkedin: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={settings.socialMedia.instagram}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socialMedia: { ...settings.socialMedia, instagram: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bildirishnomalar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email bildirishnomalar</Label>
                      <p className="text-sm text-gray-600">Yangi xabarlar haqida email orqali xabar olish</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailNotifications: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS bildirishnomalar</Label>
                      <p className="text-sm text-gray-600">Muhim xabarlar haqida SMS orqali xabar olish</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, smsNotifications: checked },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Texnik Ishlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Texnik ishlar rejimi</Label>
                      <p className="text-sm text-gray-600">Saytni texnik ishlar uchun yopish</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenance.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          maintenance: { ...settings.maintenance, maintenanceMode: checked },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceMessage">Texnik ishlar xabari</Label>
                    <Textarea
                      id="maintenanceMessage"
                      value={settings.maintenance.maintenanceMessage}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maintenance: { ...settings.maintenance, maintenanceMessage: e.target.value },
                        })
                      }
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
