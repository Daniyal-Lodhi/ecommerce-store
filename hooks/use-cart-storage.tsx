import toast from 'react-hot-toast'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStorageProps {
    items: Product[]
    addItem: (data: Product) => void
    stockedOutItems : string[]
    addStockOutItems:(id:string[])=>void
    removeItem: (id: string) => void
    removeAll: () => void
}

const useShoppingCart = create(
    persist<CartStorageProps>(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItems = get().items
                const exisitingItem = currentItems.find((item) => item.id === data.id)
                if (exisitingItem) {
                    toast("Item Already in Cart")
                }
                else{
                    set({ items: [...get().items,data] })
                    toast.success("Item added to cart")
                }
            },
            stockedOutItems:[],
            addStockOutItems: (productIds:string[]) => {
                set({ stockedOutItems: [] })
                if(productIds.length>0) 
                set({stockedOutItems:[...productIds]})
            },
            removeItem: (ProductId: string) => {
                set({ items: [...get().items.filter((item) => item.id != ProductId)] })
                toast.success("Item removed successfully")
            },
            removeAll: () => {
                set({ items: [] })
            },
            
        }
),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

export default useShoppingCart;