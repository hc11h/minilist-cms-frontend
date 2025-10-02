import { Zap, Lock, Boxes, Code, ArrowUpRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Get started in minutes. No complex configuration or setup required.",
  },
  {
    icon: Code,
    title: "RESTful API",
    description: "Clean, intuitive API design that follows REST principles and best practices.",
  },
  {
    icon: Boxes,
    title: "Flexible Schema",
    description: "Define your content structure with ease. Change it anytime without migrations.",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    description: "Built-in authentication, role-based access, and enterprise-grade security.",
  },
]

export function Features() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative rounded-2xl border border-border/60 bg-card p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 dark:shadow-black/20 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Subtle gradient on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors shadow-sm">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
