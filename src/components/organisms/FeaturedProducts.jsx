import React, { useState, useEffect } from "react"
import ProductGrid from "@/components/organisms/ProductGrid"
import Button from "@/components/atoms/Button"
import { Link } from "react-router-dom"
import { productService } from "@/services/api/productService"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const allProducts = await productService.getAll()
      const featured = allProducts.filter(product => product.featured).slice(0, 8)
      setProducts(featured)
    } catch (err) {
      setError("Failed to load featured products")
      console.error("Error loading featured products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-accent mb-4">
            Featured <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-xl text-accent/70 max-w-2xl mx-auto mb-8">
            Discover our most popular and beloved cake designs, crafted to perfection
          </p>
        </div>

        <ProductGrid 
          products={products}
          loading={loading}
          error={error}
          onRetry={loadFeaturedProducts}
          className="mb-12"
        />

        <div className="text-center">
          <Link to="/catalog">
            <Button size="lg">
              View All Cakes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts