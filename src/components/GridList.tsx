import React from 'react'
import Image from 'next/image';
import Link from 'next/link'

const GridList = ({ text }: { text: string }) => {
    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='text-3xl font-semibold'>{text}</h3>
                <Link href="#">See more</Link>
            </div>

            <div className='grid gap-4 grid-cols-4'>
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index}>
                        <Image
                            src='https://th.bing.com/th/id/OIP.vA-QlINEnAkOM8GvHM6zzQHaEK?rs=1&pid=ImgDetMain'
                            alt={`Slide ${index + 1}`}
                            className="w-full object-cover rounded"
                            width={500}
                            height={500}
                        />
                    </div>

                ))}
            </div>
        </div>

    )
}

export default GridList