import React from 'react'
import TopCharacter from '@/components/TopCharacter'
import Image from 'next/image'


const Details = () => {
    return (
        <div className='h-full bg-stone-300'>
            <div className="relative">
                <Image
                    src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                    alt="test"
                    className="w-full h-[550px] object-cover rounded"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 flex bg-black bg-opacity-80 rounded w-full h-[550px] px-16">
                    <div className='flex items-center'>
                        <div className='max-w-xl'>

                        </div>
                    </div>
                </div>
            </div>
            <TopCharacter />
        </div>
    )
}

export default Details