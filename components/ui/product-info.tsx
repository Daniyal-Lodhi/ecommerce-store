'use client'
import React from 'react'
import Currency from './currency'
import preventHydration from '../hydration-prevention'
import { ShoppingCart } from 'lucide-react'
import Button from './button'
import useShoppingCart from '@/hooks/use-cart-storage'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    product
}) => {
    preventHydration();
    const shoppingCart = useShoppingCart();
    const addToCart = ()=>{
        shoppingCart.addItem(product);
    }

    return (
        <div  >
            <h1 className='text-3xl font-bold' >
                {product.name}
            </h1>
            <div className='mt-2 sm:mt-5 font-semibold text-xl' >
                <Currency value={product.price} />
            </div>
            <hr className='my-5' />
            <div className='flex flex-col justify-center space-y-2' >
                <div className='flex items-center justify-start  gap-x-3 ' >
                    <p className='font-semibold' >Color:</p>
                    <div className='h-6 w-6 rounded-full' style={{ backgroundColor: product.color.value }} ></div>
                </div>
                <div className='flex items-center justify-start  gap-x-3 ' >
                    <p className='font-semibold' >Size:</p>
                    <p>{product.size.name}</p>
                </div>
                <div className='flex items-center gap-x-3' >
                    <p className='font-semibold'>Category:</p>
                    <p>{product.category.name}</p>
                </div>
                <div className='h-2' ></div>

            </div>
            <Button onClick={addToCart} className='w-full sm:w-auto text-sm flex items-center justify-center bg-black text-white gap-x-2 ' >
                Add To Cart
                <ShoppingCart
                    size={20}
                />
            </Button>



        </div>
    )
}

export default ProductInfo
