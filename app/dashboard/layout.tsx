'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar, TopNavbar } from '@/components/layout/dashboard-layout'
import { removeToken } from '@/lib/services/authService'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  const router = useRouter()

  useEffect(() => {
    setUser({
      name: localStorage.getItem("name") || "User",
      email: localStorage.getItem("email") || "",
    })
  }, [])

  const handleLogout = () => {
    removeToken()
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <TopNavbar
        onMenuClick={() => setSidebarOpen(true)}
        user={user}
      />

      <main className="pt-16 lg:ml-64">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}