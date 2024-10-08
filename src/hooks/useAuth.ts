import { useSession } from "next-auth/react"
import { Session } from "next-auth"

interface ExtendedSession extends Session {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function useAuth() {
  const { data: session, status, update } = useSession() as {
    data: ExtendedSession | null
    status: "authenticated" | "loading" | "unauthenticated"
    update: (data?: any) => Promise<Session | null>
  }

  return { session, status, update }
}