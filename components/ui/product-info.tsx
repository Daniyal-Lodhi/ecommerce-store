'use client'
import React, { useState } from 'react'
import Currency from './currency'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './button'
import useShoppingCart from '@/hooks/use-cart-storage'
import { useParams, useRouter } from 'next/navigation'
import PreventHydration from '../hydration-prevention'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    product
}) => {
    const shoppingCart = useShoppingCart();
    const [isLiked, setIsLiked] = useState(product.liked ? true : false);
    const router = useRouter();
    const addToCart = () => {
        shoppingCart.addItem(product);
    }
    const { userId } = useAuth();
    const handletoggleFav = async() => {
        try {
            setIsLiked(!isLiked)
            const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}/${userId}`
            console.log("send at server :",!isLiked)
            await axios.post(url, { liked: !isLiked })
            router.refresh();
            isLiked?toast.success("Item removed from favourites"):toast.success("Item added to favourites")


        } catch (error) {
            setIsLiked(isLiked)
            toast.error("Some error occurred")
            console.log(error);
            
        }finally{
            console.log(isLiked)
        }
    }

    const params = useParams();

    return (
        <div  >
            <PreventHydration />

            <div className='flex items-center justify-between w-full' >
                <h1 className='text-3xl font-bold' >
                    {product?.name}
                </h1>
                {params.productId && <div>
                    {isLiked ? <Button onClick={() => handletoggleFav()} title='Remove from favourite' className='border hover:bg-transparent bg-transparent' ><Heart size={18} color='red' fill='red' /> </Button>
                        : <Button onClick={() => handletoggleFav()} title='Add to favourite' className='border hover:bg-transparent bg-transparent' ><Heart size={18} color='black' /> </Button>}
                </div>}
            </div>

            <div className='mt-2 sm:mt-5 font-semibold text-xl' >
                <Currency value={product?.price} />
            </div>
            <hr className='my-5' />
            <div className={`flex flex-col justify-center  ${params.productId ? 'space-y-4' : "space-y-2"}`} >
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
