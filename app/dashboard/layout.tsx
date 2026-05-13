'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar, TopNavbar } from '@/components/layout/dashboard-layout'
import { removeToken } from '@/lib/services/authService'

// Mock user data - would come from API in production
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    removeToken()
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
        user={mockUser}
      />
      <main className="pt-16 lg:ml-64">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
