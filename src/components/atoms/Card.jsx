import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children,
  hover = false,
  ...props 
}, ref) => {
return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-secondary/20 overflow-hidden",
        hover && "card-hover cursor-pointer",
        "relative", // Support for image loading states
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card