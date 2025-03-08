import { Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type Movie } from "~/server/api/routers/movies";

type Props = Movie;

export function HoverPopover({
  id,
  name,
  posterUrl,
  genres,
  ageRestriction,
  duration,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleWatch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/watch/${id}`);
  };

  return (
    <Popover open={open}>
      <PopoverTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={handleWatch}
        className="w-full focus:outline-none"
      >
        <div className="h-full overflow-hidden rounded">
          <Image
            src={posterUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            width={0}
            height={0}
            sizes="100%"
            priority={false}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-72 p-3">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{ageRestriction}</span>
            <span>•</span>
            <span>
              {Math.floor(duration / 60)}h {duration % 60}m
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded bg-gray-100 px-2 py-1 text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          <Button className="w-full gap-2" onClick={handleWatch}>
            <Play className="h-4 w-4" />
            Play
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
