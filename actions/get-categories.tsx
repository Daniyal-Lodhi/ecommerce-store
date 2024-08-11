import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/categories` ;

const getCategories = async() : Promise<Category[]> =>{
    const response = await axios.get(Url) ;
    return response.data ;
    
}


export default getCategories ;