'use client'

import { motion } from 'framer-motion'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = 'system-ui'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>PromptCraft AI - Expert Prompt Engineering Platform</title>
          <meta name="description" content="Transform simple ideas into expert-level AI prompts. Generate optimized prompts for ChatGPT, Midjourney, Claude, and more." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
