import { Button } from '@/components/ui/button'
import { NavLinks } from '@/components/navlinks'

import LogoSVG from '@/assets/logo.svg?react'
import LogonameSVG from '@/assets/ticz.svg?react'
import ArrowSVG from '@/assets/arrow.svg?react'

export function Header() {
  return (
    <header className="w-full px-2">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between overflow-hidden rounded-3xl border border-[#197686] bg-[hsl(191_80%_10%/40%)] px-4 py-3">
        <a className="flex items-center gap-3">
          <span className="rounded-xl border bg-[#052F35] px-2 py-1.5">
            <LogoSVG className="size-6" />
          </span>
          <LogonameSVG />
        </a>
        <NavLinks />
        <Button
          variant="secondary"
          className="group gap-1.5 uppercase md:h-[52px] md:rounded-xl md:px-6 md:py-4"
        >
          My Tickets
          <ArrowSVG className="fill-current transition-transform duration-300 [backface-visibility:hidden] group-hover:-rotate-45" />
        </Button>
      </div>
    </header>
  )
}
