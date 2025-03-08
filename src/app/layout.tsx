import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies Web App",
  description: "App for browsing and watching movies",
};

// This layout is intentionally empty as we're using route groups
// Each route group has its own root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
