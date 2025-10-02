import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-12">
          <FooterColumn title="Product" links={["Features", "Pricing", "Changelog"]} />
          <FooterColumn title="Resources" links={["Documentation", "API Reference", "Guides"]} />
          <FooterColumn title="Company" links={["About", "Blog", "Careers"]} />
          <FooterColumn title="Legal" links={["Privacy", "Terms"]} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border pt-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-mono text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-sm text-muted-foreground">
              © 2025 Minilist. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <FooterLink href="#" label="Twitter" />
            <FooterLink href="#" label="GitHub" />
            <FooterLink href="#" label="Discord" />
          </div>
        </div>
      </div>
    </footer>
  )
}

// Component: Footer Column with links
function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Component: Footer single link (socials, etc.)
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  )
}
