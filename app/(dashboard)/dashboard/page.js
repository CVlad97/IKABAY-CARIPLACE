'use client'

import { requireAuth } from '@/lib/auth'
import { createServerClient } from '@/lib/supabaseServer'
import { formatPrice, getTimeAgo } from '@/lib/utils'
import { redirect } from 'next/navigation'

async function getOrders() {
  const supabase = createServerClient()
  if (!supabase) return []

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  return orders || []
}

async function getStats() {
  const supabase = createServerClient()
  if (!supabase) return { totalOrders: 0, totalRevenue: 0, pendingOrders: 0 }

  const { data: orders } = await supabase
    .from('orders')
    .select('total, status')

  if (!orders) return { totalOrders: 0, totalRevenue: 0, pendingOrders: 0 }

  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + Number(order.total), 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length
  }
}

export default async function DashboardPage() {
  const { user, isAdmin } = await requireAuth()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p className="text-gray-600">Vous n'avez pas les permissions pour accéder à cette page.</p>
      </div>
    )
  }

  const orders = await getOrders()
  const stats = await getStats()

  const updateOrderStatus = async (orderId, status) => {
    'use server'
    
    const supabase = createServerClient()
    if (!supabase) return

    await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    // Log event
    await supabase
      .from('event_logs')
      .insert({
        event: 'update_status',
        payload: { order_id: orderId, status }
      })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-caribbean-dark mb-2">
          Dashboard Admin
        </h1>
        <p className="text-gray-600">
          Bienvenue {user.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="text-2xl font-bold text-caribbean-blue mb-2">
            {stats.totalOrders}
          </div>
          <div className="text-gray-600">Commandes totales</div>
        </div>
        
        <div className="card p-6">
          <div className="text-2xl font-bold text-caribbean-green mb-2">
            {formatPrice(stats.totalRevenue)}
          </div>
          <div className="text-gray-600">Chiffre d'affaires</div>
        </div>
        
        <div className="card p-6">
          <div className="text-2xl font-bold text-caribbean-yellow mb-2">
            {stats.pendingOrders}
          </div>
          <div className="text-gray-600">En attente</div>
        </div>
      </div>

      {/* Orders */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-caribbean-dark mb-6">
          Commandes récentes
        </h2>
        
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Aucune commande pour le moment
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Référence</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Total</th>
                  <th className="text-left py-3">Statut</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 font-mono text-sm">
                      {order.reference}
                    </td>
                    <td className="py-3">{order.email}</td>
                    <td className="py-3 font-semibold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3">
                      <span className={`badge ${
                        order.status === 'paid' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-caribbean-green/10 text-caribbean-green' :
                        order.status === 'refunded' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {getTimeAgo(order.created_at)}
                    </td>
                    <td className="py-3">
                      <select
                        defaultValue={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}