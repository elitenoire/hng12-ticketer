import { Button } from '@/components/ui/button'
import { NavLinks } from '@/components/navlinks'

import LogoSVG from '@/assets/logo.svg?react'
import LogonameSVG from '@/assets/ticz.svg?react'
import ArrowSVG from '@/assets/arrow.svg?react'

export function Header() {
  return (
    <header className="min-h-[76px] w-full max-w-[1200px] rounded-3xl border border-[#197686] bg-[hsl(191_80%_10%/40%)] px-4 py-3">
      <div className="flex items-center justify-between">
        <a className="flex items-center gap-3">
          <span className="rounded-xl border bg-[#052F35] px-2 py-1.5">
            <LogoSVG className="size-6" />
          </span>
          <LogonameSVG />
        </a>
        <NavLinks />
        <Button variant="secondary" size="lg" className="gap-1.5 uppercase">
          My Tickets
          <ArrowSVG />
        </Button>
      </div>
    </header>
  )
}
