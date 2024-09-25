import GetProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import ProductGallery from '@/components/Product/gallery/product-gallery'
import ProductList from '@/components/product-list'
import { Container } from '@/components/ui/container'
import ProductInfo from '@/components/Product/product-info'
import { Metadata } from 'next'
import React from 'react'
import ProductComments from '@/components/Product/product-comments'


export const metadata: Metadata = {
    title: 'Product',
    description: "Flash Store products"
}

interface ProductPageProps {
    params: { productId: string }
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product: (Product | null) = await GetProduct(params.productId);
    const CategoryWiseProducts: (Product[] | null) = await getProducts({
        categoryId: product?.category?.id
    });
    // exclude the current product from the list of suggested products
    const suggestedProducts = CategoryWiseProducts?.filter((product) => product?.id !== params.productId);

    return (
        <div className='bg-white' >

            <Container>
                <div className='px-4 sm:px-6 py-10 lg:px-8' >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-x-4 lg::gap-x-8' >
                        <div className='md:col-span-1 lg:col-span-2 ' >
                            {product && <ProductGallery images={product?.images} />}
                        </div>
                        <div className='md:col-span-1 lg:col-span-3 mt-6 sm:px-0 md:mt-0'>
                            {product && <ProductInfo product={product} />}
                        </div>
                    </div>
                    <div className=' mt-5 sm:mt-10' >
                        {product?.productRating && <ProductComments data={product.productRating} />}
                    </div>
                    {suggestedProducts && <ProductList data={suggestedProducts} title={'Realted Items'} />}
                </div>
            </Container>
        </div>
    )
}

export default ProductPage
