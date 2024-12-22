import React from 'react'
import CarouselHero from '@/components/CarouselHero'
import CarouselTop from '@/components/CarouselTop'
import GridList from '@/components/GridList'

const Home = () => {
  return (
    <div className='h-full'>
      <CarouselHero />
      <CarouselTop text="Top Anime" />
      <CarouselTop text="Top Movie" />
      <GridList text="Top Character" />
    </div>
  )
}

export default Home
