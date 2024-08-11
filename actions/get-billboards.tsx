import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/billboards` ;

const getBillboards = async(id:string) : Promise<Billboard> =>{
    const response = await axios.get(`${Url}/${id}`) ;
    return response.data ;
    
}


export default getBillboards ;