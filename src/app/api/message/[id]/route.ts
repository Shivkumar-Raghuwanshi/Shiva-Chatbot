import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await req.json()
    const messageId = params.id

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: { chat: true },
    })

    if (!message || message.chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        isEdited: true,
        editHistory: {
          push: {
            content: message.content,
            editedAt: new Date(),
          },
        },
      },
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}