'use client'
import PreventHydration from '@/components/hydration-prevention';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { Separator } from '@/components/ui/separator'
import { format, add } from "date-fns";
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
    data: Order
}


const OrderCard: React.FC<OrderCardProps> = ({
    data
}) => {
    const totalPrice = data.orderItems.reduce((totalPrice, item) => (
        totalPrice + Number(item.product.price)
    ), 0)
    const router = useRouter();
    return (
        <>
            <PreventHydration />
            <div className='border rounded-md p-2' >
                <div className='flex items-center justify-between mb-3' >
                    <h1 className='font-bold ' >Order Id#</h1>
                    <p  >{data.id}</p>
                </div>


                <div className='flex-col justify-between text-sm space-y-2' >
                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold' >Ordered on</h1>
                        <p> {format(new Date(data.createdAt), 'MMMM d,yyyy')} </p>
                    </div>

                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold'  >Delivery date</h1>
                        <p>{format(add(new Date(data.createdAt), { days: 5 }), 'MMMM d, yyyy')}</p>
                    </div>


                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold'  >Paid</h1>
                        <p >{String(data.isPaid)}</p>
                    </div>

                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold' >Payment type</h1>
                        <p >{data.paymentType || "--"}</p>
                    </div>
                    <div className='flex items-start space-x-2 justify-between' >
                        <h1 className='font-bold text-nowrap w-max' >Delivery address</h1>
                        <p className='text-wrap ' >{data.address || '--'}</p>
                    </div>
                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold'  >Delivered</h1>
                        <p >{String(data.completed)}</p>
                    </div>
                    <div className='flex-col items-start justify-between' >
                        <h1 className='font-bold' >Order items</h1>
                        <div className=' flex flex-col' >
                            {
                                data.orderItems.map((orderItem) => (
                                    <div key={orderItem.id} className='flex items-center justify-between' >
                                        <h1>{orderItem.product.name}</h1>
                                        <div><Currency value={orderItem.product.price} /></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Separator className='mt-3 mb-1' />
                    <div className='flex items-center justify-between' >
                        <h1 className='font-bold' >Total amount</h1>
                        <div> <Currency value={totalPrice} /> </div>
                    </div>
                    {data.completed && <div className='flex w-full items-center gap-2 my-2' >
                        <Button onClick={()=>router.push(`/orders/${data.id}/rating`)} className='ml-auto bg-transparent border  text-black hover:text-white text-xs py-0'>
                            Provide feedback
                            <ArrowRight size={12} />

                        </Button>
                    </div>}





                </div>
            </div>
        </>
    )
}

export default OrderCard
