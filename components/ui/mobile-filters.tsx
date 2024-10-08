'use client'

import React, { useState } from 'react'
import {Button} from './button'
import { PlusIcon, X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Iconbutton from './icon-button'
import Filter from './filters'
import PreventHydration from '../hydration-prevention'

interface MobileFiltersProps {
    sizes: Size[] ,
    colors: Color[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    sizes,
    colors
}) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true)
    };
    const onClose = () => setOpen(false);
    return (
        <div>
            <PreventHydration/>
            <Button onClick={onOpen} className='flex items-center gap-x-2 text-white'  >
                Filters
                <PlusIcon size={18} />
            </Button>
            <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden " >
                <div className='fixed inset-0 z-50 flex ' >
                    <DialogPanel className={`relative w-full  rounded-xl flex-col items-center overflow-y-auto max-w-xs ml-auto bg-white`} >
                        <div className='flex items-center justify-end px-4 my-2' >
                            <Iconbutton className='rounded-md border-none shadow-md mt-2'  onclick={onClose} icon={<X size='15' />} />
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
