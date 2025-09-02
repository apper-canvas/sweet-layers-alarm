import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-accent text-lg">Categories</h3>
      
      <div className="space-y-2">
        <Button
          variant={selectedCategory === "all" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange("all")}
          className="w-full justify-start"
        >
          <ApperIcon name="Grid3X3" size={16} className="mr-2" />
          All Cakes
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "primary" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category.name)}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <ApperIcon name={category.icon} size={16} className="mr-2" />
              {category.name}
            </div>
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter