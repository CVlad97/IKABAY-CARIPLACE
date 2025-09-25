'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Mail, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!supabase) {
      setMessage('Supabase non configuré')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        setMessage(`Erreur: ${error.message}`)
      } else {
        setMessage('Lien de connexion envoyé ! Vérifiez votre email.')
      }
    } catch (error) {
      setMessage('Erreur lors de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-caribbean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-caribbean-blue" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-caribbean-dark mb-2">
              Connexion Admin
            </h1>
            <p className="text-gray-600">
              Accédez au dashboard Ikabay
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="admin@ikabay.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                'Envoi en cours...'
              ) : (
                <>
                  Envoyer le lien de connexion
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg text-sm ${
              message.includes('Erreur') 
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Un lien de connexion sera envoyé à votre adresse email.
              <br />
              Cliquez sur le lien pour vous connecter automatiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}