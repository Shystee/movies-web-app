import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";

export default async function WatchMovie({
  params,
}: {
  params: { movieId: string };
}) {
  // Get the movieId from the URL params
  const { movieId } = params;

  // Fetch the movie data from the API
  const movie = await api.movie.getMovieById({ id: movieId });

  // If the movie doesn't exist, show a 404 page
  if (!movie) {
    notFound();
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <MediaPlayer
        title={movie.name}
        src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
        aspectRatio="16:9"
        className="h-full w-full"
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
