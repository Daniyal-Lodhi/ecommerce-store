"use client"
import React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'


interface billboardSliderProps {
    data: Billboard[]
}


const BillboardSlider: React.FC<billboardSliderProps> = ({
    data
}) => {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, }),
    )




    return (
        <div className="p-4 sm:p-6 lg:p-8 overflow-hidden bg-cover  " >
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="w-full mx-auto">
                <CarouselContent>
                    {data.map((billboard) => (
                        <CarouselItem key={billboard.id}>
                            <div className="  rounded-xl relative aspect-square md:aspect-[3/1] overflow-hidden object-cover bg-cover"
                                style={{ backgroundImage: `url(${billboard.imageUrl})` }}
                            >
                                { data.length > 1 && <CarouselPrevious className="absolute top-[50%] left-0 z-50 bg-transparent border-none hover:bg-transparent " />}
                                { data.length > 1 && <CarouselNext className="absolute top-[50%] right-0 z-50 bg-transparent border-none hover:bg-transparent " />}
                                <div className="flex flex-col gap-y-8 justify-center items-center h-full w-full text-center" >
                                    <div className="text-3xl sm:text-5xl lg:text-6xl font-bold sm:max-w-xl max-w-xs " >
                                        {billboard?.label}
                                    </div>

                                </div>

                            </div >
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

        </div>
    )
}

export default BillboardSlider


