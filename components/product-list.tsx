import NoResultFound from './no-result-found'
import ProductCard from './ui/product-card';

interface productListProps {
    data: Product[] ,
    title:string
}

const ProductList: React.FC<productListProps> = ({
    data,
    title
}) => {


    return (
        <div className="space-y-4 border-b pb-4">
            <div className="font-bold text-3xl" >{title}</div>
            {data?.length === 0 && <NoResultFound/> }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ' >
                {data?.map((product)=>(
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}


export default ProductList;