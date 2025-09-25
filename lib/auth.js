import { supabase } from './supabaseClient'

export async function requireAuth() {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { user: null, isAdmin: false }
  }
  
  const allowedAdmins = process.env.ALLOWED_ADMINS?.split(',') || []
  const isAdmin = allowedAdmins.includes(user.email)
  
  return { user, isAdmin }
}

export function isConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}