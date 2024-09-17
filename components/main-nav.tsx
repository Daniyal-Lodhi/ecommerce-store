'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import NavbarActions from "./navbar-actions";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Iconbutton from "./ui/icon-button";
import { Separator } from "./ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"



interface mainNavProps {
    data: Category[]
}

export const revalidate = false;

export const MainNav: React.FC<mainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [collapesed, setCollapesed] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])

    const routes = data?.map((route) => (
        {
            label: route.name,
            isActive: pathname === `/category/${route.id}`,
            href: `/category/${route.id}`
        }
    ))

    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setCollapesed(false);
    };


    if (!mounted) {
        return <div className="p-2 m-0 border rounded-md" >
            <Menu size={18} />
        </div>;
    }



    return (
        <div className="sm:w-full w-auto">
            <div className="sm:flex hidden items-center justify-between" >
                <div className="sm:flex hidden  space-x-6 lg:space-x-5 mx-6 items-center ">
                    <Link href={'/'} className=" hover:text-black flex items-center  font-semibold text-gray-600" >Home</Link>

                    {

                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none border-none hover:text-black flex items-center  font-semibold text-gray-600" >
                                <p>Categories</p>
                                <ChevronDown size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                                {routes?.map((route) => (
                                    <Link
                                        href={route.href}
                                        key={route.href}
                                        className={`
                            ${route.isActive ? 'text-black font-bold' : 'text-neutral-500'} 
                            transition-colors
                          hover:text-black 
                          font-semibold
                          text-[15px]
                          pt-[2px]
                          my-4
                          cursor-pointer
                          `} >
                                        <DropdownMenuItem className="cursor-pointer" >{route.label}</DropdownMenuItem>
                                    </Link>
                                ))}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    <Link
                        href={'/orders'} className=" hover:text-black flex items-center  font-semibold text-gray-600" >Orders</Link>
                    <Link
                        href={'/favlist'} className=" hover:text-black flex items-center  font-semibold text-gray-600" >Fav List</Link>

                </div>
                <NavbarActions />
            </div>
            <div className="flex sm:hidden z-[50] relative items-center" >
                <button onClick={onOpen} className="p-2 m-0 border rounded-md" >
                    <Menu size={18} />
                </button>
                <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden " >
                    <div className='fixed w-full left-0 bottom-0 top-0 z-50 flex ' >

                        <DialogPanel className={`relative w-[80%] p-2 pt-0  rounded-xl flex-col items-center overflow-y-auto max-w-xs  bg-white`} >
                            <div className='flex mt-4 mb-2 items-center justify-between ' >
                                <Iconbutton className="rounded-md mb-1 border-none shadow-md" onclick={onClose} icon={<X size='15' />} />
                                <div  >
                                    <NavbarActions onClose={onClose} />
                                </div>

                            </div>
                            <Separator className="mt-5" />
                            <div className="flex-col  justify-center space-y-3 mt-5" >
                                <div className=" text-lg flex-col justify-center space-y-2" >
                                    <div>
                                        <Link
                                            onClick={onClose}
                                            href={'/'} >Home</Link>
                                    </div>
                                    <Collapsible className="transition duration-1000" onOpenChange={() => setCollapesed(!collapesed)}>
                                        <CollapsibleTrigger className="flex items-center space-x-4" >
                                            Categories
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform duration-300 ${collapesed ? 'rotate-180' : ''}`}
                                            />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {
                                                routes?.map((route) => (
                                                    <Link href={route.href}
                                                        key={route.href}
                                                        onClick={onClose}
                                                        className={`
                                                            ${route.isActive ? 'text-black  font-bold' : 'text-neutral-500'} 
                                                            transition-colors
                                                            text-lg
                                                            hover:text-black 
                                                            font-semibold
                                                            text-[15px]
                                                            pt-[2px]
                                                            `} >
                                                        <Separator className="my-1" />
                                                        {route.label}
                                                    </Link>
                                                ))
                                            }
                                        </CollapsibleContent>
                                    </Collapsible>

                                    <div>
                                        <Link
                                            onClick={onClose}
                                            href={'/orders'}
                                        >Orders</Link>
                                    </div>
                                    <div>
                                        <Link
                                            onClick={onClose}
                                            href={'/favlist'}
                                        >Fav List</Link>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
                <div>
                </div>


            </div>
        </div>

    )
}