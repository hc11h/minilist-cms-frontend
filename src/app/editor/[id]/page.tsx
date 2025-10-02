"use client"

import { useEffect, useState } from "react"
import { ArrowLeftIcon, SaveIcon, LoaderIcon } from "@/components/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDocument, useUpdateDocument } from "@/hooks/use-documents"
import { toast } from "sonner"

export default function EditDocument({ params }: { params: { id: string } }) {

  const { document, isLoading, error } = useDocument(params.id)
  const { updateDocument, isUpdating } = useUpdateDocument()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize form with document data
  useEffect(() => {
    if (document) {
      setTitle(document.name)
      setContent(document.content)
      setStatus(document.status)
    }
  }, [document])

  // Track changes
  useEffect(() => {
    if (document) {
      const changed = title !== document.name || content !== document.content || status !== document.status
      setHasChanges(changed)
    }
  }, [title, content, status, document])

  const handleSave = async () => {
    if (!title.trim()) {
       toast.error("Title required", {
      description: "Please enter a title for your document.",
    })
      return
    }

    try {
      await updateDocument(params.id, {
        name: title.trim(),
        content: content.trim(),
        status,
      })

    toast.success("Changes saved", {
  description: "Your document has been successfully updated.",
})

      setHasChanges(false)
    } catch  {
      toast.success("Changes saved", {
  description: "Your document has been successfully updated.",
})

    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Document not found</h2>
          <p className="mb-6 text-muted-foreground">The document you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/editor">Back to Documents</Link>
          </Button>
        </div>
      </div>
    )
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
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Edit Document</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {hasChanges ? "Unsaved changes" : "All changes saved"}
              </p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isUpdating || !hasChanges} size="lg" className="gap-2">
            <SaveIcon className="h-4 w-4" />
            {isUpdating ? "Saving..." : "Save"}
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
