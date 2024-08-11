interface Billboard  {
    id:string
    label:string
    imageUrl : string
}

interface Category  {
    id:string
    name:string
    billboard:Billboard
}

interface Image  {
    id:string
    name:string
    imageUrl:string
    productId:string
}

interface Product  {
    id:string
    name:string
    images:Image[]
    colorId:string
    sizeId:string
    category:Category
    isArchived:boolean
    isFeatured:boolean
    price:number | string
}

interface Category  {
    id:string
    name:string
    billboard:Billboard
}


interface Size {
    id:string
    name:string
    value:string
}

interface Color {
    id:string
    name:string
    value:string
}


