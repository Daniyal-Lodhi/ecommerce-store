import axios from 'axios';

const GetProduct =async(id:string):Promise<Product> => {
    const Url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}` ;
    const product = await axios.get(Url);
    return product.data
}

export default GetProduct
