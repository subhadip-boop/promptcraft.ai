import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, prompt, platform, tags } = body

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const savedPrompt = await prisma.savedPrompt.create({
      data: {
        userId: user.id,
        promptId: Date.now().toString(),
        title,
        prompt,
        platform,
        tags: tags || [],
      },
    })

    return NextResponse.json(savedPrompt)
  } catch (error) {
    console.error('Save prompt error:', error)
    return NextResponse.json(
      { error: 'Failed to save prompt' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const prompts = await prisma.savedPrompt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(prompts)
  } catch (error) {
    console.error('Get prompts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}
