import React from "react";
import { Anime, AnimeResponse } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AnimeGrid = ({ animes }: { animes: AnimeResponse<Anime> | null }) => {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <div className="grid gap-4 grid-cols-5">
      {animes?.data.map((anime) => (
        <div
          key={anime.mal_id}
          onClick={() => handleNavigate(anime.mal_id)}
          className="group cursor-pointer relative overflow-hidden rounded"
        >
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full object-top object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
            width={500}
            height={500}
          />

          <div className="absolute px-2 text-center inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {anime.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeGrid;
