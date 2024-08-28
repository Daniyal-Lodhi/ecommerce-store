import getCategories from "@/actions/get-categories";
import { MainNav } from "./main-nav";
import { Container } from "./ui/container";
import Link from "next/link";
import NavbarActions from "./navbar-actions";
import SigninButton from "./ui/sign-in-buton";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";



const Navbar = async() => {

    const categories:(Category[]|null) = await getCategories() ; 
    const {userId} = auth();

    return (
        <div className="border-b">
            <Container >
                <div className=" px-4 sm:px-6 lg:px-8 h-16 flex items-center relative" >
                    <Link href='/' className="ml-4 flex lg:ml-0 space-x-2 " >
                        <p className="text-xl font-bold  ">Store</p>
                    </Link>

                    { categories && <MainNav  data={categories} />}
                    <div className="flex gap-4 items-center ml-auto" >
                        
                    <NavbarActions/>
                    { userId ? <UserButton afterSignOutUrl="/"  /> : <SigninButton/> }
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}





export default Navbar;