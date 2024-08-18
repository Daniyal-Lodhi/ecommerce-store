'use client'

import useShoppingCart from '@/hooks/use-cart-storage'
import React, { useEffect } from 'react'
import Button from './ui/button'
import Currency from './ui/currency'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'


interface OrderSummaryProps {
    item: Product[]
    loading: boolean
    setLoading: (value: boolean) => void

}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    item,
    loading,
    setLoading

}) => {

    const searchParams = useSearchParams();
    const shoppingCart = useShoppingCart();
    const { removeAll, items } = shoppingCart;
    const totalPrice = items.reduce((totalPrice, CartItem) => (
        totalPrice + Number(CartItem.price)
    ), 0);

    // useEffect to reflect changes after a checkout succeeded or failed
    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success("Payment complete.")
            removeAll();
        }

        else if (searchParams.get('cancelled')) {
            toast.error("Something went wrong")
        }

    }, [removeAll,searchParams])


    const onCheckout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                productIds: shoppingCart.items.map((item) => item.id)
            });

            window.location.href = res.data.url;
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className='py-5 px-4 bg-slate-50 rounded-md  '>
            <div className='font-semibold text-lg border-b border-gray-200 pb-4 mb-6 text-gray-900' >
                Order Summary
            </div>
            <div className='flex font-semibold mt-3 mb-8 w-full justify-between'>
                <div  >
                    Order total
                </div>
                <Currency value={totalPrice} />
            </div>
            <Button disabled={loading} onClick={onCheckout} className='text-white  disabled:bg-gray-700 w-full text-center mx-auto flex justify-center' >
                Checkout
            </Button>
        </div>
    )
}

export default OrderSummary
