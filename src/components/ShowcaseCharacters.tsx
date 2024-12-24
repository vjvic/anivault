import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Characters } from "@/lib/api";

const ShowcaseCharacters = ({
  text,
  data,
}: {
  text: string;
  data: Characters[];
}) => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
        <h3 className="text-3xl font-semibold">{text}</h3>
        <Link href="#" className="text-primary">
          See more
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-5">
        {data.map((character) => (
          <div
            key={character.mal_id}
            className="group relative cursor-pointer overflow-hidden rounded"
          >
            {/* Image */}
            <Image
              src={character.images.jpg.image_url}
              alt={character.name}
              className="w-full object-top object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
              width={500}
              height={500}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {character.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseCharacters;
