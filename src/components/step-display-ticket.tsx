import type { TicketType } from '@/types'
import { Button } from '@/components/ui/button'
import frameImgUrl from '@/assets/frame.svg'
import BarcodeSVG from '@/assets/barcode.svg?react'

type StepDisplayTicketProps = {
  ticket: TicketType
  onReset: () => void
}

export function StepDisplayTicket({ ticket, onReset }: StepDisplayTicketProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-4 text-balance text-center">
        <h2 className="text-2xl text-[30px] font-bold">Your Ticket is Booked!</h2>
        <p className="text-foreground-muted">
          Check you email for a copy or you can <span className="font-bold">download</span>
        </p>
      </div>
      <div className="px-5 py-8">
        <article className="relative mx-auto h-[600px] max-w-[300px] p-5">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex h-[446px] flex-col justify-between gap-5 rounded-2xl border border-primary bg-[hsl(187_83%_7%/10%)] p-3.5 backdrop-blur-sm">
              <div className="text-center text-foreground">
                <h3 className="font-title text-[34px] leading-none">Techember Fest ”25</h3>
                <p className="text-[10px] leading-normal">📍 04 Rumens road, Ikoyi, Lagos</p>
                <p className="text-[10px] leading-normal">📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className="mx-auto aspect-square w-full max-w-[140px] rounded-xl border-4 border-primary/50">
                <img
                  src={ticket.imgUrl}
                  alt="Image preview"
                  className="rounded-inherit size-full object-cover object-center"
                />
              </div>
              <div className="rounded-lg border-[#133D44] bg-[#08343C] p-1 text-[10px]">
                <div className="flex border-b border-[#12464E]">
                  <div className="min-w-0 shrink-0 basis-1/2 space-y-1 border-r border-[#12464E] p-1">
                    <h4 className="font-bold text-foreground/30">Enter your name</h4>
                    <p className="break-words text-xs">{ticket.name}</p>
                  </div>
                  <div className="min-w-0 shrink-0 basis-1/2 space-y-1 p-1">
                    <h4 className="font-bold text-foreground/30">Enter your email *</h4>
                    <p className="break-words text-xs">{ticket.email}</p>
                  </div>
                </div>
                <div className="flex border-b border-[#12464E]">
                  <div className="min-w-0 basis-1/2 space-y-1 border-r border-[#12464E] p-1">
                    <h4 className="text-foreground/30">Ticket Type:</h4>
                    <p>{ticket.type}</p>
                  </div>
                  <div className="min-w-0 basis-1/2 space-y-1 p-1">
                    <h4 className="text-foreground/30">Ticket for:</h4>
                    <p>{ticket.qty}</p>
                  </div>
                </div>
                <div className="space-y-1 p-2">
                  <h4 className="text-foreground/30">Special Request?</h4>
                  <p className="line-clamp-3">{ticket.specialRequest || 'Nil'}</p>
                </div>
              </div>
            </div>
            <div className="h-[68px]">
              <BarcodeSVG className="fill-current" />
            </div>
          </div>
          <div className="absolute inset-0">
            <img src={frameImgUrl} alt="" className="size-full object-cover object-center" />
          </div>
        </article>
      </div>

      <div className="flex flex-wrap-reverse gap-x-6 gap-y-4">
        <Button type="button" variant="outline" onClick={onReset} className="flex-1 basis-64">
          Book Another Ticket
        </Button>
        <Button type="button" className="flex-1 basis-64">
          Download Ticket
        </Button>
      </div>
    </section>
  )
}
