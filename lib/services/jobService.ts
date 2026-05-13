// Job Service - Placeholder for API integration
import { getToken } from './authService'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export type JobStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected'

export interface Job {
  _id: string
  company: string
  role: string
  status: JobStatus
  date: string
  notes: string
  jobLink: string
  createdAt: string
  updatedAt: string
}

export interface JobResponse {
  success: boolean
  message: string
  job?: Job
  jobs?: Job[]
}

export interface JobStats {
  total: number
  applied: number
  interview: number
  offer: number
  rejected: number
  saved: number
}

// Get all jobs
export const getJobs = async (): Promise<JobResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}

// Get single job
export const getJob = async (id: string): Promise<JobResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}

// Create job
export const createJob = async (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  })
  return response.json()
}

// Update job
export const updateJob = async (id: string, job: Partial<Job>): Promise<JobResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  })
  return response.json()
}

// Delete job
export const deleteJob = async (id: string): Promise<JobResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}

// Get job statistics
export const getJobStats = async (): Promise<{ success: boolean; stats?: JobStats }> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/jobs/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}
