import CartProvider from './CartProvider'
import LoginProvider from './LoginProvider'
import Navbar from './Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dev Doodles',
  description: 'Home of software related decals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root" className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
