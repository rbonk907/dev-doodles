import Image from 'next/image'
import Navbar from './Navbar'
import StickerList from './StickerList'
import LoginProvider from './LoginProvider'

export default function Home() {
  return (
    <div>
      <LoginProvider>
            <Navbar cartPage={false} />
      </LoginProvider>
      <main className="flex min-h-screen flex-col items-center md:p-16 md:pt-0">
        <div className="md:mt-28">
          <StickerList />
        </div>
        
      </main>
    </div>
  )
}
