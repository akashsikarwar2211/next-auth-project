'use client'
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>
        <button
          onClick={() => signIn('google')}
          className="group relative flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Continue with Google
        </button>
        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}