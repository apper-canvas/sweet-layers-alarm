import React, { useState } from "react"
import { cn } from "@/utils/cn"

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "https://via.placeholder.com/400x300/FFC1CC/8B4513?text=Image+Not+Available",
  className = "",
  loading = "lazy",
  onLoad,
  onError,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleError = (e) => {
    if (!imageError) {
      setImageError(true)
      e.target.src = fallbackSrc
      e.target.onerror = null // Prevent infinite loop
    }
    onError?.(e)
  }

  const handleLoad = (e) => {
    setImageLoading(false)
    onLoad?.(e)
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {imageLoading && (
        <div className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center">
          <div className="text-accent/50 text-sm">Loading...</div>
        </div>
      )}
      <img
        src={src || fallbackSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          imageLoading ? "opacity-0" : "opacity-100"
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback