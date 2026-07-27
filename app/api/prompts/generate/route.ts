import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are an elite Prompt Engineer with expertise across ChatGPT, Midjourney, DALL-E, Claude, and coding assistants.

Your task: Transform the user's simple description into a professional, highly-optimized prompt.

Guidelines:
1. Use role-prompting (e.g., "Act as an expert...")
2. Include specific constraints and requirements
3. Add formatting instructions
4. Use chain-of-thought when helpful
5. Include placeholders in [brackets] for user customization
6. Optimize for the target platform
7. Be clear, concise, and actionable

Always structure the output in the requested format.`

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userInput, platform, tone, format } = body

    if (!userInput) {
      return NextResponse.json({ error: 'User input required' }, { status: 400 })
    }

    // Create platform-specific instructions
    const platformInstructions: Record<string, string> = {
      chatgpt: 'Optimize for ChatGPT/LLM conversations. Include context, specific instructions, and expected output format.',
      midjourney: 'Create a detailed image prompt for Midjourney. Include artistic style, composition, colors, mood, and technical specifications.',
      dalle: 'Write a DALL-E 3 image prompt. Be descriptive about visual elements, style, composition, and artistic direction.',
      claude: 'Optimize for Claude. Emphasize clear reasoning, step-by-step instructions, and nuanced requirements.',
      coding: 'Create a coding prompt. Include programming language, requirements, constraints, error handling, and expected output format.',
    }

    const toneInstructions: Record<string, string> = {
      professional: 'Use formal, business-appropriate language. Be concise and direct.',
      casual: 'Use friendly, conversational tone. Keep it relatable and engaging.',
      academic: 'Use scholarly language with proper terminology. Include citations and references when relevant.',
    }

    const formatInstructions: Record<string, string> = {
      markdown: 'Format the output in Markdown with headers, bold, italics, code blocks, and lists.',
      bullet: 'Use bullet points and numbered lists for clarity.',
      json: 'Structure the output as valid JSON.',
      plain: 'Use plain text without special formatting.',
    }

    const userPrompt = `User's Goal: ${userInput}

Platform Requirements: ${platformInstructions[platform]}
Tone: ${toneInstructions[tone]}
Output Format: ${formatInstructions[format]}

Create an optimized prompt that transforms this goal into a professional, structured prompt for the target AI platform.`

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const generatedPrompt =
      message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({
      prompt: generatedPrompt,
      platform,
      tone,
      format,
    })
  } catch (error) {
    console.error('Prompt generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    )
  }
}
