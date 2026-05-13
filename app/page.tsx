'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from "react"
import Link from 'next/link'
import {
  Briefcase,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LandingNavbar } from '@/components/layout/landing-navbar'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    icon: Briefcase,
    title: 'Job Tracking',
    description: 'Keep all your applications organized in one place with status tracking and notes.',
  },
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Get instant ATS compatibility scores and actionable improvement suggestions.',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Receive personalized job recommendations based on your skills and experience.',
  },
  {
    icon: Target,
    title: 'Skill Matching',
    description: 'Identify skill gaps and get recommendations for skills in high demand.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track your application metrics and optimize your job search strategy.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties.',
  },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Jobs Tracked' },
  { value: '85%', label: 'Interview Rate' },
  { value: '4.9/5', label: 'User Rating' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="gradient-hero absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,200,160,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Zap className="h-4 w-4" />
                AI-Powered Job Management
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Track Your Job Applications with{' '}
              <span className="text-primary">Intelligence</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              Streamline your job search with AI-powered resume analysis, ATS scoring, 
              and personalized recommendations. Land your dream job faster.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/register">
                <Button size="lg" className="gradient-primary gap-2 px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="glass-card rounded-xl border border-border/50 p-2 shadow-2xl">
              <div className="rounded-lg bg-card p-4">
                {/* Mock Dashboard Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-destructive/50" />
                    <div className="h-3 w-3 rounded-full bg-warning/50" />
                    <div className="h-3 w-3 rounded-full bg-success/50" />
                  </div>
                  <div className="h-4 w-32 rounded bg-muted" />
                </div>
                
                {/* Mock Dashboard Content */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-lg bg-muted/50 p-4">
                      <div className="h-4 w-16 rounded bg-muted mb-2" />
                      <div className="h-8 w-12 rounded bg-primary/20" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-4 h-32" />
                  <div className="rounded-lg bg-muted/50 p-4 h-32" />
                </div>
              </div>
            </div>
            <div className="absolute -inset-x-4 -bottom-4 h-24 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Powerful features designed to streamline your job search and maximize your success rate.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="glass-card group rounded-xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/50"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resume Analyzer Section */}
      <section id="resume" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                AI-Powered Resume Analysis
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get instant feedback on your resume with our advanced AI analyzer. 
                Understand your ATS compatibility score and receive actionable recommendations.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'ATS Compatibility Score',
                  'Keyword Optimization Analysis',
                  'Section-by-Section Feedback',
                  'Missing Skills Detection',
                  'Industry-Specific Recommendations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8 inline-block">
                <Button className="gradient-primary gap-2">
                  Try Resume Analyzer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card rounded-xl border border-border/50 p-6">
                {/* ATS Score Display */}
                <div className="mb-6 text-center">
                  <div className="relative mx-auto h-32 w-32">
                    <svg className="h-32 w-32 -rotate-90 transform">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${85 * 3.52} 352`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">85%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">ATS Score</p>
                </div>

                {/* Skills Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Keywords Match</span>
                    <span className="text-sm text-primary">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[92%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Format Score</span>
                    <span className="text-sm text-primary">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[88%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Experience Match</span>
                    <span className="text-sm text-primary">75%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[75%] rounded-full bg-warning" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card relative overflow-hidden rounded-2xl border border-border/50 p-8 text-center md:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-info/10" />
            <div className="relative">
              <BarChart3 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">
                Ready to Supercharge Your Job Search?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join thousands of job seekers who have already landed their dream jobs 
                using JobTrackr. Start tracking your applications today.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gradient-primary gap-2 px-8">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">JobTrackr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JobTrackr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
