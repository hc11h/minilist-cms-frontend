"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftIcon, SaveIcon, LoaderIcon } from "@/components/icons"
import { toast } from "sonner"
import { useDocuments } from "@/hooks/useDocuments"
import { useAuthors } from "@/hooks/useAuthor"
import type { Blog, BlogStatus } from "@/hooks/useBlog"

interface BlogFormProps {
  mode: "create" | "edit"
  initialValues?: Partial<Blog>
  onSubmit: (data: BlogFormData) => Promise<void>
  isSubmitting: boolean
}

export interface BlogFormData {
  title: string
  slug: string
  editorId: string
  blogAuthorId: string
  status: BlogStatus
  scheduledAt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export function BlogForm({ mode, initialValues, onSubmit, isSubmitting }: BlogFormProps) {
  const router = useRouter()
  const { documents, isLoading: isLoadingEditors } = useDocuments()
  const { authors, isLoading: isLoadingAuthors } = useAuthors()

  const [formData, setFormData] = useState<BlogFormData>({
    title: initialValues?.title || "",
    slug: initialValues?.slug || "",
    editorId: initialValues?.editorId || "",
    blogAuthorId: initialValues?.blogAuthorId || "",
    status: initialValues?.status || "DRAFT",
    scheduledAt: initialValues?.scheduledAt || "",
    seoTitle: initialValues?.seoTitle || "",
    seoDescription: initialValues?.seoDescription || "",
    seoKeywords: initialValues?.seoKeywords || "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof BlogFormData, string>>>({})

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === "create" && formData.title && !initialValues?.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title, mode, initialValues?.slug])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BlogFormData, string>> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.slug.trim()) newErrors.slug = "Slug is required"
    if (!formData.editorId) newErrors.editorId = "Editor is required"
    if (!formData.blogAuthorId) newErrors.blogAuthorId = "Author is required"
    if (formData.status === "SCHEDULED" && !formData.scheduledAt) {
      newErrors.scheduledAt = "Scheduled date is required for scheduled blogs"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    try {
      await onSubmit(formData)
    } catch {  
      toast.error("Failed to save blog", {
        description: "Please try again later.",
      })
    }
  }

  const handleChange = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const isLoading = isLoadingEditors || isLoadingAuthors

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting || isLoading} className="gap-2">
          {isSubmitting ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <SaveIcon className="h-4 w-4" />
              {mode === "create" ? "Create Blog" : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Configure the core details of your blog post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter blog title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="blog-post-url"
              className={errors.slug ? "border-destructive" : ""}
            />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
            <p className="text-xs text-muted-foreground">This will be the URL path for your blog post</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="editorId">
                Editor <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.editorId} onValueChange={(value) => handleChange("editorId", value)}>
                <SelectTrigger id="editorId" className={errors.editorId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select editor" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingEditors ? (
                    <SelectItem value="loading" disabled>
                      Loading editors...
                    </SelectItem>
                  ) : documents.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No editors available
                    </SelectItem>
                  ) : (
                    documents.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.editorId && <p className="text-sm text-destructive">{errors.editorId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorId">
                Author <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.blogAuthorId} onValueChange={(value) => handleChange("blogAuthorId", value)}>
                <SelectTrigger id="authorId" className={errors.blogAuthorId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingAuthors ? (
                    <SelectItem value="loading" disabled>
                      Loading authors...
                    </SelectItem>
                  ) : authors.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No authors available
                    </SelectItem>
                  ) : (
                    authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.blogAuthorId && <p className="text-sm text-destructive">{errors.blogAuthorId}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Settings</CardTitle>
          <CardDescription>Control when and how your blog is published</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value as BlogStatus)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.status === "SCHEDULED" && (
              <div className="space-y-2">
                <Label htmlFor="scheduledAt">
                  Scheduled Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => handleChange("scheduledAt", e.target.value)}
                  className={errors.scheduledAt ? "border-destructive" : ""}
                />
                {errors.scheduledAt && <p className="text-sm text-destructive">{errors.scheduledAt}</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Optimize your blog for search engines (optional)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) => handleChange("seoTitle", e.target.value)}
              placeholder="Custom title for search engines"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) => handleChange("seoDescription", e.target.value)}
              placeholder="Brief description for search results"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <Input
              id="seoKeywords"
              value={formData.seoKeywords}
              onChange={(e) => handleChange("seoKeywords", e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
