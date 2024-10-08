'use client'

import { Button } from "@/components/ui/button"
import { Chat } from "@prisma/client"
import { PlusIcon, MessageSquare, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChatListSkeleton } from "@/components/skeletons/chat-list-skeleton"

interface SidebarProps {
  chats: Chat[]
  isLoading?: boolean
}

export function Sidebar({ chats, isLoading = false }: SidebarProps) {
  const router = useRouter()
  const params = useParams()

  const createNewChat = async () => {
    try {
      const response = await fetch('/api/chat/new', {
        method: 'POST',
      })
      const chat = await response.json()
      router.push(`/chat/${chat.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button onClick={createNewChat} disabled={isLoading} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <ChatListSkeleton />
        ) : (
          chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer",
                  params?.id === chat.id && "bg-muted"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">{chat.title}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )

  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>

      <div className="hidden md:block w-64 border-r h-screen">
        {SidebarContent}
      </div>
    </>
  )
}