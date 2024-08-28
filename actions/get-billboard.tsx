import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;



const getBillboard = async (id: string): Promise<Billboard | null> => {
  try {
    const response = await axios.get(`${Url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching billboard:", error);
    return null; 
  }
};

export default getBillboard;
