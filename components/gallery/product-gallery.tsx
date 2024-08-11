import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react"
import GalleryTab from "./gallery-tab"
import Image from "next/image"

interface ProductGalleryProps{
    images:Image[]
}

const ProductGallery:React.FC<ProductGalleryProps> = ({
    images
}) => {
  return (
   <TabGroup className={'flex flex-col-reverse'} >
    <div className="w-full max-w-2xl lg:max-w-none sm:block mt-6 mx-auto  " > 
        <TabList className={'grid grid-cols-4 gap-6'} >
            {
                images.map((image)=>(
                    <GalleryTab image={image} key={image.id}   />
                ))
            }
        </TabList>
    </div>
    {/* the tabPanel is the image shown based on the id matched by the tab list selected tab */}
    <TabPanels className="aspect-square w-full " >
            {
                images.map((image)=>(
                    <TabPanel key={image.id} >
                        <div className=" relative aspect-square sm:rounded-lg w-full h-full overflow-hidden " >
                            <Image 
                            src={image.imageUrl}
                            alt="Image"
                            fill
                            className="object-cover object-center"
                            />
                        </div>
                    </TabPanel>
                ))
            }
    </TabPanels>
   </TabGroup>
  )
}

export default ProductGallery
