import GetCategory from '@/actions/get-category'
import getColors from '@/actions/get-colors'
import getProducts from '@/actions/get-products'
import getSizes from '@/actions/get-sizes'
import Billboard from '@/components/billboard'
import NoResultFound from '@/components/no-result-found'
import ProductList from '@/components/product-list'
import { Container } from '@/components/ui/container'
import Filter from '@/components/ui/filters'
import MobileFilters from '@/components/ui/mobile-filters'
import ProductCard from '@/components/ui/product-card'
import { FilterIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface CatetgoryPageProps {
    params: { categoryId: string },
    searchParams :{
        sizeId:string,
        colorId:string,
    }
}

const CategoryPage: React.FC<CatetgoryPageProps> = async ({
    params,
    searchParams
}) => {
    const category = await GetCategory(params.categoryId);
    const sizes = await getSizes();
    const colors = await getColors();

    const queryObj = {
        sizeId:searchParams.sizeId || undefined,
        colorId:searchParams.colorId || undefined,
    }
    const products = await getProducts(queryObj);
    return (
        <Container>
            <Billboard data={category.billboard} />
            <div className='px-4 sm:px-6 lg:px-8 pb-24' >
                <div className='font-bold text-2xl mb-4 hidden lg:flex  gap-x-1 items-center' >
                    Filters
                    <FilterIcon className='text-slate-800 ' size={20} />
                </div>
                <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
                    <div className='lg:hidden' >

                    <MobileFilters sizes={sizes} colors={colors}  />                
                    </div>
                    <div className='hidden lg:block' >
                        <Filter 
                        data={sizes}
                        valueKey="sizeId"
                        name="Sizes"
                        />
                        <Filter 
                        data={colors}
                        valueKey="colorId"
                        name="Colors"
                        />
                    </div>
                    <div className='  mt-6 lg:col-span-4 lg:mt-0 my-2' >
                        {products.length===0 && <NoResultFound /> }
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' >
                        {products.map((product)=>(
                            <ProductCard product={product} key={product.id} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CategoryPage
