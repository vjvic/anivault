"use client";

import React from "react";
import GridList from "@/components/GridList";
import Image from "next/image";
import CarouselTop from "@/components/CarouselTop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid, Play } from "lucide-react";
import { TopResponse, Anime, fetchAnimeById } from "@/lib/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AnimeDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: animeDetails, isLoading } = useQuery<Anime>({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeById(Number(id)),
  });

  if (isLoading) return <div>Loading...</div>;

  const anime = animeDetails;

  if (!anime) {
    return <div>Anime not found.</div>;
  }

  console.log(anime);

  const {
    title,
    synopsis,
    images,
    type,
    episode,
    duration,
    favorites,
    score,
    genres,
    trailer,
  } = anime;

  const handleRedirect = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  return (
    <div className="h-full w-full">
      <div
        className="h-[550px] bg-cover bg-center rounded"
        style={{
          backgroundImage: `url(${
            trailer?.images.large_image_url || "https://via.placeholder.com/500"
          })`,
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 grid gap-9 grid-cols-1 md:grid-cols-[400px,1fr] items-center">
            <Image
              src={images.jpg.large_image_url}
              alt={anime.title}
              className="object-contain rounded mx-auto lg:w-[300px] lg:h-[300px]"
              width={350}
              height={350}
            />

            <div className="text-center sm:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {title}
              </h3>
              <div className="flex gap-3 mb-5 justify-center sm:justify-start flex-wrap">
                <Badge>{type}</Badge>
                <Badge>{episode ? episode : "N/A"}</Badge>
                <Badge>{duration} per ep</Badge>
                <Badge>{score}</Badge>
                <Badge>{favorites}</Badge>
              </div>

              <Button
                variant="outline"
                onClick={() => handleRedirect(trailer?.embed_url || "")}
                className="mx-auto sm:mx-0"
              >
                <Play /> Watch Trailer
              </Button>

              <div className="my-7">
                <p className="text-sm sm:text-base text-white">{synopsis}</p>
              </div>

              <div className="flex gap-3 mb-4 justify-center sm:justify-start flex-wrap">
                {genres.map((genre: any) => (
                  <Badge key={genre.mal_id}>{genre.name}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;