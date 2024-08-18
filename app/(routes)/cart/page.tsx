'use client'

import CartItem from '@/components/cart-item'
import OrderSummary from '@/components/order-summary'
import { Container } from '@/components/ui/container'
import useShoppingCart from '@/hooks/use-cart-storage'
import React, { useState } from 'react'

const Cart = () => {
    const items = useShoppingCart();
    const products: Product[] = items.items;
    const [loading,setLoading] = useState(false);

    return (
        <div className='bg-white'>
            <Container>

                <div className='p-4 sm:p-6 lg:p-8' >
                    <h1 className='font-bold text-3xl mb-6 sm:mb-8' >Shopping Cart</h1>
                    <div className='flex gap-4 w-full flex-col sm:flex-row' >
                        <div className='sm:w-[70%] ' >
                            {
                                products.length == 0 && 
                                <div className='mx-auto text-gray-600'>No items in the cart.</div>
                            }
                            {
                                products.map((item)=>(
                                    <CartItem item={item} key={item.id} loading={loading}  />
                                ))
                            }
                        </div>
                        {/* info */}
                        <div className='sm:w-[30%]'>
                            <OrderSummary item={products} loading={loading} setLoading={setLoading} />
                        </div>


                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Cart
