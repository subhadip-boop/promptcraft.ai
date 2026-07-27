'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Eye, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface CommunityPrompt {
  id: string
  title: string
  description: string
  prompt: string
  platform: string
  upvotes: number
  views: number
  user: {
    name: string
    avatar?: string
  }
  createdAt: string
}

export default function CommunityPage() {
  const [prompts, setPrompts] = useState<CommunityPrompt[]>([
    {
      id: '1',
      title: 'Professional Email Writer',
      description: 'Generate professional emails for various business scenarios',
      prompt: 'Act as a professional business email writer. Create concise, formal emails...',
      platform: 'chatgpt',
      upvotes: 324,
      views: 1205,
      user: { name: 'Sarah Johnson' },
      createdAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Cyberpunk City Generator',
      description: 'Generate stunning cyberpunk city images with Midjourney',
      prompt: 'Create a futuristic cyberpunk city scene with neon lights...',
      platform: 'midjourney',
      upvotes: 512,
      views: 2134,
      user: { name: 'Alex Chen' },
      createdAt: '1 week ago',
    },
    {
      id: '3',
      title: 'React Component Assistant',
      description: 'Help generate modern React components with hooks',
      prompt: 'You are an expert React developer. Generate a functional component...',
      platform: 'coding',
      upvotes: 287,
      views: 945,
      user: { name: 'Mike Rodriguez' },
      createdAt: '3 days ago',
    },
  ])
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({})

  const platformIcons: Record<string, string> = {
    chatgpt: '💬',
    midjourney: '🎨',
    dalle: '🖼️',
    claude: '🤖',
    coding: '💻',
  }

  const filteredPrompts =
    selectedPlatform === 'all'
      ? prompts
      : prompts.filter((p) => p.platform === selectedPlatform)

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === 'trending') return b.upvotes - a.upvotes
    if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return b.views - a.views
  })

  const toggleVote = (id: string) => {
    setUserVotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, upvotes: userVotes[id] ? p.upvotes - 1 : p.upvotes + 1 }
          : p
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PromptCraft</span>
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🌟 Community Showcase</h1>
            <p className="text-gray-600 text-lg">Discover and share amazing prompts created by our community</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Platform
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedPlatform('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedPlatform === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {['chatgpt', 'midjourney', 'dalle', 'claude', 'coding'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedPlatform === platform
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {platformIcons[platform]} {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="recent">🕐 Recent</option>
                  <option value="popular">👁️ Most Viewed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="grid gap-6">
            {sortedPrompts.map((prompt, idx) => (
              <motion.div
                key={prompt.id}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{platformIcons[prompt.platform]}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{prompt.title}</h3>
                        <p className="text-gray-500 text-sm">
                          by <span className="font-semibold text-gray-700">{prompt.user.name}</span> • {prompt.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{prompt.description}</p>

                {/* Prompt Preview */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 line-clamp-2">{prompt.prompt}</p>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-gray-600">
                    <button
                      onClick={() => toggleVote(prompt.id)}
                      className={`flex items-center gap-2 font-semibold transition ${
                        userVotes[prompt.id]
                          ? 'text-red-600'
                          : 'hover:text-red-600'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          userVotes[prompt.id] ? 'fill-red-600' : ''
                        }`}
                      />
                      {prompt.upvotes}
                    </button>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      {prompt.views}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
                      💬 Comment
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                      ⬇️ Use
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
