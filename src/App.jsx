import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Home from "@/components/pages/Home"
import Catalog from "@/components/pages/Catalog"
import ProductDetail from "@/components/pages/ProductDetail"
import Cart from "@/components/pages/Cart"
import Checkout from "@/components/pages/Checkout"
import OrderConfirmation from "@/components/pages/OrderConfirmation"
import Error from "@/components/ui/Error"
import { CartProvider } from "@/hooks/useCart"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error 
          title="Something went wrong"
          message="We're having trouble loading the application. Please try refreshing the page."
          onRetry={() => window.location.reload()}
        />
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <div className="min-h-screen bg-background">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/category/:category" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </Layout>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
          />
</div>
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App