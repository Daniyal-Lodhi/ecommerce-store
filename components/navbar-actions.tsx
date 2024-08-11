import { ShoppingBag } from "lucide-react"
import Button from "./ui/button"



const NavbarActions = ()=>{
 
return(
    <div className="ml-auto flex items-center gap-x-4">
        <Button   >
            <ShoppingBag
            size={20}
            color="white"
            />
            <span className="ml-2 text-white " >
                0
            </span>

        </Button>
    </div>
)

}



export default NavbarActions