'use client'
import { LogIn } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const SigninButton = () => {
    const router = useRouter();
    return (
        <div >

            {
                <div
                    onClick={() =>{router.push('/sign-up')}
                    }
                    className="flex flex-nowrap text-nowrap items-center gap-2 cursor-pointer">
                    <LogIn size={15} />
                    Sign in
                </div>
            }
        </div>
    )
}

export default SigninButton
