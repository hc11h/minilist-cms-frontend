import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative container flex flex-col items-center justify-center gap-12 py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.08),transparent_50%)]" />

      <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
        <div className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-2 text-sm shadow-sm hover:shadow-md transition-all">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
            <Sparkles className="h-3 w-3 text-accent" />
          </div>
          <span className="font-medium">API-first headless CMS</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[1.1]">
          Content management,{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-muted-foreground">simplified</span>
            <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -rotate-1" />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
          Build faster with a headless CMS designed for developers. Clean APIs, instant setup, and zero configuration
          overhead.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all"
        >
          Start Building
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" className="h-12 px-8 border-border/60 hover:bg-muted/50 bg-transparent">
          View Documentation
        </Button>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <div className="group relative rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">Quick Start</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">bash</div>
            </div>
            <pre className="font-mono text-sm text-foreground overflow-x-auto">
              <code className="leading-relaxed">{`curl -X GET https://api.minilist.dev/content \\
  -H "Content-Type: application/json"`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
