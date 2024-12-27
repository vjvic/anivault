import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import QueryProvider from "@/providers/QueryProvider";
import ProgressProvider from "@/providers/ProgressProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AniVault - Explore the Best Anime",
  description:
    "AniVault offers the best anime titles. Browse and discover anime of all genres.",
  keywords: "anime, anivault, best anime, popular anime, anime genres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased flex`}>
        <ProgressProvider />
        <QueryProvider>
          <SidebarProvider>
            <div className="flex w-full min-h-screen">
              <AppSidebar />
              <main className="flex flex-col w-full">
                <header className="p-4 border-b">
                  <SidebarTrigger />
                </header>
                <div className="flex-grow">{children}</div>
              </main>
            </div>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
