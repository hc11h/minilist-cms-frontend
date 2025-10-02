"use client"


import { ThemeToggle } from "@/components/theme-toggle"
import { MobileSidebar } from "./MobileSidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <MobileSidebar />
      <div className="flex flex-1 items-center justify-between">
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Content Management System</h1>
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
