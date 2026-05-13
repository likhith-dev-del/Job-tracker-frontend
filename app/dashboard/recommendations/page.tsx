'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  MapPin,
  DollarSign,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Building2,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { useToast } from '@/hooks/use-toast'

interface RecommendedJob {
  id: string
  company: string
  role: string
  location: string
  salary: string
  matchPercentage: number
  matchedSkills: string[]
  missingSkills: string[]
  jobUrl: string
  postedDate: string
  description: string
}

// Mock recommendations data
const mockRecommendations: RecommendedJob[] = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    location: 'San Francisco, CA (Remote)',
    salary: '$180K - $250K',
    matchPercentage: 92,
    matchedSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Git'],
    missingSkills: ['GraphQL'],
    jobUrl: 'https://stripe.com/jobs/1',
    postedDate: '2024-01-18',
    description: 'Join our team to build the future of financial infrastructure.',
  },
  {
    id: '2',
    company: 'Vercel',
    role: 'Full Stack Developer',
    location: 'Remote',
    salary: '$150K - $200K',
    matchPercentage: 88,
    matchedSkills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    missingSkills: ['Rust', 'Go'],
    jobUrl: 'https://vercel.com/careers/2',
    postedDate: '2024-01-17',
    description: 'Help us develop the best frontend cloud platform.',
  },
  {
    id: '3',
    company: 'Shopify',
    role: 'React Developer',
    location: 'Ottawa, Canada (Hybrid)',
    salary: '$140K - $180K',
    matchPercentage: 85,
    matchedSkills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    missingSkills: ['Ruby', 'Rails'],
    jobUrl: 'https://shopify.com/careers/3',
    postedDate: '2024-01-16',
    description: 'Build commerce solutions for millions of merchants.',
  },
  {
    id: '4',
    company: 'Figma',
    role: 'Software Engineer, Frontend',
    location: 'San Francisco, CA',
    salary: '$160K - $220K',
    matchPercentage: 82,
    matchedSkills: ['TypeScript', 'React', 'CSS'],
    missingSkills: ['WebGL', 'C++'],
    jobUrl: 'https://figma.com/careers/4',
    postedDate: '2024-01-15',
    description: 'Create collaborative design tools used by millions.',
  },
  {
    id: '5',
    company: 'Linear',
    role: 'Frontend Engineer',
    location: 'Remote (US/EU)',
    salary: '$150K - $190K',
    matchPercentage: 79,
    matchedSkills: ['React', 'TypeScript', 'Node.js'],
    missingSkills: ['Electron', 'PostgreSQL'],
    jobUrl: 'https://linear.app/careers/5',
    postedDate: '2024-01-14',
    description: 'Build the best project management tool for engineers.',
  },
  {
    id: '6',
    company: 'Notion',
    role: 'Product Engineer',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$170K - $230K',
    matchPercentage: 76,
    matchedSkills: ['JavaScript', 'React', 'APIs'],
    missingSkills: ['Kotlin', 'Swift'],
    jobUrl: 'https://notion.so/careers/6',
    postedDate: '2024-01-13',
    description: 'Help build the future of productivity software.',
  },
]

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function RecommendationsPage() {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [minMatch, setMinMatch] = useState(0)
  
  const { toast } = useToast()

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
        toast({ title: 'Job removed', description: 'Job has been removed from saved.' })
      } else {
        newSet.add(jobId)
        toast({ title: 'Job saved', description: 'Job has been saved to your list.' })
      }
      return newSet
    })
  }

  const filteredRecommendations = mockRecommendations.filter(
    (job) => job.matchPercentage >= minMatch
  )

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-success'
    if (percentage >= 70) return 'text-warning'
    return 'text-muted-foreground'
  }

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-success'
    if (percentage >= 70) return 'bg-warning'
    return 'bg-muted'
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Job Recommendations</h1>
          <p className="mt-1 text-muted-foreground">
            AI-powered job matches based on your skills and experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value={0}>All Matches</option>
            <option value={70}>70%+ Match</option>
            <option value={80}>80%+ Match</option>
            <option value={90}>90%+ Match</option>
          </select>
        </div>
      </div>

      {/* Recommendations Grid */}
      {filteredRecommendations.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="h-8 w-8 text-muted-foreground" />}
          title="No matching jobs found"
          description="Try adjusting your filter to see more recommendations."
        />
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredRecommendations.map((job) => (
            <motion.div
              key={job.id}
              variants={fadeInUp}
              className="glass-card group rounded-xl border border-border p-6 transition-all duration-300 hover:border-primary/50"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-bold text-foreground">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{job.company}</h3>
                    <p className="text-sm text-muted-foreground">{job.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveJob(job.id)}
                  className={savedJobs.has(job.id) ? 'text-primary' : ''}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={savedJobs.has(job.id) ? 'currentColor' : 'none'}
                  />
                </Button>
              </div>

              {/* Match Percentage */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Skill Match</span>
                  <span className={`text-sm font-semibold ${getMatchColor(job.matchPercentage)}`}>
                    {job.matchPercentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full transition-all ${getMatchBgColor(job.matchPercentage)}`}
                    style={{ width: `${job.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4 space-y-3">
                <div>
                  <div className="mb-2 flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Matched Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.matchedSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-success/20 px-2 py-0.5 text-xs text-success"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.matchedSkills.length > 4 && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        +{job.matchedSkills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {job.missingSkills.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="h-3 w-3" />
                      <span>Skills to Learn</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-warning/20 px-2 py-0.5 text-xs text-warning"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button asChild className="flex-1 gradient-primary">
                  <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
