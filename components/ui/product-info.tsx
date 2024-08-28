'use client'
import React from 'react'
import Currency from './currency'
import preventHydration from '../hydration-prevention'
import { ShoppingCart } from 'lucide-react'
import Button from './button'
import useShoppingCart from '@/hooks/use-cart-storage'
import { useParams } from 'next/navigation'

interface ProductInfoProps {
    product: Product 
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    product
}) => {
    preventHydration();
    const shoppingCart = useShoppingCart();
    const addToCart = () => {
        shoppingCart.addItem(product);
    }

    const params = useParams();

    return (
        <div  >
            <h1 className='text-3xl font-bold' >
                {product?.name}
            </h1>

            <div className='mt-2 sm:mt-5 font-semibold text-xl' >
                <Currency value={product?.price} />
            </div>
            <hr className='my-5' />
            <div className={`flex flex-col justify-center  ${params.productId?'space-y-4':"space-y-2"}`} >
                <div className='flex items-center justify-start  gap-x-3 ' >
                    <div className={`text-gray-600 text-sm font-semibold`} >{product?.description}</div>
                </div>
                <div className='flex items-center justify-start  gap-x-3 ' >
                    <p className='font-semibold' >Color:</p>
                    <div className='h-6 w-6 rounded-full' style={{ backgroundColor: product?.color.value }} ></div>
                </div>
                <div className='flex items-center justify-start  gap-x-3 ' >
                    <p className='font-semibold' >Size:</p>
                    <p>{product?.size.name}</p>
                </div>
                <div className='flex items-center gap-x-3' >
                    <p className='font-semibold'>Category:</p>
                    <p>{product?.category.name}</p>
                </div>
                <div className='h-2' ></div>

            </div>
            <Button
                title={`${product?.quantity == 0 ? 'Out of Stock' : "add to cart"}`}
                disabled={product?.quantity == 0}
                onClick={addToCart}
                className='w-full disabled:bg-gray-600 sm:w-auto text-sm flex items-center justify-center bg-black text-white gap-x-2 '
            >
                Add To Cart
                <ShoppingCart
                    size={20}
                />
            </Button>



        </div>
    )
}

export default ProductInfo
