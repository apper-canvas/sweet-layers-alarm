import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"
import { orderService } from "@/services/api/orderService"
import { toast } from "react-toastify"

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Delivery Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryDate: "",
    deliveryTime: "",
    specialInstructions: "",
    // Payment Information (simulated)
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  })

  const [errors, setErrors] = useState({})

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    const requiredFields = [
      "firstName", "lastName", "email", "phone", 
      "address", "city", "state", "zipCode",
      "deliveryDate", "cardNumber", "expiryDate", "cvv", "cardName"
    ]

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter phone as (123) 456-7890"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    try {
      setLoading(true)
      
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price
        })),
        total,
        deliveryInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          deliveryDate: formData.deliveryDate,
          deliveryTime: formData.deliveryTime,
          specialInstructions: formData.specialInstructions
        },
        status: "confirmed"
      }

      const order = await orderService.create(orderData)
      clearCart()
      toast.success("Order placed successfully!")
      navigate("/order-confirmation", { state: { orderId: order.Id } })
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
      console.error("Order submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-accent mb-2">
          Checkout
        </h1>
        <p className="text-accent/70">
          Complete your order details below
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
            <Card className="p-6">
              <h2 className="font-semibold text-xl text-accent mb-6 flex items-center gap-2">
                <ApperIcon name="MapPin" size={20} />
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  placeholder="Doe"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="john@example.com"
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div className="mt-4">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  placeholder="New York"
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                  placeholder="NY"
                />
                <Input
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={errors.zipCode}
                  placeholder="10001"
                />
              </div>
            </Card>

            {/* Delivery Schedule */}
            <Card className="p-6">
              <h2 className="font-semibold text-xl text-accent mb-6 flex items-center gap-2">
                <ApperIcon name="Calendar" size={20} />
                Delivery Schedule
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Delivery Date"
                  name="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  error={errors.deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                />
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Delivery Time
                  </label>
                  <select
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-secondary rounded-lg bg-white text-accent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-accent mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special delivery instructions..."
                  className="w-full px-4 py-3 border-2 border-secondary rounded-lg bg-white text-accent placeholder:text-accent/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>
            </Card>

            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="font-semibold text-xl text-accent mb-6 flex items-center gap-2">
                <ApperIcon name="CreditCard" size={20} />
                Payment Information
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    error={errors.expiryDate}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    error={errors.cvv}
                    placeholder="123"
                  />
                </div>
                
                <Input
                  label="Name on Card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  error={errors.cardName}
                  placeholder="John Doe"
                />
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-semibold text-xl text-accent mb-6">
                Order Summary
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-accent text-sm">
                        {item.product.name}
                      </div>
                      <div className="text-accent/60 text-xs">
                        {item.size} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-semibold text-accent">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 mb-6">
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

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Lock" size={20} className="mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              <div className="mt-4 text-center text-xs text-accent/60">
                <ApperIcon name="Shield" size={14} className="inline mr-1" />
                Your payment information is secure and encrypted
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout