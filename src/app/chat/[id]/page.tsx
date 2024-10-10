
import { ChatContainer } from "@/components/chat/chat-container"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth" 

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!chat) {
    notFound()
  }

  return <ChatContainer chatId={chat.id} initialMessages={chat.messages} />
}

