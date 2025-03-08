"use client";

import { HoverPopover } from "~/app/_components/hover-popover";
import { api } from "~/trpc/react";

export function MovieList() {
  const [movies] = api.movie.getMovies.useSuspenseQuery();

  return (
    <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
      {movies.map((movie) => (
        <div key={movie.id} className="flex aspect-[2/3] w-full">
          <HoverPopover {...movie} />
        </div>
      ))}
    </div>
  );
}
