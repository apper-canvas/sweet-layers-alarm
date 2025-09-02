import ordersData from "@/services/mockData/orders.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const orderService = {
  async getAll() {
    await delay(300)
    return [...ordersData]
  },

  async getById(id) {
    await delay(200)
    const order = ordersData.find(o => o.Id === id)
    if (!order) {
      throw new Error(`Order with Id ${id} not found`)
    }
    return { ...order }
  },

  async create(orderData) {
    await delay(500)
    const newId = Math.max(...ordersData.map(o => o.Id || 0)) + 1
    const newOrder = {
      Id: newId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: orderData.status || "pending"
    }
    ordersData.push(newOrder)
    return { ...newOrder }
  },

  async update(id, updates) {
    await delay(300)
    const index = ordersData.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error(`Order with Id ${id} not found`)
    }
    ordersData[index] = { ...ordersData[index], ...updates }
    return { ...ordersData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = ordersData.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error(`Order with Id ${id} not found`)
    }
    const deleted = ordersData.splice(index, 1)[0]
    return { ...deleted }
  },

  async getByStatus(status) {
    await delay(250)
    return ordersData.filter(o => o.status.toLowerCase() === status.toLowerCase())
  }
}