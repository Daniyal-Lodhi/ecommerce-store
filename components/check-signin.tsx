'use client'

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CheckSignin = () => {
    const { userId } = useAuth();
    const router = useRouter();


    if (!userId) {
        router.push(`/sign-in?redirectUrl=${window.location.href}`);
    }

    return (
        <></>
    )
}

export default CheckSignin
