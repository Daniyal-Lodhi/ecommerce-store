'use client'

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import RatingStar from './rating-stars';
import toast from 'react-hot-toast';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface FeedbackFormProps {
  productId: string;
}

const feedbackFormSchema = z.object({
  stars: z.coerce.number().min(1),
  comment: z.string().optional(),
});

type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;

const FeedbackForm: React.FC<FeedbackFormProps> = ({ productId }) => {

  // const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { user } = useUser()
  const { userId } = useAuth()

  // useEffect(() => {
    // setMounted(true);
  // }, [])
  

  const form = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      stars: 1,
      comment: undefined,
    },
  });
  




  const onSubmit = async (data: FeedbackFormSchema) => {
    setLoading(true);
    // if(!(user){
    //   throw new Error("sign in required")
    // }
    const capitalize = (str:string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    let username = undefined;
    if(user){
      if(user.firstName){
        username = capitalize(user.firstName)
        if(user.lastName){
          username = capitalize(user.lastName)
        }
      }else{
        username = user.primaryEmailAddress?.emailAddress
      }

    }
    try {
      let ratingData = {
        productId,
        stars: data.stars,
        comment: data.comment,
        userId,
        username: username
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}/rating`, ratingData)
      // console.log(ratingData)
      router.refresh();
      toast.success("Item rated successfully")

    } catch (error) {
      toast.error("Some error occured")
      console.log('[RATING_ORDER_ITEM_POST] :', error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div  >

          <div className='space-y-3 '>
            <FormField
              disabled={loading}

              name='stars'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-xl ' >Rate</FormLabel>
                  <div className='flex gap-4 items-center' >
                    <FormControl>
                      <RatingStar
                        disabled={loading}
                        onChange={(starValue) => {
                          const newValue = starValue
                          field.onChange(newValue); // Update the value directly

                        }}
                      />
                    </FormControl>
                    <div className='text-xl border rounded-md px-4 py-1 '>{field.value}</div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            <FormField
              name='comment'
              control={form.control}
              render={({ field }) => (
                <FormItem >
                  <FormLabel className='font-bold' >Leave Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className='lg:w-96 w-full  align-top text-start p-2 flex items-start '
                      disabled={loading}
                      placeholder='comment here'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

          </div>

        </div>
        <Button disabled={loading} type='submit' className='mt-4'  >submit</Button>
      </form>
    </Form >
  );
};

export default FeedbackForm;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

