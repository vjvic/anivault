import React from "react";
import Link from "next/link";
import { AnimeResponse, Characters } from "@/lib/api";
import CharacterGrid from "./CharacterGrid";

const ShowcaseCharacters = ({
  text,
  characters,
}: {
  text: string;
  characters: AnimeResponse<Characters>;
}) => {
  return (
    <div className="container mx-auto mt-10 lg:px-0 px-4">
      <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
        <h3 className="text-3xl font-semibold">{text}</h3>
        <Link href="/top/characters" className="text-primary">
          See more
        </Link>
      </div>
      <CharacterGrid characters={characters} />
    </div>
  );
};

export default ShowcaseCharacters;
