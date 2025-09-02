import React from "react"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "The birthday cake for my daughter was absolutely perfect! Beautiful design and tasted even better than it looked.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      comment: "Our wedding cake exceeded all expectations. Sweet Layers made our special day even more memorable!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Emily Rodriguez",
      location: "Austin, TX",
      rating: 5,
      comment: "Amazing custom cake for my son's graduation. The attention to detail was incredible. Highly recommend!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ]

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-accent mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-xl text-accent/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-accent">{testimonial.name}</h4>
                  <p className="text-sm text-accent/70">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-accent/80 italic">"{testimonial.comment}"</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <ApperIcon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <div>
              <div className="font-bold text-2xl text-accent">4.9</div>
              <div className="text-accent/70 text-sm">Average Rating</div>
            </div>
            <div className="text-accent/70 text-sm">
              Based on 500+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection