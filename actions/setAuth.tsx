'use client'
import useAuth from '@/hooks/use-auth'
import { useEffect } from 'react';

const SetAuth = ({userId}:{userId:string | null}) => {
    const {setUserId,removeUserId} = useAuth();
    useEffect(()=>{
        if(userId){
            setUserId(userId)
            console.log("id created")
        }
        else{
        removeUserId();
        console.log("id removed")
        }
    },[userId])
    
    
  return null
}

export default SetAuth
