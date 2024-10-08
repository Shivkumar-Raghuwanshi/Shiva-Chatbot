import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
      <h2 className="text-lg font-semibold">Chat not found</h2>
      <Button asChild>
        <Link href="/chat">Start a new chat</Link>
      </Button>
    </div>
  )
}