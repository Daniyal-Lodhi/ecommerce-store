'use client'

import React, { useState } from 'react'
import Button from './button'
import preventHydration from '../hydration-prevention'
import { PlusIcon, X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Iconbutton from './icon-button'
import Filter from './filters'

interface MobileFiltersProps {
    sizes: Size[],
    colors: Color[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    sizes,
    colors
}) => {
    preventHydration();
    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true)
        console.log("hello world")
    };
    const onClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={onOpen} className='flex items-center gap-x-2 text-white'  >
                Filters
                <PlusIcon size={18} />
            </Button>
            <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden " >
                <div className='fixed inset-0 z-50 flex ' >
                    <DialogPanel className={`relative w-full  rounded-xl flex-col items-center overflow-y-auto max-w-xs ml-auto bg-white`} >
                        <div className='flex items-center justify-end px-4 my-2' >
                            <Iconbutton onclick={onClose} icon={<X size='15' />} />
                        </div>
                        <div className='p-4' >
                            <Filter data={sizes} name='Sizes' valueKey='sizeId' />
                            <Filter data={colors} name='Colors' valueKey='colorId' />

                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default MobileFilters
