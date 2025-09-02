import React from "react"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Cakes", path: "/catalog" },
        { name: "Birthday Cakes", path: "/category/Birthday" },
        { name: "Wedding Cakes", path: "/category/Wedding" },
        { name: "Custom Orders", path: "/category/Custom" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Our Story", path: "/story" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Shipping Info", path: "/shipping" },
        { name: "Returns", path: "/returns" },
        { name: "Care Instructions", path: "/care" }
      ]
    }
  ]

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "Youtube", icon: "Youtube", url: "https://youtube.com" }
  ]

  return (
    <footer className="bg-surface border-t border-secondary/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Cake" size={24} className="text-white" />
              </div>
              <span className="font-display text-2xl text-gradient">
                Sweet Layers
              </span>
            </Link>
            <p className="text-accent/70 mb-6 max-w-sm">
              Artisanal cakes crafted with love and the finest ingredients. Making your special moments sweeter since 2020.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-accent/70">
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" size={16} />
                <span>123 Baker Street, Sweet City, SC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Phone" size={16} />
                <span>(555) 123-CAKE</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" size={16} />
                <span>hello@sweetlayers.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-accent text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-accent/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-display text-2xl text-accent mb-2">
              Stay Sweet!
            </h3>
            <p className="text-accent/70 mb-6">
              Subscribe to get special offers, recipes, and cake care tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
              />
              <button className="btn-primary px-6 py-3 rounded-lg text-white font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-secondary/20">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-accent/70 text-sm">
              © 2024 Sweet Layers. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-accent/60 hover:text-accent text-sm">
                Privacy
              </Link>
              <Link to="/terms" className="text-accent/60 hover:text-accent text-sm">
                Terms
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
              >
                <ApperIcon name={social.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer