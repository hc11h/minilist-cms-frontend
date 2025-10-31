import { Card, CardContent } from "@/components/ui/card"

export function Integration() {
  const integrations = [
    { name: "Next.js", icon: "🚀" },
    { name: "React", icon: "⚛️" },
    { name: "Vue.js", icon: "💚" },
    { name: "Svelte", icon: "🟢" },
    { name: "Angular", icon: "🅰️" },
    { name: "Nuxt.js", icon: "🔧" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Seamless Integrations</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Works with your favorite frameworks and tools.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="flex flex-col items-center justify-center p-6">
            <div className="text-4xl mb-2">{integration.icon}</div>
            <CardContent className="text-center">
              <h3 className="font-medium">{integration.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}