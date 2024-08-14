import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/colors` ;

const getColors = async() : Promise<Size[]> =>{
    const response = await axios.get(Url) ;
    return response.data ;
    
}


export default getColors ;