"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthor, useUpdateAuthor } from "@/hooks/useAuthor"
import { toast } from "sonner"

export default function EditAuthorPage() {
  const router = useRouter()
  const params = useParams()
  const authorId = params.id as string
  const { author, isLoading } = useAuthor(authorId)
  const { updateAuthor, isUpdating } = useUpdateAuthor()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Pre-fill form when author data loads
  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        email: author.email,
        profileImage: author.profileImage || "",
        description: author.description || "",
      })
    }
  }, [author])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
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
      await updateAuthor(authorId, {
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage || undefined,
        description: formData.description || undefined,
      })

      toast.success("Author updated successfully", {
        description: `${formData.name}'s profile has been updated.`,
      })

      router.push("/authors")
    } catch (error) {
      toast.error("Failed to update author", {
        description: "Please try again later.",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="mb-4 h-10 w-32 animate-pulse rounded bg-muted" />
            <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          </div>
          <Card>
            <CardHeader>
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded bg-muted" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h3 className="mb-2 text-lg font-semibold">Author not found</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                The author you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link href="/authors">Back to Authors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 gap-2">
            <Link href="/authors">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Authors
            </Link>
          </Button>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Edit Author</h1>
          <p className="mt-2 text-muted-foreground">Update the author's profile information</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Author Details</CardTitle>
            <CardDescription>Update the information below to edit the author profile</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Profile Image URL */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input
                  id="profileImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.profileImage}
                  onChange={(e) => handleChange("profileImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Optional: Enter a URL to the author's profile image</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief bio or description of the author..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">Optional: Add a short bio or description</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/authors">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
