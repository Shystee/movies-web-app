import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "~/components/app-sidebar";
import { BreadcrumbNav } from "~/components/breadcrumb-nav";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Browse and watch movies",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="relative z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
