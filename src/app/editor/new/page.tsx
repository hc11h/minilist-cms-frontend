"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, SaveIcon } from "@/components/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateDocument } from "@/hooks/use-documents"
import { toast } from "sonner"

export default function NewDocument() {
  const router = useRouter()
  const { createDocument, isCreating } = useCreateDocument()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your document.",
        variant: "destructive",
      })
      return
    }

    try {
      const newDoc = await createDocument({
        title: title.trim(),
        content: content.trim(),
        status,
      })

      toast({
        title: "Document created",
        description: "Your document has been successfully created.",
      })

      router.push(`/editor/${newDoc.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create document. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/editor">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">New Document</h1>
              <p className="mt-1 text-sm text-muted-foreground">Create a new document</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isCreating} size="lg" className="gap-2">
            <SaveIcon className="h-4 w-4" />
            {isCreating ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Editor Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter document title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: "draft" | "published") => setStatus(value)}>
              <SelectTrigger id="status" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Start writing your content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[500px] resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
          </div>
        </div>
      </div>
    </div>
  )
}
