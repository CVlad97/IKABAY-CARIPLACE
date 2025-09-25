import { createServerClient } from '@/lib/supabaseServer'
import { z } from 'zod'

const ProductSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  price: z.coerce.number().positive(),
  image: z.string().url().optional(),
  description: z.string().optional(),
  tag: z.enum(['local', 'import']).optional(),
  category: z.string().optional(),
  stock: z.coerce.number().int().min(0).optional().default(100)
})

export async function POST(request) {
  try {
    const { rows } = await request.json()
    
    if (!Array.isArray(rows)) {
      return Response.json({ error: 'Format invalide' }, { status: 400 })
    }

    const supabase = createServerClient()
    if (!supabase) {
      return Response.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    let inserted = 0
    let updated = 0
    const errors = []

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      
      try {
        // Valider les données
        const validatedData = ProductSchema.parse(row)
        
        // Upsert le produit
        const { data, error } = await supabase
          .from('products')
          .upsert(validatedData, {
            onConflict: 'slug',
            ignoreDuplicates: false
          })
          .select()

        if (error) {
          errors.push({
            row: i + 1,
            message: error.message
          })
        } else {
          // Déterminer si c'est un insert ou update
          if (data && data.length > 0) {
            const now = new Date()
            const createdAt = new Date(data[0].created_at)
            const diffMs = now - createdAt
            
            if (diffMs < 1000) { // Créé il y a moins d'1 seconde
              inserted++
            } else {
              updated++
            }
          }
        }
      } catch (validationError) {
        errors.push({
          row: i + 1,
          message: validationError.message
        })
      }
    }

    // Log de l'import
    await supabase
      .from('event_logs')
      .insert({
        event: 'csv_import',
        payload: {
          total_rows: rows.length,
          inserted,
          updated,
          errors: errors.length
        }
      })

    return Response.json({
      inserted,
      updated,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Erreur import:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}