"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusIcon,
  SearchIcon,
  TrashIcon,
  EditIcon,
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,  
  GlobeIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useBlogs, type BlogStatus } from "@/hooks/useBlog"
import { toast } from "sonner"

export default function BlogsPage() {

  const { blogs, isLoading, deleteBlog } = useBlogs()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Filter blogs
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deleteBlog(deleteId)
      toast.success("Blog deleted", {
        description: "The blog has been successfully removed.",
      })
    } catch {
      toast.error("Failed to delete blog", {
        description: "Please try again later.",
      })
    } finally {
      setDeleteId(null)
    }
  }

  const getStatusBadge = (status: BlogStatus) => {
    const variants: Record<BlogStatus, { variant: "default" | "secondary" | "outline"; label: string }> = {
      PUBLIC: { variant: "default", label: "Public" },
      DRAFT: { variant: "secondary", label: "Draft" },
      SCHEDULED: { variant: "outline", label: "Scheduled" },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Blogs</h1>
            <p className="mt-2 text-muted-foreground">Manage your blog posts and publications</p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/blogs/new">
              <PlusIcon className="h-4 w-4" />
              Create Blog
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search blogs by title or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blogs List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                    </div>
                    <div className="h-6 w-20 rounded bg-muted" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpenIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">{searchQuery ? "No blogs found" : "No blogs yet"}</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                {searchQuery ? "Try adjusting your search query" : "Get started by creating your first blog post"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/blogs/new">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Blog
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="group transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="line-clamp-1 text-balance">{blog.title}</CardTitle>
                        {getStatusBadge(blog.status)}
                      </div>
                      <CardDescription className="flex flex-wrap items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <GlobeIcon className="h-3 w-3" />/{blog.slug}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Created {formatDate(blog.createdAt)}
                        </span>
                        {blog.scheduledAt && (
                          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                            <ClockIcon className="h-3 w-3" />
                            Scheduled for {formatDate(blog.scheduledAt)}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Link href={`/blogs/${blog.id}`}>
                          <EditIcon className="h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(blog.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The blog will be permanently removed from your workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
