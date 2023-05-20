import Image from 'next/image'
import Navbar from './Navbar'
import StickerList from './StickerList'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center md:p-24 md:pt-0">
        <StickerList />
      </main>
    </div>
  )
}
