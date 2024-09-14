import getCategories from "@/actions/get-categories";
import { MainNav } from "./main-nav";
import { Container } from "./ui/container";
import Link from "next/link";
// import NavbarActions from "./navbar-actions";
import SigninButton from "./ui/sign-in-buton";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";



const Navbar = async () => {

    const categories: (Category[] | null) = await getCategories();
    const { userId } = auth();

    return (
        <div className="border-b">
            <Container >
                <div className=" px-4 sm:px-6 lg:px-8 h-16 flex justify-between sm:justify-normal  items-center relative" >
                    <Link href='/' className=" sm:order-1 order-2 sm:mr-2 flex flex-nowrap lg:ml-0 space-x-1  items-center" >
                        <Image src='/flash.png' width={30} height={20} alt="Flash Store" />
                        <p className="sm:text-xl font-bold text-base text-nowrap">Flash Store</p>
                    </Link>
                    <div className="order-1 sm:order-2 sm:w-full px-2" >
                        {categories && <MainNav data={categories} />}
                    </div>

                    <div className="flex order-last  h-full items-center sm:ml-auto" >
                        {userId ? <UserButton  /> : <SigninButton />}
                    </div>

                </div>
            </Container>
        </div>
    )
}





export default Navbar;