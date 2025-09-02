import React from "react"
import ProductCard from "@/components/molecules/ProductCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onRetry, 
  className = "" 
}) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!products || products.length === 0) {
    return (
      <Empty 
        title="No cakes found"
        description="Try adjusting your filters or search terms"
        actionLabel="View All Cakes"
        onAction={() => window.location.href = "/catalog"}
      />
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.Id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid