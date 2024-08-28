import axios from 'axios';

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const Url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`;
        const category = await axios.get(Url);
        return category.data
    } catch (error) {
        console.log("error fetching category:", error);
        return null
    }
}

export default getCategory
