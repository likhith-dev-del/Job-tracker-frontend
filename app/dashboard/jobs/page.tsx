'use client'

import { useState , useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Calendar,
  Building2,
  Briefcase,
  Link as LinkIcon,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/loading'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import type { Job, JobStatus } from '@/lib/services/jobService'

// Mock jobs data
// const initialJobs: Job[] = [
//   {
//     id: '1',
//     company: 'Google',
//     role: 'Software Engineer',
//     status: 'interview',
//     appliedDate: '2024-01-15',
//     notes: 'Technical interview scheduled for next week',
//     jobLink: 'https://careers.google.com/jobs/123',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-16',
//   },
//   {
//     id: '2',
//     company: 'Meta',
//     role: 'Frontend Developer',
//     status: 'applied',
//     appliedDate: '2024-01-14',
//     notes: 'Waiting for recruiter response',
//     jobLink: 'https://metacareers.com/jobs/456',
//     createdAt: '2024-01-14',
//     updatedAt: '2024-01-14',
//   },
//   {
//     id: '3',
//     company: 'Amazon',
//     role: 'Full Stack Developer',
//     status: 'offer',
//     appliedDate: '2024-01-10',
//     notes: 'Offer received! Need to respond by Jan 25',
//     jobLink: 'https://amazon.jobs/789',
//     createdAt: '2024-01-10',
//     updatedAt: '2024-01-20',
//   },
//   {
//     id: '4',
//     company: 'Netflix',
//     role: 'Senior Engineer',
//     status: 'rejected',
//     appliedDate: '2024-01-08',
//     notes: 'Position filled internally',
//     jobLink: 'https://jobs.netflix.com/101',
//     createdAt: '2024-01-08',
//     updatedAt: '2024-01-15',
//   },
//   {
//     id: '5',
//     company: 'Apple',
//     role: 'iOS Developer',
//     status: 'applied',
//     appliedDate: '2024-01-12',
//     notes: '',
//     jobLink: 'https://apple.com/careers/202',
//     createdAt: '2024-01-12',
//     updatedAt: '2024-01-12',
//   },
//   {
//     id: '6',
//     company: 'Microsoft',
//     role: 'Cloud Engineer',
//     status: 'saved',
//     appliedDate: '2024-01-18',
//     notes: 'Planning to apply next week',
//     jobLink: 'https://careers.microsoft.com/303',
//     createdAt: '2024-01-18',
//     updatedAt: '2024-01-18',
//   },
// ]



// const fetchJobs = async () => {
//   try {
//     const token = localStorage.getItem("token")

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     const data = await response.json()

//     console.log(data)

//     // setJobs(data)

//   } catch (error) {
//     console.log(error)
//   }
// }




const statusOptions: { value: JobStatus; label: string }[] = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

interface JobFormData {
  company: string
  role: string
  status: JobStatus
  appliedDate: string
  notes: string
  jobLink: string
}

const emptyFormData: JobFormData = {
  company: '',
  role: '',
  status: 'saved',
  appliedDate: new Date().toISOString().split('T')[0],
  notes: '',
  jobLink: '',
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState<JobFormData>(emptyFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  
  const { toast } = useToast()
//useeffect
  useEffect(() => {
  fetchJobs()
}, [])

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

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenModal = (job?: Job) => {
    if (job) {
      setIsEditing(true)
      setSelectedJob(job)
      setFormData({
        company: job.company,
        role: job.role,
        status: job.status,
        appliedDate : job.date,
        notes: job.notes,
        jobLink: job.jobLink,
      })
    } else {
      setIsEditing(false)
      setSelectedJob(null)
      setFormData(emptyFormData)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setSelectedJob(null)
    setFormData(emptyFormData)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // API integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 500))

      //update
    
  if (isEditing && selectedJob) {

  const token = localStorage.getItem("token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/${selectedJob._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: formData.company,
        role: formData.role,
        status: formData.status,
        date: formData.appliedDate,
        notes: formData.notes,
        jobLink: formData.jobLink,
      }),
    }
  )

  const data = await response.json()

  console.log(data)

  fetchJobs()

  toast({
    title: 'Job updated',
    description: 'Job application has been updated.'
  })


       } else {

  const token = localStorage.getItem("token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: formData.company,
        role: formData.role,
        status: formData.status,
        date: formData.appliedDate,
        notes: formData.notes,
        jobLink: formData.jobLink,
      }),
    }
  )

  const data = await response.json()

  console.log(data)

  fetchJobs()

  toast({
    title: 'Job added',
    description: 'New job application has been added.'
  })
}
      handleCloseModal()
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
  setIsLoading(true)

  try {

    const token = localStorage.getItem("token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    console.log(data)

    fetchJobs()

    toast({
      title: 'Job deleted',
      description: 'Job application has been removed.'
    })

  } catch {
    toast({
      title: 'Error',
      description: 'Failed to delete job.',
      variant: 'destructive',
    })

  } finally {
    setIsLoading(false)
    setDeleteConfirm(null)
  }
}
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Job Applications</h1>
          <p className="mt-1 text-muted-foreground">Manage and track your job applications</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gradient-primary gap-2">
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
            className="rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs Grid/Table */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-8 w-8 text-muted-foreground" />}
          title="No jobs found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first job application'
          }
          action={
            !searchQuery && statusFilter === 'all'
              ? { label: 'Add Your First Job', onClick: () => handleOpenModal() }
              : undefined
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card group relative rounded-xl border border-border p-5 transition-all duration-300 hover:border-primary/50"
            >
              {/* Delete Confirmation Overlay */}
              <AnimatePresence>
                {deleteConfirm === job._id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-background/95 backdrop-blur-sm"
                  >
                    <p className="mb-4 text-sm text-foreground">Delete this job?</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(job._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner size="sm" /> : 'Delete'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-bold text-foreground">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{job.company}</h3>
                    <p className="text-sm text-muted-foreground">{job.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenModal(job)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {job.jobLink && (
                      <DropdownMenuItem asChild>
                        <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Job
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => setDeleteConfirm(job._id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center gap-2">
            <StatusBadge status={job.status.toLowerCase() as JobStatus} />
                <span className="text-xs text-muted-foreground">
                  Applied {new Date(job.date).toLocaleDateString()}
                </span>
              </div>

              {job.notes && (
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.notes}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add/Edit Job Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card w-full max-w-lg rounded-xl border border-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {isEditing ? 'Edit Job' : 'Add New Job'}
                </h2>
                <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="company"
                        name="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="role"
                        name="role"
                        placeholder="Job title"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appliedDate">Applied Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="appliedDate"
                        name="appliedDate"
                        type="date"
                        value={formData.appliedDate}
                        onChange={handleInputChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobLink">Job Link</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="jobLink"
                      name="jobLink"
                      type="url"
                      placeholder="https://..."
                      value={formData.jobLink}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="notes"
                      name="notes"
                      placeholder="Add any notes about this application..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-lg border border-input bg-input px-3 py-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 gradient-primary" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size="sm" className="text-primary-foreground" />
                    ) : isEditing ? (
                      'Save Changes'
                    ) : (
                      'Add Job'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
