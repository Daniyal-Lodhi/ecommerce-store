

import getFavouriteProducts from '@/actions/get-fav-products'
import ProductList from '@/components/product-list';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Favourites',
    description: "Flash Store favourite products"
}


const FavPage = async() => {
    let favProducts:(Favourites[]|Product[]|null) = await getFavouriteProducts();
    favProducts =  favProducts && favProducts.map((item)=>(item.product));
  return (
    <div className='p-4 sm:p-6 lg:p-8' >
        <div>
            { favProducts && <ProductList data={favProducts} title='Favourite products'  />}
        </div>
    </div>
  )
}

export default FavPage
