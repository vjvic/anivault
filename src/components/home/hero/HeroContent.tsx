"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Heart } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const { data } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topAnime"],
    queryFn: () => fetchTopAnime({ type: "tv", filter: "favorite", page: 1 }),
  });

  const TruncatedText = ({
    text,
    maxLength,
  }: {
    text: string;
    maxLength: number;
  }) => {
    const truncatedText =
      text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return <div>{truncatedText}</div>;
  };

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <Carousel
      className="w-full flex flex-col items-center"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {data?.data?.slice(0, 5).map((anime, index) => (
          <CarouselItem key={anime.mal_id}>
            <div className="relative">
              <Image
                src={anime.trailer.images.large_image_url}
                alt={anime.title}
                className="w-full h-[50vh] object-cover object-center  rounded"
                width={5000}
                height={5000}
                quality={100}
              />
              <div className="absolute inset-0 flex bg-black bg-opacity-60 rounded w-full h-[50vh] px-16">
                <div className="flex items-center container mx-auto">
                  <div className="max-w-xl">
                    <div className="bg-primary text-primary-foreground w-[250px] text-center py-3 rounded mb-5">
                      #{index + 1} Most Favorite Anime
                    </div>
                    <h3 className="text-4xl font-bold">{anime.title}</h3>
                    <p className="text-lg font-normal">
                      ({anime.title_japanese})
                    </p>
                    <p className="mt-5">
                      <TruncatedText text={anime.synopsis} maxLength={200} />
                    </p>
                    <div className="flex gap-7 items-center my-5">
                      <div className="flex gap-2 items-center">
                        <Star /> <span>{anime.score}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Heart /> <span>{anime.favorites}</span>
                      </div>
                    </div>
                    <Button
                      className="mt-6"
                      size="lg"
                      onClick={() => handleNavigate(Number(anime.mal_id))}
                    >
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
  );
};

export default HeroContent;
