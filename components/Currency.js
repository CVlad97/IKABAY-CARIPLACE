import { formatPrice } from '@/lib/utils'

export default function Currency({ amount, className = '' }) {
  return (
    <span className={className}>
      {formatPrice(amount)}
    </span>
  )
}