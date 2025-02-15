import type { FormEvent } from 'react'
import { useState } from 'react'
import type { TicketType } from '@/types'
import { MailIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/image-upload'

import { cn } from '@/lib/utils'

type StepGenerateTicketProps = {
  ticket: TicketType
  updateTicket: (newData: Partial<TicketType>) => void
  onBack: () => void
  onSubmit: (imageUrl: string) => void
}

export function StepGenerateTicket({
  ticket,
  updateTicket,
  onBack,
  onSubmit,
}: StepGenerateTicketProps) {
  const [errors, setErrors] = useState<Partial<TicketType>>({})
  const [localImgUrl, setLocalImgUrl] = useState<string | null>(null)

  const handleImageError = (error: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, imgUrl: error }))
    setLocalImgUrl(null)
  }

  const handleImageChange = (imageUrl: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, imgUrl: '' }))
    setLocalImgUrl(imageUrl)
  }

  const validateForm = () => {
    const newErrors: Partial<TicketType> = {}
    if (!localImgUrl) newErrors.imgUrl = 'Profile photo is required'
    if (!ticket.name) newErrors.name = 'Name is required'
    if (!ticket.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(ticket.email)) newErrors.email = 'Email is invalid'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(localImgUrl!)
    }
  }

  return (
    <section className="rounded-[32px] md:border md:bg-[#08252B] md:p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div
          className={cn(
            'space-y-8 rounded-3xl border-input bg-[#052228] p-6 pb-12',
            !!errors.imgUrl && 'pb-6'
          )}
        >
          <Label
            htmlFor="profile-upload"
            className={cn('text-foreground-muted', !!errors.imgUrl && 'text-destructive')}
            autoFocus={!!errors.imgUrl}
          >
            Upload Profile Photo
          </Label>
          <div className="flex h-[200px] items-center justify-center sm:bg-black/20">
            <div className="size-60 rounded-[32px] sm:shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
              <ImageUpload
                id="profile-upload"
                onChange={handleImageChange}
                onError={handleImageError}
              />
            </div>
          </div>
          <div role="alert" aria-live="polite" className="!mt-0">
            {!!errors.imgUrl && <p className="mt-8 text-sm text-destructive">{errors.imgUrl}</p>}
          </div>
        </div>
        <Separator className="h-1" />
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-foreground-muted peer-aria-invalid:text-destructive"
          >
            Enter your name
          </Label>
          <Input
            id="name"
            type="text"
            value={ticket.name}
            onChange={(e) => updateTicket({ name: e.target.value })}
            aria-invalid={!!errors.name || undefined}
            autoFocus={!!errors.name}
          />
          <div role="alert" aria-live="polite" className="!mt-0">
            {!!errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-foreground-muted peer-aria-invalid:text-destructive"
          >
            Enter your email <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="hello@avioflagos.io"
              value={ticket.email}
              onChange={(e) => updateTicket({ email: e.target.value })}
              className="peer ps-11"
              aria-invalid={!!errors.email || undefined}
              autoFocus={!!errors.email}
              required
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <MailIcon size={24} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
          <div role="alert" aria-live="polite" className="!mt-0">
            {!!errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="specialRequest"
            className="text-foreground-muted peer-aria-invalid:text-destructive"
          >
            Special request?
          </Label>
          <Textarea
            id="specialRequest"
            placeholder="Textarea"
            value={ticket.specialRequest}
            onChange={(e) => updateTicket({ specialRequest: e.target.value })}
            className="min-h-32 placeholder:text-[#AAA]"
            aria-invalid={!!errors.specialRequest || undefined}
            autoFocus={!!errors.specialRequest}
          />
          <div role="alert" aria-live="polite" className="!mt-0">
            {!!errors.specialRequest && (
              <p className="mt-1 text-sm text-destructive">{errors.specialRequest}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap-reverse gap-x-6 gap-y-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 basis-64">
            Back
          </Button>
          <Button type="submit" className="flex-1 basis-64">
            Get My Free Ticket
          </Button>
        </div>
      </form>
    </section>
  )
}
