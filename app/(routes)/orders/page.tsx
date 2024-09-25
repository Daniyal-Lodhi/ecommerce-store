import { Container } from '@/components/ui/container'
import { Metadata } from 'next'
import React from 'react'
import OrderFilters from './components/orderFilters'
import OrderCard from './components/order-card'
import CheckSignin from '@/components/check-signin'
import { getUserOrders } from '@/actions/get-orders'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Separator } from '@/components/ui/separator'


export const metadata: Metadata = {
    title: 'Orders',
    description: "Flash Store customer orders"
}

// export const revalidate = false ;



const OrderPage = async ({ searchParams }:
    {
        searchParams: { status: string }
    }) => {

    const { userId } = auth();
    if (!userId) {
        redirect(`/sign-in?redirectUrl=/orders`)
    }

    const queryObj = { status: searchParams.status || undefined }
    const orders: (Order[] | null) = await getUserOrders(queryObj, userId);
    // console.log(orders)


    return (
        Array.isArray(orders) ? <Container>
            <CheckSignin />
            <div className='p-4 sm:p-6 lg:p-8' >
                <div>
                    <h1 className='text-3xl font-bold tracking-tight ' >Orders</h1>
                    <p className='text-sm text-muted-foreground' >View your ongoing and previous orders.</p>
                </div>
                <div className='sm:grid sm:grid-cols-4 gap-4 flex flex-col  mt-6' >
                    <OrderFilters />
                    <div className='sm:col-span-3 ' >
                        {orders.length > 0 ? <div className='grid grid-cols-1 ' >
                            {
                                orders && orders.map((order, index) => (
                                    <div key={order.id} className=' flex flex-col justify-center' >
                                        <OrderCard data={order} />
                                        {index < orders.length - 1 && <Separator className='my-6 h-1 text-black' />}
                                    </div>
                                ))
                            }
                        </div> : <div className='w-full flex items-center justify-center' >
                            You have not ordered anything yet.
                        </div>
                        }
                    </div>



                </div>

            </div>

        </Container> :
            <div className="text-center mx-auto text-3xl font-bold my-10" >
                Some error occured, Could not load the page
            </div>
    )
}

export default OrderPage
