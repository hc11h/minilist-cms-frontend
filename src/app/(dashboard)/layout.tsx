'use client'

import { DashboardHeader } from "@/components/DashboardHeader"
import { Sidebar } from "@/components/Sidebar"
import { useSidebar } from "@/hooks/useSidebar"
import type React from "react"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen, toggleSidebar } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} onToggle={toggleSidebar} />
      <div className={`flex flex-1 flex-col ${isOpen ? "md:pl-64" : "md:pl-16"}`}>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
