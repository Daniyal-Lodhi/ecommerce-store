'use client'

import Image from "next/image";
import React, { MouseEventHandler, useState } from "react";
import Iconbutton from "../ui/icon-button";
import { Expand, Heart, ShoppingCart, Star } from "lucide-react";
import preventHydration from "../hydration-prevention";
import Currency from "../ui/currency";
import { usePathname, useRouter } from "next/navigation";
import PreviewModal from "../preview-modal";
import usePreviewModal from "@/hooks/use-preview-modal";
import useShoppingCart from "@/hooks/use-cart-storage";
import Badge from "../ui/badge";
import PreventHydration from "../hydration-prevention";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";
import RatingStars from "./rating-stars";

interface productCardProps {
    product: Product
}

const ProductCard: React.FC<productCardProps> = ({
    product
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const previewModal = usePreviewModal();
    const shoppingCart = useShoppingCart();
    const [isLiked, setIsLiked] = useState(true);


    const handleClick = () => {
        router.push(`/product/${product?.id}`)
    }
    const { userId } = useAuth();
    const handletoggleFav = async (productId: string, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent navigation to the product page

        try {
            if (!userId) {
                router.push(`/sign-in?redirectUrl=${window.location.href}`)
            } else {
                setIsLiked(!isLiked)
                toast.success("Item removed from favourites")
                // throw new Error()
                const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/${userId}`
                console.log("send at server :", !isLiked)
                await axios.post(url, { liked: !isLiked })
                router.refresh();
            }

        } catch (error) {
            setIsLiked(isLiked)
            toast.error("Some error occurred while removing the item")
            console.log(error);

        } finally {
            console.log(isLiked)
        }
    }

    const previewProductModal: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(product);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        shoppingCart.addItem(product);
    }

    const rating = pathname !== '/favlist' && product.productRating.stars / product.productRating.count; // Calculate the average rating

    // Create an array of 5 stars
    // const starElements = Array.from({ length: 5 }, (_, index) => {
    //     const fillColor = index < Math.round(rating) ? 'yellow' : 'gray'; // Fill stars based on the rating
    //     return <Star    key={index} size={15}   fill={fillColor} color={fillColor} />;
    // });

    return (
        <>
            <PreventHydration />

            <div
                onClick={handleClick}
                // onClick={pathname == '/favlist' ? undefined : handleClick}
                className="bg-white border rounded-xl p-3 group cursor-pointer space-y-1 " >
                <div
                    onClick={handleClick}
                    // onClick={pathname === '/favlist' ? handleClick : undefined}
                    className="aspect-square  relative rounded-xl bg-gray-100" >
                    <Image
                        src={product?.images?.[0]?.imageUrl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Image"
                        className=" object-cover rounded-md aspect-square"
                    />
                    <div className="absolute hidden sm:flex justify-center gap-x-6 items-center bottom-5 px-6 opacity-0 group-hover:opacity-100 w-full" >
                        <Iconbutton
                            onclick={previewProductModal}
                            icon={<Expand
                                size={20}
                                className="text-gray-600"
                            />} />

                        <Iconbutton
                            disabled={product.quantity == 0}
                            title={`${product.quantity == 0 ? 'Out of Stock' : "add to cart"}`}
                            onclick={onAddToCart}
                            icon={<ShoppingCart
                                size={20}
                                className="text-gray-600"
                            />} />
                    </div>
                </div>
                <div>
                    <div className="flex mt-3  gap-y-2 justify-between items-start">
                        <div className="w-auto" >
                            <div className="text-base  font-semibold " >
                                { product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}

                            </div>
                            <p className="text-sm text-gray-500" >{product.category.name}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-nowrap flex-shrink-0">
                            <div className="space-x-1 mt-1 flex items-center flex-nowrap w-full" >
                                {/* {starElements} */}
                                {pathname !== '/favlist' && <RatingStars
                                    stars={product.productRating.stars || 0}
                                    count={product.productRating.count || 0}
                                    // showCount={false}
                                />}
                            </div>

                        </div>
                    </div>
                    
                    {product.quantity == 0 && <Badge title="Out of Stock" />}
                </div>
                {/* Price */}
                <div>
                    <Currency value={product.price} />
                </div>
                {pathname === '/favlist' && <div>
                    {isLiked ? <Button onClick={(event) => handletoggleFav(product.id, event)} title='Remove from favourite' className='border hover:bg-transparent bg-transparent' ><Heart size={18} color='red' fill='red' /> </Button>
                        : <Button onClick={(event) => handletoggleFav(product.id, event)} title='Add to favourite' className='border hover:bg-transparent bg-transparent' ><Heart size={18} color='black' /> </Button>}
                </div>}
            </div>
        </>
    )
}

export default ProductCard;