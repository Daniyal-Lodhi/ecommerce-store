import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import BillboardSlider from "@/components/ui/billboard-slider";
import { Container } from "@/components/ui/container";

const HomePage = async ()=>{
    
    const featuredBillboards:(Billboard[]|null) = await getBillboards({featured:true});
    // console.log(featuredBillboards)
    // const billboard:(Billboard | null) = await getBillboard("dc13110c-62f0-4d13-bf25-c34da99405ba");
    const products:Product[] | null = await getProducts({isFeatured:true}) ;


    return(
        <Container>
            <div className="space-y-10 pb-10 " >
                { featuredBillboards && <BillboardSlider data={featuredBillboards} />}
            </div>
            <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8" >
                { products && <ProductList data={products} title="Featured products"  />}
                </div>

        </Container>
    )
}


export default HomePage;