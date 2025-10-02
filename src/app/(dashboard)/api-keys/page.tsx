"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  useApiKeyStatus,
  useGenerateApiKey,
  useDeactivateApiKey,
} from "@/hooks/useApiKey"
import { toast } from "sonner"
import { KeyIcon, CopyIcon } from "@/components/icons"

export default function ApiKeysPage() {
  const { status, isLoading, refetch } = useApiKeyStatus()
  const { generateApiKey, isGenerating, newKey } = useGenerateApiKey()
  const { deactivateApiKey, isDeactivating } = useDeactivateApiKey()

  const [showKey, setShowKey] = useState(false)
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)

  const handleGenerate = async () => {
    try {
      await generateApiKey()
      setShowKey(true)
      await refetch()
      toast.success("API key generated", {
        description: "Please copy and save your API key now — you won't see it again.",
      })
    } catch  {
      toast.error("API key generation failed", {
        description:  "Something went wrong.",
      })
    }
  }

  const handleDeactivate = async () => {
    try {
      await deactivateApiKey()
      await refetch()
      setShowDeactivateDialog(false)
      toast.success("API key deactivated", {
        description: "Your key is now inactive.",
      })
    } catch  {
      toast.error("Deactivation failed", {
        description: "Something went wrong.",
      })
    }
  }

  const handleCopy = () => {
    const keyToCopy = newKey
    if (keyToCopy) {
      navigator.clipboard.writeText(keyToCopy)
      toast.success("API key copied to clipboard")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">API Key Management</h1>
          <p className="mt-2 text-muted-foreground">
            Generate and manage your API key for accessing the Minilist CMS API.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <KeyIcon className="h-5 w-5" />
                  Your API Key
                </CardTitle>
                <CardDescription className="mt-1">
                  {status?.active
                    ? "Your API key is active and ready to use"
                    : "No active API key found"}
                </CardDescription>
              </div>
              {status && (
                <Badge variant={status.active ? "default" : "secondary"}>
                  {status.active ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
              </div>
            ) : status?.active ? (
              <>
                {newKey && (
                  <Alert className="border-amber-500/50 bg-amber-500/10">
                    <CopyIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertDescription className="text-amber-900 dark:text-amber-100">
                      <strong>Important:</strong> This key is shown only once. Copy and save it securely.
                    </AlertDescription>
                  </Alert>
                )}

                {newKey && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">API Key</label>
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        value={showKey ? newKey : "••••••••••••••••••••••••••••••••"}
                        className="font-mono pr-10"
                      />
                      <Button onClick={handleCopy} variant="outline" size="icon">
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeactivateDialog(true)}
                    disabled={isDeactivating}
                  >
                    {isDeactivating ? "Deactivating..." : "Deactivate Key"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <KeyIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No API key found</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Click below to generate a new API key
                </p>
                <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
                  {isGenerating ? "Generating..." : "Generate API Key"}
                </Button>
              </div>
            )}

            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 text-sm font-semibold">Usage Instructions</h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Add this key to your request headers:
              </p>
              <code className="block rounded bg-background p-3 text-xs font-mono">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deactivate your API key?</AlertDialogTitle>
              <AlertDialogDescription>
                This will revoke access for any integrations using this key. You can generate a new one later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeactivate}
                className="bg-destructive text-white-foreground hover:bg-destructive/90"
              >
                Deactivate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
