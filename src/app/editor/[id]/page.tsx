"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { use } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    FontBoldIcon,
    FontItalicIcon,
    Link1Icon,
    ListBulletIcon,
    CodeSandboxLogoIcon,
} from "@radix-ui/react-icons";
import {
    Code,
    ImageIcon,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Undo,
    Unlink,
    Trash2,
    Plus,
    Pencil,
    ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import "@/app/editor/[id]/style.scss";

interface Editor {
    id: string;
    name: string;
    content: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const addImage = useCallback(() => {
        const url = window.prompt("Image URL");
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);
        if (url === null) return;
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="flex gap-3 flex-wrap justify-center items-center border border-border rounded px-2 py-2 mb-6 w-full bg-background">
            <ToggleGroup
                type="multiple"
                className="w-full flex justify-start items-center"
            >
                <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-state={editor.isActive("bold") ? "on" : "off"}
                >
                    <FontBoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="image"
                    aria-label="Upload image"
                    onClick={addImage}
                >
                    <ImageIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="italic"
                    aria-label="Toggle italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-state={editor.isActive("italic") ? "on" : "off"}
                >
                    <FontItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="paragraph"
                    aria-label="Toggle paragraph"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    data-state={editor.isActive("paragraph") ? "on" : "off"}
                >
                    <div className="h-4 w-4 font-bold">P</div>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="strike"
                    aria-label="Toggle strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    data-state={editor.isActive("strike") ? "on" : "off"}
                >
                    <Strikethrough className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="code"
                    aria-label="Toggle code"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    data-state={editor.isActive("code") ? "on" : "off"}
                >
                    <Code className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="h1"
                    aria-label="Toggle heading level 1"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    data-state={editor.isActive("heading", { level: 1 }) ? "on" : "off"}
                >
                    <span className="h-4 w-4 font-bold">H1</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="h2"
                    aria-label="Toggle heading level 2"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    data-state={editor.isActive("heading", { level: 2 }) ? "on" : "off"}
                >
                    <span className="h-4 w-4 font-bold">H2</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="h3"
                    aria-label="Toggle heading level 3"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    data-state={editor.isActive("heading", { level: 3 }) ? "on" : "off"}
                >
                    <span className="h-4 w-4 font-bold">H3</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="bullet-list"
                    aria-label="Toggle bullet list"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    data-state={editor.isActive("bulletList") ? "on" : "off"}
                >
                    <ListBulletIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="ordered-list"
                    aria-label="Toggle ordered list"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    data-state={editor.isActive("orderedList") ? "on" : "off"}
                >
                    <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="code-block"
                    aria-label="Toggle code block"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    data-state={editor.isActive("codeBlock") ? "on" : "off"}
                >
                    <CodeSandboxLogoIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="blockquote"
                    aria-label="Toggle blockquote"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    data-state={editor.isActive("blockquote") ? "on" : "off"}
                >
                    <Quote className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="undo"
                    aria-label="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <Undo className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="redo"
                    aria-label="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <Redo className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="link"
                    aria-label="Set link"
                    onClick={setLink}
                    data-state={editor.isActive("link") ? "on" : "off"}
                >
                    <Link1Icon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="unlink"
                    aria-label="Unset link"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                >
                    <Unlink className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
};

export default function EditorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const editorParams = use(params); // Unwrap the params promise
    const [editor, setEditor] = useState<Editor | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const router = useRouter();

    // Initialize TipTap editor
    const tipTapEditor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                paragraph: {},
            }),
            Link.configure({
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                },
            }),
            Image.configure({
                inline: true,
            }),
        ],
        content: "",
        onBeforeCreate: () => {
            setIsEditorReady(false);
        },
        onCreate: () => {
            setIsEditorReady(true);
        },
        immediatelyRender: false,
    });

    // Load editor data from localStorage
    useEffect(() => {
        const editors: Editor[] = JSON.parse(localStorage.getItem("editors") || "[]");
        const foundEditor = editors.find(e => e.id === editorParams.id);

        if (foundEditor) {
            setEditor(foundEditor);
            // Set content in the editor when it's ready
            if (tipTapEditor && isEditorReady) {
                tipTapEditor.commands.setContent(foundEditor.content);
            }
        } else {
            // Editor not found, redirect to list
            router.push("/editor");
        }
    }, [editorParams.id, router, tipTapEditor, isEditorReady]);

    // Update editor content when the editor state changes
    useEffect(() => {
        if (tipTapEditor && isEditorReady && editor) {
            tipTapEditor.commands.setContent(editor.content);
        }
    }, [editor, tipTapEditor, isEditorReady]);

    const saveContent = async () => {
        if (!editor || !tipTapEditor) return;

        setIsSaving(true);

        try {
            // Get HTML content from TipTap editor
            const html = tipTapEditor.getHTML();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update in localStorage
            const editors: Editor[] = JSON.parse(localStorage.getItem("editors") || "[]");
            const updatedEditors = editors.map(e =>
                e.id === editor.id ? { ...e, content: html } : e
            );

            localStorage.setItem("editors", JSON.stringify(updatedEditors));
            setEditor({ ...editor, content: html });
            toast.success("Content saved successfully!");
        } catch (error) {
            console.error("Save failed:", error);
            toast.error("Failed to save content");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.push('/editor')}
                        className="text-blue-600 hover:text-blue-800 mb-2 inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Editors
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {editor?.name || "Editor"}
                    </h1>
                </div>
                <button
                    onClick={saveContent}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4" />
                            Save Content
                        </>
                    )}
                </button>
            </div>

            {/* Rich Text Editor */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* TipTap MenuBar */}
                {tipTapEditor && isEditorReady && <MenuBar editor={tipTapEditor} />}

                {/* Editor Content */}
                <div className="p-4">
                    <div className="min-h-[400px] border border-gray-300 rounded">
                        <EditorContent editor={tipTapEditor} />
                    </div>
                </div>

                {/* Character Count */}
                <div className="border-t border-gray-200 p-3 text-sm text-gray-500 flex justify-between items-center">
                    <span>
                        {tipTapEditor?.getText().length || 0} characters
                    </span>
                    <span>
                        Words: {tipTapEditor?.getJSON().content?.reduce((count: number, node: any) => {
                            if (node.type === 'text') {
                                return count + node.text.trim().split(/\s+/).length;
                            }
                            return count;
                        }, 0) || 0}
                    </span>
                </div>
            </div>

            {/* Bubble Menu for selected text */}
            {tipTapEditor && (
                <BubbleMenu
                    editor={tipTapEditor}
                    tippyOptions={{ duration: 100 }}
                    className="bg-background border border-border rounded-lg shadow-lg p-2 flex gap-1"
                >
                    <Button
                        size="sm"
                        variant={tipTapEditor.isActive("bold") ? "default" : "ghost"}
                        onClick={() => tipTapEditor.chain().focus().toggleBold().run()}
                    >
                        <FontBoldIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={tipTapEditor.isActive("italic") ? "default" : "ghost"}
                        onClick={() => tipTapEditor.chain().focus().toggleItalic().run()}
                    >
                        <FontItalicIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={tipTapEditor.isActive("link") ? "default" : "ghost"}
                        onClick={() => {
                            const url = window.prompt("URL");
                            if (url) {
                                tipTapEditor.chain().focus().setLink({ href: url }).run();
                            }
                        }}
                    >
                        <Link1Icon className="h-4 w-4" />
                    </Button>
                </BubbleMenu>
            )}
        </div>
    );
}