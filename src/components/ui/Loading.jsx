import React from "react"

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image skeleton */}
            <div className="h-56 bg-gradient-to-r from-secondary/50 to-secondary/30"></div>
            
            {/* Content skeleton */}
            <div className="p-6 space-y-3">
              {/* Category badge */}
              <div className="w-20 h-5 bg-secondary/50 rounded-full"></div>
              
              {/* Title */}
              <div className="w-3/4 h-6 bg-secondary/40 rounded"></div>
              
              {/* Description */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-secondary/30 rounded"></div>
                <div className="w-2/3 h-4 bg-secondary/30 rounded"></div>
              </div>
              
              {/* Price and rating */}
              <div className="flex items-center justify-between">
                <div className="w-20 h-6 bg-primary/30 rounded"></div>
                <div className="w-12 h-4 bg-secondary/40 rounded"></div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-2">
                <div className="flex-1 h-9 bg-secondary/40 rounded-lg"></div>
                <div className="w-16 h-9 bg-primary/30 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading