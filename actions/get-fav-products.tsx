import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

const getFavouriteProducts = async (): Promise< Favourites [] | null> => {
    try {
        const { userId } = auth()
        const Url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;
        // console.log(Url)
        const product = await axios.get(Url);        
        return product.data
    } catch (error) {
        console.log("error fetching product:", error)
        return null;
    }

}

export default getFavouriteProducts
