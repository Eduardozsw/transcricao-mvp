import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";


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

      <html lang="ptbr">
        <body className={`${inter.className} ${inter.className} antialiased`}>
          <SignedOut>
              <SignIn routing="hash"/>
            </SignedOut>
          <SignedIn>
            <Navbar />

            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
