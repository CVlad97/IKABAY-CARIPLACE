import { createServerClient } from '@/lib/supabaseServer'
import { z } from 'zod'

const UpdateSchema = z.object({
  slug: z.string().min(1),
  stock: z.coerce.number().int().min(0).optional(),
  price: z.coerce.number().positive().optional()
})

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Valider les données
    const { slug, stock, price } = UpdateSchema.parse(body)
    
    const supabase = createServerClient()
    if (!supabase) {
      return Response.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    // Préparer les données à mettre à jour
    const updateData = {}
    if (stock !== undefined) updateData.stock = stock
    if (price !== undefined) updateData.price = price

    if (Object.keys(updateData).length === 0) {
      return Response.json({ error: 'Aucune donnée à mettre à jour' }, { status: 400 })
    }

    // Mettre à jour le produit
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('slug', slug)
      .select()

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    if (!data || data.length === 0) {
      return Response.json({ error: 'Produit non trouvé' }, { status: 404 })
    }

    // Log de la mise à jour
    await supabase
      .from('event_logs')
      .insert({
        event: 'erp_update',
        payload: {
          slug,
          updated_fields: updateData,
          product_id: data[0].id
        }
      })

    return Response.json({
      success: true,
      product: data[0]
    })

  } catch (error) {
    console.error('Erreur webhook ERP:', error)
    
    if (error.name === 'ZodError') {
      return Response.json({ 
        error: 'Données invalides',
        details: error.errors 
      }, { status: 400 })
    }

    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}