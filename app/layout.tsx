import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductModalProvider from "@/providers/product-modal-provider";
import ToastProvider from "@/providers/toast-provider";
import ConfigureOutOfStockItem from "@/actions/ConfigureOutOfStockItem";
import getProducts from "@/actions/get-products";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import SetAuth from "@/actions/setAuth";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const outOfStockProducts = await getProducts({ quantity: 0 });
  const outOfStockProductsId = outOfStockProducts.map((product) => product.id);

  const {userId} = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToastProvider />
          <ProductModalProvider />
          <Navbar />
          {children}
          <Footer />
          <ConfigureOutOfStockItem productIds={outOfStockProductsId} />
          <SetAuth userId={userId} />
        </body>
      </html>
    </ClerkProvider>
  );
}
