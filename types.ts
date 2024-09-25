
interface Billboard {
    id: string
    label: string
    imageUrl: string
}

interface Category {
    id: string
    name: string
    billboard: Billboard
}

interface Image {
    id: string
    name: string
    imageUrl: string
    productId: string
}

interface Product {
    id: string
    name: string
    description: string
    images: Image[]
    color: Color
    size: Size
    category: Category
    isArchived: boolean
    isFeatured: boolean
    price: number | string
    quantity: number | string
    liked: boolean | undefined,
    productRating:Rating
}

interface Category {
    id: string
    name: string
    billboard: Billboard
}


interface Size {
    id: string
    name: string
    value: string
}

interface Color {
    id: string
    name: string
    value: string
}
interface Order {
    id: string;
    storeId: string;
    userId: string;
    paymentType: string;
    phoneNumber?: string;
    address?: string;
    orderItems: OrderItem[];
    isPaid: boolean;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
}

interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    isRated:boolean
}



interface Favourites {
    id: string
    productId: string
    product: Product
    userId: boolean
    liked: boolean
}

interface comments{
    stars:number
    comment:string
    commentedBy:string
}

interface Rating{
    stars:number,
    comments:comments[],
    count:number,
}