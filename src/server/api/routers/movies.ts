import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Movie {
  id: string;
  name: string;
  posterUrl: string;
  ageRestriction: string;
  duration: number;
  genres: Array<string>;
}

const movies: Movie[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "The Shawshank Redemption",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 142,
    genres: ["Drama"],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "The Godfather",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 175,
    genres: ["Crime", "Drama"],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Inception",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG-13",
    duration: 148,
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Toy Story",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "G",
    duration: 81,
    genres: ["Animation", "Adventure", "Comedy"],
  },
  {
    id: "63c919cd-af8f-4381-b2c3-c9e9facb20a5",
    name: "Pulp Fiction",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 154,
    genres: ["Crime", "Drama"],
  },
  {
    id: "fb4de6a7-b05a-4a71-9993-9f3a60ff685b",
    name: "Spirited Away",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG",
    duration: 125,
    genres: ["Animation", "Adventure", "Family"],
  },
  {
    id: "2e726394-ebc5-4843-9d01-58f94c7592a1",
    name: "The Dark Knight",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG-13",
    duration: 152,
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: "7fd5a14c-2b3d-4da9-a5cf-5fe08225e3cc",
    name: "The Matrix",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 136,
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: "c9be2d5e-c4f3-4f82-93b2-8b695f4f2c8c",
    name: "Parasite",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 132,
    genres: ["Comedy", "Drama", "Thriller"],
  },
  {
    id: "d8671908-1e53-40ca-9105-776dc7c9a138",
    name: "Avatar",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG-13",
    duration: 162,
    genres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "47b91785-58a9-4c6e-a0d5-87265dfc1178",
    name: "Whiplash",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 107,
    genres: ["Drama", "Music"],
  },
  {
    id: "a1d9e9d2-cd56-42bf-96db-bcf6e58c1c0d",
    name: "Frozen",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG",
    duration: 102,
    genres: ["Animation", "Adventure", "Comedy"],
  },
  {
    id: "8c7ef3c9-2646-4df8-bf4e-954f93c6d9d3",
    name: "The Silence of the Lambs",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 118,
    genres: ["Crime", "Drama", "Thriller"],
  },
  {
    id: "3e8e3baf-55d1-43b7-8f5d-2b7b9e276af5",
    name: "Interstellar",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "PG-13",
    duration: 169,
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: "e7c0a15b-d98f-4bd4-b054-9f8dd8677823",
    name: "The Grand Budapest Hotel",
    posterUrl: "https://placehold.co/600x400/EEE/31343C.jpg",
    ageRestriction: "R",
    duration: 99,
    genres: ["Adventure", "Comedy", "Crime"],
  },
];

export const movieRouter = createTRPCRouter({
  getMovies: publicProcedure.query(() => {
    return movies;
  }),

  getMovieById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const movie = movies.find((m) => m.id === input.id);
      return movie;
    }),
});
