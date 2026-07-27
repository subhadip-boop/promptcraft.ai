'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Trash2, Copy, Download } from 'lucide-react'
import Link from 'next/link'

interface SavedPrompt {
  id: string
  title: string
  prompt: string
  platform: string
  tags: string[]
  createdAt: string
}

export default function LibraryPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetchPrompts()
  }, [])

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts/save')
      if (response.ok) {
        const data = await response.json()
        setPrompts(data)
      }
    } catch (error) {
      console.error('Failed to fetch prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/save/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setPrompts(prompts.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete prompt:', error)
    }
  }

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const platformIcons: Record<string, string> = {
    chatgpt: '💬',
    midjourney: '🎨',
    dalle: '🖼️',
    claude: '🤖',
    coding: '💻',
  }

  const filteredPrompts =
    filter === 'all'
      ? prompts
      : prompts.filter((p) => p.platform === filter)

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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Prompt Library</h1>
              <p className="text-gray-600 text-lg">
                {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <Link
              href="/dashboard/generator"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              + New Prompt
            </Link>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {['chatgpt', 'midjourney', 'dalle', 'claude', 'coding'].map(
              (platform) => (
                <button
                  key={platform}
                  onClick={() => setFilter(platform)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === platform
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {platformIcons[platform]} {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Prompts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading your prompts...</p>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No prompts yet</h3>
              <p className="text-gray-600 mb-6">Create your first prompt to get started</p>
              <Link
                href="/dashboard/generator"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Create Prompt →
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {filteredPrompts.map((prompt, idx) => (
                <motion.div
                  key={prompt.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{platformIcons[prompt.platform]}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{prompt.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(prompt.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePrompt(prompt.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Prompt Preview */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 line-clamp-3">{prompt.prompt}</p>
                  </div>

                  {/* Tags */}
                  {prompt.tags && prompt.tags.length > 0 && (
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {prompt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyPrompt(prompt.prompt, prompt.id)}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copied === prompt.id ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
