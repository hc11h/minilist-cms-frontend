import React from "react";
import { Label } from "@/components/ui/label";
import { EditorContent, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
  ImageIcon
} from 'lucide-react'

interface RichTextEditorProps {
  editor: Editor | null; // proper typing from TipTap
}

const MenuBar = ({ editor }: { editor: import('@tiptap/react').Editor | null }) => {
  if (!editor) return null
  
  const addLink = () => {
    const url = window.prompt('Enter URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }
  
  const addImage = () => {
    const url = window.prompt('Enter image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }
  
  return (
    <div className="flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-input bg-muted/60 p-2">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        className={editor.isActive('bold') ? 'bg-accent' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        className={editor.isActive('italic') ? 'bg-accent' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleStrike().run()} 
        className={editor.isActive('strike') ? 'bg-accent' : ''}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleCode().run()} 
        className={editor.isActive('code') ? 'bg-accent' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      
      <div className="mx-1 w-px bg-border" />
      
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
        className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
        className={editor.isActive('heading', { level: 3 }) ? 'bg-accent' : ''}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      
      <div className="mx-1 w-px bg-border" />
      
      <Button
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        className={editor.isActive('orderedList') ? 'bg-accent' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().toggleBlockquote().run()} 
        className={editor.isActive('blockquote') ? 'bg-accent' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
      
      <div className="mx-1 w-px bg-border" />
      
      <Button type="button" variant="ghost" size="sm" onClick={addLink}>
        <Link2 className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      
      <div className="mx-1 w-px bg-border" />
      
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().undo().run()} 
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().redo().run()} 
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}


const RichTextEditor: React.FC<RichTextEditorProps> = ({ editor }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="content">Content</Label>
      <div className="overflow-hidden rounded-lg border border-input bg-background">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <p className="text-xs text-muted-foreground">
        Use the toolbar above to format your text with headings, lists, links, and more
      </p>
    </div>
  );
};

export default RichTextEditor;
