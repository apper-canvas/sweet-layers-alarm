import React from "react"
import HeroSection from "@/components/organisms/HeroSection"
import CategorySection from "@/components/organisms/CategorySection"
import FeaturedProducts from "@/components/organisms/FeaturedProducts"
import TestimonialSection from "@/components/organisms/TestimonialSection"

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialSection />
    </div>
  )
}

export default Home