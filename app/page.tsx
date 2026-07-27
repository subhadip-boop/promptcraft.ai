'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-brand relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">PromptCraft</span>
          </div>
          <div className="flex gap-4">
            <Link href="/sign-in" className="px-6 py-2 text-white hover:bg-white/10 rounded-lg transition">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        className="relative pt-32 pb-20 px-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Transform Ideas Into<br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Expert AI Prompts</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            PromptCraft AI turns your simple descriptions into powerful, structured prompts optimized for ChatGPT, Midjourney, Claude, and more. Unlock the full potential of AI with professional-grade prompt engineering.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={fadeInUp}
          >
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition border border-white/30"
            >
              Watch Demo
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose PromptCraft?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Generation",
                description: "Advanced AI transforms your casual descriptions into expert-level prompts",
                icon: "⚡"
              },
              {
                title: "Multi-Platform Support",
                description: "Optimized for ChatGPT, Midjourney, DALL-E, Claude, and coding assistants",
                icon: "🎯"
              },
              {
                title: "Customizable Templates",
                description: "Fine-tune tone, length, and output format to match your needs exactly",
                icon: "🎨"
              },
              {
                title: "Save & Organize",
                description: "Build a personal library of prompts with tagging and search",
                icon: "📚"
              },
              {
                title: "Community Showcase",
                description: "Share successful prompts and discover what others have created",
                icon: "👥"
              },
              {
                title: "One-Click Copy",
                description: "Instantly copy optimized prompts to use anywhere",
                icon: "📋"
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Start free, upgrade when you're ready</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free Trial Card */}
            <motion.div
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Free Trial</h3>
              <p className="text-gray-600 mb-6">1 Month Full Access</p>
              <div className="text-4xl font-bold mb-2 text-gray-900">$0</div>
              <p className="text-gray-600 mb-8">No credit card required</p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-center gap-2">✓ Unlimited prompt generation</li>
                <li className="flex items-center gap-2">✓ All AI platforms supported</li>
                <li className="flex items-center gap-2">✓ Prompt library access</li>
                <li className="flex items-center gap-2">✓ Community showcase</li>
              </ul>
              <Link
                href="/sign-up"
                className="w-full block text-center py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Start Now
              </Link>
            </motion.div>

            {/* Premium Card */}
            <motion.div
              className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-xl relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Premium</h3>
              <p className="text-gray-600 mb-6">Unlimited Everything</p>
              <div className="text-4xl font-bold mb-2 text-gray-900">$30<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-8">After free trial ends</p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-center gap-2">✓ Everything in Free, plus:</li>
                <li className="flex items-center gap-2">✓ Advanced AI models (GPT-4)</li>
                <li className="flex items-center gap-2">✓ Priority support</li>
                <li className="flex items-center gap-2">✓ API access</li>
                <li className="flex items-center gap-2">✓ Team collaboration</li>
              </ul>
              <Link
                href="/sign-up"
                className="w-full block text-center py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div className="bg-gradient-brand py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Unlock AI's Full Potential?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join thousands of creators, developers, and marketers using PromptCraft to create better prompts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/sign-up"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Start Your Free Trial Today →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white">PromptCraft</span>
              </div>
              <p className="text-sm">Transforming ideas into powerful AI prompts.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
            <p className="text-sm">&copy; 2026 PromptCraft AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
