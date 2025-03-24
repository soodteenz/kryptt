"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Image from "next/image"

// Types
type Profile = {
  displayName: string
  email: string
  avatarUrl: string | null
  accountType: 'Paper Trading' | 'Live Trading'
}

// Components
const ProfileHeader = () => (
  <div>
    <h1 className="text-h1 font-bold text-white">Profile Settings</h1>
    <p className="text-muted-foreground">
      Manage your account settings and preferences
    </p>
  </div>
)

const ProfilePicture = ({ 
  avatarUrl, 
  onUpload 
}: { 
  avatarUrl: string | null
  onUpload: (url: string) => void 
}) => {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Create preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      setUploading(true)
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}` // Include user ID in path

      console.log('Uploading file:', {
        bucket: 'profile_images',
        filePath,
        fileSize: file.size,
        fileType: file.type
      })

      // Delete old profile image if it exists
      if (avatarUrl) {
        const oldPath = avatarUrl.split('/').slice(-2).join('/') // Get "userId/filename.ext"
        try {
          await supabase.storage
            .from('profile_images')
            .remove([oldPath])
        } catch (error) {
          console.warn('Failed to delete old profile image:', error)
        }
      }

      const { data, error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Supabase upload error:', uploadError)
        throw uploadError
      }

      console.log('Upload successful:', data)

      const { data: { publicUrl } } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath)

      console.log('Public URL:', publicUrl)
      onUpload(publicUrl)
      
      // Cleanup preview URL
      URL.revokeObjectURL(objectUrl)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message :
        typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Error uploading avatar! Please try again.';

      console.error('Detailed upload error:', {
        error,
        message: errorMessage,
        details: typeof error === 'object' && error !== null && 'details' in error
          ? String(error.details)
          : undefined,
        statusCode: typeof error === 'object' && error !== null && 'statusCode' in error
          ? Number(error.statusCode)
          : undefined
      });

      alert(errorMessage);
      // Reset preview on error
      setPreviewUrl(avatarUrl)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onUpload('')
  }

  // Update preview when avatarUrl changes
  useEffect(() => {
    setPreviewUrl(avatarUrl)
  }, [avatarUrl])

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Profile Picture</label>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-black/20">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized // Since we're using dynamic URLs from Supabase
            />
          ) : (
            <div className="text-white/50 text-xs text-center">No image</div>
          )}
        </div>
        <div className="flex-1">
          <Button 
            type="button"
            variant="outline" 
            className="mr-2 bg-white text-black border-white hover:bg-white/90"
            onClick={handleFileSelect}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              'Change Avatar'
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            onChange={handleFileChange}
            disabled={uploading}
            aria-label="Upload profile picture"
            title="Upload profile picture"
          />
          {previewUrl && (
            <Button 
              type="button"
              variant="ghost" 
              className="text-destructive hover:text-destructive/90"
              onClick={handleRemove}
              disabled={uploading}
            >
              Remove
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: SVG, PNG, JPG (10mb max)
          </p>
        </div>
      </div>
    </div>
  )
}

const ProfileForm = () => {
  const [profile, setProfile] = useState<Profile>({
    displayName: '',
    email: '',
    avatarUrl: null,
    accountType: 'Paper Trading'
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        setProfile(prev => ({
          ...prev,
          email: user.email || '',
          displayName: user.user_metadata.display_name || '',
          avatarUrl: user.user_metadata.avatar_url || null
        }))
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: profile.displayName,
          avatar_url: profile.avatarUrl
        }
      })

      if (error) throw error
      
      // Update local state without refresh
      setProfile(prev => ({
        ...prev,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl
      }))
    } catch (error) {
      alert('Error updating profile!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-h3 font-semibold mb-4 text-white">Personal Info</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Update your personal information and how others see you on the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Display Name</label>
            <Input 
              value={profile.displayName}
              onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
              placeholder="Enter your display name" 
              className="bg-black border-white/20 text-white" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email Address</label>
            <Input 
              value={profile.email}
              disabled
              type="email" 
              className="bg-black border-white/20 text-white opacity-50" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Account Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-white text-black border-white hover:bg-white/90">
                  {profile.accountType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-white/20">
                <DropdownMenuItem 
                  className="text-white hover:bg-white/10"
                  onClick={() => setProfile(prev => ({ ...prev, accountType: 'Paper Trading' }))}
                >
                  Paper Trading
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white hover:bg-white/10"
                  onClick={() => setProfile(prev => ({ ...prev, accountType: 'Live Trading' }))}
                >
                  Live Trading
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ProfilePicture 
          avatarUrl={profile.avatarUrl} 
          onUpload={(url) => setProfile(prev => ({ ...prev, avatarUrl: url }))}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button"
          variant="outline" 
          className="bg-white text-black border-white hover:bg-white/90"
          onClick={() => router.push('/dashboard')}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-yellow-500 text-black hover:bg-yellow-400"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  )
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col gap-8 max-w-3xl">
          <ProfileHeader />
          <Card className="p-6 bg-black border-white/20">
            <ProfileForm />
          </Card>
        </div>
      </div>
    </div>
  )
} 