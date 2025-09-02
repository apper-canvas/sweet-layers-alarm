import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.productId, item.size)
    } else {
      updateQuantity(item.productId, item.size, newQuantity)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
      <img 
        src={item.product.images[0]} 
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-accent">{item.product.name}</h4>
        <p className="text-sm text-accent/70">{item.size}</p>
        <p className="font-bold text-primary">${item.product.price}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <ApperIcon name="Minus" size={16} />
        </Button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <ApperIcon name="Plus" size={16} />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeFromCart(item.productId, item.size)}
        className="text-red-500 hover:text-red-700"
      >
        <ApperIcon name="Trash2" size={16} />
      </Button>
    </div>
  )
}

export default CartItem