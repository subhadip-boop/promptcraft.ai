'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Copy, Check, Loader } from 'lucide-react'
import Link from 'next/link'

type Platform = 'chatgpt' | 'midjourney' | 'dalle' | 'claude' | 'coding'
type Tone = 'professional' | 'casual' | 'academic'
type Format = 'markdown' | 'bullet' | 'json' | 'plain'

export default function PromptGeneratorPage() {
  const [userInput, setUserInput] = useState('')
  const [platform, setPlatform] = useState<Platform>('chatgpt')
  const [tone, setTone] = useState<Tone>('professional')
  const [format, setFormat] = useState<Format>('markdown')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const platformDescriptions = {
    chatgpt: 'Optimized for ChatGPT and LLMs',
    midjourney: 'Image generation with Midjourney',
    dalle: 'DALL-E 3 image prompts',
    claude: 'Anthropic Claude optimization',
    coding: 'Programming assistance prompts',
  }

  const generatePrompt = async () => {
    if (!userInput.trim()) {
      setError('Please enter your idea first')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput,
          platform,
          tone,
          format,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate prompt')
      const data = await response.json()
      setGeneratedPrompt(data.prompt)
    } catch (err) {
      setError('Failed to generate prompt. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Generator ✨</h1>
            <p className="text-gray-600 text-lg">Transform your idea into an expert-level AI prompt</p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Idea</h2>

              {/* User Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What do you want to create?
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="E.g., Write an email to my boss asking for a raise with specific achievements and metrics..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="chatgpt">ChatGPT / LLMs</option>
                  <option value="midjourney">Midjourney</option>
                  <option value="dalle">DALL-E</option>
                  <option value="claude">Claude</option>
                  <option value="coding">Coding Assistants</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">{platformDescriptions[platform]}</p>
              </div>

              {/* Tone Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tone
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['professional', 'casual', 'academic'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`p-3 rounded-lg font-medium transition ${
                        tone === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Output Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['markdown', 'bullet', 'json', 'plain'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`p-3 rounded-lg font-medium text-sm transition ${
                        format === f
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Generate Button */}
              <button
                onClick={generatePrompt}
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Prompt
                  </>
                )}
              </button>
            </motion.div>

            {/* Output Section */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Prompt</h2>

              {generatedPrompt ? (
                <>
                  {/* Prompt Output */}
                  <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words font-mono">
                      {generatedPrompt}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={copyToClipboard}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy to Clipboard
                      </>
                    )}
                  </button>

                  {/* Save Button */}
                  <button className="w-full mt-3 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                    💾 Save to Library
                  </button>

                  {/* Share Button */}
                  <button className="w-full mt-3 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
                    🌟 Share to Community
                  </button>
                </>
              ) : (
                <div className="h-96 flex items-center justify-center text-center">
                  <div>
                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Your optimized prompt will appear here
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Pro Tips</h3>
            <ul className="grid md:grid-cols-3 gap-6 text-blue-800">
              <li>✓ Be specific about your goal for better results</li>
              <li>✓ Include context and constraints when relevant</li>
              <li>✓ Mention the output format you prefer</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
