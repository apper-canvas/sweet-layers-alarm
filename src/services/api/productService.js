import productsData from "@/services/mockData/products.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  async getAll() {
    await delay(300)
    return [...productsData]
  },

  async getById(id) {
    await delay(200)
    const product = productsData.find(p => p.Id === id)
    if (!product) {
      throw new Error(`Product with Id ${id} not found`)
    }
    return { ...product }
  },

  async getByCategory(category) {
    await delay(250)
    return productsData.filter(p => p.category.toLowerCase() === category.toLowerCase())
  },

  async search(query) {
    await delay(300)
    const searchTerm = query.toLowerCase()
    return productsData.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    )
  },

  async getFeatured() {
    await delay(200)
    return productsData.filter(p => p.featured)
  },

  async create(productData) {
    await delay(400)
    const newId = Math.max(...productsData.map(p => p.Id)) + 1
    const newProduct = {
      Id: newId,
      ...productData,
      createdAt: new Date().toISOString()
    }
    productsData.push(newProduct)
    return { ...newProduct }
  },

  async update(id, updates) {
    await delay(300)
    const index = productsData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error(`Product with Id ${id} not found`)
    }
    productsData[index] = { ...productsData[index], ...updates }
    return { ...productsData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = productsData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error(`Product with Id ${id} not found`)
    }
    const deleted = productsData.splice(index, 1)[0]
    return { ...deleted }
  }
}