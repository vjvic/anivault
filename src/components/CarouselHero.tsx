"use client"

import React, { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { type CarouselApi } from "@/components/ui/carousel"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const CarouselHero = () => {

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])


    return (
        <Carousel className="w-full h-3/4 flex flex-col items-center" setApi={setApi} plugins={[
            Autoplay({
                delay: 4000,
            }),
        ]}>
            <CarouselContent >
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Image
                                src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[550px] object-cover rounded"
                                width={500}
                                height={500}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className='flex gap-2'>
                <Button variant="outline" size="icon" onClick={() => api?.scrollTo(current - 1)}>
                    <ChevronLeft />
                </Button>
                <Button variant="outline" size="icon" onClick={() => api?.scrollTo(current + 1)}>
                    <ChevronRight />
                </Button>
            </div>

        </Carousel>
    )
}

export default CarouselHero