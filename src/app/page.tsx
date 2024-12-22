import React from 'react'
import CarouselHero from '@/components/CarouselHero'
import CarouselTop from '@/components/CarouselTop'
import TopCharacter from '@/components/TopCharacter'

const Home = () => {
  return (
    <div className='h-full'>
      <CarouselHero />
      <CarouselTop text="Top Anime" />
      <CarouselTop text="Top Movie" />
      <TopCharacter />
    </div>
  )
}

export default Home
