'use client'

import useShoppingCart from '@/hooks/use-cart-storage'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/use-auth'
import preventHydration from './hydration-prevention'
import { GetDate } from '@/actions/getDate'
import CheckoutForm from './ui/checkout-form'


interface OrderSummaryProps {
    item: Product[]
    loading: boolean
    setLoading: (value: boolean) => void

}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    loading,
    setLoading

}) => {
    preventHydration();
    const { userId } = useAuth();
    const deliveryDate = GetDate(5);



    const [paymentType, setPaymentType] = useState('COD')
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

    }, [removeAll, searchParams])




    const handlePayment = (type: string) => {
        setPaymentType(type)
    }

    const ButtonMessage = paymentType === "COD" ? "Confirm order" : "Checkout"

    return (
        <div className='py-5 px-4 bg-slate-50 rounded-md  '>
            <div className='font-semibold text-lg border-b border-gray-200 pb-4 mb-6 text-gray-900' >
                Order Summary
            </div>
            { items.length<=0 ? <div className='flex items-center text-gray-600 ' >You can see your order summary here once you fill the cart. </div> : 
            <div className='flex flex-col space-y-2 text-sm justify-center' >
                <div className='flex w-full justify-between'>
                    <div  >
                        Duration
                    </div>
                    <div  >
                        5 work days
                    </div>
                </div>
                <div className='flex w-full justify-between'>
                    <div  >
                        delivery date
                    </div>
                    <div  >
                        {deliveryDate}
                    </div>
                </div>
                <div className='flex w-full justify-between'>
                    <div  >
                        Payment type
                    </div>
                    <div >
                        <div className='flex items-center space-x-2' >
                            <button onClick={() => handlePayment('COD')} className={`rounded-md border text-sm py-1 px-2 ${paymentType == 'COD' ? 'bg-black text-white' : ""} `} >
                                COD
                            </button>
                            <button onClick={() => handlePayment('Card')} className={`rounded-md border text-sm py-1 px-2 ${paymentType == 'Card' ? 'bg-black text-white' : ""} `} >
                                Card
                            </button>
                        </div>
                    </div>

                </div>
                <div >
                    <div className='flex items-center ' >
                        <CheckoutForm
                            ButtonMessage={ButtonMessage}
                            totalPrice={totalPrice}
                            loading={loading}
                            userId={userId!}
                            items={items}
                            setLoading = {setLoading}
                            paymentType={paymentType}
                        />
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default OrderSummary
