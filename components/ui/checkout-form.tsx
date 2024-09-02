'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import {Button} from './button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import Currency from './currency';
import axios from 'axios';
import toast from 'react-hot-toast';
import useShoppingCart from '@/hooks/use-cart-storage';
import { useRouter } from 'next/navigation';


interface CheckoutFormProps {
    loading: boolean
    setLoading: (form: any) => void,
    totalPrice: number,
    ButtonMessage: string,
    userId: string,
    items: Product[],
    paymentType: string

}
// zod schemas
const formSchema = z.object({
    address: z.string().min(1, { message: "Address is required" }),
    phoneNumber: z.string().min(1,{message:"Phone number is required"}),

})
type formSchemaZ = z.infer<typeof formSchema>;

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    loading,
    totalPrice,
    ButtonMessage,
    userId,
    setLoading,
    paymentType,
    items,
}) => {
    const { removeAll } = useShoppingCart();
    const router = useRouter();

    const form = useForm<formSchemaZ>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            phoneNumber: ""
        }
    })
    const handleCODCheckout = async (data: formSchemaZ) => {
        // console.log(data)
        if (!userId) {
            router.push(`/sign-in?redirectUrl=${window.location.href}`)
        }
        else {
            setLoading(true);

            try {

                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                    productIds: items.map((item) => item.id),
                    userId: userId,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                })
                if (res.status == 200) {
                    toast.success('Order placed Successfully')
                    removeAll()
                }
            } catch (error) {
                console.log(error);
                toast.error("Some error occured.")
            } finally {
                setLoading(false);
            }
        }
    }
    const handleCardCheckout = async () => {
        // console.log(data)
        if (!userId) {
            router.push(`/sign-in?redirectUrl=${window.location.href}`)
        }
        else {
            setLoading(true);

            try {
                if (paymentType == 'Card') {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                        productIds: items.map((item) => item.id),
                        userId: userId,
                    });
                    if (res.data.outOfStock) {
                        toast.error(res.data.message)
                        console.log(res.data)
                    }
                    else {
                        window.location.href = res.data.url;
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Some error occured.")
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='w-full' >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleCODCheckout)} >
                    {paymentType === 'COD' && <div className='space-y-4 w-full' >


                        <div className='grid grid-cols-1 gap-4 w-full'>
                            <FormField
                                name='phoneNumber'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} {...field} placeholder='Phone number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='address'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} {...field} placeholder='Address' />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </div>
                    }
                    <div className=' border-t pt-5 text-base border-gray-200 flex font-semibold mt-4 mb-8 w-full justify-between'>
                        <div  >
                            Order total
                        </div>
                        <Currency value={totalPrice} />
                    </div>
                    {paymentType === 'COD' ? <Button type='submit' disabled={items.length == 0 || loading} className='text-white  disabled:bg-gray-500 w-full text-center mx-auto flex text-base justify-center' >
                        {ButtonMessage}
                    </Button> :
                        <Button onClick={handleCardCheckout}  disabled={items.length == 0 || loading} className='text-white  disabled:bg-gray-500 w-full text-center mx-auto flex text-base justify-center' >
                            {ButtonMessage}
                        </Button>}
                </form>

            </Form >
        </div>
    )
}

export default CheckoutForm
