import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { orderService } from "@/services/api/orderService"

const OrderConfirmation = () => {
  const location = useLocation()
  const orderId = location.state?.orderId
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadOrder = async () => {
    if (!orderId) {
      setError("Order ID not found")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError("")
      const orderData = await orderService.getById(orderId)
      setOrder(orderData)
    } catch (err) {
      setError("Failed to load order details")
      console.error("Error loading order:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Loading />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Error 
          message={error || "Order not found"} 
          onRetry={loadOrder}
          title="Order Error"
        />
      </div>
    )
  }

  const estimatedDelivery = new Date(order.deliveryInfo.deliveryDate)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckCircle" size={48} className="text-green-500" />
        </div>
        
        <h1 className="font-display text-4xl text-accent mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-xl text-accent/70 mb-2">
          Thank you for your order, {order.deliveryInfo.firstName}!
        </p>
        
        <p className="text-accent/60">
          Order #{order.Id} • Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <Card className="p-6">
          <h2 className="font-semibold text-xl text-accent mb-6 flex items-center gap-2">
            <ApperIcon name="Package" size={20} />
            Order Details
          </h2>
          
          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-accent">{item.productName}</div>
                  <div className="text-sm text-accent/70">
                    {item.size} × {item.quantity}
                  </div>
                </div>
                <div className="font-semibold text-accent">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-secondary pt-4">
            <div className="flex justify-between text-lg font-semibold text-accent">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6">
          <h2 className="font-semibold text-xl text-accent mb-6 flex items-center gap-2">
            <ApperIcon name="MapPin" size={20} />
            Delivery Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="font-medium text-accent">Delivery Address</div>
              <div className="text-accent/70 text-sm">
                {order.deliveryInfo.firstName} {order.deliveryInfo.lastName}<br />
                {order.deliveryInfo.address}<br />
                {order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipCode}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-accent">Contact Information</div>
              <div className="text-accent/70 text-sm">
                {order.deliveryInfo.email}<br />
                {order.deliveryInfo.phone}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-accent">Delivery Schedule</div>
              <div className="text-accent/70 text-sm">
                {estimatedDelivery.toLocaleDateString()}<br />
                {order.deliveryInfo.deliveryTime}
              </div>
            </div>
            
            {order.deliveryInfo.specialInstructions && (
              <div>
                <div className="font-medium text-accent">Special Instructions</div>
                <div className="text-accent/70 text-sm">
                  {order.deliveryInfo.specialInstructions}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Order Status */}
      <Card className="p-6 mt-8">
        <h2 className="font-semibold text-xl text-accent mb-6">
          Order Status
        </h2>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={20} className="text-green-500" />
            </div>
            <div>
              <div className="font-medium text-accent">Order Confirmed</div>
              <div className="text-sm text-accent/70">Your order has been received</div>
            </div>
          </div>
          <div className="text-sm text-accent/60">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6 opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="Clock" size={20} className="text-accent/60" />
            </div>
            <div>
              <div className="font-medium text-accent">In Preparation</div>
              <div className="text-sm text-accent/70">We'll start baking your cake</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="Truck" size={20} className="text-accent/60" />
            </div>
            <div>
              <div className="font-medium text-accent">Out for Delivery</div>
              <div className="text-sm text-accent/70">Your cake is on its way</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="mt-12 text-center space-y-4">
        <h3 className="font-semibold text-xl text-accent mb-4">
          What's Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center p-4">
            <ApperIcon name="Mail" size={24} className="text-primary mb-2" />
            <div className="font-medium text-accent">Email Confirmation</div>
            <div className="text-accent/70">Check your inbox for order details</div>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <ApperIcon name="Bell" size={24} className="text-primary mb-2" />
            <div className="font-medium text-accent">Updates</div>
            <div className="text-accent/70">We'll notify you about order progress</div>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <ApperIcon name="Truck" size={24} className="text-primary mb-2" />
            <div className="font-medium text-accent">Delivery</div>
            <div className="text-accent/70">Your cake will arrive fresh and delicious</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/catalog">
            <Button size="lg">
              <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" size="lg">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation