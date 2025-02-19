import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from "@clerk/nextjs";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Ojrd Gallery",
  description: "Made by Ojrd",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
// justify-between sayesinde bu iki div arası açıldı
function TopNav() {
  return(
    <nav className="flex items-center justify-between p-4 text-xl 
    font-semibold border-b p-4">
      <div>Ojrd Gallery</div>
      <div>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <SpeedInsights/>
        <body className="font-sans flex flex-col gap-4">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
