// Resume Service - Placeholder for API integration
import { getToken } from './authService'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface ResumeAnalysis {
  atsScore: number
  skills: {
    found: string[]
    missing: string[]
    recommended: string[]
  }
  sections: {
    name: string
    score: number
    feedback: string
  }[]
  overallFeedback: string
  keywords: {
    word: string
    count: number
    relevance: 'high' | 'medium' | 'low'
  }[]
}

export interface ResumeResponse {
  success: boolean
  message: string
  analysis?: ResumeAnalysis
  resumeUrl?: string
}

export interface RecommendedJob {
  id: string
  company: string
  role: string
  location: string
  salary?: string
  matchPercentage: number
  matchedSkills: string[]
  missingSkills: string[]
  jobUrl: string
  postedDate: string
  companyLogo?: string
}

export interface RecommendationResponse {
  success: boolean
  message: string
  recommendations?: RecommendedJob[]
}

// Upload and analyze resume
export const analyzeResume = async (file: File): Promise<ResumeResponse> => {
  const token = getToken()
  const formData = new FormData()
  formData.append('resume', file)

  const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
  return response.json()
}

// Get last analysis
export const getLastAnalysis = async (): Promise<ResumeResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/resume/analysis`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}

// Upload resume to profile
export const uploadResume = async (file: File): Promise<ResumeResponse> => {
  const token = getToken()
  const formData = new FormData()
  formData.append('resume', file)

  const response = await fetch(`${API_BASE_URL}/resume/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
  return response.json()
}

// Get job recommendations
export const getJobRecommendations = async (): Promise<RecommendationResponse> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/resume/recommendations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}

// Download resume
export const downloadResume = async (): Promise<Blob> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/resume/download`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.blob()
}
