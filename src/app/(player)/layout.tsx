import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "~/styles/globals.css";
import "~/styles/vidstack.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Watching - Movies App",
  description: "Enjoy your movie",
};

// This is a completely separate root layout for the player experience
export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen overflow-hidden bg-black">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
