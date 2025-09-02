import React from "react"
import { useNavigate } from "react-router-dom"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1, product.sizes[0])
    toast.success(`${product.name} added to cart!`)
  }

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`)
  }

  return (
    <Card hover onClick={handleCardClick} className="group">
      <div className="relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge variant="error" className="absolute top-3 left-3">
            Out of Stock
          </Badge>
        )}
        {product.featured && (
          <Badge variant="primary" className="absolute top-3 right-3">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <Badge variant="default" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <h3 className="font-display text-xl text-accent mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-accent/70 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            <span className="text-accent/60 text-sm">
              {product.sizes[0]}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-yellow-500">
            <ApperIcon name="Star" size={16} className="fill-current" />
            <span className="text-accent text-sm">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleCardClick}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard