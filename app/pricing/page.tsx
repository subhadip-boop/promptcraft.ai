'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function PricingPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PromptCraft</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">
              Dashboard
            </Link>
            {!user && (
              <Link href="/sign-in" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                Sign In
              </Link>
            )}
          </div>
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
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Start free, upgrade when you're ready. No hidden fees, cancel anytime.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Free Trial */}
            <motion.div
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 transition"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
              <p className="text-gray-600 mb-6">1 Month Full Access</p>
              <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600 mb-8">No credit card required</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  Unlimited prompt generation
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  All AI platforms supported
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  Prompt library & organization
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  Community showcase access
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  Basic analytics
                </li>
              </ul>

              <Link
                href={user ? '/dashboard' : '/sign-up'}
                className="w-full block text-center py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition"
              >
                {user ? 'View Dashboard' : 'Start Free Trial'}
              </Link>
            </motion.div>

            {/* Premium */}
            <motion.div
              className="bg-gradient-brand rounded-2xl p-8 shadow-2xl relative"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -top-4 left-8 bg-gradient-brand text-white px-6 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-blue-100 mb-6">Unlimited Everything</p>
              <div className="text-5xl font-bold text-white mb-2">
                $30<span className="text-lg text-blue-100">/month</span>
              </div>
              <p className="text-blue-100 mb-8">After free trial ends</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Everything in Free, plus:
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Advanced AI models (GPT-4, Claude 3)
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Priority email support
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  API access (coming soon)
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Team collaboration features
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Custom prompt templates
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Advanced analytics & insights
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="font-bold">✓</span>
                  Export & batch operations
                </li>
              </ul>

              <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
                Upgrade to Premium →
              </button>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            className="max-w-2xl mx-auto mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! Cancel anytime with one click. No questions asked, no penalties.',
                },
                {
                  q: 'What happens after my free trial ends?',
                  a: 'We\'ll send you a reminder before it expires. You can choose to upgrade to Premium or continue with the Free plan.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 7-day money-back guarantee on Premium subscriptions. No questions asked.',
                },
                {
                  q: 'Can I switch plans anytime?',
                  a: 'Absolutely! Upgrade or downgrade your plan anytime. Changes take effect immediately.',
                },
                {
                  q: 'Is there a student discount?',
                  a: 'Yes! Students get 50% off Premium. Verify your .edu email and claim your discount.',
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-lg p-6 border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        className="bg-gradient-brand py-16 px-6 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users using PromptCraft to create better AI prompts.
          </p>
          <Link
            href={user ? '/dashboard' : '/sign-up'}
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Start Your Free Trial →
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
