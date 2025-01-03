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
import Autoplay from "embla-carousel-autoplay";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import HeroLoading from "@/components/HeroLoading";

const HeroSection = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery<AnimeResponse<Anime>>({
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

    return <span>{truncatedText}</span>;
  };

  if (isLoading) return <HeroLoading />;

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent className="relative mx-auto">
        {data?.data?.slice(0, 5).map((anime, index) => (
          <CarouselItem
            key={anime.mal_id}
            style={{
              backgroundImage: `url(${
                anime.trailer?.images.large_image_url ||
                "https://via.placeholder.com/500"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="h-[50vh] " />
            <div className="absolute inset-0 flex bg-black bg-opacity-60">
              <div className="flex items-center container mx-auto">
                <div className="w-[500px] lg:px-0 px-11">
                  <div className="bg-primary text-primary-foreground w-[160px] text-center py-3 px-2 rounded mb-5 text-xs">
                    #{index + 1} Most Favorite Anime
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-bold text-white">
                    {anime.title}
                  </h3>
                  <p className="text-xs lg:text-lg font-normal text-white">
                    ({anime.title_japanese})
                  </p>
                  <p className="mt-5 text-white text-sm lg:text-base">
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
                    size="sm"
                    onClick={() => handleNavigate(anime.mal_id)}
                  >
                    Show details <ChevronRight />
                  </Button>
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

export default HeroSection;
