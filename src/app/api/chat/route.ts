import { claudeChat } from "@/lib/claude"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth" 

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, chatId } = await req.json()

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userId: session.user.id,
      },
      include: { messages: true },
    })

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // Create user message
    const userMessage = await prisma.message.create({
      data: {
        content: message,
        role: "user",
        chatId,
      },
    })

    // Get chat history and format for Claude
    const history = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Add current message to history
    history.push({
      role: "user",
      content: message,
    })

    // Get Claude's response
    const aiResponse = await claudeChat.sendMessage(history)

    // Save AI response
    const aiMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        role: "assistant",
        chatId,
      },
    })

    // Update chat title if it's the first message
    if (chat.messages.length === 0) {
      await prisma.chat.update({
        where: { id: chatId },
        data: { title: message.slice(0, 100) },
      })
    }

    return NextResponse.json({
      userMessage,
      aiMessage,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}