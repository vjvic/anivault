import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeResponse,
  CharactersAnimeDetails,
  fetchCharactersById,
} from "@/lib/api";
import Image from "next/image";

const CharacterListSection = ({ id }: { id: number }) => {
  const {
    data: charList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<CharactersAnimeDetails> | null>({
    queryKey: ["animeCharacters", id],
    queryFn: () => fetchCharactersById(id),
  });

  if (isLoading) {
    return <div>Loading characters...</div>;
  }

  if (isError) {
    return <div>Error loading characters. Please try again.</div>;
  }

  return (
    <section>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
          <h3 className="text-3xl font-semibold">Characters</h3>
        </div>

        <div className="grid gap-4 grid-cols-8">
          {charList?.data.slice(0, 24).map((character) => (
            <div key={character.character.mal_id}>
              <Image
                src={character.character.images.jpg.image_url}
                alt={character.character.name}
                className="w-full object-top object-cover rounded"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterListSection;
