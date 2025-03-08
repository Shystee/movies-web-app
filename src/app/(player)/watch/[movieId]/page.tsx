"use client";

import { ArrowLeft, Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { VideoPlayer } from "~/components/ui/video-player";
import { api } from "~/trpc/react";

export default function WatchPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const router = useRouter();
  const {
    data: movie,
    isLoading,
    error,
  } = api.movie.getMovieById.useQuery({ id: movieId });
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Handle keyboard events for the player
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to go back
      if (e.key === "Escape") {
        router.back();
      }

      // I to toggle info
      if (e.key === "i" || e.key === "I") {
        setShowInfo((prev) => !prev);
      }

      // Prevent default space behavior (page scroll)
      if (e.key === " " && e.target === document.body) {
        e.preventDefault();
      }
    };

    // Ensure the body doesn't scroll
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="h-24 w-24 animate-spin rounded-full border-b-2 border-t-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <Button
          variant="ghost"
          className="mt-4 text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Top overlay for back button and info */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/20"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/20"
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Show info"
        >
          <Info className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Player */}
      <div className="h-full w-full">
        <VideoPlayer
          src={movie.videoUrl}
          title={movie.name}
          poster={movie.posterUrl}
        />
      </div>

      {/* Movie Info Overlay */}
      {showInfo && (
        <div
          className="absolute inset-0 z-20 bg-black/70 p-8 transition-opacity duration-300"
          onClick={() => setShowInfo(false)}
        >
          <div className="mx-auto max-w-3xl text-white">
            <h1 className="mb-4 text-4xl font-bold">{movie.name}</h1>
            <div className="mb-4 flex items-center gap-4">
              <span className="rounded border border-white/20 px-2 py-1 text-sm">
                {movie.ageRestriction}
              </span>
              <span>
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-300">
              A placeholder description for {movie.name}. This is where a
              detailed synopsis of the movie would be displayed to provide
              viewers with information about the plot, cast, and other relevant
              details.
            </p>
            <div className="mt-8 text-sm text-gray-400">
              <p>
                Press <kbd className="rounded bg-white/10 px-2 py-1">ESC</kbd>{" "}
                to exit fullscreen
              </p>
              <p>
                Press <kbd className="rounded bg-white/10 px-2 py-1">I</kbd> to
                toggle this info panel
              </p>
              <p>
                Press <kbd className="rounded bg-white/10 px-2 py-1">Space</kbd>{" "}
                to play/pause
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
