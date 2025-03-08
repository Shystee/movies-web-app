import { MovieList } from "~/app/_components/movie-list";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <MovieList />
    </HydrateClient>
  );
}
