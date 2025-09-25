export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikabay.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Disallow admin pages
Disallow: /dashboard
Disallow: /import
Disallow: /api/

# Allow important pages
Allow: /
Allow: /products
Allow: /product/
Allow: /vendors
Allow: /partners`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}