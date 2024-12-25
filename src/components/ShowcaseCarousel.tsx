import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/lib/api";
import { useRouter } from "next/navigation";

const ShowcaseCarousel = ({
  text,
  data,
  link,
}: {
  text: string;
  data: Anime[];
  link: string;
}) => {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
        <h3 className="text-2xl md:text-3xl font-semibold">{text}</h3>
        <Link
          href={`/top${link}`}
          className="text-primary text-sm md:text-base"
        >
          View More
        </Link>
      </div>

      <Carousel className="w-full flex flex-col items-center">
        <CarouselContent>
          {data.map((anime) => (
            <CarouselItem
              key={anime.mal_id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex-shrink-0 p-2"
            >
              <div
                onClick={() => handleNavigate(anime.mal_id)}
                className="group cursor-pointer relative overflow-hidden rounded"
              >
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full max-h-[320px] object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                  width={500}
                  height={500}
                />

                <div className="absolute px-2 text-center inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <span className="text-white font-semibold text-sm md:text-lg">
                    {anime.title}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ShowcaseCarousel;
