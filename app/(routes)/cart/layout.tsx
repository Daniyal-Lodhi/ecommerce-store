import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Cart",
    description: "Flash Store Cart"
}


export default function CartLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {


    return (
        <>
            {children}
        </>
    )
}