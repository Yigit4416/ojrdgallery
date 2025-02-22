import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import React from "react";

export const metadata: Metadata = {
  title: "Ojrd Gallery",
  description: "Made by Ojrd",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.variable}>
        <body className="font-sans">
          <NextSSRPlugin 
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <SpeedInsights />
          <TopNav />
          {children}
          {modal}
        </body>
      </html>
    </ClerkProvider>
  );
}