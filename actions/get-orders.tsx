import axios from "axios"
import qs from "query-string"



export const getUserOrders = async (query: { status: string | undefined }, userId: string): Promise<Order[] | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/userOrders/${userId}`;
    // console.log(query)
    try {
        const querifiedUrl = qs.stringifyUrl({
            url,
            query: {
                status: query.status,

            },
        })
        const orders = await axios.get(querifiedUrl);
        return orders.data
    } catch (error) {
        console.log("error fetching orders:", error);
        return null;
    }
}

