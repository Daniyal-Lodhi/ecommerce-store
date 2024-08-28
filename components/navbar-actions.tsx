'use client'

import { LogIn, ShoppingBag } from "lucide-react"
import Button from "./ui/button"
import useShoppingCart from "@/hooks/use-cart-storage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const NavbarActions = () => {
    const [mounted,setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    },[])
    const shoppingCart = useShoppingCart();
    const router = useRouter();
    return (
        <div className="ml-auto flex items-center gap-x-4">
            { mounted && <Button onClick={() => router.push('/cart')}  >
                <ShoppingBag
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-white " >
                    {shoppingCart.items.length}
                </span>


            </Button>}
            
        </div>
    )

}



export default NavbarActions