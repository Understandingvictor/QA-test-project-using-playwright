import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"; // 1. Import the local font module
import { ThemeProvider } from "@/component/theme-provider";
import "./globals.css";

// Configure your primary font (e.g., for body text)
const pop1 = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Bold.ttf", // Adjust path to your regular font file
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pop1", // Defines the CSS variable name
});

// 3. Configure your secondary font (e.g., for titles/headings)
const pop2 = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf", // Adjust path to your bold heading font file
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pop2", // Defines a different CSS variable name
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Victor's corner",
  description: "created by me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${pop1.variable} ${pop2.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
