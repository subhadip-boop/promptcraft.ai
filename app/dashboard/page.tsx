'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Plus, Zap, Copy, Heart } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PromptCraft</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.firstName}!</span>
            <Link href="/sign-out" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar & Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 sticky top-20 h-[calc(100vh-80px)]">
          <nav className="space-y-2">
            <Link href="/dashboard" className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold">
              🏠 Dashboard
            </Link>
            <Link href="/dashboard/generator" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              ✨ Prompt Generator
            </Link>
            <Link href="/dashboard/library" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              📚 My Prompts
            </Link>
            <Link href="/dashboard/community" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              👥 Community
            </Link>
            <Link href="/pricing" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              💳 Upgrade
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome Card */}
            <div className="bg-gradient-brand rounded-2xl p-8 text-white mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome to PromptCraft! 🚀</h1>
              <p className="text-lg text-white/80">Transform your ideas into expert-level AI prompts. Start by creating your first prompt now!</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: '⚡', label: 'Prompts Created', value: '0', color: 'blue' },
                { icon: '💾', label: 'Saved Prompts', value: '0', color: 'purple' },
                { icon: '👍', label: 'Community Likes', value: '0', color: 'green' },
                { icon: '🎯', label: 'Favorite Platform', value: 'ChatGPT', color: 'orange' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Start Generator */}
              <motion.div
                className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-lg hover:shadow-xl transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">✨</div>
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your First Prompt</h3>
                <p className="text-gray-600 mb-6">Let's turn your idea into a powerful, optimized AI prompt in seconds.</p>
                <Link
                  href="/dashboard/generator"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Start Now →
                </Link>
              </motion.div>

              {/* Learn & Explore */}
              <motion.div
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">📚</div>
                  <Heart className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore Community</h3>
                <p className="text-gray-600 mb-6">Discover amazing prompts from other users and get inspired for your next creation.</p>
                <Link
                  href="/dashboard/community"
                  className="inline-block px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Explore →
                </Link>
              </motion.div>
            </div>

            {/* Features Highlight */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { num: '1', title: 'Describe Your Idea', desc: 'Tell us what you want in simple words' },
                  { num: '2', title: 'AI Optimizes', desc: 'Our AI transforms it into an expert prompt' },
                  { num: '3', title: 'Copy & Use', desc: 'Copy to clipboard and use anywhere' },
                ].map((step, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
