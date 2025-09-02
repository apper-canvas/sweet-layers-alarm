// Product Service using ApperClient for product_c table
export const productService = {
  getApperClient() {
    const { ApperClient } = window.ApperSDK
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  },

  async getAll() {
    try {
      const apperClient = this.getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "rating_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords('product_c', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      // Transform database fields to UI-compatible format
      return (response.data || []).map(product => ({
        Id: product.Id,
        name: product.name_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c || '',
        sizes: product.sizes_c ? product.sizes_c.split('\n').filter(size => size.trim()) : [],
        inStock: product.in_stock_c || false,
        featured: product.featured_c || false,
        rating: product.rating_c || 0
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "rating_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('product_c', parseInt(id), params)
      
      if (!response.success || !response.data) {
        throw new Error(`Product with Id ${id} not found`)
      }
      
      // Transform database fields to UI-compatible format
      const product = response.data
      return {
        Id: product.Id,
        name: product.name_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c || '',
        sizes: product.sizes_c ? product.sizes_c.split('\n').filter(size => size.trim()) : [],
        inStock: product.in_stock_c || false,
        featured: product.featured_c || false,
        rating: product.rating_c || 0
      }
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      throw new Error(`Product with Id ${id} not found`)
    }
  },

  async getByCategory(category) {
    try {
      const products = await this.getAll()
      return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    } catch (error) {
      console.error(`Error fetching products by category ${category}:`, error)
      return []
    }
  },

  async search(query) {
    try {
      const products = await this.getAll()
      const searchTerm = query.toLowerCase()
      return products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      console.error(`Error searching products:`, error)
      return []
    }
  },

  async getFeatured() {
    try {
      const products = await this.getAll()
      return products.filter(p => p.featured)
    } catch (error) {
      console.error("Error fetching featured products:", error)
      return []
    }
  },

  async create(productData) {
    try {
      const apperClient = this.getApperClient()
      
      // Transform UI format to database format with only updateable fields
      const dbProductData = {
        name_c: productData.name || '',
        description_c: productData.description || '',
        price_c: productData.price || 0,
        images_c: Array.isArray(productData.images) ? productData.images.join('\n') : '',
        category_c: productData.category || '',
        sizes_c: Array.isArray(productData.sizes) ? productData.sizes.join('\n') : '',
        in_stock_c: productData.inStock || false,
        featured_c: productData.featured || false,
        rating_c: productData.rating || 0
      }
      
      const params = {
        records: [dbProductData]
      }
      
      const response = await apperClient.createRecord('product_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        const created = response.results[0].data
        return {
          Id: created.Id,
          name: created.name_c || '',
          description: created.description_c || '',
          price: created.price_c || 0,
          images: created.images_c ? created.images_c.split('\n').filter(img => img.trim()) : [],
          category: created.category_c || '',
          sizes: created.sizes_c ? created.sizes_c.split('\n').filter(size => size.trim()) : [],
          inStock: created.in_stock_c || false,
          featured: created.featured_c || false,
          rating: created.rating_c || 0
        }
      }
      
      throw new Error('Failed to create product')
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  },

  async update(id, updates) {
    try {
      const apperClient = this.getApperClient()
      
      // Transform UI format to database format with only updateable fields
      const dbUpdates = {
        Id: parseInt(id)
      }
      
      if (updates.name !== undefined) dbUpdates.name_c = updates.name
      if (updates.description !== undefined) dbUpdates.description_c = updates.description
      if (updates.price !== undefined) dbUpdates.price_c = updates.price
      if (updates.images !== undefined) dbUpdates.images_c = Array.isArray(updates.images) ? updates.images.join('\n') : updates.images
      if (updates.category !== undefined) dbUpdates.category_c = updates.category
      if (updates.sizes !== undefined) dbUpdates.sizes_c = Array.isArray(updates.sizes) ? updates.sizes.join('\n') : updates.sizes
      if (updates.inStock !== undefined) dbUpdates.in_stock_c = updates.inStock
      if (updates.featured !== undefined) dbUpdates.featured_c = updates.featured
      if (updates.rating !== undefined) dbUpdates.rating_c = updates.rating
      
      const params = {
        records: [dbUpdates]
      }
      
      const response = await apperClient.updateRecord('product_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        const updated = response.results[0].data
        return {
          Id: updated.Id,
          name: updated.name_c || '',
          description: updated.description_c || '',
          price: updated.price_c || 0,
          images: updated.images_c ? updated.images_c.split('\n').filter(img => img.trim()) : [],
          category: updated.category_c || '',
          sizes: updated.sizes_c ? updated.sizes_c.split('\n').filter(size => size.trim()) : [],
          inStock: updated.in_stock_c || false,
          featured: updated.featured_c || false,
          rating: updated.rating_c || 0
        }
      }
      
      throw new Error(`Product with Id ${id} not found`)
    } catch (error) {
      console.error(`Error updating product ${id}:`, error)
      throw error
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient()
      const params = { 
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('product_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return true
      }
      
      throw new Error(`Product with Id ${id} not found`)
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error)
      throw error
    }
}
}