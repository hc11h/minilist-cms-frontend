"use client"

import { useRouter } from "next/navigation"
import { BlogForm, type BlogFormData } from "@/components/BlogForm"
import { useBlog, useUpdateBlog } from "@/hooks/useBlog"
import { toast } from "sonner"
import { LoaderIcon } from "@/components/icons"
import React from "react"

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const { blog, isLoading } = useBlog(unwrappedParams.id)
  const { updateBlog, isUpdating } = useUpdateBlog()

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await updateBlog(unwrappedParams.id, data)
      toast.success("Blog updated successfully", {
        description: "Your changes have been saved.",
      })
      router.push("/blogs")
    } catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Blog not found</h2>
          <p className="mt-2 text-muted-foreground">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Edit Blog</h1>
          <p className="mt-2 text-muted-foreground">Update metadata and settings for your blog post</p>
        </div>

        <BlogForm mode="edit" initialValues={blog} onSubmit={handleSubmit} isSubmitting={isUpdating} />
      </div>
    </div>
  )
}
