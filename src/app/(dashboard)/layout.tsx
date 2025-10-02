import type { ReactNode } from "react"


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      sidebar here
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
