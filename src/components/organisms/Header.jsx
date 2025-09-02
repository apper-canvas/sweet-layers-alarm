import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
const { items } = useCart()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  
  const handleLogout = async () => {
    await logout()
  }
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`)
    } else {
      navigate("/catalog")
    }
  }

  const navItems = [
    { name: "All Cakes", path: "/catalog" },
    { name: "Birthday", path: "/category/Birthday" },
    { name: "Wedding", path: "/category/Wedding" },
    { name: "Custom", path: "/category/Custom" },
    { name: "About", path: "/about" }
  ]

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Cake" size={24} className="text-white" />
            </div>
            <span className="font-display text-2xl text-gradient">
              Sweet Layers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-accent hover:text-primary font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
<Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ApperIcon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-accent/70">
                  Hello, {user?.firstName || user?.name || 'User'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <ApperIcon name="LogOut" size={16} />
                  Logout
                </Button>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="LogIn" size={16} />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
</Link>
              </div>
            )}
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-t border-secondary/20">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 text-accent hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header