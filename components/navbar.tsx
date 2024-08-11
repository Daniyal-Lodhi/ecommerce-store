import getCategories from "@/actions/get-categories";
import { MainNav } from "./main-nav";
import { Container } from "./ui/container";
import Link from "next/link";
import NavbarActions from "./navbar-actions";



const Navbar = async() => {

    const categories = await getCategories() ; 

    return (
        <div className="border-b">
            <Container >
                <div className=" px-4 sm:px-6 lg:px-8 h-16 flex items-center relative" >
                    <Link href='/' className="ml-4 flex lg:ml-0 space-x-2 " >
                        <p className="text-xl font-bold  ">Store</p>
                    </Link>

                    <MainNav  data={categories} />

                    <NavbarActions/>
                    
                </div>
            </Container>
        </div>
    )
}





export default Navbar;