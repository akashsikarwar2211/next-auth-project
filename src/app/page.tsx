import { getServerSession } from "next-auth/next"
import { LoginButton, LogoutButton } from "./auth-buttons"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <h1>Welcome {session.user?.name}</h1>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h1>Please sign in to continue</h1>
            <LoginButton />
            <Link href="/signup">Create an account</Link>
          </div>
        )}
      </div>
    </main>
  )
}

