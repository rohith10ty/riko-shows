import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  // Extract video ID or build embed URL
  let embedUrl = movie.trailerUrl;
  let directUrl = movie.trailerUrl;

  if (embedUrl.includes('embed/')) {
    const videoId = embedUrl.split('embed/')[1].split('?')[0];
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    directUrl = `https://www.youtube.com/watch?v=${videoId}`;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#131622] rounded-3xl overflow-hidden border border-white/15 shadow-2xl z-10 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-4 bg-[#0E111B] border-b border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold text-white truncate">
              {movie.title} • Official Theatrical Trailer
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-rose-400 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={`${movie.title} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom helper */}
        <div className="p-3 bg-[#0B0D14] flex items-center justify-between text-[11px] text-slate-400">
          <span>Official preview licensed for Riko's Show cinema platform</span>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400 hover:underline font-semibold"
          >
            Video not loading? Click here to open on YouTube
          </a>
        </div>

      </div>

    </div>
  );
}
