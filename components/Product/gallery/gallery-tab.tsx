'use client'

import { Tab } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'

interface GalleryTabProps{
    image:Image
}

const GalleryTab:React.FC<GalleryTabProps> = ({
    image
}) => {
  return (
    <Tab className={'relative flex items-center justify-center aspect-square cursor-pointer rounded-md bg-white '} >
      {({selected})=>(
        <div className='' >
          <span className='absolute inset-0 aspect-square h-full w-full  overflow-hidden rounded-md' >
            <Image
            fill
            src={image.imageUrl}
            alt=''
            sizes='100%'
            className='object-cover object-center'
            />
          </span>
          <span  className={`absolute inset-0 ${selected?'ring-black':'ring-transparent'} ring-2 ring-offset-2 rounded-md `} />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab
