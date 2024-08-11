'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

interface mainNavProps {
    data: Category[]
}

export const revalidate = false ;

export const MainNav: React.FC<mainNavProps> = ({
    data
}) => {
    const pathname = usePathname();

    const routes = data.map((route) => (
        {
            label: route.name,
            isActive: pathname === `category/${route.id}`,
            href: `/category/${route.id}`
        }
    ))



    return (
        <div className="flex space-x-4 lg:space-x-6 mx-6 items-center ">
            {
                routes.map((route) => (
                    <Link href={route.href} 
                    key={route.href}
                    className={`
                        ${route.isActive ? 'text-black' : 'text-neutral-500'} 
                        transition-colors
                      hover:text-black 
                      font-semibold
                      text-[15px]
                      pt-[2px]
                      `} >{route.label}</Link>
                ))
            }
        </div>
    )
}