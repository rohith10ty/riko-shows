import React, { useState, useMemo } from 'react';
import { 
  Film, 
  Search, 
  Star, 
  Clock, 
  Ticket, 
  Info, 
  Play, 
  MapPin, 
  Sparkles,
  Calendar,
  Bell,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGE_TABS = [
  "All Movies",
  "Telugu",
  "Hindi",
  "Tamil",
  "English",
  "Action",
  "Sci-Fi",
  "Thriller"
];

export default function MovieListing({ 
  movies = [], 
  upcomingMovies = [],
  currentCity,
  onSelectMovie, 
  onOpenBooking, 
  onOpenDetails,
  onOpenTrailer,
  catalogMode = "now_showing",
  onCatalogModeChange
}) {
  const [displayMode, setDisplayMode] = useState(catalogMode); // 'now_showing' | 'upcoming'
  const [activeTab, setActiveTab] = useState("All Movies");
  const [searchFilter, setSearchFilter] = useState("");
  const [reminders, setReminders] = useState({});

  // Sync displayMode when catalogMode changes from parent (e.g. Navbar click)
  React.useEffect(() => {
    if (catalogMode) {
      setDisplayMode(catalogMode);
    }
  }, [catalogMode]);

  const handleToggleReminder = (movieId, movieTitle) => {
    setReminders(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  const targetMovies = displayMode === "now_showing" ? movies : upcomingMovies;

  // Strict Filter by City & Language / Genre
  const filteredMovies = useMemo(() => {
    const cityId = currentCity?.id || "hyderabad";

    return targetMovies.filter(m => {
      // Must be scheduled in this specific city
      const matchesCity = m.cities && m.cities.includes(cityId);
      if (!matchesCity) return false;

      // Text search
      const matchSearch = 
        m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        m.director.toLowerCase().includes(searchFilter.toLowerCase()) ||
        m.cast.some(c => c.toLowerCase().includes(searchFilter.toLowerCase())) ||
        m.genres.some(g => g.toLowerCase().includes(searchFilter.toLowerCase()));

      if (!matchSearch) return false;

      // Tab filter
      if (activeTab === "All Movies") return true;
      if (m.languages.includes(activeTab)) return true;
      if (m.genres.includes(activeTab)) return true;

      return false;
    });
  }, [targetMovies, currentCity, searchFilter, activeTab]);

  return (
    <section id="movie-catalog" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Primary Switcher Ribbon: Now Showing vs Upcoming Movies */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
        
        {/* Toggle Pills with Identical Uniform Dimensions */}
        <div className="flex items-center p-1.5 bg-[#131622] rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => {
              setDisplayMode("now_showing");
              setActiveTab("All Movies");
              if (onCatalogModeChange) onCatalogModeChange("now_showing");
            }}
            className={`w-48 sm:w-52 h-11 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
              displayMode === "now_showing"
                ? "bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Film className="w-4 h-4 flex-shrink-0" />
            <span>Now Showing ({movies.filter(m => m.cities?.includes(currentCity?.id || 'hyderabad')).length})</span>
          </button>

          <button
            onClick={() => {
              setDisplayMode("upcoming");
              setActiveTab("All Movies");
              if (onCatalogModeChange) onCatalogModeChange("upcoming");
            }}
            className={`w-48 sm:w-52 h-11 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
              displayMode === "upcoming"
                ? "bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)]"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span>Upcoming ({upcomingMovies.filter(m => m.cities?.includes(currentCity?.id || 'hyderabad')).length})</span>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-extrabold uppercase">
              NEW
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={`Search ${displayMode === 'now_showing' ? 'running' : 'upcoming'} movies in ${currentCity?.name}...`}
            className="bg-[#131622] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-full sm:w-72 transition-all"
          />
        </div>

      </div>

      {/* Sub-Header Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {displayMode === "now_showing" ? `Currently Screening in ${currentCity?.name}` : `Releasing Soon in ${currentCity?.name}`}
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span>
            {displayMode === "now_showing" ? `Now Showing in ${currentCity?.name}` : `Upcoming Movies & Advance Booking`}
          </span>
          <span className="text-sm font-bold text-slate-400 bg-white/[0.06] px-2.5 py-1 rounded-lg">
            {filteredMovies.length} Movies
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          {displayMode === "now_showing"
            ? `Experience currently playing blockbuster hits with 4K Laser Projection, IMAX 3D, and Dolby Atmos audio across multiplexes in ${currentCity?.name}.`
            : `Lock in early premiere seats with Advance Booking for Dussehra and Diwali releases, or set release reminders for upcoming global tentpoles.`
          }
        </p>
      </div>

      {/* Language / Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {LANGUAGE_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-[#131622] text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.06]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredMovies.map((movie) => {
          const isReminded = !!reminders[movie.id];
          const isUpcoming = movie.status === "upcoming";

          return (
            <div
              key={movie.id}
              className="group bg-[#131622] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(225,29,72,0.15)]"
            >
              {/* Poster with Rating & Date Badge */}
              <div 
                className="relative aspect-[2/3] overflow-hidden cursor-pointer" 
                onClick={() => onOpenDetails(movie)}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-transparent to-black/30" />

                {/* Top Left Tag / Badge */}
                {movie.badge && (
                  <div className="absolute top-2 left-2 max-w-[70%]">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-md truncate block ${
                      isUpcoming 
                        ? 'bg-amber-500 text-black font-extrabold' 
                        : 'bg-rose-600 text-white'
                    }`}>
                      {movie.badge}
                    </span>
                  </div>
                )}

                {/* Bottom Left Rating */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-white font-bold border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <span className="text-[10px] text-slate-300 bg-black/70 px-1.5 py-0.5 rounded font-medium">
                    {movie.ageRating}
                  </span>
                </div>

                {/* Trailer quick button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTrailer(movie);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/75 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-md z-10"
                  title="Play Trailer"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>

              {/* Movie Info */}
              <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onOpenDetails(movie)}
                    className="font-extrabold text-sm text-white group-hover:text-rose-400 transition-colors truncate cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                  
                  {/* Proper Release Date Tag */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <Calendar className={`w-3 h-3 flex-shrink-0 ${isUpcoming ? 'text-amber-400' : 'text-rose-500'}`} />
                    <span className={`text-[11px] font-semibold truncate ${
                      isUpcoming ? 'text-amber-300 font-bold' : 'text-slate-300'
                    }`}>
                      {isUpcoming ? `Releasing ${movie.releaseDate}` : `Released ${movie.releaseDate}`}
                    </span>
                    {movie.daysLeft && (
                      <span className="text-[9px] bg-amber-400/20 text-amber-300 font-black px-1.5 py-0.2 rounded">
                        {movie.daysLeft}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-1">
                    {movie.languages.join(', ')}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {movie.genres.join(' • ')} {movie.duration ? `• ${movie.duration}` : ''}
                  </p>
                </div>

                {/* Formats Pills */}
                <div className="flex flex-wrap gap-1">
                  {movie.formats.slice(0, 2).map((fmt, i) => (
                    <span key={i} className="text-[9px] uppercase font-bold text-rose-300 bg-rose-600/10 px-1.5 py-0.5 rounded border border-rose-600/20">
                      {fmt}
                    </span>
                  ))}
                </div>

                {/* Price & Action Button */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">From</span>
                    <span className="text-xs font-black text-white">₹{movie.basePrice}</span>
                  </div>

                  {isUpcoming && !movie.advanceBooking ? (
                    <button
                      onClick={() => handleToggleReminder(movie.id, movie.title)}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isReminded
                          ? 'bg-emerald-600 text-white font-extrabold'
                          : 'bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 border border-white/10'
                      }`}
                    >
                      {isReminded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Alert Set!</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                          <span>Notify Me</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenBooking(movie)}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer ${
                        isUpcoming ? 'bg-amber-600 hover:bg-amber-500 font-extrabold' : 'bg-rose-600 hover:bg-rose-500'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{isUpcoming ? 'Advance Book' : 'Book'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredMovies.length === 0 && (
        <div className="bg-[#131622] rounded-2xl p-10 text-center border border-white/10 mt-4">
          <Film className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-white">
            No {displayMode === 'now_showing' ? 'Running' : 'Upcoming'} Movies Found in {currentCity?.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Try switching to Hyderabad, Mumbai, or Bengaluru to explore all screenings.
          </p>
        </div>
      )}

    </section>
  );
}
