// src/hooks/useApiKey.ts
"use client"

import { useState, useEffect } from "react"
import { getAuthHeaders } from "@/lib/authHeaders"

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api-key`

export interface ApiKeyStatus {
  active: boolean
}

export interface GeneratedApiKey {
  apiKey: string
}

// Hook: Get API key status
export function useApiKeyStatus() {
  const [status, setStatus] = useState<ApiKeyStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStatus = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(API_BASE, {
        method: "GET",
        headers: getAuthHeaders(),
      })
      if (!res.ok) throw new Error("Failed to fetch API key status")
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return { status, isLoading, error, refetch: fetchStatus }
}

// Hook: Generate new API key
export function useGenerateApiKey() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const generateApiKey = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
      })
      if (!res.ok) {
        const errorBody = await res.json()
        throw new Error(errorBody.message || "Failed to generate API key")
      }
      const data: GeneratedApiKey = await res.json()
      setNewKey(data.apiKey)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateApiKey, isGenerating, newKey, error }
}

// Hook: Deactivate current API key
export function useDeactivateApiKey() {
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deactivateApiKey = async () => {
    setIsDeactivating(true)
    try {
      const res = await fetch(API_BASE, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      if (!res.ok) {
        const errorBody = await res.json()
        throw new Error(errorBody.message || "Failed to deactivate API key")
      }
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsDeactivating(false)
    }
  }

  return { deactivateApiKey, isDeactivating, error }
}
