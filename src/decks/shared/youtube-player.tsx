'use client';
// Interactive YouTube player with lazy iframe initialization and playback controls

import { Button } from '@/components/ui/button';
import { ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  duration?: string;
}

function YouTubeCover({
  title,
  duration,
  videoId,
  onPlay,
}: {
  title: string;
  duration?: string;
  videoId: string;
  onPlay: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/90 via-black/40 to-black/70 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-red-400">YouTube Recording</span>
        </div>
        {duration && <span className="text-xs font-mono text-zinc-400">{duration}</span>}
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 max-w-xl mx-auto line-clamp-2">
          {title}
        </h3>
        <Button
          size="lg"
          onClick={onPlay}
          className="rounded-full bg-red-600 text-white hover:bg-red-700 shadow-xl transition-transform hover:scale-105 px-6 gap-2"
          aria-label={`Play YouTube video: ${title}`}
        >
          <Play className="h-5 w-5 fill-current" />
          <span className="font-semibold text-sm">Play Presentation</span>
        </Button>
      </div>

      <div className="flex justify-end">
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Open on YouTube</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

export function YouTubePlayer({ videoId, title, duration }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-black aspect-video shadow-lg group">
      {!isPlaying ? (
        <YouTubeCover title={title} duration={duration} videoId={videoId} onPlay={() => setIsPlaying(true)} />
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
