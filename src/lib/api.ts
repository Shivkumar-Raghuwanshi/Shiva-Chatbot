import { Message, Branch } from "@/types/chat"

export async function sendMessage(chatId: string, content: string) {
  console.log("Sending message to API:", { chatId, content });
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, message: content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    const data = await response.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}

export async function updateMessage(id: string, content: string): Promise<Message> {
  const response = await fetch(`/api/message/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
  if (!response.ok) throw new Error('Failed to update message')
  return response.json()
}

export async function createBranch(parentId: string, content: string): Promise<Branch> {
  const response = await fetch('/api/message/branch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parentId, content }),
  })
  if (!response.ok) throw new Error('Failed to create branch')
  return response.json()
}