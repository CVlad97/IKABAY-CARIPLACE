import { NextResponse } from 'next/server'
import { DropshippingManager } from '@/lib/dropshipping/DropshippingManager.js'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(request) {
  try {
    const orderData = await request.json()
    
    // Validation basique
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Aucun article dans la commande'
      }, { status: 400 })
    }
    
    if (!orderData.shipping) {
      return NextResponse.json({
        success: false,
        error: 'Adresse de livraison manquante'
      }, { status: 400 })
    }
    
    const manager = new DropshippingManager()
    const results = await manager.createOrder(orderData)
    
    // Sauvegarder la commande dans Supabase si configuré
    const supabase = supabaseServer()
    if (supabase) {
      try {
        const { data: order, error } = await supabase
          .from('orders')
          .insert({
            email: orderData.customer?.email || 'client@ikabay.com',
            items: orderData.items,
            total: orderData.total || 0,
            status: 'processing',
            payment_method: orderData.payment_method || 'card',
            reference: orderData.reference || `IKB-${Date.now()}`,
            supplier_orders: results
          })
          .select()
          .single()
        
        if (error) {
          console.error('Erreur sauvegarde Supabase:', error)
        }
      } catch (dbError) {
        console.error('Erreur base de données:', dbError)
      }
    }
    
    return NextResponse.json({
      success: true,
      results,
      order_reference: orderData.reference || `IKB-${Date.now()}`
    })
  } catch (error) {
    console.error('Erreur API commande dropshipping:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la création de la commande'
    }, { status: 500 })
  }
}