import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth" 

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} />
      <div className="flex-1 flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  )
}