
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Protected from '@/components/Protected'
import AllDao from '@/components/overview/AllDao'


export default function Home() {
  return (
    <main
      className={`  bg-slate-950 text-white flex h-screen flex-col mx-auto justify-between`}
    >
      <Header />

      <Protected>
        <AllDao/>
      </Protected>

      <Footer />
    </main>
  )
}
