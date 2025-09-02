import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import ProductGrid from "@/components/organisms/ProductGrid"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { useCart } from "@/hooks/useCart"
import { productService } from "@/services/api/productService"
import { toast } from "react-toastify"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError("")
      const productData = await productService.getById(parseInt(id))
      setProduct(productData)
      setSelectedSize(productData.sizes[0])
      
      // Load related products from same category
      const allProducts = await productService.getAll()
      const related = allProducts
        .filter(p => p.category === productData.category && p.Id !== productData.Id)
        .slice(0, 4)
      setRelatedProducts(related)
    } catch (err) {
      setError("Product not found")
      console.error("Error loading product:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(product, quantity, selectedSize)
    toast.success(`${product.name} added to cart!`)
  }

  useEffect(() => {
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message={error} 
          onRetry={loadProduct}
          title="Product Not Found"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-accent/70">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Home
          </button>
          <ApperIcon name="ChevronRight" size={16} />
          <button onClick={() => navigate("/catalog")} className="hover:text-primary">
            Catalog
          </button>
          <ApperIcon name="ChevronRight" size={16} />
          <span className="text-accent">{product.name}</span>
        </div>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-secondary"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="default" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="font-display text-4xl text-accent mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-accent ml-2">{product.rating}</span>
              </div>
              <span className="text-accent/60">•</span>
              <span className="text-accent/60">In Stock: {product.inStock ? "Yes" : "No"}</span>
            </div>
            <p className="text-accent/80 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-primary">
            ${product.price}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-accent mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-accent mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <ApperIcon name="Minus" size={16} />
              </Button>
              <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ApperIcon name="ShoppingCart" size={20} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-center"
            >
              <ApperIcon name="Heart" size={20} />
            </Button>
          </div>

          {/* Features */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <ApperIcon name="Truck" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold text-accent text-sm">Free Delivery</div>
                  <div className="text-accent/60 text-xs">Orders over $50</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Clock" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold text-accent text-sm">Fresh Daily</div>
                  <div className="text-accent/60 text-xs">Made to order</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Shield" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold text-accent text-sm">Quality Guaranteed</div>
                  <div className="text-accent/60 text-xs">100% satisfaction</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-display text-3xl text-accent mb-8 text-center">
            You Might Also <span className="text-gradient">Like</span>
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  )
}

export default ProductDetail