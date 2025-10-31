import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-muted/50 p-8 text-center sm:p-12">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
      <p className="max-w-[600px] text-muted-foreground">
        Start building your headless CMS today with our free tier.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          View Pricing
        </Button>
      </div>
    </div>
  )
}