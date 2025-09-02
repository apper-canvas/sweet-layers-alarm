import React from "react"
import { Link } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import CartItem from "@/components/molecules/CartItem"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"

const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Empty
          icon="ShoppingCart"
          title="Your cart is empty"
          description="Looks like you haven't added any delicious cakes to your cart yet."
          actionLabel="Browse Cakes"
          onAction={() => window.location.href = "/catalog"}
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-accent mb-2">
          Shopping Cart
        </h1>
        <p className="text-accent/70">
          {items.length} item{items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem 
              key={`${item.productId}-${item.size}`} 
              item={item} 
            />
          ))}
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" size={16} className="mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="font-semibold text-xl text-accent mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-accent/70">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent/70">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent/70">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <hr className="border-secondary" />
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-accent">Total</span>
                <span className="font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <ApperIcon name="Truck" size={16} className="text-primary" />
                  <span className="text-accent">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </span>
                </div>
              </div>
            )}

            <Link to="/checkout">
              <Button size="lg" className="w-full mb-4">
                <ApperIcon name="CreditCard" size={20} className="mr-2" />
                Proceed to Checkout
              </Button>
            </Link>

            <Link to="/catalog">
              <Button variant="outline" size="sm" className="w-full">
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                Continue Shopping
              </Button>
            </Link>

            {/* Security Icons */}
            <div className="mt-6 pt-6 border-t border-secondary/20">
              <div className="flex items-center justify-center gap-4 text-accent/60">
                <ApperIcon name="Shield" size={16} />
                <span className="text-sm">Secure Checkout</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Cart