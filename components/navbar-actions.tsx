'use client'

import { LogIn, ShoppingBag } from "lucide-react"
import Button from "./ui/button"
import useShoppingCart from "@/hooks/use-cart-storage"
import { redirect, useRouter } from "next/navigation"



const NavbarActions = () => {
    const shoppingCart = useShoppingCart();
    const router = useRouter();
    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button onClick={() => router.push('/cart')}  >
                <ShoppingBag
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-white " >
                    {shoppingCart.items.length}
                </span>


            </Button>
            
        </div>
    )

}



export default NavbarActions