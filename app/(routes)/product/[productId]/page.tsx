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
    const product: Product = await GetProduct(params.productId);
    const suggestedProducts:Product[] = await getProducts({
        categoryId:product?.category?.id
    }) ; 

    return (
        <div className='bg-white' >

            <Container>
                <div className='px-4 sm:px-6 py-10 lg:px-8' >
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-x-4 lg::gap-x-8' >
                        <div>
                            <ProductGallery images={product?.images} />
                        </div>
                        <div className='mt-10 px-2 sm:px-0   md:mt-0'>
                            <ProductInfo product={product}  />
                        </div>
                    </div>
                    <hr className='my-10' />
                    <ProductList data={suggestedProducts} title={'Realted Items'} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage
