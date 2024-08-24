'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Iconbutton from './ui/icon-button'
import useShoppingCart from '@/hooks/use-cart-storage'
import Currency from './ui/currency'
import Badge from './ui/badge'

export const revalidate =false ;

interface CartItemProps {
    item: Product
    loading: boolean
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    loading,
}) => {
    const shoppingCart = useShoppingCart();
    const onRemoveItem = () => {
        shoppingCart.removeItem(item.id);
    }

    const stockedOutItems = shoppingCart.stockedOutItems;
    // console.log("stockedOutItems",stockedOutItems)
    return (
        <div className='flex relative gap-4 my-4  border-b pb-6' >
            <div>

                <div className=' relative w-24 h-24 sm:h-48 sm:w-48'>
                    <Image
                        src={item?.images?.[0].imageUrl}
                        alt=''
                        fill
                        className='rounded-md h-full object-cover  bg-cover '
                    />
                </div>
            </div>
            <div className='grid md:grid-cols-2 grid-rows-2 gap-y-2 md:gap-y-0  w-full h-min ' >
                <div className='font-semibold  text-xl ' >
                    {item.name}

                </div>
                <div className=' flex  justify-between gap-x-4 sm:gap-x-6 text-slate-600 md:mt-1   ' >
                    <div className='flex gap-4  relative ' >
                        <div>
                            {item.color.name}
                        </div>
                        <div>
                            |
                        </div>
                        <div>
                            {item.size.name}
                        </div>
                    </div>

                </div>

                <div>
                    <Currency value={item.price} />

                </div>

            </div>
            <div className='absolute  left-0 ' >
                { stockedOutItems.includes(item.id)  && <Badge title='Out of Stock' />}
            </div>
            <Iconbutton
                disabled={loading}
                onclick={onRemoveItem}
                className='h-min disabled:hover:scale-100 absoulte disabled:cursor-not-allowed -top-10 right-0'
                icon={<X size={15} />}
            />
            
        </div>
    )
}

export default CartItem
