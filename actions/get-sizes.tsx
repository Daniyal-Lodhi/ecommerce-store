import axios from "axios";


const Url = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[] | null> => {
    try {
        const response = await axios.get(Url);
        return response.data;
    } catch (error) {
        console.log("error fetching sizes:", error);
        return null;

    }

}


export default getSizes;