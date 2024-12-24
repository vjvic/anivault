"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnimeByGenres } from "@/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";

const GenrePage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["animeByGenre", id],
    queryFn: () => getAnimeByGenres(id as string, 1),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading anime...</div>;
  }

  if (isError) {
    return <div>Error fetching anime by genre.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Anime in this Genre</h1>
      {data?.data && data.data.length > 0 ? (
        <div className="grid gap-4 grid-cols-4">
          {data.data.map((anime) => (
            <div key={anime.mal_id}>
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-auto object-cover rounded"
                width={500}
                height={500}
              />
              <p className="mt-2">{anime.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No anime found for this genre.</div>
      )}
    </div>
  );
};

export default GenrePage;
