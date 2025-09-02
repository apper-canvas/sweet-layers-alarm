import React from "react"
import { Link } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const HeroSection = () => {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-accent leading-tight">
                Sweet
                <br />
                <span className="text-gradient">Moments</span>
                <br />
                Made Perfect
              </h1>
              <p className="text-lg md:text-xl text-accent/80 max-w-lg">
                Artisanal cakes crafted with love, using the finest ingredients to make your celebrations unforgettable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto">
                  <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
                  Shop Cakes
                </Button>
              </Link>
              <Link to="/category/Custom">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ApperIcon name="Palette" size={20} className="mr-2" />
                  Custom Order
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-accent/70 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-accent/70 text-sm">Cake Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">5★</div>
                <div className="text-accent/70 text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
<img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful layered cake showcasing our artisanal baking craftsmanship"
                className="w-full h-96 lg:h-[600px] object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600/FFC1CC/8B4513?text=Sweet+Moments+Bakery"
                  e.target.onerror = null // Prevent infinite loop
                }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <ApperIcon name="Star" className="text-yellow-400 fill-current" size={20} />
                <div>
                  <div className="font-bold text-accent">4.9</div>
                  <div className="text-xs text-accent/70">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-primary rounded-2xl p-4 shadow-xl text-white">
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" size={20} />
                <div>
                  <div className="font-bold">24h</div>
                  <div className="text-xs opacity-90">Fresh Daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection