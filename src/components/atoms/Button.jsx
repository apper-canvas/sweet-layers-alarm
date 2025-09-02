import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "btn-primary text-white font-semibold",
    secondary: "bg-secondary text-accent hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-accent hover:bg-surface"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  }

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button