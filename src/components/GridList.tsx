import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Characters } from "@/lib/api";

const GridList = ({ text, data }: { text: string; data: Characters[] }) => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
        <h3 className="text-3xl font-semibold">{text}</h3>
        <Link href="#" className="text-primary">
          See more
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-5">
        {data.map((chracter) => (
          <div key={chracter.mal_id}>
            <Image
              src={chracter.images.jpg.image_url}
              alt={chracter.name}
              className="w-full h-[400px] object-top object-cover rounded"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridList;
