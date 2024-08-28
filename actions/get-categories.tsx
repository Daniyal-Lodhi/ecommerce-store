import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/categories` ;

const getCategories = async() : Promise<Category[] | null> =>{
    try {
        const response = await axios.get(Url) ;
    return response.data ;
    } catch (error) {
        console.log("error fetching categories:",error)
        return null
    }
    
}


export default getCategories ;