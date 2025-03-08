import { MovieList } from "~/app/_components/movie-list";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <MovieList />
      </main>
    </HydrateClient>
  );
}
