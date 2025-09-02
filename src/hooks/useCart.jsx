import React, { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sweetlayers-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("sweetlayers-cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity, size) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.productId === product.Id && item.size === size
      )

      if (existingIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevItems]
        updatedItems[existingIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, {
          productId: product.Id,
          product,
          quantity,
          size,
          customizations: {}
        }]
      }
    })
  }

  const removeFromCart = (productId, size) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.productId === productId && item.size === size)
      )
    )
  }

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size)
      return
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getItemCount = (productId, size) => {
    const item = items.find(item => item.productId === productId && item.size === size)
    return item ? item.quantity : 0
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}