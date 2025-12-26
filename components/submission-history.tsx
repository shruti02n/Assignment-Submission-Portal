"use client"

import { useSubmissionStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Clock, Inbox } from "lucide-react"
import { format } from "date-fns"

export function SubmissionHistory() {
  const submissions = useSubmissionStore((state) => state.submissions)

  if (submissions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
        <Inbox className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
        <p className="text-muted-foreground">No submissions found yet.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground px-1">Recent Submissions</h2>
      <div className="grid gap-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary/5 p-4 flex items-center justify-center md:w-20">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="p-5 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{sub.subject}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                        {sub.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{sub.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(sub.submittedAt), "MMM dd, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(sub.submittedAt), "hh:mm a")}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground bg-muted px-3 py-1.5 rounded-md self-start md:self-center">
                    {sub.fileName}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
