// // main layout

// import { Inter } from "next/font/google";
// import "./globals.css";
// import ClientLayoutWrapper from "./components/ClientLayoutWrapper"; // Naya wrapper import

// const inter = Inter({ subsets: ["latin"] });

// // Server Component metadata bilkul safe rha yahan
// export const metadata = {
//   title: "Stowave Quality Wear Everyday",
//   description: "A Premium Clothing Brand for Every Occasion",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased bg-black dark:bg-white`}>
//         {/* Poora layout system is wrapper ke andar handle hoga */}
//         <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
//       </body>
//     </html>
//   );
// }


























import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Stowave Quality Wear Everyday",
  description: "A Premium Clothing Brand for Every Occasion",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dqmjtblih/image/upload/f_auto,q_auto:best,w_800/v1787830145/slider/gccfzxvgpyedtqzvqcbe.jpg"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}