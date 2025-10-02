"use client"

import { getAuthHeaders } from "@/lib/authHeaders"
import { useState, useEffect } from "react"

export interface Author {
  id: string
  name: string
  email: string
  profileImage?: string
  description?: string
  createdAt: string
  updatedAt: string
}

type CreateAuthorInput = Omit<Author, "id" | "createdAt" | "updatedAt">
type UpdateAuthorInput = Partial<CreateAuthorInput>

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/authors`

const api = {
  async getAuthors(): Promise<Author[]> {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch authors")
    return res.json()
  },

  async getAuthor(id: string): Promise<Author | null> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch author")
    return res.json()
  },

  async createAuthor(input: CreateAuthorInput): Promise<Author> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to create author")
    return res.json()
  },

  async updateAuthor(id: string, input: UpdateAuthorInput): Promise<Author> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: await getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to update author")
    return res.json()
  },

  async deleteAuthor(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to delete author")
  },
}

// Hook: Get all authors
export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true)
        const data = await api.getAuthors()
        setAuthors(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  const deleteAuthor = async (id: string) => {
    await api.deleteAuthor(id)
    setAuthors((prev) => prev.filter((author) => author.id !== id))
  }

  return { authors, isLoading, error, deleteAuthor }
}

// Hook: Get single author
export function useAuthor(id: string) {
  const [author, setAuthor] = useState<Author | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setIsLoading(true)
        const data = await api.getAuthor(id)
        setAuthor(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthor()
  }, [id])

  return { author, isLoading, error }
}

// Hook: Create author
export function useCreateAuthor() {
  const [isCreating, setIsCreating] = useState(false)

  const createAuthor = async (input: CreateAuthorInput): Promise<Author> => {
    setIsCreating(true)
    try {
      const newAuthor = await api.createAuthor(input)
      return newAuthor
    } finally {
      setIsCreating(false)
    }
  }

  return { createAuthor, isCreating }
}

// Hook: Update author
export function useUpdateAuthor() {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateAuthor = async (id: string, input: UpdateAuthorInput): Promise<Author> => {
    setIsUpdating(true)
    try {
      const updatedAuthor = await api.updateAuthor(id, input)
      return updatedAuthor
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateAuthor, isUpdating }
}
