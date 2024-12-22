import React from 'react'
import GridList from '@/components/GridList'
import Image from 'next/image'
import CarouselTop from '@/components/CarouselTop'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Play } from "lucide-react"



const Details = () => {
    return (
        <div className='h-full w-full'>
            <div className="relative">
                <Image
                    src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                    alt="test"
                    className="w-full h-[550px] object-cover rounded"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 flex bg-black bg-opacity-80 rounded w-full h-[550px] ">
                    <div className='grid gap-9 grid-cols-[400px,1fr] justify-center items-center container mx-auto'>
                        <Image
                            src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                            alt="test"
                            className="w-full object-cover rounded"
                            width={500}
                            height={500}
                        />
                        <div>
                            <h3 className='text-4xl font-bold mb-4'>Anime title</h3>
                            <div className='flex gap-3 mb-4'>
                                <Badge>TV</Badge>
                                <Badge>Episode 28</Badge>
                                <Badge>23 min per ep</Badge>
                                <Badge>9.03</Badge>
                                <Badge>200202</Badge>
                            </div>

                            <Button variant="outline"><Play /> Watch Trailer</Button>

                            <div className='my-6'>
                                <p>Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den. The ingenious 17-year-old Japanese student Light Yagami and sadistic god of death Ryuk share one belief: their worlds are rotten. For his own amusement, Ryuk drops his Death Note into the human world. Light stumbles upon it, deeming the first of its rules ridiculous: the human whose name is written in this note shall die. However, the temptation is too great, and Light experiments by writing a felons name, which disturbingly enacts his first murder. Aware of the terrifying godlike power that has fallen into his hands, Light—under the alias Kira—follows his wicked sense of justice with the ultimate goal of cleansing the world of all evil-doers. The meticulous mastermind detective L is already on his trail, but as Lights brilliance rivals Ls, the grand chase for Kira turns into an intense battle of wits that can only end when one of them is dead. [Written by MAL Rewrite]</p>
                            </div>

                            <div className='flex gap-3 mb-4'>
                                <Badge>Action</Badge>
                                <Badge>Adventure</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GridList text="Characters" />
            <CarouselTop text='More Like This' />
        </div>
    )
}

export default Details