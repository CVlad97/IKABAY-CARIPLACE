import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      referralCode: null,
      
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity }]
          })
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        })
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
      
      setReferralCode: (code) => {
        set({ referralCode: code })
      }
    }),
    {
      name: 'ikabay-cart',
    }
  )
)

export const useLoyaltyStore = create(
  persist(
    (set) => ({
      points: 0,
      email: null,
      
      setPoints: (points, email) => {
        set({ points, email })
      },
      
      addPoints: (points) => {
        set(state => ({ points: state.points + points }))
      }
    }),
    {
      name: 'ikabay-loyalty',
    }
  )
)