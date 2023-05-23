import Image from 'next/image'
import Navbar from './Navbar'
import StickerList from './StickerList'
import LoginProvider from './LoginProvider'

export default function Home() {
  return (
    <div>
      <LoginProvider>
        <Navbar />
      </LoginProvider>
      <main className="flex min-h-screen flex-col items-center md:p-24 md:pt-0">
        <StickerList />
      </main>
    </div>
  )
}
