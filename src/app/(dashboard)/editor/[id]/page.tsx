"use client"

import { use, useEffect, useState } from "react"
import { ArrowLeftIcon, SaveIcon, LoaderIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDocument, useUpdateDocument } from "@/hooks/useDocuments"
import { toast } from "sonner"
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Link from "next/link"
import './style.scss'
import RichTextEditor from "@/components/RichTextEditor"


function EditorForm({ 
  document, 
  onSave, 
  isUpdating 
}: {
  document: { name: string; content: string } | null,
  onSave: (title: string, content: string) => Promise<void>,
  isUpdating: boolean
}) {
  const [title, setTitle] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline underline-offset-4',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[500px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      if (document) {
        const changed = title !== document.name || editor.getHTML() !== document.content
        setHasChanges(changed)
      }
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (document && editor) {
      setTitle(document.name)
      editor.commands.setContent(document.content)
    }
  }, [document, editor])

  useEffect(() => {
    if (document && editor) {
      const changed = title !== document.name || editor.getHTML() !== document.content
      setHasChanges(changed)
    }
  }, [title, document, editor])

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title required", {
        description: "Please enter a title for your document.",
      })
      return
    }
    if (!editor) {
      toast.error("Editor not ready", {
        description: "Please wait for the editor to load.",
      })
      return
    }
    await onSave(title.trim(), editor.getHTML())
    setHasChanges(false)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {hasChanges ? "You have unsaved changes" : "All changes saved"}
        </p>
        <Button 
          onClick={handleSave} 
          disabled={isUpdating || !hasChanges} 
          size="lg" 
          className="gap-2"
        >
          <SaveIcon className="h-4 w-4" />
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            placeholder="Enter document title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold"
          />
        </div>

       <RichTextEditor editor={editor} />
      </div>
    </>
  )
}

export default function EditDocument({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { document, isLoading, error } = useDocument(id)
  const { updateDocument, isUpdating } = useUpdateDocument()

  const handleSave = async (title: string, content: string) => {
    try {
      await updateDocument(id, { name: title, content })
      toast.success("Changes saved", { 
        description: "Your document has been successfully updated." 
      })
    } catch {
      toast.error("Failed to save", { 
        description: "There was an error saving your document." 
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
          <p className="mb-6 text-muted-foreground">
            The document you're looking for doesn't exist or may have been deleted.
          </p>
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
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/editor">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Edit Document
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Make changes to your document below
            </p>
          </div>
        </div>
        
        <EditorForm 
          document={document} 
          onSave={handleSave} 
          isUpdating={isUpdating} 
        />
      </div>
    </div>
  )
}