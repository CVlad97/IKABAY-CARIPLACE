import { NextResponse } from 'next/server'
import { DropshippingManager } from '@/lib/dropshipping/DropshippingManager.js'

export async function GET(request, { params }) {
  try {
    const trackingNumber = params.number
    
    if (!trackingNumber) {
      return NextResponse.json({
        success: false,
        error: 'Numéro de suivi manquant'
      }, { status: 400 })
    }
    
    const manager = new DropshippingManager()
    const trackingInfo = await manager.trackOrder(trackingNumber)
    
    return NextResponse.json({
      success: true,
      tracking: trackingInfo
    })
  } catch (error) {
    console.error('Erreur API suivi:', error)
    return NextResponse.json({
      success: false,
      error: 'Numéro de suivi non trouvé ou erreur de récupération'
    }, { status: 404 })
  }
}