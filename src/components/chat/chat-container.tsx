'use client'

import { Message } from "@prisma/client"
import { useState, useRef, useEffect } from "react"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"
import { sendMessage } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatContainerProps {
  chatId: string
  initialMessages: Message[]
  isLoading?: boolean
}

export function ChatContainer({
  chatId,
  initialMessages,
  isLoading = false
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isSending, setIsSending] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleSendMessage = async (content: string) => {
    setIsSending(true)
    try {
      const { userMessage, aiMessage } = await sendMessage(chatId, content)
      setMessages((prev) => [...prev, userMessage, aiMessage])
    } catch (error) {
      console.error(error)
      // TODO: Add error handling, e.g., showing a toast notification
    } finally {
      setIsSending(false)
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    setShowScrollButton(scrollHeight - scrollTop > clientHeight + 100)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 relative"
        onScroll={handleScroll}
      >
        <ChatMessages
          messages={messages}
          isLoading={isLoading || isSending}
        />
        {showScrollButton && (
          <Button
            className="absolute bottom-4 right-4 rounded-full p-2"
            onClick={scrollToBottom}
            size="icon"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </ScrollArea>
      <ChatInput
        onSubmit={handleSendMessage}
        isLoading={isLoading || isSending}
      />
      {(isLoading || isSending) && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </div>
      )}
    </div>
  )
}