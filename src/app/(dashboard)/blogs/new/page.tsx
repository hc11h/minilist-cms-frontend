"use client"

import { useRouter } from "next/navigation"
import { BlogForm, type BlogFormData } from "@/components/BlogForm"
import { useCreateBlog } from "@/hooks/useBlog"
import { toast } from "sonner"

export default function NewBlogPage() {
  const router = useRouter()
  const { createBlog, isCreating } = useCreateBlog()

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await createBlog(data)
      toast.success("Blog created successfully", {
        description: "Your blog post has been created.",
      })
      router.push("/blogs")
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Create Blog</h1>
          <p className="mt-2 text-muted-foreground">Configure metadata and settings for your new blog post</p>
        </div>

        <BlogForm mode="create" onSubmit={handleSubmit} isSubmitting={isCreating} />
      </div>
    </div>
  )
}
