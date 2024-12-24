import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AnimeResponse,
  CharactersAnimeDetails,
  fetchCharactersById,
} from "@/lib/api";

const CharacterList = ({ id }: { id: number }) => {
  const { data, isLoading } =
    useQuery<AnimeResponse<CharactersAnimeDetails> | null>({
      queryKey: ["animeCharacters", id],
      queryFn: () => fetchCharactersById(id),
      initialData: { data: [] },
    });

  if (isLoading) return <div>Loading...</div>;

  const anime = data ?? { data: [] };

  console.log("detail chracter");
  console.log(anime);
  console.log("splice");

  return (
    <div>
      {anime?.data.map((data) => (
        <div key={data.mal_id}>{data.name}</div>
      ))}
    </div>
  );
};

export default CharacterList;
