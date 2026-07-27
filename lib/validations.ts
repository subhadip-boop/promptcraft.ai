import { z } from 'zod'

// Prompt generation validation
export const generatePromptSchema = z.object({
  userInput: z.string().min(10).max(2000),
  platform: z.enum(['chatgpt', 'midjourney', 'dalle', 'claude', 'coding']),
  tone: z.enum(['professional', 'casual', 'academic']),
  format: z.enum(['markdown', 'bullet', 'json', 'plain']),
})

// Save prompt validation
export const savePromptSchema = z.object({
  title: z.string().min(3).max(100),
  prompt: z.string().min(10).max(5000),
  platform: z.enum(['chatgpt', 'midjourney', 'dalle', 'claude', 'coding']),
  tags: z.array(z.string()).max(10),
})

// Community post validation
export const communityPostSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(500),
  prompt: z.string().min(10).max(5000),
  platform: z.enum(['chatgpt', 'midjourney', 'dalle', 'claude', 'coding']),
})

// Export types
export type GeneratePromptInput = z.infer<typeof generatePromptSchema>
export type SavePromptInput = z.infer<typeof savePromptSchema>
export type CommunityPostInput = z.infer<typeof communityPostSchema>
