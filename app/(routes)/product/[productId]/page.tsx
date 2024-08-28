import GetProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import ProductGallery from '@/components/gallery/product-gallery'
import ProductList from '@/components/product-list'
import { Container } from '@/components/ui/container'
import ProductInfo from '@/components/ui/product-info'
import React from 'react'

interface ProductPageProps {
    params: { productId: string }
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product: (Product | null) = await GetProduct(params.productId);
    const CategoryWiseProducts: (Product[] | null ) = await getProducts({
        categoryId: product?.category?.id
    });
    // exclude the current product from the list of suggested products
    const suggestedProducts = CategoryWiseProducts?.filter((product) => product?.id !== params.productId);

    return (
        <div className='bg-white' >

            <Container>
                <div className='px-4 sm:px-6 py-10 lg:px-8' >
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-x-4 lg::gap-x-8' >
                        <div>
                            { product && <ProductGallery images={product?.images} />}
                        </div> 
                        <div className='mt-10  sm:px-0   md:mt-2'>
                            { product && <ProductInfo product={product} />}
                        </div>
                    </div>
                    <hr className='my-7' />
                    { suggestedProducts && <ProductList data={suggestedProducts} title={'Realted Items'} />}
                </div>
            </Container>
        </div>
    )
}

export default ProductPage
