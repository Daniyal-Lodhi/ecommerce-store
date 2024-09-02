'use client'

import { useEffect, useState } from "react";

const PreventHydration = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <></>
    );
};

export default PreventHydration;
