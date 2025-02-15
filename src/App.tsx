import { Header } from '@/components/header'
import { Ticketer } from '@/components/ticketer'

function App() {
  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(52.52%_32.71%_at_50%_97.66%,var(--tw-gradient-stops),hsl(var(--background)))] from-primary/20 to-primary/0">
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-1 flex-col items-center gap-5 px-5 pb-16 pt-6 md:pb-28">
        <Header />
        <main className="flex w-full max-w-[700px] flex-1 items-center">
          <Ticketer />
        </main>
      </div>
    </div>
  )
}

export default App
