

import getFavouriteProducts from '@/actions/get-fav-products'
import ProductList from '@/components/product-list';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: 'Favourites',
  description: "Flash Store favourite products"
}


const FavPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect(`/sign-in?redirectUrl=/favlist`)
  }
  let favProducts: (Favourites[] | Product[] | null) = await getFavouriteProducts();
  favProducts = favProducts && favProducts.map((item) => (item.product));
  return (
    <div className='p-4 sm:p-6 lg:p-8' >
      {favProducts ? <div>
        {favProducts && <ProductList data={favProducts} title='Favourite products' />}
      </div> :
        <div className="text-center mx-auto text-3xl font-bold my-10" >
          Some error occured, Could not load the page
        </div>
      }
    </div>
  )
}

export default FavPage
