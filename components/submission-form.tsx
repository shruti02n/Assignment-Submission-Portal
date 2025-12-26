"use client"

import type React from "react"

import { useState } from "react"
import { useSubmissionStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const addSubmission = useSubmissionStore((state) => state.addSubmission)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) return

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    // Simulate a brief upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addSubmission({
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      fileName: file.name,
      fileSize: file.size,
    })

    setIsSubmitting(false)
    setFile(null)
    ;(e.target as HTMLFormElement).reset()

    toast({
      title: "Assignment Submitted",
      description: "Your file has been successfully uploaded and recorded.",
    })
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Upload Assignment</CardTitle>
        <CardDescription>Enter details and attach your assignment file below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="e.g. Advanced Mathematics" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a brief summary of your submission..."
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Assignment File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                file ? "border-primary/50 bg-primary/5" : "border-muted-foreground/20 hover:border-primary/30"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                {file ? (
                  <>
                    <FileText className="h-10 w-10 text-primary mb-2" />
                    <span className="text-sm font-medium text-foreground">{file.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium text-foreground">Click to select or drag and drop</span>
                    <span className="text-xs text-muted-foreground mt-1">PDF, DOCX, or ZIP (Max 10MB)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isSubmitting || !file}>
            {isSubmitting ? "Uploading..." : "Submit Assignment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
