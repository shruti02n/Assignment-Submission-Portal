"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Submission {
  id: string
  subject: string
  description: string
  fileName: string
  fileSize: number
  submittedAt: string
  status: "submitted" | "graded" | "pending"
}

interface SubmissionStore {
  submissions: Submission[]
  addSubmission: (submission: Omit<Submission, "id" | "submittedAt" | "status">) => void
}

export const useSubmissionStore = create<SubmissionStore>()(
  persist(
    (set) => ({
      submissions: [],
      addSubmission: (data) =>
        set((state) => ({
          submissions: [
            {
              ...data,
              id: Math.random().toString(36).substring(7),
              submittedAt: new Date().toISOString(),
              status: "submitted",
            },
            ...state.submissions,
          ],
        })),
    }),
    {
      name: "assignment-storage",
    },
  ),
)
