// Order Service using ApperClient for order_c table

export const orderService = {
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
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "delivery_info_first_name_c"}},
          {"field": {"Name": "delivery_info_last_name_c"}},
          {"field": {"Name": "delivery_info_email_c"}},
          {"field": {"Name": "delivery_info_phone_c"}},
          {"field": {"Name": "delivery_info_address_c"}},
          {"field": {"Name": "delivery_info_city_c"}},
          {"field": {"Name": "delivery_info_state_c"}},
          {"field": {"Name": "delivery_info_zip_code_c"}},
          {"field": {"Name": "delivery_info_delivery_date_c"}},
          {"field": {"Name": "delivery_info_delivery_time_c"}},
          {"field": {"Name": "delivery_info_special_instructions_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords('order_c', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      // Transform database fields to UI-compatible format
      return (response.data || []).map(order => ({
        Id: order.Id,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c || 0,
        deliveryInfo: {
          firstName: order.delivery_info_first_name_c || '',
          lastName: order.delivery_info_last_name_c || '',
          email: order.delivery_info_email_c || '',
          phone: order.delivery_info_phone_c || '',
          address: order.delivery_info_address_c || '',
          city: order.delivery_info_city_c || '',
          state: order.delivery_info_state_c || '',
          zipCode: order.delivery_info_zip_code_c || '',
          deliveryDate: order.delivery_info_delivery_date_c || '',
          deliveryTime: order.delivery_info_delivery_time_c || '',
          specialInstructions: order.delivery_info_special_instructions_c || ''
        },
        status: order.status_c || 'pending',
        createdAt: order.created_at_c || order.CreatedOn
      }))
    } catch (error) {
      console.error("Error fetching orders:", error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "delivery_info_first_name_c"}},
          {"field": {"Name": "delivery_info_last_name_c"}},
          {"field": {"Name": "delivery_info_email_c"}},
          {"field": {"Name": "delivery_info_phone_c"}},
          {"field": {"Name": "delivery_info_address_c"}},
          {"field": {"Name": "delivery_info_city_c"}},
          {"field": {"Name": "delivery_info_state_c"}},
          {"field": {"Name": "delivery_info_zip_code_c"}},
          {"field": {"Name": "delivery_info_delivery_date_c"}},
          {"field": {"Name": "delivery_info_delivery_time_c"}},
          {"field": {"Name": "delivery_info_special_instructions_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('order_c', parseInt(id), params)
      
      if (!response.success || !response.data) {
        throw new Error(`Order with Id ${id} not found`)
      }
      
      // Transform database fields to UI-compatible format
      const order = response.data
      return {
        Id: order.Id,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c || 0,
        deliveryInfo: {
          firstName: order.delivery_info_first_name_c || '',
          lastName: order.delivery_info_last_name_c || '',
          email: order.delivery_info_email_c || '',
          phone: order.delivery_info_phone_c || '',
          address: order.delivery_info_address_c || '',
          city: order.delivery_info_city_c || '',
          state: order.delivery_info_state_c || '',
          zipCode: order.delivery_info_zip_code_c || '',
          deliveryDate: order.delivery_info_delivery_date_c || '',
          deliveryTime: order.delivery_info_delivery_time_c || '',
          specialInstructions: order.delivery_info_special_instructions_c || ''
        },
        status: order.status_c || 'pending',
        createdAt: order.created_at_c || order.CreatedOn
      }
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error)
      throw new Error(`Order with Id ${id} not found`)
    }
  },

  async create(orderData) {
    try {
      const apperClient = this.getApperClient()
      
      // Transform UI format to database format with only updateable fields
      const dbOrderData = {
        items_c: JSON.stringify(orderData.items || []),
        total_c: orderData.total || 0,
        delivery_info_first_name_c: orderData.deliveryInfo?.firstName || '',
        delivery_info_last_name_c: orderData.deliveryInfo?.lastName || '',
        delivery_info_email_c: orderData.deliveryInfo?.email || '',
        delivery_info_phone_c: orderData.deliveryInfo?.phone || '',
        delivery_info_address_c: orderData.deliveryInfo?.address || '',
        delivery_info_city_c: orderData.deliveryInfo?.city || '',
        delivery_info_state_c: orderData.deliveryInfo?.state || '',
        delivery_info_zip_code_c: orderData.deliveryInfo?.zipCode || '',
        delivery_info_delivery_date_c: orderData.deliveryInfo?.deliveryDate || '',
        delivery_info_delivery_time_c: orderData.deliveryInfo?.deliveryTime || '',
        delivery_info_special_instructions_c: orderData.deliveryInfo?.specialInstructions || '',
        status_c: orderData.status || 'pending',
        created_at_c: new Date().toISOString()
      }
      
      const params = {
        records: [dbOrderData]
      }
      
      const response = await apperClient.createRecord('order_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        const created = response.results[0].data
        return {
          Id: created.Id,
          items: created.items_c ? JSON.parse(created.items_c) : [],
          total: created.total_c || 0,
          deliveryInfo: {
            firstName: created.delivery_info_first_name_c || '',
            lastName: created.delivery_info_last_name_c || '',
            email: created.delivery_info_email_c || '',
            phone: created.delivery_info_phone_c || '',
            address: created.delivery_info_address_c || '',
            city: created.delivery_info_city_c || '',
            state: created.delivery_info_state_c || '',
            zipCode: created.delivery_info_zip_code_c || '',
            deliveryDate: created.delivery_info_delivery_date_c || '',
            deliveryTime: created.delivery_info_delivery_time_c || '',
            specialInstructions: created.delivery_info_special_instructions_c || ''
          },
          status: created.status_c || 'pending',
          createdAt: created.created_at_c || created.CreatedOn
        }
      }
      
      throw new Error('Failed to create order')
    } catch (error) {
      console.error("Error creating order:", error)
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
      
      if (updates.items !== undefined) dbUpdates.items_c = JSON.stringify(updates.items)
      if (updates.total !== undefined) dbUpdates.total_c = updates.total
      if (updates.status !== undefined) dbUpdates.status_c = updates.status
      
      if (updates.deliveryInfo) {
        if (updates.deliveryInfo.firstName !== undefined) dbUpdates.delivery_info_first_name_c = updates.deliveryInfo.firstName
        if (updates.deliveryInfo.lastName !== undefined) dbUpdates.delivery_info_last_name_c = updates.deliveryInfo.lastName
        if (updates.deliveryInfo.email !== undefined) dbUpdates.delivery_info_email_c = updates.deliveryInfo.email
        if (updates.deliveryInfo.phone !== undefined) dbUpdates.delivery_info_phone_c = updates.deliveryInfo.phone
        if (updates.deliveryInfo.address !== undefined) dbUpdates.delivery_info_address_c = updates.deliveryInfo.address
        if (updates.deliveryInfo.city !== undefined) dbUpdates.delivery_info_city_c = updates.deliveryInfo.city
        if (updates.deliveryInfo.state !== undefined) dbUpdates.delivery_info_state_c = updates.deliveryInfo.state
        if (updates.deliveryInfo.zipCode !== undefined) dbUpdates.delivery_info_zip_code_c = updates.deliveryInfo.zipCode
        if (updates.deliveryInfo.deliveryDate !== undefined) dbUpdates.delivery_info_delivery_date_c = updates.deliveryInfo.deliveryDate
        if (updates.deliveryInfo.deliveryTime !== undefined) dbUpdates.delivery_info_delivery_time_c = updates.deliveryInfo.deliveryTime
        if (updates.deliveryInfo.specialInstructions !== undefined) dbUpdates.delivery_info_special_instructions_c = updates.deliveryInfo.specialInstructions
      }
      
      const params = {
        records: [dbUpdates]
      }
      
      const response = await apperClient.updateRecord('order_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        const updated = response.results[0].data
        return {
          Id: updated.Id,
          items: updated.items_c ? JSON.parse(updated.items_c) : [],
          total: updated.total_c || 0,
          deliveryInfo: {
            firstName: updated.delivery_info_first_name_c || '',
            lastName: updated.delivery_info_last_name_c || '',
            email: updated.delivery_info_email_c || '',
            phone: updated.delivery_info_phone_c || '',
            address: updated.delivery_info_address_c || '',
            city: updated.delivery_info_city_c || '',
            state: updated.delivery_info_state_c || '',
            zipCode: updated.delivery_info_zip_code_c || '',
            deliveryDate: updated.delivery_info_delivery_date_c || '',
            deliveryTime: updated.delivery_info_delivery_time_c || '',
            specialInstructions: updated.delivery_info_special_instructions_c || ''
          },
          status: updated.status_c || 'pending',
          createdAt: updated.created_at_c || updated.CreatedOn
        }
      }
      
      throw new Error(`Order with Id ${id} not found`)
    } catch (error) {
      console.error(`Error updating order ${id}:`, error)
      throw error
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient()
      const params = { 
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('order_c', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return true
      }
      
      throw new Error(`Order with Id ${id} not found`)
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error)
      throw error
    }
  },

  async getByStatus(status) {
    try {
      const orders = await this.getAll()
      return orders.filter(o => o.status.toLowerCase() === status.toLowerCase())
    } catch (error) {
      console.error(`Error fetching orders by status ${status}:`, error)
      return []
    }
  }
}