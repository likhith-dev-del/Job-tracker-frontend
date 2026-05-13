'use client'

import { motion } from 'framer-motion'
import {useEffect, useState} from "react"
import {
  Briefcase,
  Send,
  MessageSquare,
  Award,
  XCircle,
  TrendingUp,
  Clock,
  Target,
} from 'lucide-react'
import { StatsCard } from '@/components/ui/stats-card'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Mock data for dashboard


const applicationTrend = [
  { month: 'Jan', applications: 4 },
  { month: 'Feb', applications: 8 },
  { month: 'Mar', applications: 12 },
  { month: 'Apr', applications: 6 },
  { month: 'May', applications: 10 },
  { month: 'Jun', applications: 8 },
]

const statusDistribution = [
  { name: 'Applied', value: 32, color: 'hsl(var(--info))' },
  { name: 'Interview', value: 8, color: 'hsl(var(--warning))' },
  { name: 'Offer', value: 3, color: 'hsl(var(--success))' },
  { name: 'Rejected', value: 5, color: 'hsl(var(--destructive))' },
]

// const recentApplications = [
//   { id: 1, company: 'Google', role: 'Software Engineer', status: 'interview' as const, date: '2024-01-15' },
//   { id: 2, company: 'Meta', role: 'Frontend Developer', status: 'applied' as const, date: '2024-01-14' },
//   { id: 3, company: 'Amazon', role: 'Full Stack Developer', status: 'offer' as const, date: '2024-01-12' },
//   { id: 4, company: 'Netflix', role: 'Senior Engineer', status: 'rejected' as const, date: '2024-01-10' },
//   { id: 5, company: 'Apple', role: 'iOS Developer', status: 'applied' as const, date: '2024-01-08' },
// ]

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {

  const [stats, setStats] = useState({
  totalJobs: 0,
  applied: 0,
  interview: 0,
  offers: 0,
  rejected: 0,
})
// useeffect

const [jobs, setJobs] = useState([])

useEffect(() => {
  fetchStats()
  fetchJobs()
}, [])

const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    console.log(data)

    setStats(data)

  } catch (error) {
    console.log(error)
  }
}

const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    console.log(data)

    setJobs(data)

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Track your job application progress and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <StatsCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<Briefcase className="h-5 w-5" />}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Applied"
          value={stats.applied}
          icon={<Send className="h-5 w-5" />}
          color="info"
        />
        <StatsCard
          title="Interviews"
          value={stats.interview}
          icon={<MessageSquare className="h-5 w-5" />}
          color="warning"
        />
        <StatsCard
          title="Offers"
          value={stats.offers}
          icon={<Award className="h-5 w-5" />}
          color="success"
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={<XCircle className="h-5 w-5" />}
          color="destructive"
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl border border-border p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Application Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly applications over time</p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrend}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl border border-border p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
              <p className="text-sm text-muted-foreground">Breakdown by application status</p>
            </div>
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl border border-border p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Applications</h3>
            <p className="text-sm text-muted-foreground">Your latest job applications</p>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job : any) => (
                <tr key={job._id} className="border-b border-border/50 last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground">
                        {job.company.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{job.company}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{job.role}</td>
                  <td className="py-4">
                    <StatusBadge status={job.status.toLowerCase()} />
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {new Date(job.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
