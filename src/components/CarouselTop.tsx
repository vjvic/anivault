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

const CarouselTop = ({ text, data }: { text: string; data: Anime[] }) => {
  const router = useRouter();
  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };
  console.log(data);
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
        <h3 className="text-3xl font-semibold">{text}</h3>
        <Link href="#" className="text-primary">
          View More
        </Link>
      </div>

      <Carousel className="w-full flex flex-col items-center">
        <CarouselContent>
          {data.map((anime) => (
            <CarouselItem
              key={anime.mal_id}
              className="basis-1/6 flex-shrink-0 p-2"
            >
              <div onClick={() => handleNavigate(Number(anime.mal_id))}>
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
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
  );
};

export default CarouselTop;
