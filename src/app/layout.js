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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stowave Quality Wear Everyday",
  description: "A Premium Clothing Brand for Every Occasion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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