"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboardIcon, FileTextIcon, BookOpenIcon, UsersIcon, KeyIcon, DocumentIcon, LogOutIcon } from "@/components/icons"
import { useAuth } from "@/hooks/useAuth"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Editor",
    href: "/editor",
    icon: FileTextIcon,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: BookOpenIcon,
  },
  {
    name: "Authors",
    href: "/authors",
    icon: UsersIcon,
  },
  {
    name: "API Keys",
    href: "/api-keys",
    icon: KeyIcon,
  },
  {
    name: 'Docs',
    href: '/docs',
    icon: DocumentIcon
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth(false);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-mono text-lg font-semibold">Minilist CMS</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          {/* User Info */}
          {user && (
            <div className="mb-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      'U'}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">
                    {user.name || 'User'}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full text-sm font-medium transition-colors text-destructive hover:underline"
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </button>
        </div>
v
      </div>
    </aside>
  )
}