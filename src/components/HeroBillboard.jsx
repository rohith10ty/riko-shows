import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Ticket, 
  Star, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES } from '../data/cinemaData';

export default function HeroBillboard({ 
  movies = [], 
  currentMovie, 
  onSelectMovie, 
  onOpenBooking, 
  onOpenTrailer,
  currentCity,
  onSelectCity
}) {
  // Strictly filter movies playing in current city
  const cityMovies = useMemo(() => {
    const cityId = currentCity?.id || "hyderabad";
    const filtered = movies.filter(m => m.cities && m.cities.includes(cityId));
    return filtered.length > 0 ? filtered : movies.slice(0, 3);
  }, [movies, currentCity]);

  const [activeIdx, setActiveIdx] = useState(0);

  // Sync active index when city or movie changes
  useEffect(() => {
    if (currentMovie) {
      const idx = cityMovies.findIndex(m => m.id === currentMovie.id);
      if (idx !== -1) {
        setActiveIdx(idx);
      } else if (cityMovies.length > 0) {
        setActiveIdx(0);
        onSelectMovie(cityMovies[0]);
      }
    }
  }, [currentMovie, cityMovies]);

  const movie = cityMovies[activeIdx] || cityMovies[0] || movies[0];

  const handlePrev = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx - 1 + cityMovies.length) % cityMovies.length;
    setActiveIdx(nextIdx);
    onSelectMovie(cityMovies[nextIdx]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = (activeIdx + 1) % cityMovies.length;
    setActiveIdx(nextIdx);
    onSelectMovie(cityMovies[nextIdx]);
  };

  return (
    <section className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Quick City Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none text-xs border-b border-white/[0.06]">
        <span className="text-slate-400 font-bold flex items-center gap-1.5 flex-shrink-0">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>Select City:</span>
        </span>
        {CITIES.map((c) => {
          const isSelected = currentCity?.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCity(c)}
              className={`px-3 py-1 rounded-lg font-medium flex-shrink-0 transition-all ${
                isSelected
                  ? 'bg-rose-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Outer Banner Wrapper with Floating Outside Arrows */}
      <div className="relative px-0 md:px-14 lg:px-16">
        
        {/* Left Arrow (Dedicated outer runway, zero overlap with poster or text) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#131622] hover:bg-rose-600 text-white items-center justify-center border border-white/20 shadow-2xl transition-all z-30 hover:scale-110 active:scale-95 cursor-pointer"
          title="Previous Movie"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow (Dedicated outer runway, zero overlap with poster or text) */}
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#131622] hover:bg-rose-600 text-white items-center justify-center border border-white/20 shadow-2xl transition-all z-30 hover:scale-110 active:scale-95 cursor-pointer"
          title="Next Movie"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Movie Billboard Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#131622] border border-white/[0.08] shadow-2xl min-h-[380px] sm:min-h-[440px] flex items-center">
          
          {/* Backdrop Image with Dark Linear Gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent" />

          {/* Top Right Mini Navigation Controls (Clean & Non-overlapping) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-slate-300 font-bold shadow-md">
              <button 
                onClick={handlePrev}
                className="hover:text-rose-400 p-0.5 rounded transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-white">
                {activeIdx + 1} / {cityMovies.length}
              </span>
              <button 
                onClick={handleNext}
                className="hover:text-rose-400 p-0.5 rounded transition-colors"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Inside Banner */}
          <div className="relative z-10 p-6 sm:p-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Details */}
            <div className="lg:col-span-8 space-y-4 pr-2">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-rose-600 text-white tracking-wider">
                  {movie.badge || "NOW PLAYING"}
                </span>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/[0.08] text-white border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{movie.rating}/10</span>
                  <span className="text-[10px] text-slate-400 font-normal">({movie.votes})</span>
                </div>

                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white/[0.05] text-slate-300">
                  {movie.ageRating}
                </span>

                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{movie.duration}</span>
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {movie.title}
                </h1>
                <p className="text-sm sm:text-base font-medium text-rose-400 italic mt-1">
                  "{movie.tagline}"
                </p>
              </div>

              {/* Synopsis */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2 leading-relaxed">
                {movie.synopsis}
              </p>

              {/* Available Languages & Formats */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Languages:</span>
                  {movie.languages.map((lang, idx) => (
                    <span key={idx} className="bg-white/[0.06] text-white px-2 py-0.5 rounded text-[11px] font-medium">
                      {lang}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Formats:</span>
                  {movie.formats.map((fmt, idx) => (
                    <span key={idx} className="bg-rose-600/15 border border-rose-600/30 text-rose-300 px-2 py-0.5 rounded text-[11px] font-bold">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking(movie)}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:scale-105 active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Tickets in {currentCity?.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenTrailer(movie)}
                  className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-bold text-sm flex items-center gap-2 border border-white/10 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current text-rose-500 ml-0.5" />
                  <span>Watch Trailer</span>
                </button>
              </div>

            </div>

            {/* Right Movie Poster Card */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="relative group cursor-pointer" onClick={() => onOpenBooking(movie)}>
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-56 h-80 object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block">Starting From</span>
                    <span className="text-xl font-extrabold text-white">₹{movie.basePrice}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Carousel Thumbnails Bar (Showing ONLY movies currently playing in this city) */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>NOW SCREENING IN {currentCity?.name?.toUpperCase()} ({cityMovies.length} MOVIES)</span>
          <span className="text-[11px] font-normal text-slate-500">Click title to preview</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
          {cityMovies.map((m, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveIdx(idx);
                  onSelectMovie(m);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl flex-shrink-0 border transition-all text-left ${
                  isActive
                    ? 'bg-rose-600/15 border-rose-600 text-white font-bold'
                    : 'bg-[#131622]/60 border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <img src={m.poster} alt={m.title} referrerPolicy="no-referrer" className="w-7 h-9 object-cover rounded-md" />
                <div>
                  <span className={`text-xs block truncate max-w-[120px] ${isActive ? 'text-white font-bold' : 'text-slate-300'}`}>
                    {m.title}
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold block">
                    ★ {m.rating}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
