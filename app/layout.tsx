import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Agdasima } from "next/font/google";
import { SessionProvider } from "next-auth/react";
// import { PrismaClient } from "@prisma/client";
import "./globals.css";

import AppProvider from "@/providers/AppProvider";

import NavBar from "@/components/NavBar/NavBar.component";
import BottomNav from "@/components/BottomNav/BottomNav.component";
import FilterOptionsProvider from "@/providers/FilterOptions/FilterOptions.Provider";
// import { browseData } from "@/data/data";

const agdasima = Agdasima({
  weight: "400",
  subsets: ["latin", "latin-ext"]
})

export const metadata: Metadata = {
  title: "Barefeet Travels"
};

// const populatePrisma = async() => {
//   const prisma = new PrismaClient();

//   const response = await prisma.products.createMany({data: [...browseData]});
//   console.log(response);

// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // populatePrisma();

  return (
    <html lang="en">
      <AppProvider>
        <SessionProvider>
          <body
            className={`${agdasima.className} antialiased relative w-screen h-screen`}
          >
            <script
              type="module"
              defer
              src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
            ></script>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
              <FilterOptionsProvider>
                <NavBar/>
                {children}
                <BottomNav/>
              </FilterOptionsProvider>
            </ThemeProvider>
          </body>
        </SessionProvider>
      </AppProvider>
    </html>
  );
}
