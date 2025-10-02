import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Integration } from "@/components/sections/Integration"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-0">
        <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <Hero />
        </section>
        <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <Features />
        </section>
        <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <Integration />
        </section>
        <section className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <CTA />
        </section>
      </main>
      <Footer />
    </div>
  )
}