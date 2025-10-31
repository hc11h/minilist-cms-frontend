import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Headless CMS for the Modern Web
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground sm:text-xl">
          Simple, powerful headless CMS with an API-first approach. Build fast, scale effortlessly.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          View Documentation
        </Button>
      </div>
    </div>
  )
}