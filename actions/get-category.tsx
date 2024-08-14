import axios from 'axios';

const getCategory =async(id:string):Promise<Category> => {
    const Url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}` ;
    const category = await axios.get(Url);
    return category.data
}

export default getCategory
