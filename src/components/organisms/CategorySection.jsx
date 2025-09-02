import React from "react"
import { Link } from "react-router-dom"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const CategorySection = () => {
  const categories = [
    {
      name: "Birthday Cakes",
      description: "Celebrate another year with our festive birthday collection",
      icon: "Gift",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/category/Birthday",
      color: "from-pink-400 to-rose-400"
    },
    {
      name: "Wedding Cakes",
      description: "Elegant designs for your perfect day",
      icon: "Heart",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/category/Wedding",
      color: "from-purple-400 to-pink-400"
    },
    {
      name: "Custom Cakes",
      description: "Bring your vision to life with our custom designs",
      icon: "Palette",
      image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/category/Custom",
      color: "from-blue-400 to-purple-400"
    },
    {
      name: "Cupcakes",
      description: "Individual treats perfect for any occasion",
      icon: "Coffee",
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/category/Cupcakes",
      color: "from-yellow-400 to-orange-400"
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-accent mb-4">
            Our <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-xl text-accent/70 max-w-2xl mx-auto">
            From birthdays to weddings, find the perfect cake for every celebration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.link}>
              <Card hover className="h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  <div className="absolute top-4 left-4 bg-white rounded-full p-3">
                    <ApperIcon name={category.icon} size={24} className="text-accent" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-accent mb-2">
                    {category.name}
                  </h3>
                  <p className="text-accent/70 text-sm">
                    {category.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection