import axios from "axios";
import qs from "query-string"

interface queryProps {
    colorId?:string
    sizeId?:string
    categoryId?:string
    quantity?:number
    isFeatured?:boolean
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/products` ;
const getProducts = async(query:queryProps) :Promise<Product[]>=>{
    const querifiedUrl =  qs.stringifyUrl({
        url,
        query:{
            colorId:query.colorId,
            sizeId:query.sizeId,
            categoryId:query.categoryId,
            isFeatured:query.isFeatured,
            quantity:query.quantity
        },
    })
    const products = await axios.get(querifiedUrl) ;
    return products.data 
}  

export default getProducts