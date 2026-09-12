'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { withAdminCsrf } from '@/lib/client-csrf'
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  LogOut,
  Menu,
  X,
  BookOpen,
} from 'lucide-react'

interface AdminSidebarProps {
  adminEmail: string
}

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blogs', label: 'Posts', icon: FileText },
  { href: '/admin/blogs/create', label: 'New Post', icon: PenSquare },
]

export default function AdminSidebar({ adminEmail }: AdminSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', withAdminCsrf({ method: 'POST' }))
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-900">Blog Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/admin/dashboard'
              ? pathname === '/admin/dashboard'
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-medium text-gray-700 truncate">{adminEmail}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile drawer */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
          <SidebarContent />
        </aside>
      </div>
    </>
  )
}
