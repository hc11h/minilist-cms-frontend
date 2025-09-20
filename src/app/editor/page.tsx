"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Editor {
  id: string;
  name: string;
}

export default function EditorPage() {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [newEditorName, setNewEditorName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const router = useRouter();

  // Load editors from localStorage on mount
  useEffect(() => {
    const savedEditors = localStorage.getItem("editors");
    if (savedEditors) {
      setEditors(JSON.parse(savedEditors));
    }
  }, []);

  // Save editors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("editors", JSON.stringify(editors));
  }, [editors]);

  const createEditor = () => {
    if (!newEditorName.trim()) return;
    
    const newEditor: Editor = {
      id: `editor-${Date.now()}`,
      name: newEditorName.trim(),
    };
    
    setEditors([...editors, newEditor]);
    setNewEditorName("");
    router.push(`/editor/${newEditor.id}`);
  };

  const deleteEditor = (id: string) => {
    if (confirm("Are you sure you want to delete this editor?")) {
      setEditors(editors.filter(editor => editor.id !== id));
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = () => {
    if (!editingId || !editingName.trim()) return;
    
    setEditors(editors.map(editor => 
      editor.id === editingId 
        ? { ...editor, name: editingName.trim() } 
        : editor
    ));
    
    setEditingId(null);
    setEditingName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Editor Management</h1>
        <p className="text-gray-600">Manage your text editors</p>
      </div>

      {/* Create New Editor */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Editor</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newEditorName}
            onChange={(e) => setNewEditorName(e.target.value)}
            placeholder="Enter editor name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createEditor}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Editor
          </button>
        </div>
      </div>

      {/* Editors List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Editors</h2>
        </div>
        
        {editors.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No editors yet. Create your first one above.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {editors.map((editor) => (
              <li key={editor.id} className="px-6 py-4 flex items-center justify-between">
                {editingId === editor.id ? (
                  <div className="flex-1 flex gap-3">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <Link 
                        href={`/editor/${editor.id}`}
                        className="text-lg font-medium text-blue-600 hover:text-blue-800"
                      >
                        {editor.name}
                      </Link>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(editor.id, editor.name)}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEditor(editor.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}