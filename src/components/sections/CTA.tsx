import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="container py-24 md:py-32">
      <div className="relative flex flex-col items-center gap-10 text-center max-w-4xl mx-auto rounded-3xl border border-border/60 bg-card p-12 md:p-20 shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.15),transparent_70%)]" />

        <div className="relative space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
            Ready to simplify your content?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed mx-auto">
            Join developers who&apos;ve already made the switch to a cleaner, simpler CMS.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 border-border/60 hover:bg-muted/50 bg-transparent">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
