import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

const getProduct = async (id: string): Promise<Product | null> => {
    try {
        const { userId } = auth()
        const Url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}/${userId}`;
        // console.log(Url)
        const product = await axios.get(Url);        
        return product.data
    } catch (error) {
        console.log("error fetching product:", error)
        return null;
    }

}

export default getProduct
