"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Heart } from "lucide-react"
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

const CarouselHero = () => {
    const textSample = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum non blanditiis, nobis possimus quo voluptate. Vel vero nisi mollitia quae?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt doloribus odio facilis eius quae adipisci aut fugit culpa ea."

    const TruncatedText = ({ text, maxLength }: { text: string, maxLength: number }) => {
        const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

        return <div>{truncatedText}</div>;
    };


    return (
        <Carousel className="w-full flex flex-col items-center" plugins={[
            Autoplay({
                delay: 4000,
            }),
        ]}>
            <CarouselContent >
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="relative">
                            <Image
                                src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[550px] object-cover rounded"
                                width={500}
                                height={500}
                            />
                            <div className="absolute inset-0 flex bg-black bg-opacity-60 rounded w-full h-[550px] px-16">
                                <div className='flex items-center'>
                                    <div className='max-w-xl'>
                                        <h3 className='text-4xl font-bold'>Anime Title</h3>
                                        <p className='text-lg'>(other title)</p>
                                        <p className='mt-5'>
                                            <TruncatedText
                                                text={textSample}
                                                maxLength={200}
                                            />
                                        </p>
                                        <div className='flex gap-7 items-center my-5'>
                                            <div className='flex gap-2 items-center'><Star /> <span>9.66</span></div>
                                            <div className='flex gap-2 items-center'><Heart /> <span>2004034.23</span></div>
                                        </div>
                                        <Button className='mt-6'>
                                            Show details <ChevronRight />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselHero