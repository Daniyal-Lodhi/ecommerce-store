'use client'

import { ShoppingBag } from "lucide-react"
import Button from "../ui/custom-button"
import useShoppingCart from "@/hooks/use-cart-storage"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import SearchBar from "./search-bar"

interface NavbarActionsProps {
    onClose?: () => void,
    searchBarData:Product[]
}

const NavbarActions: React.FC<NavbarActionsProps> = ({
    onClose,
    searchBarData,
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    const shoppingCart = useShoppingCart();
    const router = useRouter();
    const onNavigate = () => {
        if (onClose) {
            onClose();
        }
        router.push('/cart')
    }
    return (
        <div className="flex justify-between items-center " >
            <div className="flex items-center gap-x-4">
                <SearchBar searchBarData={searchBarData} />
                {mounted && <Button onClick={onNavigate}  >
                    <ShoppingBag
                        size={20}
                        color="white"
                    />
                    <span className="ml-2 text-white " >
                        {shoppingCart.items.length}
                    </span>


                </Button>
                }

            </div>

        </div>
    )

}



export default NavbarActions