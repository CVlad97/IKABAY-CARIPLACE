import { AutoDSAdapter } from './AutoDSAdapter.js'
import { ZendropAdapter } from './ZendropAdapter.js'

/**
 * Gestionnaire unifié des fournisseurs dropshipping
 * Masque complètement les APIs sous des noms génériques
 */
export class DropshippingManager {
  constructor() {
    this.adapters = {
      'european-supplier': new AutoDSAdapter(),
      'international-import': new ZendropAdapter()
    }
  }

  async getAllProducts() {
    const allProducts = []
    
    for (const [supplierId, adapter] of Object.entries(this.adapters)) {
      try {
        const products = await adapter.getProducts()
        allProducts.push(...products)
      } catch (error) {
        console.error(`Erreur produits ${supplierId}:`, error)
      }
    }
    
    return allProducts
  }

  async getProductsBySupplier(supplierId) {
    const adapter = this.adapters[supplierId]
    if (!adapter) {
      throw new Error(`Fournisseur non trouvé: ${supplierId}`)
    }
    
    return await adapter.getProducts()
  }

  async createOrder(orderData) {
    const results = []
    
    // Grouper les items par fournisseur
    const itemsBySupplier = this.groupItemsBySupplier(orderData.items)
    
    for (const [supplierId, items] of Object.entries(itemsBySupplier)) {
      const adapter = this.adapters[supplierId]
      if (!adapter) continue
      
      try {
        const supplierOrder = {
          ...orderData,
          items
        }
        
        const result = await adapter.createOrder(supplierOrder)
        results.push({
          supplier_id: supplierId,
          supplier_name: adapter.supplierName,
          ...result
        })
      } catch (error) {
        console.error(`Erreur commande ${supplierId}:`, error)
        results.push({
          supplier_id: supplierId,
          success: false,
          error: error.message
        })
      }
    }
    
    return results
  }

  async trackOrder(trackingNumber) {
    // Déterminer le fournisseur par le préfixe du tracking
    let adapter = null
    
    if (trackingNumber.startsWith('EU')) {
      adapter = this.adapters['european-supplier']
    } else if (trackingNumber.startsWith('INT')) {
      adapter = this.adapters['international-import']
    }
    
    if (!adapter) {
      // Essayer tous les adapters si le préfixe n'est pas reconnu
      for (const adapterInstance of Object.values(this.adapters)) {
        try {
          const result = await adapterInstance.trackOrder(trackingNumber)
          if (result.tracking_number) {
            return result
          }
        } catch (error) {
          continue
        }
      }
      throw new Error('Numéro de suivi non trouvé')
    }
    
    return await adapter.trackOrder(trackingNumber)
  }

  groupItemsBySupplier(items) {
    const grouped = {}
    
    items.forEach(item => {
      const supplierId = this.getSupplierIdFromProduct(item.id)
      if (!grouped[supplierId]) {
        grouped[supplierId] = []
      }
      grouped[supplierId].push(item)
    })
    
    return grouped
  }

  getSupplierIdFromProduct(productId) {
    if (productId.startsWith('eu_')) {
      return 'european-supplier'
    } else if (productId.startsWith('int_')) {
      return 'international-import'
    }
    return 'european-supplier' // Par défaut
  }

  getAvailableSuppliers() {
    return Object.keys(this.adapters).map(id => ({
      id,
      name: this.adapters[id].supplierName,
      type: this.adapters[id].supplier?.type || 'international'
    }))
  }
}