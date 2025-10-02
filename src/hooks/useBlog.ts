"use client"

import { getAuthHeaders } from "@/lib/authHeaders"
import { useState, useEffect } from "react"

export type BlogStatus = "DRAFT" | "PUBLIC" | "SCHEDULED"

export interface Blog {
  id: string
  title: string
  slug: string
  editorId: string
  authorId: string
  status: BlogStatus
  scheduledAt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  createdAt: string
  updatedAt: string
}

type CreateBlogInput = Omit<Blog, "id" | "createdAt" | "updatedAt">
type UpdateBlogInput = Partial<CreateBlogInput>

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`

const api = {
  async getBlogs(): Promise<Blog[]> {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch blogs")
    return res.json()
  },

  async getBlog(id: string): Promise<Blog | null> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch blog")
    return res.json()
  },

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to create blog")
    return res.json()
  },

  async updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT", // ✅ Use PUT (your backend uses @Put)
      headers: await getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to update blog")
    return res.json()
  },

  async deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to delete blog")
  },
}

// Hook: Get all blogs
export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        const data = await api.getBlogs()
        setBlogs(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const deleteBlog = async (id: string) => {
    await api.deleteBlog(id)
    setBlogs((prev) => prev.filter((blog) => blog.id !== id))
  }

  return { blogs, isLoading, error, deleteBlog }
}

// Hook: Get single blog
export function useBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const data = await api.getBlog(id)
        setBlog(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  return { blog, isLoading, error }
}

// Hook: Create blog
export function useCreateBlog() {
  const [isCreating, setIsCreating] = useState(false)

  const createBlog = async (input: CreateBlogInput): Promise<Blog> => {
  setIsCreating(true)
  try {
    const { authorId, ...rest } = input

    const payload = {
      ...rest,
      blogAuthorId: authorId, // ✅ map authorId → blogAuthorId
      scheduledAt: input.scheduledAt?.trim()
        ? new Date(input.scheduledAt).toISOString()
        : undefined, // ✅ ensure valid ISO or skip
    }

    const newBlog = await api.createBlog(payload as never)
    return newBlog
  } finally {
    setIsCreating(false)
  }
}


  return { createBlog, isCreating }
}

// Hook: Update blog
export function useUpdateBlog() {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateBlog = async (id: string, input: UpdateBlogInput): Promise<Blog> => {
    setIsUpdating(true)
    try {
      const updatedBlog = await api.updateBlog(id, input)
      return updatedBlog
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateBlog, isUpdating }
}
