import React, { useState, useEffect } from "react"

const PriceRange = ({ min = 0, max = 200, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value || [min, max])

  useEffect(() => {
    if (value) {
      setLocalValue(value)
    }
  }, [value])

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value)
    const newValue = [newMin, localValue[1]]
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value)
    const newValue = [localValue[0], newMax]
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-accent text-lg">Price Range</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-accent/70">Min</span>
          <span className="font-semibold text-accent">${localValue[0]}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-accent/70">Max</span>
          <span className="font-semibold text-accent">${localValue[1]}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex items-center justify-between text-sm text-accent/70">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>
    </div>
  )
}

export default PriceRange