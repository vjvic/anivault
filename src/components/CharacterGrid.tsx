import React from "react";
import Image from "next/image";
import { AnimeResponse, Characters } from "@/lib/api";

const CharacterGrid = ({
  characters,
}: {
  characters: AnimeResponse<Characters>;
}) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {characters?.data.map((character) => (
        <div
          key={character.mal_id}
          className="group relative cursor-pointer overflow-hidden rounded"
        >
          <Image
            src={character.images.jpg.image_url}
            alt={character.name}
            className="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
            width={500}
            height={500}
          />

          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
              {character.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
