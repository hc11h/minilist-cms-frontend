"use client"

import { getAuthHeaders } from "@/lib/authHeaders"
import { useState, useEffect } from "react"

export interface Document {
  id: string
  name: string
  content: string
  createdAt: string
  updatedAt: string
}

type CreateDocumentInput = Omit<Document, "id" | "createdAt" | "updatedAt">
type UpdateDocumentInput = Partial<CreateDocumentInput>



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

const api = {
  async getDocuments(): Promise<Document[]> {
    const res = await fetch(`${API_BASE}/editor`, {
       headers: getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch documents")
    return res.json()
  },

  async getDocument(id: string): Promise<Document | null> {
    const res = await fetch(`${API_BASE}/editor/${id}`, {
      headers: getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to fetch document")
    return res.json()
  },

  async createDocument(input: CreateDocumentInput): Promise<Document> {
    const res = await fetch(`${API_BASE}/editor`, {
      method: "POST",
       headers: getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to create document")
    return res.json()
  },

  async updateDocument(id: string, input: UpdateDocumentInput): Promise<Document> {
    const res = await fetch(`${API_BASE}/editor/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error("Failed to update document")
    return res.json()
  },

  async deleteDocument(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/editor/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    if (!res.ok) throw new Error("Failed to delete document")
  },
}


// Hook: Get all documents
export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true)
        const data = await api.getDocuments()
        setDocuments(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const deleteDocument = async (id: string) => {
    await api.deleteDocument(id)
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return { documents, isLoading, error, deleteDocument }
}

// Hook: Get single document
export function useDocument(id: string) {
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true)
        const data = await api.getDocument(id)
        setDocument(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  return { document, isLoading, error }
}

// Hook: Create document
export function useCreateDocument() {
  const [isCreating, setIsCreating] = useState(false)

  const createDocument = async (input: CreateDocumentInput): Promise<Document> => {
    setIsCreating(true)
    try {
      const newDoc = await api.createDocument(input)
      return newDoc
    } finally {
      setIsCreating(false)
    }
  }

  return { createDocument, isCreating }
}

// Hook: Update document
export function useUpdateDocument() {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateDocument = async (id: string, input: UpdateDocumentInput): Promise<Document> => {
    setIsUpdating(true)
    try {
      const updatedDoc = await api.updateDocument(id, input)
      return updatedDoc
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateDocument, isUpdating }
}
