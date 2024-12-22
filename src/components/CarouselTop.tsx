import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import Image from 'next/image';
import Link from 'next/link'

const CarouselTop = ({ text }: { text: string }) => {
    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='text-3xl font-semibold'>{text}</h3>
                <Link href="#">View More</Link>
            </div>

            <Carousel className="w-full flex flex-col items-center">
                <CarouselContent >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/6 flex-shrink-0 p-2">
                            <div >
                                <Image
                                    src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                                    alt={`Slide ${index + 1}`}
                                    className="w-full object-cover rounded"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CarouselTop