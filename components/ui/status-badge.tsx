'use client'

import { cn } from '@/lib/utils'
import type { JobStatus } from '@/lib/services/jobService'

interface StatusBadgeProps {
  status: JobStatus
  className?: string
}

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  saved: {
    label: 'Saved',
    className: 'bg-muted text-muted-foreground',
  },
  applied: {
    label: 'Applied',
    className: 'bg-info/20 text-info',
  },
  interview: {
    label: 'Interview',
    className: 'bg-warning/20 text-warning',
  },
  offer: {
    label: 'Offer',
    className: 'bg-success/20 text-success',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-destructive/20 text-destructive',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
