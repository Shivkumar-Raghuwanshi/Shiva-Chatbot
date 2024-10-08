'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LoginButton() {
  return (
    <Button
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/chat" })}
    >
      Continue with Google
    </Button>
  )
}