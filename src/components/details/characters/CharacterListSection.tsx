import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeResponse,
  CharactersAnimeDetails,
  fetchCharactersById,
} from "@/lib/api";
import Image from "next/image";
import SectionLoading from "../SectionLoading";

const CharacterListSection = ({ id }: { id: number }) => {
  const {
    data: charList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<CharactersAnimeDetails> | null>({
    queryKey: ["animeCharacters", id],
    queryFn: () => fetchCharactersById(id),
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error loading characters. Please try again.</div>;

  return (
    <section>
      <div className="container mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
          <h3 className="text-3xl font-semibold">Characters</h3>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {charList?.data
            .slice(0, 24)
            .map((character: CharactersAnimeDetails) => (
              <div
                key={character.character.mal_id}
                className="group relative cursor-pointer overflow-hidden rounded"
              >
                <Image
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                  className="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                  width={500}
                  height={500}
                />

                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
                    {character.character.name}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterListSection;
