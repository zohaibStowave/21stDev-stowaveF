// Server Component — no "use client" directive
// This allows Next.js to SSR the page shell for better LCP and Time to First Byte
import HomePageClient from "./HomePageClient";

export default function Page() {
  return <HomePageClient />;
}