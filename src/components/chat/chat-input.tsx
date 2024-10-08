'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon, Mic, Paperclip } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ChatInputProps {
  onSubmit: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSubmit(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  if (isLoading) {
    return (
      <div className="p-4 bg-background border-t space-y-2">
        <Skeleton className="h-[60px] w-full rounded-md" />
        <div className="flex justify-end space-x-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-background border-t">
      <div className="flex items-end gap-2 bg-muted p-2 rounded-lg">
        <Button type="button" variant="ghost" size="icon" className="rounded-full">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px] max-h-[200px] resize-none bg-transparent border-none focus-visible:ring-0"
          disabled={isLoading}
        />
        <Button type="button" variant="ghost" size="icon" className="rounded-full">
          <Mic className="h-5 w-5" />
        </Button>
        <Button type="submit" disabled={isLoading} size="icon" className="rounded-full">
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}