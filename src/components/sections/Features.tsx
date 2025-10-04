import { Zap, CheckCircle2, Shield, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function Features() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Easy to Use",
      description: "Intuitive interface that makes content management a breeze."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Blazing fast performance with edge caching and CDN integration."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade security with end-to-end encryption."
    },
    {
      icon: Database,
      title: "Scalable Architecture",
      description: "Built to handle millions of requests with ease."
    }
  ]


  return (
    <section className="relative container py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="flex flex-col items-center gap-4 text-center mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Everything you need. <span className="text-muted-foreground">Nothing you don&apos;t.</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
          Focus on building great products, not managing infrastructure.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <feature.icon className="mx-auto h-8 w-8 text-primary" />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

    </section>
  )
}
