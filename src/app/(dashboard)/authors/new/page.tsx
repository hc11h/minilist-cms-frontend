"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateAuthor } from "@/hooks/useAuthor"
import { toast } from "sonner"

export default function NewAuthorPage() {
  const router = useRouter()
  const { createAuthor, isCreating } = useCreateAuthor()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      await createAuthor({
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage || undefined,
        description: formData.description || undefined,
      })

      toast.success("Author created successfully", {
        description: `${formData.name} has been added to your authors list.`,
      })

      router.push("/authors")
    } catch (error) {
      toast.error("Failed to create author", {
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
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Add New Author</h1>
          <p className="mt-2 text-muted-foreground">Create a new author profile for your blog</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Author Details</CardTitle>
            <CardDescription>Fill in the information below to create a new author</CardDescription>
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
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Author"}
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
