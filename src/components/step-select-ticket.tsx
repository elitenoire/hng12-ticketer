import type { FormEvent } from 'react'
import type { TicketType } from '@/types'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { SelectNative } from '@/components/ui/select-native'
import { Button } from '@/components/ui/button'

const ticketOptions = [
  { value: 'Free', price: 'Free', description: 'Regular Access' },
  { value: 'VIP', price: '$100', description: 'VIP Access' },
  { value: 'VVIP', price: '$150', description: 'VVIP Access' },
]

type StepSelectTicketProps = {
  ticket: TicketType
  updateTicket: (newData: Partial<TicketType>) => void
  onNext: () => void
  onReset: () => void
}

export function StepSelectTicket({ ticket, updateTicket, onNext, onReset }: StepSelectTicketProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <section className="space-y-8 rounded-[32px] md:border md:bg-[#08252B] md:p-6">
      <article className="space-y-2 rounded-3xl border-x-2 border-b-2 border-input bg-[radial-gradient(103.64%_57.39%_at_14.02%_32.06%,var(--tw-gradient-stops),rgba(10,_12,_17,_0.1))] from-primary/20 to-primary/0 px-6 py-4 text-center backdrop-blur-[7px] sm:py-6">
        <h2 className="text-balance font-title text-5xl sm:text-[62px]">Techember Fest ”25</h2>
        <p className="text-foreground-muted mx-auto max-w-[21.25em] text-balance max-sm:text-sm">
          Join us for an unforgettable experience at [Event Name]! Secure your spot now.
        </p>
        <p className="text-foreground-muted flex items-center justify-center gap-1 max-sm:flex-col sm:gap-4">
          <span>📍 [Event Location]</span>
          <span className="max-sm:hidden"> | | </span>
          <span>March 15, 2025 | 7:00 PM</span>
        </p>
      </article>
      <Separator className="h-1" />
      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="space-y-2">
          <legend className="text-foreground-muted">Select Ticket Type:</legend>
          <RadioGroup
            className="grid gap-4 gap-y-6 rounded-3xl border-input bg-[#052228] p-4 md:grid-cols-3"
            value={ticket.type}
            onValueChange={(value) => updateTicket({ type: value })}
          >
            {ticketOptions.map(({ value, price, description }) => (
              <label
                key={`ticketQty-${value}`}
                className="relative flex cursor-pointer flex-col rounded-lg border-2 border-[#197686] p-3 outline-offset-2 transition hover:border hover:bg-[#2C545B] has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border has-[[data-state=checked]]:bg-[#12464E] has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <RadioGroupItem
                  id={`ticketQty-${value}`}
                  value={value}
                  className="sr-only after:absolute after:inset-0"
                />
                <span className="mb-3 text-2xl font-semibold">{price}</span>
                <span className="text-foreground-muted uppercase">{description}</span>
                <span className="text-foreground-light text-sm">20/25</span>
              </label>
            ))}
          </RadioGroup>
        </fieldset>
        <div className="space-y-2">
          <Label htmlFor="ticketQty" className="text-foreground-muted">
            Number of Tickets:
          </Label>
          <SelectNative
            id="ticketQty"
            value={ticket.qty}
            onChange={(e) => updateTicket({ qty: e.target.value })}
            className="h-12 rounded-xl bg-transparent p-3 text-base shadow-none"
          >
            <option value="1" className="bg-[#052228]">
              1
            </option>
            <option value="2" className="bg-[#052228]">
              2
            </option>
            <option value="3" className="bg-[#052228]">
              3
            </option>
          </SelectNative>
        </div>
        <div className="flex flex-wrap-reverse gap-x-6 gap-y-4">
          <Button type="button" variant="outline" onClick={onReset} className="flex-1 basis-64">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 basis-64">
            Next
          </Button>
        </div>
      </form>
    </section>
  )
}
