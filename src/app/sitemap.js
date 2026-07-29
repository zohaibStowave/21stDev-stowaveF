export default async function sitemap() {
  const baseUrl = 'https://stowave.com';

  // Footer aur Navbar dono files ke saare active pages ka amalgamation
  const routes = [
    '', // Home page
    '/regularFitt',
    '/overSized',
    '/sweatShirt',
    '/collections/ezzywalk',
    '/collections/stowave',
    '/aboutUs',
    '/contactUs',
    '/profile',
    '/signUp',
    '/bag',
    '/overview',
    '/pricing',
    '/marketplace',
    '/features',
    '/team',
    '/careers',
    '/help',
    '/privacy-policy',
    '/return-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly', // Home page rozana aur baqi pages har hafte check honge
    priority: route === '' ? 1.0 : 0.8, // Main page ko sab se zyada importance di hai
  }));
}
