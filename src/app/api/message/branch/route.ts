import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { claudeChat } from "@/lib/claude"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { parentId, content } = await req.json()

    const parentMessage = await prisma.message.findUnique({
      where: { id: parentId },
      include: { chat: true },
    })

    if (!parentMessage || parentMessage.chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Parent message not found" }, { status: 404 })
    }

    const userMessage = await prisma.message.create({
      data: {
        content,
        role: "user",
        chatId: parentMessage.chatId,
        parentId,
      },
    })

    const aiResponse = await claudeChat.sendMessage([
      { role: "user", content },
    ])

    const aiMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        role: "assistant",
        chatId: parentMessage.chatId,
        parentId: userMessage.id,
      },
    })

    return NextResponse.json({ userMessage, aiMessage })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}