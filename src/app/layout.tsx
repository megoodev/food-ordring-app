import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "./providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import NextAuthSessionProvider from "./providers/NextAuthSessionProvider";


import { Roboto } from "next/font/google";



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
  });




export const metadata: Metadata = {
  title: "UrbanEats | Modern Food Delivery",
  description: "UrbanEats brings fresh, delicious meals to your door. Explore our menu and order your favorites online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}>
        <NextAuthSessionProvider >
        <ReduxProvider >
          <Header />
          {children}
          <Toaster position="top-center"/>
        </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
