"use client";

import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import * as React from "react";
import { cn } from "~/lib/utils";

interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  src,
  title,
  className,
  poster,
  autoPlay = true,
}: VideoPlayerProps) {
  const playerRef = React.useRef<MediaPlayerInstance>(null);

  return (
    <MediaPlayer
      ref={playerRef}
      src={src}
      title={title}
      poster={poster}
      autoPlay={autoPlay}
      keyTarget="document"
      keyDisabled={false}
      load="eager"
      crossorigin=""
      className={cn("h-full w-full bg-black", className)}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails="" />
    </MediaPlayer>
  );
}
