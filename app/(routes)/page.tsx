import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import BillboardComponent from "@/components/billboard";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

const HomePage = async ()=>{
    

    const billboards:(Billboard | null) = await getBillboard("dc13110c-62f0-4d13-bf25-c34da99405ba");
    const products:Product[] | null = await getProducts({isFeatured:true}) ;


    return(
        <Container>
            <div className="space-y-10 pb-10 " >
                { billboards && <BillboardComponent data={billboards} />}
            </div>
            <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8" >
                { products && <ProductList data={products} title="Featured products"  />}
                </div>

        </Container>
    )
}


export default HomePage;