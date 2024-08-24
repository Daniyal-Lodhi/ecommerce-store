import { create } from "zustand";

interface useAuthProps{
    userId:string|null
    setUserId:(id:string)=>void
    removeUserId:()=>void
}

const useAuth = create<useAuthProps>((set)=>({
    userId:null,
    setUserId:(id)=>set({userId:id}),
    removeUserId:()=>set({userId:null}),

}));

export default useAuth;