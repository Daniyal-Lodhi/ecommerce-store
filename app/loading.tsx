'use client'

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoaderProvider = () => {
    {/* loader for default loading fallback during  */ }
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-white">
                <ClipLoader
                    className="text-black "
                    size={50}
                />
            </div>
        </>
    );
}

export default LoaderProvider;
