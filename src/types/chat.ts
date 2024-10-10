import { Message as PrismaMessage } from "@prisma/client"

export interface Message extends PrismaMessage {
  children?: Message[]
}

export interface Branch {
  userMessage: Message
  aiMessage: Message
}