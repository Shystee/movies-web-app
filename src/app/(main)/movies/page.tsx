import { MovieList } from "~/app/_components/movie-list";

export default async function MoviesPage() {
  return (
    <div className="relative w-full">
      <MovieList />
    </div>
  );
}
