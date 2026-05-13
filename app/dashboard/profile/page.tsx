'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Upload,
  FileText,
  Save,
  Plus,
  X,
  Settings,
  Bell,
  Shield,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/loading'
import { useToast } from '@/hooks/use-toast'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'HTML/CSS', 'Git'],
  resumeUrl: 'resume_johndoe.pdf',
  joinedDate: '2024-01-01',
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [newSkill, setNewSkill] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editedUser, setEditedUser] = useState(mockUser)
  
  const { toast } = useToast()

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // API integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(editedUser)
      setIsEditing(false)
      toast({ title: 'Profile updated', description: 'Your profile has been saved.' })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedUser.skills.includes(newSkill.trim())) {
      setEditedUser((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setEditedUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleCancelEdit = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl border border-border p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="gradient-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? <Spinner size="sm" className="mr-2" /> : <Save className="mr-2 h-4 w-4" />}
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-6 sm:flex-row">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  {user.name.charAt(0)}
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {new Date(user.joinedDate).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl border border-border p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedUser.skills : user.skills).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-sm text-primary"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button variant="outline" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>

          {/* Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl border border-border p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Resume</h2>
            {user.resumeUrl ? (
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.resumeUrl}</p>
                    <p className="text-sm text-muted-foreground">Uploaded resume</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Replace
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="mb-2 text-muted-foreground">No resume uploaded</p>
                <Button variant="outline">Upload Resume</Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl border border-border p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Settings</h2>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl border border-border p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Applications</span>
                <span className="font-semibold text-foreground">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Interview Rate</span>
                <span className="font-semibold text-success">16.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Offer Rate</span>
                <span className="font-semibold text-primary">6.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Since</span>
                <span className="font-semibold text-foreground">30 days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
