export function Integration() {
  return (
    <section className="container py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
              Integrate with anything.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Framework agnostic and platform independent. Use Minilist with Next.js, React, Vue, or any other
              framework. Deploy anywhere.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["Next.js", "React", "Vue", "Svelte", "Nuxt", "Remix"].map((tech) => (
              <div
                key={tech}
                className="group px-5 py-2.5 rounded-lg bg-muted/50 border border-border/60 text-sm font-medium hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">example.ts</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">TypeScript</div>
            </div>
            <pre className="font-mono text-sm text-foreground overflow-x-auto">
              <code className="leading-relaxed">{`import { createClient } from '@minilist/sdk'

const client = createClient()

const posts = await client
  .collection('posts')
  .find({ status: 'published' })
  .sort({ date: -1 })
  .limit(10)

// That's it. Simple and clean.`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
