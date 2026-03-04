'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]       = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Load cart from localStorage on startup ──────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('manoj-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  // ── Save cart to localStorage whenever it changes ───────────────
  useEffect(() => {
    localStorage.setItem('manoj-cart', JSON.stringify(items))
  }, [items])

  // ── Add item to cart ────────────────────────────────────────────
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setSidebarOpen(true)
  }

  // ── Remove item from cart ───────────────────────────────────────
  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  // ── Update quantity ─────────────────────────────────────────────
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }

  // ── Clear entire cart ───────────────────────────────────────────
  const clearCart = () => setItems([])

  // ── Totals ──────────────────────────────────────────────────────
  const totalItems  = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice  = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, sidebarOpen, setSidebarOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
