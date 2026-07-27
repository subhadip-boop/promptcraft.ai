'use client'

import { SignIn as ClerkSignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-brand flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 text-white hover:opacity-80 transition">
          ← Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <ClerkSignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  )
}
