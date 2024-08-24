'use client'

import useShoppingCart from '@/hooks/use-cart-storage'
import { useEffect } from 'react';

export const revalidate =false ;


const ConfigureOutOfStockItem = ({productIds}:{productIds:string[]}) => {
    const {addStockOutItems,stockedOutItems} = useShoppingCart();
    useEffect(()=>{
        addStockOutItems(productIds);
        console.log("stockedOutItems",stockedOutItems)
    },[])
    return null
}

export default ConfigureOutOfStockItem
