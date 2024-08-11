'use client'

import { useEffect, useState } from "react"

const preventHydration = ()=>{
    const [mounted,setMouted] = useState(false) ;

    useEffect(()=>{
        setMouted(true) ;
    },[])

    if(!mounted){
        return null;
    }
}

export default preventHydration ;