import { Header } from '@/components/header'

function App() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-5 pt-6">
      <Header />
      <main className="flex w-full max-w-[700px] flex-1 items-center justify-center"></main>
    </div>
  )
}

export default App
