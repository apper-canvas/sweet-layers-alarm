import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "Nothing here yet",
  description = "It looks like there's nothing to display.",
  actionLabel,
  onAction,
  icon = "Package",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={48} className="text-accent/60" />
      </div>
      
      <h3 className="font-display text-2xl text-accent mb-2">{title}</h3>
      <p className="text-accent/70 mb-8 max-w-md">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ApperIcon name="ArrowRight" size={16} />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty