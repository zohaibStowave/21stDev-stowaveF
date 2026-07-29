export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Aap ka lamba admin route yahan block kar diya hai
      disallow: [
        '/i/t/s/a/d/m/i/n/admin', 
        '/api'
      ], 
    },
    sitemap: 'https://stowave.com',
  }
}
