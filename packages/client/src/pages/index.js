
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Protected from '@/components/Protected'


export default function Home() {
  return (
    <main
      className={`  bg-slate-950 text-white flex h-screen flex-col mx-auto justify-between`}
    >
      <Header />

      <Protected>
        OVERVIEW
      </Protected>

      <Footer />
    </main>
  )
}
