export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            <div className="h-5 w-64 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-6 h-10 w-full animate-pulse rounded bg-muted" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-lg border bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
