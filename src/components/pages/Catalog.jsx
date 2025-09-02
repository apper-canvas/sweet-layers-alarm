import React, { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import ProductGrid from "@/components/organisms/ProductGrid"
import CategoryFilter from "@/components/molecules/CategoryFilter"
import PriceRange from "@/components/molecules/PriceRange"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { productService } from "@/services/api/productService"

const Catalog = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { name: "Birthday", icon: "Gift", count: 0 },
    { name: "Wedding", icon: "Heart", count: 0 },
    { name: "Custom", icon: "Palette", count: 0 },
    { name: "Cupcakes", icon: "Coffee", count: 0 }
  ]

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const allProducts = await productService.getAll()
      setProducts(allProducts)
      
      // Update category counts
      categories.forEach(cat => {
        cat.count = allProducts.filter(p => p.category === cat.name).length
      })
    } catch (err) {
      setError("Failed to load products")
      console.error("Error loading products:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchQuery, priceRange, sortBy])

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (category) {
      setSelectedCategory(category)
    }
  }, [category])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl text-accent mb-2">
          {selectedCategory === "all" ? "All Cakes" : `${selectedCategory} Cakes`}
        </h1>
        <p className="text-accent/70">
          {searchQuery && `Results for "${searchQuery}" • `}
          {filteredProducts.length} cake{filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
            <div className="space-y-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <PriceRange
                min={0}
                max={200}
                value={priceRange}
                onChange={setPriceRange}
              />
              
              <div>
                <h3 className="font-semibold text-accent text-lg mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2"
            >
              <ApperIcon name="Filter" size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
          />
        </div>
      </div>
    </div>
  )
}

export default Catalog