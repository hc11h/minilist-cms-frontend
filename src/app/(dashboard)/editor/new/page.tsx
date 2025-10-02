"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapLink from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { ArrowLeftIcon, SaveIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateDocument } from "@/hooks/useDocuments"
import RichTextEditor from "@/components/RichTextEditor"
import './style.scss'

export default function NewDocument() {
  const router = useRouter()
  const { createDocument, isCreating } = useCreateDocument()

  const [title, setTitle] = useState("")


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
  content: "",
  editorProps: {
    attributes: {
      class: "tiptap focus:outline-none min-h-[500px] p-6",
    },
  },
  autofocus: true,

  // ✅ This is the fix
  immediatelyRender: false,
})


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

    try {
      const newDoc = await createDocument({
        name: title.trim(),
        content: editor.getHTML(),
      })

      toast.success("Changes saved", {
        description: "Your document has been successfully created.",
      })

      router.push(`/editor/${newDoc.id}`)
    } catch {
      toast.error("Error", {
        description: "Failed to save changes. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/editor">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">New Document</h1>
              <p className="mt-1 text-sm text-muted-foreground">Create a new document</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isCreating} size="lg" className="gap-2">
            <SaveIcon className="h-4 w-4" />
            {isCreating ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter document title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              autoFocus
            />
          </div>

         

          <RichTextEditor editor={editor} />
        </div>
      </div>
    </div>
  )
}
