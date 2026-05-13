'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Lightbulb,
  RefreshCw,
  Download,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/loading'
import { useToast } from '@/hooks/use-toast'

interface AnalysisResult {
  atsScore: number
  sections: {
    name: string
    score: number
    feedback: string
  }[]
  skills: {
    found: string[]
    missing: string[]
    recommended: string[]
  }
  keywords: {
    word: string
    count: number
    relevance: 'high' | 'medium' | 'low'
  }[]
  overallFeedback: string
}

// Mock analysis result
const mockAnalysis: AnalysisResult = {
  atsScore: 78,
  sections: [
    { name: 'Contact Information', score: 95, feedback: 'Well formatted with all necessary details.' },
    { name: 'Professional Summary', score: 82, feedback: 'Good summary, consider adding more quantifiable achievements.' },
    { name: 'Work Experience', score: 75, feedback: 'Strong experience section. Add more metrics and specific accomplishments.' },
    { name: 'Education', score: 90, feedback: 'Education section is well structured.' },
    { name: 'Skills', score: 68, feedback: 'Consider adding more technical skills relevant to your target role.' },
  ],
  skills: {
    found: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'HTML/CSS', 'REST APIs'],
    missing: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GraphQL'],
    recommended: ['Cloud Computing', 'System Design', 'Testing Frameworks', 'Agile/Scrum'],
  },
  keywords: [
    { word: 'React', count: 5, relevance: 'high' },
    { word: 'JavaScript', count: 4, relevance: 'high' },
    { word: 'TypeScript', count: 3, relevance: 'high' },
    { word: 'API', count: 3, relevance: 'medium' },
    { word: 'Team', count: 2, relevance: 'medium' },
    { word: 'Agile', count: 1, relevance: 'low' },
  ],
  overallFeedback: 'Your resume demonstrates solid technical skills and experience. To improve your ATS score, consider adding more industry-specific keywords, quantifying your achievements with metrics, and expanding your technical skills section.',
}

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.includes('document'))) {
      setFile(droppedFile)
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or Word document.',
        variant: 'destructive',
      })
    }
  }, [toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    
    setIsAnalyzing(true)
    
    try {
      // API integration placeholder
      // const response = await analyzeResume(file)
      
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setAnalysis(mockAnalysis)
      
      toast({
        title: 'Analysis complete',
        description: 'Your resume has been analyzed successfully.',
      })
    } catch {
      toast({
        title: 'Analysis failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setAnalysis(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-success'
    if (score >= 60) return 'bg-warning'
    return 'bg-destructive'
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Resume Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Upload your resume to get ATS score and improvement suggestions
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-border p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">Upload Resume</h2>
          
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="mb-4 rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mb-2 text-center text-foreground">
                Drag and drop your resume here
              </p>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                or click to browse (PDF, DOC, DOCX)
              </p>
              <label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleReset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  className="flex-1 gradient-primary"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Spinner size="sm" className="mr-2 text-primary-foreground" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
                {analysis && (
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* ATS Score Section */}
        <AnimatePresence mode="wait">
          {analysis ? (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-xl border border-border p-6"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">ATS Score</h2>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <svg className="h-40 w-40 -rotate-90 transform">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${analysis.atsScore * 4.4} 440`}
                      strokeLinecap="round"
                      className={getScoreColor(analysis.atsScore).replace('text-', 'text-')}
                      style={{ stroke: `hsl(var(--${analysis.atsScore >= 80 ? 'success' : analysis.atsScore >= 60 ? 'warning' : 'destructive'}))` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                      {analysis.atsScore}%
                    </span>
                    <span className="text-sm text-muted-foreground">ATS Score</span>
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  {analysis.atsScore >= 80
                    ? 'Excellent! Your resume is well-optimized for ATS.'
                    : analysis.atsScore >= 60
                    ? 'Good start! Some improvements can boost your score.'
                    : 'Needs work. Follow our suggestions to improve.'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card flex flex-col items-center justify-center rounded-xl border border-border p-6 min-h-[300px]"
            >
              <Target className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Upload and analyze your resume to see your ATS score
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Section Scores */}
            <div className="glass-card rounded-xl border border-border p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Section Analysis</h2>
              <div className="space-y-4">
                {analysis.sections.map((section) => (
                  <div key={section.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{section.name}</span>
                      <span className={`text-sm font-semibold ${getScoreColor(section.score)}`}>
                        {section.score}%
                      </span>
                    </div>
                    <div className="mb-2 h-2 rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full transition-all ${getScoreBarColor(section.score)}`}
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{section.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Found Skills */}
              <div className="glass-card rounded-xl border border-border p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <h3 className="font-semibold text-foreground">Skills Found</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.found.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-success/20 px-3 py-1 text-xs text-success"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="glass-card rounded-xl border border-border p-6">
                <div className="mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <h3 className="font-semibold text-foreground">Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.missing.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-warning/20 px-3 py-1 text-xs text-warning"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Skills */}
              <div className="glass-card rounded-xl border border-border p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-info" />
                  <h3 className="font-semibold text-foreground">Recommended</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.recommended.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-info/20 px-3 py-1 text-xs text-info"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Overall Feedback */}
            <div className="glass-card rounded-xl border border-border p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Overall Feedback</h2>
              <p className="text-muted-foreground leading-relaxed">{analysis.overallFeedback}</p>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
