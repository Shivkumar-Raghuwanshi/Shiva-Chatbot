import { Chat, Message } from "@prisma/client"

export async function createChat() {
  const response = await fetch('/api/chat/new', {
    method: 'POST',
  })
  if (!response.ok) throw new Error('Failed to create chat')
  return response.json() as Promise<Chat>
}

export async function getChat(id: string) {
  const response = await fetch(`/api/chat/${id}`)
  if (!response.ok) throw new Error('Failed to fetch chat')
  return response.json() as Promise<Chat & { messages: Message[] }>
}

export async function sendMessage(chatId: string, message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      message,
    }),
  })
  if (!response.ok) throw new Error('Failed to send message')
  return response.json() as Promise<{
    userMessage: Message
    aiMessage: Message
  }>
}

export async function deleteChat(id: string) {
  const response = await fetch(`/api/chat/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete chat')
  return response.json()
}

export async function updateChatTitle(id: string, title: string) {
  const response = await fetch(`/api/chat/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
  if (!response.ok) throw new Error('Failed to update chat title')
  return response.json() as Promise<Chat>
}