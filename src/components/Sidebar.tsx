'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboardIcon,
  FileTextIcon,
  BookOpenIcon,
  UsersIcon,
  KeyIcon,
  LogOutIcon,
  ChevronRightIcon,
} from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
  { name: 'Editor', href: '/editor', icon: FileTextIcon },
  { name: 'Blogs', href: '/blogs', icon: BookOpenIcon },
  { name: 'Authors', href: '/authors', icon: UsersIcon },
  { name: 'API Keys', href: '/api-keys', icon: KeyIcon },
];

export function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-background transition-all duration-300',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className="flex h-full flex-col relative">
        {/* Logo and Toggle Button */}
        <div className="flex h-16 items-center border-b border-border px-4 relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-sm font-bold text-primary-foreground">M</span>
            </div>
            {isOpen && (
              <span className="font-mono text-lg font-semibold">Minilist CMS</span>
            )}
          </Link>

          {/* Toggle Button - always visible */}
          <button
            onClick={onToggle}
            className={cn(
              'absolute -right-3 top-4 z-50 rounded-full bg-muted p-1 shadow-md hover:shadow-lg transition hover:bg-accent',
              !isOpen && 'rotate-180'
            )}
            aria-label="Toggle sidebar"
          >
            <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {isOpen && item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          {/* User Info */}
          {isOpen && user && (
            <div className="mb-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      'U'}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">
                    {user.name || 'User'}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className={cn(
              'flex items-center gap-2 w-full text-sm font-medium transition-colors',
              isOpen
                ? 'text-destructive hover:underline'
                : 'text-muted-foreground hover:text-destructive justify-center'
            )}
          >
            <LogOutIcon className="h-4 w-4" />
            {isOpen && 'Logout'}
          </button>
        </div>
      </div>
    </aside>
  );
}
