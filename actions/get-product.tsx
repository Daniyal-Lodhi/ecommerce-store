import axios from 'axios';

const getProduct = async (id: string): Promise<Product | null> => {
    try {
        const Url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
        const product = await axios.get(Url);
        return product.data
    } catch (error) {
        console.log("error fetching product:", error)
        return null;
    }

}

export default getProduct
