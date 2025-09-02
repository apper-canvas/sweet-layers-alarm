import React from "react"
import { useNavigate } from "react-router-dom"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import ImageWithFallback from "@/components/atoms/ImageWithFallback"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  if (!product) {
    return null
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    const defaultSize = product?.sizes?.[0] || 'Regular'
    addToCart(product, 1, defaultSize)
    toast.success(`${product?.name || 'Product'} added to cart!`)
  }

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`)
  }

  return (
    <Card hover onClick={handleCardClick} className="group">
<div className="relative overflow-hidden">
        <ImageWithFallback
          src={product?.images?.[0] || ''}
          alt={product?.name || 'Product image'}
          fallbackSrc={`https://via.placeholder.com/400x300/FFC1CC/8B4513?text=${encodeURIComponent(product?.name || 'Product')}`}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
{!product?.inStock && (
          <Badge variant="error" className="absolute top-3 left-3">
            Out of Stock
          </Badge>
        )}
{product?.featured && (
          <Badge variant="primary" className="absolute top-3 right-3">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <Badge variant="default" className="text-xs">
            {product?.category || 'General'}
          </Badge>
        </div>
        
<h3 className="font-display text-xl text-accent mb-2 line-clamp-2">
          {product?.name || 'Product Name'}
        </h3>
        
        <p className="text-accent/70 text-sm mb-4 line-clamp-2">
          {product?.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1">
<span className="text-2xl font-bold text-primary">
              ${product?.price || '0.00'}
            </span>
            <span className="text-accent/60 text-sm">
              {product?.sizes?.[0] || 'Regular'}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-yellow-500">
            <ApperIcon name="Star" size={16} className="fill-current" />
            <span className="text-accent text-sm">{product?.rating || '0.0'}</span>
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
disabled={!product?.inStock}
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