import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">


        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-base"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-mono text-sm font-bold text-primary-foreground">M</span>
          </div>
          <span>Minilist CMS</span>
        </Link>



        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          <Link href="/login" passHref>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-sm sm:px-4"
            >
              Sign In
            </Button>
          </Link>
        </div>

      </div>
    </header>
  )
}
