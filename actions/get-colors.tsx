import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[] | null> => {
    try {
        const response = await axios.get(Url);
        return response.data;
    } catch (error) {
        console.log("error fetching colors:", error)
        return null
    }

}


export default getColors;