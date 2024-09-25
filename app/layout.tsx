import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ProductModalProvider from "@/providers/product-modal-provider";
import ToastProvider from "@/providers/toast-provider";
import ConfigureOutOfStockItem from "@/actions/ConfigureOutOfStockItem";
import getProducts from "@/actions/get-products";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import SetAuth from "@/actions/setAuth";
import Navbar from "@/components/Navbar/navbar";

const font = Urbanist({ subsets: ["latin"] });

let title = "Flash Store";

export const metadata: Metadata = {
  title: {
    template: `${title} | %s`, // Template for dynamic title
    default: `${title} `, // Absolute title
  },
  description: "Flash Store 2024",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const outOfStockProducts: (Product[] | null) = await getProducts({ quantity: 0 });
  const outOfStockProductsId =  outOfStockProducts && Array.isArray(outOfStockProducts) && outOfStockProducts.map((product) => product.id);
  const { userId } = auth();
  // console.log(userId)
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToastProvider />
          <ProductModalProvider />
          <Navbar />
          {/* <LoaderProvider/> */}
          {children}
          <Footer />
          {outOfStockProductsId && Array.isArray(outOfStockProducts) && <ConfigureOutOfStockItem productIds={outOfStockProductsId} />}
          <SetAuth userId={userId} />
        </body>
      </html>
    </ClerkProvider>
  );
}
