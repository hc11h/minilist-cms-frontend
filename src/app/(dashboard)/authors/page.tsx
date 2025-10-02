"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusIcon, SearchIcon, TrashIcon, UserIcon, MailIcon, EditIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useAuthors } from "@/hooks/useAuthor"
import { toast } from "sonner"

export default function AuthorsPage() {
  const { authors, isLoading, deleteAuthor } = useAuthors()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)


  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deleteAuthor(deleteId)
      toast.success("Author deleted", {
        description: "The author has been successfully removed.",
      })
    } catch  {
      toast.error("Failed to delete author", {
        description: "Please try again later.",
      })
    } finally {
      setDeleteId(null)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Authors</h1>
            <p className="mt-2 text-muted-foreground">Manage blog authors and contributors</p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/authors/new">
              <PlusIcon className="h-4 w-4" />
              Add Author
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search authors by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Authors Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredAuthors.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <UserIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">{searchQuery ? "No authors found" : "No authors yet"}</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                {searchQuery ? "Try adjusting your search query" : "Get started by adding your first author"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/authors/new">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Author
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAuthors.map((author) => (
              <Card key={author.id} className="group transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={author.profileImage || "/placeholder.svg"} alt={author.name} />
                      <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="line-clamp-1 text-balance">{author.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <MailIcon className="h-3 w-3" />
                        {author.email}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {author.description && (
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{author.description}</p>
                  )}
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1 gap-2 bg-transparent">
                      <Link href={`/authors/${author.id}`}>
                        <EditIcon className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(author.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete author?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The author will be permanently removed from your workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
