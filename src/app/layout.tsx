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
import { Toaster } from "sonner";
import { PostHogProvider } from "./_analytics/provider";

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
      <PostHogProvider>
        <html lang="en" className={GeistSans.variable}>
          <NextSSRPlugin 
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className="font-sans h-screen overflow-hidden dark">
            <SpeedInsights />
              <div className="grid grid-rows-[auto,1fr] h-full">
                <TopNav />
                <main className="overflow-y-auto">{children}</main>
              </div>
              {modal}
              <div id="modal-root" />
              <div className="bg-slate-600">
                <Toaster richColors closeButton/>
              </div>
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}