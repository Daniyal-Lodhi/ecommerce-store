import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;



const getBillboards = async (queryObj: { featured: boolean }): Promise<Billboard[] | null> => {
    try {
        const featured = queryObj.featured
        const response = await axios.get(`${Url}?featured=${featured}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching billboard:", error);
        return null;
    }
};

export default getBillboards;
