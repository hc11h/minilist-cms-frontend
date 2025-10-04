"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@/components/icons";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function ApiDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadCurlExample = (endpoint: string) => {
    const curlCommand = `curl -X GET "${apiBaseUrl}${endpoint}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
    const blob = new Blob([curlCommand], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api${endpoint.replace(/\//g, "-")}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded cURL example");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">API Documentation</h1>
          <p className="text-muted-foreground">
            Use the Minilist CMS Dev API to manage blog content programmatically.
          </p>
        </header>

        <div className="space-y-8">
          {/* Overview Card */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Dev API Overview</CardTitle>
              <CardDescription>
                Endpoints to retrieve your blog content. All requests require authorization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  All requests must include:
                </p>
                <div className="mt-1 bg-muted/50 p-2 rounded-md font-mono text-sm break-all">
                  Authorization: Bearer YOUR_API_KEY
                </div>
              </div>
              <div>
                <h3 className="font-medium">Base URL</h3>
                <div className="mt-1 bg-muted/50 p-2 rounded-md font-mono text-sm break-all">
                  {apiBaseUrl}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints Card */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Explore available endpoints.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List Blogs</TabsTrigger>
                  <TabsTrigger value="single">Get Blog</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-6">
                  <section>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                      <h3 className="text-lg font-semibold">GET /dev/blogs</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => downloadCurlExample("/dev/blogs")}>
                          <Download className="h-4 w-4 mr-1" />
                          Download cURL
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET "${apiBaseUrl}/dev/blogs" \\ -H "Authorization: Bearer YOUR_API_KEY" \\ -H "Content-Type: application/json"`,
                              "list"
                            )
                          }
                        >
                          <CopyIcon className="h-4 w-4 mr-1" />
                          Copy cURL
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a paginated list of blogs.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Query Parameters</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          <div className="bg-muted/50 p-2 rounded-md">
                            <div className="font-mono text-sm">page</div>
                            <div className="text-xs text-muted-foreground">
                              Page number (default: 1)
                            </div>
                          </div>
                          <div className="bg-muted/50 p-2 rounded-md">
                            <div className="font-mono text-sm">limit</div>
                            <div className="text-xs text-muted-foreground">
                              Items per page (default: 10, max 100)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Example Request</h4>
                        <div className="bg-muted/50 p-2 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`GET ${apiBaseUrl}/dev/blogs?page=1&limit=10

Headers:
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Example Response</h4>
                        <div className="bg-muted/50 p-2 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`{
  "data": [
    {
      "id": "uuid",
      "title": "Blog Title",
      "slug": "blog-title",
      "content": "...",
      "published": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="single" className="space-y-6">
                  <section>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                      <h3 className="text-lg font-semibold">GET /dev/blogs/:id</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadCurlExample("/dev/blogs/:id")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download cURL
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET "${apiBaseUrl}/dev/blogs/{id}" \\ -H "Authorization: Bearer YOUR_API_KEY" \\ -H "Content-Type: application/json"`,
                              "single"
                            )
                          }
                        >
                          <CopyIcon className="h-4 w-4 mr-1" />
                          Copy cURL
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a specific blog by ID.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Path Parameter</h4>
                        <div className="bg-muted/50 p-2 rounded-md font-mono text-sm">
                          :id = blog UUID
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Example Request</h4>
                        <div className="bg-muted/50 p-2 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`GET ${apiBaseUrl}/dev/blogs/uuid-here

Headers:
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Example Response</h4>
                        <div className="bg-muted/50 p-2 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`{
  "id": "uuid",
  "title": "Blog Title",
  "slug": "blog-title",
  "content": "...",
  "published": true,
  "createdAt": "...",
  "updatedAt": "..."
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
