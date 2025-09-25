import { createServerClient } from '@/lib/supabaseServer'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikabay.com'
  
  const supabase = createServerClient()
  let products = []
  
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('slug, created_at')
      .order('created_at', { ascending: false })
    
    products = data || []
  }

  const staticPages = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: '/products',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: '/vendors',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: '/partners',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ]

  const productPages = products.map(product => ({
    url: `/product/${product.slug}`,
    lastModified: product.created_at,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  const allPages = [...staticPages, ...productPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}