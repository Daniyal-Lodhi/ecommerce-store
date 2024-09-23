import axios from "axios"
import qs from "query-string"



export const getOrder = async (orderId:string): Promise<Order | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/userOrders/${orderId}`;
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`
        const orders = await axios.get(url);
        return orders.data
    } catch (error) {
        console.log("error fetching orders:", error);
        return null;
    }
}

