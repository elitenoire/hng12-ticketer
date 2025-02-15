'use client'

import { useState, useCallback } from 'react'
import { Progress } from '@/components/ui/progress'
import { StepSelectTicket } from '@/components/step-select-ticket'
import { StepGenerateTicket } from '@/components/step-generate-ticket'
import { StepDisplayTicket } from '@/components/step-display-ticket'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { useTicketsDB } from '@/hooks/use-tickets-db'
import { upload } from '@/lib/upload'
import type { TicketType } from '@/types'

import { cn } from '@/lib/utils'

const initialData: TicketType = {
  qty: '1',
  type: 'free',
  name: '',
  email: '',
  specialRequest: '',
  imgUrl: '',
}
const INITIAL_STEP = 1
const titles: Record<number, string> = {
  1: 'Ticket Selection',
  2: 'Attendee Details',
  3: 'Ready',
}

export function Ticketer() {
  const [step, setStep] = useLocalStorage<number>('step', INITIAL_STEP)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket', initialData)
  const { addTicket, checkExistingTicket, pending, error: dbError } = useTicketsDB()
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (image: File | null) => {
    try {
      const ticketExists = await checkExistingTicket(ticket)
      if (ticketExists) {
        setError('A ticket with this email and name already exists')
        throw new Error('A ticket with this email and name already exists')
      }
      if (!image) {
        setError('Profile photo is required')
        throw new Error('Profile photo is required')
      }
      const res = await upload(image)
      if ('error' in res) {
        setError(res.error)
        throw new Error(res.error)
      }
      const newTicket = { ...ticket, imgUrl: res.url }
      await addTicket(newTicket)
      setTicket(newTicket)
      handleNext()
      setError(null)
    } catch (error) {
      console.error('🔴[DB]:Error generating ticket:', error)
      setError((error as Error).message)
      throw error
    }
  }

  const handleReset = () => {
    setTicket(initialData)
    setStep(INITIAL_STEP)
  }

  const updateTicket = useCallback(
    (newData: Partial<TicketType>) => {
      setTicket((prevData) => ({ ...prevData, ...newData }))
      setError(null)
    },
    [setTicket]
  )

  if (pending) {
    // return <div className="container mx-auto p-4">Loading...</div>
    return null
  }

  if (dbError) {
    return <div className="container mx-auto p-4">Error: {dbError}</div>
  }

  return (
    <div
      className={cn(
        'w-full space-y-8 rounded-[32px] border bg-[#041e23] p-6 md:rounded-[40px] md:p-12',
        step === 1 && 'max-md:bg-[#08252B]'
      )}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap justify-between gap-3">
          <h1 className="basis-72 font-display text-2xl capitalize md:text-[32px]">
            {titles[step]}
          </h1>
          <p className="text-foreground-muted">Step {step}/3</p>
        </div>
        <Progress value={(step * 100) / 3} className="h-1 w-full rounded-[5px] bg-border" />
      </div>
      {step === 1 && (
        <StepSelectTicket
          ticket={ticket}
          updateTicket={updateTicket}
          onNext={handleNext}
          onReset={handleReset}
        />
      )}
      {step === 2 && (
        <StepGenerateTicket
          ticket={ticket}
          updateTicket={updateTicket}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
      {step === 3 && <StepDisplayTicket ticket={ticket} onReset={handleReset} />}
      {error && (
        <p className="!mt-6 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
