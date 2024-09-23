import { getOrder } from "@/actions/get-order"
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Check, MoveUpRight } from "lucide-react";
import FeedbackForm from "./components/feedback-form";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Order Rating',
    description: "Flash Store customer orders"
}


const OrderRating = async ({ params }:
    { params: { orderId: string } }
) => {
    const order: (Order | null) = await getOrder(params.orderId);


    return (
        <>
            {order ? <div className='p-4 sm:p-6 lg:p-8' >
                <div>
                    <h1 className='text-3xl font-bold tracking-tight ' >Order rating and feedback</h1>
                    <p className='text-sm text-muted-foreground' >Give your feedback, it helps to maintain the quality. </p>
                </div>
                <Separator className="my-2" />
                <div className="my-4" >
                    {
                        order.orderItems.map((orderItem) => (
                            <div key={orderItem.id} className="flex flex-col md:flex-row  w-full h-full gap-4 sm:px-2 px-1 py-5 border-b " >
                                <div className="w-full flex flex-col sm:flex-row  gap-8" >
                                <div className="w-full sm:w-[30%]  " >
                                    <div className=" w-full aspect-square relative" >
                                        <Image
                                            src={orderItem.product.images[0].imageUrl}
                                            fill // Make the image fill the parent container
                                            alt="Product Image"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover rounded-lg sm:rounded-md " // Ensure the aspect ratio is maintained
                                        />
                                    </div>

                                </div>
                                {/* product info */}
                                <div className="  w-full md:w-[70%] " >
                                    <div className="flex flex-col gap-3 justify-center" >
                                        <div className="font-bold text-2xl" >{orderItem.product.name}</div>
                                        <div className="flex sm:flex-col flex-wrap gap-x-5 gap-y-2 " >
                                            <div className=" flex gap-2 w-32" >
                                                <p className="font-bold" >Color: </p>
                                                <p>{orderItem.product.color.name}</p>
                                            </div>
                                            <div className=" flex gap-2 w-32" >
                                                <p className="font-bold">Size: </p>
                                                <p>{orderItem.product.size.name}</p>
                                            </div>
                                            <div className=" flex gap-2 w-32" >
                                                <p className="font-bold" >Category: </p>
                                                <p>{orderItem.product.category.name}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <Link href={`/product/${orderItem.productId}`} 
                                    className=" bg-gray-900 hover:bg-gray-800 p-2 px-4 text-white rounded-md flex items-center gap-2 w-fit my-2 sm:mt-4 " >
                                        Go to product
                                        <MoveUpRight size={18} />
                                    </Link>
                                </div>
                                </div>
                                <div className="flex w-full sm:w-[42%] " >
                                    { !orderItem.isRated ? <FeedbackForm productId={orderItem.productId} />:
                                    <div className="flex gap-4 items-center" >
                                        Already rated this item
                                        <Check/>
                                    </div> 
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div> :
                <div className="text-center mx-auto text-3xl font-bold my-10" >
                    Some error occured, Could not load the page
                </div>

            }
        </>
    )
}

export default OrderRating
