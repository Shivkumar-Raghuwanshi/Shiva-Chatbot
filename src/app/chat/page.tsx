// src\app\chat\page.tsx

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth" 

export default async function ChatIndexPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  // Create a new chat and redirect to it
  const chat = await prisma.chat.create({
    data: {
      title: "New Chat",
      userId: session.user.id,
    },
  })

  redirect(`/chat/${chat.id}`)
}