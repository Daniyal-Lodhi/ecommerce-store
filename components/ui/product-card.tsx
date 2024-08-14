'use client'

import Image from "next/image";
import React, { MouseEventHandler } from "react";
import Iconbutton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import preventHydration from "../hydration-prevention";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import PreviewModal from "../preview-modal";
import usePreviewModal from "@/hooks/use-preview-modal";

interface productCardProps {
    product: Product
}

const ProductCard: React.FC<productCardProps> = ({
    product
}) => {

    preventHydration();
    const router = useRouter();
    const previewModal = usePreviewModal();

    const handleClick = () => {
        router.push(`/product/${product?.id}`)
    }

    const previewProductModal:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(product);
    }
    return (
        <>
            <div onClick={handleClick} className="bg-white border rounded-xl p-3 group cursor-pointer space-y-4 " >
                <div className="aspect-square relative rounded-xl bg-gray-100" >
                    <Image
                        src={product?.images?.[0]?.imageUrl}
                        fill
                        alt="Image"
                        className="object-cover rounded-md aspect-square"
                    />
                    <div className="absolute flex justify-center gap-x-6 items-center bottom-5 px-6 opacity-0 group-hover:opacity-100 w-full" >
                        <Iconbutton
                            onclick={previewProductModal}
                            icon={<Expand
                                size={20}
                                className="text-gray-600"
                            />} />

                        <Iconbutton
                            onclick={() => { }}
                            icon={<ShoppingCart
                                size={20}
                                className="text-gray-600"
                            />} />
                    </div>
                </div>
                <div>
                    <p className="text-lg font-semibold" >{product.name}</p>
                    <p className="text-sm text-gray-500" >{product.category.name}</p>
                </div>
                {/* Price */}
                <div>
                    <Currency value={product.price} />
                </div>

            </div>
        </>
    )
}

export default ProductCard;