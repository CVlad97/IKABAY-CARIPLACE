export default function Stars({ rating, size = 20, className = '' }) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="text-caribbean-yellow" style={{ fontSize: size }}>
          ★
        </span>
      )
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="text-caribbean-yellow" style={{ fontSize: size }}>
          ☆
        </span>
      )
    } else {
      stars.push(
        <span key={i} className="text-gray-300" style={{ fontSize: size }}>
          ☆
        </span>
      )
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      {stars}
    </div>
  )
}