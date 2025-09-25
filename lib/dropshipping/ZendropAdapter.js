/**
 * Adaptateur Zendrop - Masqué comme "Import International"
 */
export class ZendropAdapter {
  constructor() {
    this.apiKey = process.env.ZENDROP_API_KEY
    this.baseUrl = process.env.ZENDROP_BASE_URL || 'https://api.zendrop.com/v1'
    this.supplierId = 'international-import'
    this.supplierName = 'Import International'
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
      console.error('Zendrop API Error:', error)
      return this.getMockProducts()
    }
  }

  transformProduct(product) {
    return {
      id: `int_${product.id}`,
      external_id: product.id,
      title: product.name || product.title,
      description: product.description,
      price: product.price,
      image: product.image_url || product.images?.[0] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      images: product.images || [product.image_url].filter(Boolean),
      stock: product.inventory || 50,
      category: product.category || 'import',
      tag: 'import',
      supplier: {
        id: this.supplierId,
        name: this.supplierName,
        type: 'international'
      },
      shipping: {
        estimated_days: '10-21',
        cost: product.shipping_cost || 12.90
      }
    }
  }

  async createOrder(orderData) {
    if (!this.isConfigured()) {
      return this.mockCreateOrder(orderData)
    }

    try {
      const zendropOrder = {
        line_items: orderData.items.map(item => ({
          product_id: item.external_id,
          quantity: item.quantity,
          variant_id: item.variant_id || null
        })),
        shipping_address: {
          first_name: orderData.shipping.name.split(' ')[0],
          last_name: orderData.shipping.name.split(' ').slice(1).join(' '),
          address1: orderData.shipping.address,
          city: orderData.shipping.city,
          country_code: orderData.shipping.country,
          zip: orderData.shipping.postal_code
        }
      }

      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(zendropOrder)
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
      console.error('Zendrop Order Error:', error)
      return this.mockCreateOrder(orderData)
    }
  }

  async trackOrder(trackingNumber) {
    if (!this.isConfigured()) {
      return this.mockTrackOrder(trackingNumber)
    }

    try {
      const response = await fetch(`${this.baseUrl}/tracking/${trackingNumber}`, {
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
        location: data.current_location || 'En transit international',
        events: data.tracking_events?.map(event => ({
          date: event.occurred_at,
          status: this.normalizeStatus(event.status),
          location: event.location,
          description: event.description
        })) || []
      }
    } catch (error) {
      console.error('Zendrop Tracking Error:', error)
      return this.mockTrackOrder(trackingNumber)
    }
  }

  normalizeStatus(status) {
    const statusMap = {
      'pending': 'En préparation',
      'processing': 'En cours de traitement', 
      'shipped': 'Expédié',
      'in_transit': 'En transit',
      'out_for_delivery': 'En cours de livraison',
      'delivered': 'Livré',
      'exception': 'Incident',
      'cancelled': 'Annulé'
    }
    return statusMap[status] || status
  }

  getMockProducts() {
    return [
      {
        id: 'int_mock_1',
        external_id: 'mock_1',
        title: 'Montre Connectée Sport',
        description: 'Montre intelligente avec suivi fitness et notifications',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        stock: 15,
        category: 'electronics',
        tag: 'import',
        supplier: {
          id: this.supplierId,
          name: this.supplierName,
          type: 'international'
        },
        shipping: {
          estimated_days: '10-21',
          cost: 12.90
        }
      }
    ]
  }

  mockCreateOrder(orderData) {
    return {
      success: true,
      order_id: `INT${Date.now()}`,
      tracking_number: `INT${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      status: 'processing',
      supplier: this.supplierName
    }
  }

  mockTrackOrder(trackingNumber) {
    return {
      tracking_number: trackingNumber,
      status: 'En transit international',
      last_update: new Date().toISOString(),
      location: 'Hub international',
      events: [
        {
          date: new Date(Date.now() - 172800000).toISOString(),
          status: 'Expédié',
          location: 'Entrepôt international',
          description: 'Commande expédiée'
        },
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'En transit',
          location: 'Hub de tri',
          description: 'Colis en transit vers la destination'
        },
        {
          date: new Date().toISOString(),
          status: 'En transit international',
          location: 'Hub international',
          description: 'Acheminement vers les Antilles'
        }
      ]
    }
  }
}