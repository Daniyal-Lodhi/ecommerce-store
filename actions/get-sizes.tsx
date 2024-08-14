import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/sizes` ;

const getSizes = async() : Promise<Size[]> =>{
    const response = await axios.get(Url) ;
    return response.data ;
    
}


export default getSizes ;