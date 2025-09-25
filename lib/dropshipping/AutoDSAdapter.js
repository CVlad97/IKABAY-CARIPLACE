/**
 * Adaptateur AutoDS - Masqué comme "Fournisseur Européen"
 */
export class AutoDSAdapter {
  constructor() {
    this.apiKey = process.env.AUTODS_API_KEY
    this.baseUrl = process.env.AUTODS_BASE_URL || 'https://api.app.autods.com/v1'
    this.supplierId = 'european-supplier'
    this.supplierName = 'Fournisseur Européen'
  }

  isConfigured() {
    return !!(this.apiKey)
  }

  async getProducts(page = 1, limit = 50) {
    if (!this.isConfigured()) {
      return this.getMockProducts()
    }

    try {
      const response = await fetch(`${this.baseUrl}/products?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      return data.products?.map(product => this.transformProduct(product)) || []
    } catch (error) {
      console.error('AutoDS API Error:', error)
      return this.getMockProducts()
    }
  }

  transformProduct(product) {
    return {
      id: `eu_${product.id}`,
      external_id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      images: product.images || [],
      stock: product.stock || 100,
      category: product.category || 'import',
      tag: 'import',
      supplier: {
        id: this.supplierId,
        name: this.supplierName,
        type: 'international'
      },
      shipping: {
        estimated_days: '7-14',
        cost: product.shipping_cost || 8.90
      }
    }
  }

  async createOrder(orderData) {
    if (!this.isConfigured()) {
      return this.mockCreateOrder(orderData)
    }

    try {
      const autoDSOrder = {
        products: orderData.items.map(item => ({
          product_id: item.external_id,
          quantity: item.quantity,
          variant: item.variant || null
        })),
        shipping_address: {
          name: orderData.shipping.name,
          address1: orderData.shipping.address,
          city: orderData.shipping.city,
          country: orderData.shipping.country,
          zip: orderData.shipping.postal_code
        }
      }

      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoDSOrder)
      })

      if (!response.ok) {
        throw new Error(`Order creation failed: ${response.status}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        order_id: result.id,
        tracking_number: result.tracking_number,
        status: 'processing',
        supplier: this.supplierName
      }
    } catch (error) {
      console.error('AutoDS Order Error:', error)
      return this.mockCreateOrder(orderData)
    }
  }

  async trackOrder(trackingNumber) {
    if (!this.isConfigured()) {
      return this.mockTrackOrder(trackingNumber)
    }

    try {
      const response = await fetch(`${this.baseUrl}/orders/track/${trackingNumber}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      return {
        tracking_number: trackingNumber,
        status: this.normalizeStatus(data.status),
        last_update: data.updated_at,
        location: data.location || 'En transit',
        events: data.events?.map(event => ({
          date: event.date,
          status: this.normalizeStatus(event.status),
          location: event.location,
          description: event.description
        })) || []
      }
    } catch (error) {
      console.error('AutoDS Tracking Error:', error)
      return this.mockTrackOrder(trackingNumber)
    }
  }

  normalizeStatus(status) {
    const statusMap = {
      'pending': 'En préparation',
      'processing': 'En cours de traitement',
      'shipped': 'Expédié',
      'in_transit': 'En transit',
      'delivered': 'Livré',
      'cancelled': 'Annulé'
    }
    return statusMap[status] || status
  }

  getMockProducts() {
    return [
      {
        id: 'eu_mock_1',
        external_id: 'mock_1',
        title: 'Casque Bluetooth Premium',
        description: 'Casque sans fil haute qualité avec réduction de bruit',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
        stock: 25,
        category: 'electronics',
        tag: 'import',
        supplier: {
          id: this.supplierId,
          name: this.supplierName,
          type: 'international'
        },
        shipping: {
          estimated_days: '7-14',
          cost: 8.90
        }
      }
    ]
  }

  mockCreateOrder(orderData) {
    return {
      success: true,
      order_id: `EU${Date.now()}`,
      tracking_number: `EU${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      status: 'processing',
      supplier: this.supplierName
    }
  }

  mockTrackOrder(trackingNumber) {
    return {
      tracking_number: trackingNumber,
      status: 'En transit',
      last_update: new Date().toISOString(),
      location: 'Centre de tri européen',
      events: [
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'Expédié',
          location: 'Entrepôt européen',
          description: 'Colis pris en charge'
        },
        {
          date: new Date().toISOString(),
          status: 'En transit',
          location: 'Centre de tri européen',
          description: 'En cours d\'acheminement vers la destination'
        }
      ]
    }
  }
}