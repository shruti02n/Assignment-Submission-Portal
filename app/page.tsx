import { SubmissionForm } from "@/components/submission-form"
import { SubmissionHistory } from "@/components/submission-history"
import { GraduationCap } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">EduPortal</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-primary border-b-2 border-primary py-5">
              Submissions
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Grades
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Assignment Portal</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Submit your coursework securely and track your submission history in one place.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SubmissionForm />
          </div>
          <div className="lg:col-span-7">
            <SubmissionHistory />
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t py-10 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 EduPortal Student Submission Management System.
        </div>
      </footer>
    </main>
  )
}
