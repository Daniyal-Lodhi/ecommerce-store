import getCategories from "@/actions/get-categories";
import { MainNav } from "./main-nav";
import { Container } from "../ui/container";
import Link from "next/link";
// import NavbarActions from "./navbar-actions";
import SigninButton from "./sign-in-buton";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";



const Navbar = async () => {

    const categories: (Category[] | null) = await getCategories();
    const { userId } = auth();

    return (
        <div className=" relative z-[40]  border-b">
            <Container >
                <div className="px-4 sm:px-6 lg:px-8 h-16 flex justify-between sm:justify-normal  items-center relative" >
                    <Link href='/' className=" sm:order-1 order-2 sm:mr-2 flex flex-nowrap lg:ml-0 space-x-1  items-center" >
                        <div   style={{ position: 'relative', width: '30px', height: '30px' }}>
                            <Image
                                src="/flash.png"
                                alt="Flash Store"
                                fill // This makes the image fill the parent container
                                sizes="30px" // Set the sizes prop to improve performance
                                style={{ objectFit: 'contain' }} // or 'cover', depending on how you want it to scale
                            />
                        </div>
                        <p className="sm:text-xl font-bold text-base text-nowrap">Flash Store</p>
                    </Link>
                    <div className="order-1 sm:order-2 sm:w-full " >
                        {categories && <MainNav  data={categories} />}
                    </div>

                    <div className="flex order-last  h-full items-center sm:ml-auto" >
                        {userId ? <UserButton /> : <SigninButton />}
                    </div>

                </div>
            </Container>
        </div>
    )
}





export default Navbar;