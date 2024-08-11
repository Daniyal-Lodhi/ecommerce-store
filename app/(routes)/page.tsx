import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import BillboardComponent from "@/components/billboard";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

const HomePage = async ()=>{

    const billboards:Billboard = await getBillboards("41ea2129-5f78-43b3-bf1d-8da915e4db00");
    const products:Product[] = await getProducts({isFeatured:true}) ;


    return(
        <Container>
            <div className="space-y-10 pb-10 " >
                <BillboardComponent data={billboards} />
            </div>
            <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8" >
                <ProductList data={products} title="Featured products"  />
                </div>

        </Container>
    )
}


export default HomePage;