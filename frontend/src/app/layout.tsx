import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Footer from "@/components/Footer";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Transkritor",
  description: "Site para transcrever áudio em texto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={`${inter.className} antialiased`}>
          <Navbar />
          

            {children}
          
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
