import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SessionWrapper from "../components/SessionWrapper"
import CartSidebar from "../components/CartSidebar"
import { CartProvider } from "../lib/CartContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Manoj Enterprises — Road Construction Machinery & Spare Parts",
  description: "Suppliers of road rollers, pavers, hot mix plants and all types of road construction machinery spare parts.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <CartProvider>
            <Navbar />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
