import { NextResponse } from 'next/server'
import { DropshippingManager } from '@/lib/dropshipping/DropshippingManager.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const supplier = searchParams.get('supplier')
    
    const manager = new DropshippingManager()
    
    let products = []
    if (supplier) {
      products = await manager.getProductsBySupplier(supplier)
    } else {
      products = await manager.getAllProducts()
    }
    
    return NextResponse.json({
      success: true,
      products,
      total: products.length
    })
  } catch (error) {
    console.error('Erreur API produits dropshipping:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des produits',
      products: []
    }, { status: 500 })
  }
}