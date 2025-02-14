import { cn } from '@/lib/utils'

const links = [
  {
    name: 'Events',
    href: '/',
  },
  {
    name: 'My Tickets',
    href: '#',
  },
  {
    name: 'About Project',
    href: '/about',
  },
]

export function NavLinks() {
  return (
    <nav className="flex items-center justify-between gap-4 max-md:hidden">
      {links.map(({ name, href }) => {
        return (
          <a
            key={name}
            className={cn(
              'p-2.5 font-display text-lg text-[#B3B3B3]',
              name === 'Events' && 'text-white'
            )}
            href={href}
          >
            {name}
          </a>
        )
      })}
    </nav>
  )
}
