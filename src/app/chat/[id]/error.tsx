'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
      <h2 className="text-lg font-semibold">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}