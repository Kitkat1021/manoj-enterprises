'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-yellow-400 font-bold text-lg">Manoj Enterprises</span>
            <span className="text-gray-400 text-xs">Road Construction Machinery</span>
          </Link>

          {/* Search — hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search machinery, spare parts, brands..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-l-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 rounded-r-lg font-bold text-sm transition-colors">
              Search
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
            <Link href="/products?category=spare-parts" className="hover:text-yellow-400 transition-colors">Spare Parts</Link>
            <Link href="/account" className="hover:text-yellow-400 transition-colors">My Orders</Link>
            <Link
              href="/contact"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>

        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <input
            type="text"
            placeholder="Search machinery or spare parts..."
            className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg text-sm outline-none"
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Products</Link>
          <Link href="/products?category=spare-parts" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Spare Parts</Link>
          <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">My Orders</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-center">Contact Us</Link>
        </div>
      )}
    </nav>
  )
}
