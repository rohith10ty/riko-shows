import React, { useEffect } from 'react';
import { 
  X, 
  Play, 
  Ticket, 
  Star, 
  Clock, 
  Volume2, 
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MovieDetailsModal({ 
  movie, 
  onClose, 
  onOpenBooking, 
  onOpenTrailer 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Backdrop overlay to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0E111B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto">
        
        {/* Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E111B] via-[#0E111B]/60 to-transparent" />
          
          {/* Middle Trailer Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <button
              onClick={() => {
                onClose();
                onOpenTrailer(movie);
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 pointer-events-auto cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Watch Official Trailer</span>
            </button>
          </div>

          {/* Top Right Close Button (Guaranteed Clickable with z-30) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-all z-30 border border-white/20 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase text-white bg-rose-600 px-2 py-0.5 rounded">
                  {movie.formats[0]}
                </span>
                <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  {movie.ageRating}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {movie.title}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-xl border border-white/10 text-white font-bold text-xs">
              <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{movie.rating}/10</span>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-3 text-slate-300 border-b border-white/[0.06] pb-3">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              {movie.duration}
            </span>
            <span>•</span>
            <span className="font-semibold text-rose-400">
              Languages: {movie.languages.join(', ')}
            </span>
            {movie.releaseDate && (
              <>
                <span>•</span>
                <span className={`font-bold ${movie.status === 'upcoming' ? 'text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded' : 'text-slate-300'}`}>
                  {movie.status === 'upcoming' ? `Releasing: ${movie.releaseDate}` : `Released: ${movie.releaseDate}`}
                </span>
              </>
            )}
            <span>•</span>
            <span className="text-slate-400">
              {movie.genres.join(', ')}
            </span>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1">
              About the Movie
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {movie.synopsis}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Director
              </h4>
              <p className="text-white font-bold">{movie.director}</p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Featured Cast
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {movie.cast.map((actor, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-[#131622] border border-white/10 text-slate-200 text-[11px]">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Ticket From</span>
              <span className="text-lg font-black text-rose-400">₹{movie.basePrice}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenBooking(movie);
              }}
              className={`px-6 py-2.5 rounded-xl text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 cursor-pointer ${
                movie.status === 'upcoming' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{movie.status === 'upcoming' ? `Advance Book (${movie.releaseDate})` : 'Select Showtimes & Seats'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
