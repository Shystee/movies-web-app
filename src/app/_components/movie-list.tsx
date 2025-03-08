"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";

export function MovieList() {
  const [movies] = api.movie.getMovies.useSuspenseQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rightEdgeItems, setRightEdgeItems] = useState<Record<string, boolean>>(
    {},
  );
  const router = useRouter();

  // Detect items near the right edge on mount and window resize
  useEffect(() => {
    const detectRightEdgeItems = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const itemWidth = 300; // Width of each movie card
      const gap = 24; // 6rem = 24px

      // Calculate how many items fit in a row
      const itemsPerRow = Math.floor(
        (containerWidth + gap) / (itemWidth + gap),
      );

      // Create a map of which items should expand to the left
      const edgeItems: Record<string, boolean> = {};
      if (itemsPerRow > 0) {
        movies.forEach((movie, i) => {
          // If this item is the last in its row or close to the edge
          if ((i + 1) % itemsPerRow === 0 || (i + 2) % itemsPerRow === 0) {
            edgeItems[movie.id] = true;
          }
        });
      }

      setRightEdgeItems(edgeItems);
    };

    // Run on mount
    detectRightEdgeItems();

    // Run on window resize
    window.addEventListener("resize", detectRightEdgeItems);
    return () => window.removeEventListener("resize", detectRightEdgeItems);
  }, [movies]);

  // Handle click on a movie card
  const handleMovieClick = (movieId: string) => {
    router.push(`/watch/${movieId}`);
  };

  return (
    <div ref={containerRef} className="flex flex-wrap gap-6 p-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group relative w-[300px] cursor-pointer"
          onClick={() => handleMovieClick(movie.id)}
        >
          {/* Image container */}
          <div className="relative">
            <Image
              src={movie.posterUrl}
              alt={movie.name}
              width={300}
              height={400}
              className="rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
            />
          </div>

          {/* Info overlay - adaptively expands based on position */}
          <div
            className={`absolute bottom-0 z-20 h-[250px] w-[400px] scale-0 transform overflow-hidden rounded-lg bg-black transition-transform duration-300 ${
              rightEdgeItems[movie.id]
                ? "right-0 origin-bottom-right group-hover:scale-100"
                : "left-0 origin-bottom-left group-hover:scale-100"
            }`}
          >
            <div className="absolute bottom-0 left-0 w-full p-3">
              <h3 className="truncate text-lg font-bold text-white">
                {movie.name}
              </h3>
              <div className="mt-1 flex justify-between text-sm text-white">
                <span className="rounded-md bg-red-600 px-2 py-1 text-xs">
                  {movie.ageRestriction}
                </span>
                <span>
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-md bg-gray-700 px-2 py-1 text-xs text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Watch button */}
              <Link
                href={`/watch/${movie.id}`}
                className="mt-4 block rounded-md bg-red-600 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-red-700"
                onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick
              >
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
