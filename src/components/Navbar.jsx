import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Search, 
  MapPin, 
  Ticket, 
  X, 
  ChevronDown, 
  LogOut, 
  Check, 
  Plus, 
  User, 
  CreditCard,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES } from '../data/cinemaData';

export default function Navbar({ 
  movies = [], 
  currentCity,
  onSelectCity,
  onSelectMovie, 
  onOpenBooking, 
  selectedSeatsCount = 0,
  user,
  onOpenAuth,
  onLogout,
  activeView,
  setActiveView,
  catalogMode = 'now_showing',
  onSelectCatalogMode
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [customCityInput, setCustomCityInput] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.cast.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleAddCustomCity = (e) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const newCity = {
      id: customCityInput.toLowerCase().replace(/\s+/g, '-'),
      name: customCityInput.trim(),
      state: "India",
      popular: false
    };
    onSelectCity(newCity);
    setCityModalOpen(false);
    setCustomCityInput('');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled 
          ? 'py-2.5 bg-[#0B0D14]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg' 
          : 'py-3.5 bg-[#0B0D14]/90 backdrop-blur-sm border-b border-white/[0.05]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & City Picker */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div 
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-rose-400 transition-colors">
                    Riko's Show
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1 font-semibold tracking-wider uppercase">
                    Cinema Tickets
                  </span>
                </div>
              </div>

              {/* City Switcher Trigger */}
              <button
                onClick={() => setCityModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 rounded-xl border border-white/10 transition-all"
                title="Change Location"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="capitalize">{currentCity?.name || 'Hyderabad'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2">
              {/* Uniform Sized Dual Segmented Button for Now Showing & Upcoming */}
              <div className="flex items-center p-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
                <button
                  onClick={() => {
                    if (onSelectCatalogMode) onSelectCatalogMode('now_showing');
                    setActiveView('home');
                    document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-32 h-8 rounded-lg text-xs font-bold text-center justify-center flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'home' && catalogMode === 'now_showing'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Now Showing</span>
                </button>
                <button
                  onClick={() => {
                    if (onSelectCatalogMode) onSelectCatalogMode('upcoming');
                    setActiveView('home');
                    document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-32 h-8 rounded-lg text-xs font-bold text-center justify-center flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'home' && catalogMode === 'upcoming'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-amber-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Upcoming</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveView('movies');
                  document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 h-8 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center ${
                  activeView === 'movies'
                    ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Cinemas in {currentCity?.name}
              </button>
              <button
                onClick={() => {
                  setActiveView('experiences');
                  document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeView === 'experiences'
                    ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Formats (IMAX • 4DX)
              </button>
              <button
                onClick={() => {
                  setActiveView('vip');
                  document.getElementById('vip-club')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeView === 'vip'
                    ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                MoviePass VIP
              </button>
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5">
              
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Search Movies...</span>
              </button>

              {/* Quick Checkout Trigger */}
              {selectedSeatsCount > 0 && (
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Seats ({selectedSeatsCount})</span>
                </button>
              )}

              {/* User Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
                  >
                    <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.name ? user.name[0] : 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-slate-200">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute right-0 mt-2 w-52 bg-[#131622] p-2 rounded-2xl shadow-2xl z-50 border border-white/10"
                      >
                        <div className="px-3 py-2 border-b border-white/[0.06]">
                          <p className="text-xs font-bold text-white">{user.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setActiveView('profile');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs text-white hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                          >
                            <User className="w-3.5 h-3.5 text-rose-500" />
                            <span>My Profile & Tickets</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveView('profile');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-rose-500" />
                            <span>Saved Cards & UPI</span>
                          </button>
                          <button
                            onClick={() => {
                              onLogout();
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-600/10 transition-colors flex items-center gap-2 border-t border-white/[0.06] mt-1"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-all shadow-sm"
                >
                  Sign In
                </button>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* City Switcher Modal (Supports All Indian Cities & Towns) */}
      <AnimatePresence>
        {cityModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => setCityModalOpen(false)} />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-xl bg-[#131622] rounded-3xl p-6 shadow-2xl border border-white/10 z-10 max-h-[85vh] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <div>
                      <h3 className="text-base font-bold text-white">Select City or Town</h3>
                      <p className="text-xs text-slate-400">View current movies & cinemas in your location</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCityModalOpen(false)}
                    className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* City Search Bar */}
                <div className="relative mt-4 mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Search any Indian city or town (Hyderabad, Mumbai, Jaipur...)"
                    autoFocus
                    className="w-full bg-[#0E111B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Popular Cities Quick Strip */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Popular Cities
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {CITIES.slice(0, 8).map((city) => {
                      const isSelected = currentCity?.id === city.id;
                      return (
                        <button
                          key={city.id}
                          onClick={() => {
                            onSelectCity(city);
                            setCityModalOpen(false);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold'
                              : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.07] text-slate-300'
                          }`}
                        >
                          <span className="text-xs font-bold block truncate">{city.name}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{city.state}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Other Cities Grid */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    All Towns & Cities ({filteredCities.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {filteredCities.map((city) => {
                      const isSelected = currentCity?.id === city.id;
                      return (
                        <button
                          key={city.id}
                          onClick={() => {
                            onSelectCity(city);
                            setCityModalOpen(false);
                          }}
                          className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold'
                              : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.06] text-slate-300'
                          }`}
                        >
                          <div className="truncate pr-1">
                            <span className="text-xs font-semibold block truncate">{city.name}</span>
                            <span className="text-[9px] text-slate-500 block truncate">{city.state}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Add Custom Town / City Form */}
              <form onSubmit={handleAddCustomCity} className="mt-4 pt-3 border-t border-white/[0.08] flex gap-2">
                <input
                  type="text"
                  value={customCityInput}
                  onChange={(e) => setCustomCityInput(e.target.value)}
                  placeholder="Don't see your town? Type town name..."
                  className="flex-1 bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={!customCityInput.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Select Town</span>
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Movie Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />
            <motion.div
              initial={{ scale: 0.98, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: -10 }}
              className="w-full max-w-xl bg-[#131622] rounded-2xl p-4 shadow-2xl border border-white/10 relative z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5 flex-1">
                  <Search className="w-4 h-4 text-rose-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search current releases (Pushpa 2, Bhool Bhulaiyaa 3, Amaran...)"
                    autoFocus
                    className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 max-h-80 overflow-y-auto space-y-1.5">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => {
                        onSelectMovie(movie);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-all"
                    >
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-14 object-cover rounded-lg" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white truncate">
                            {movie.title}
                          </h4>
                          <span className="text-[10px] text-rose-400 font-bold">
                            ★ {movie.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {movie.languages.join(', ')} • {movie.genres.join(', ')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-rose-400 bg-rose-600/15 px-2.5 py-1 rounded-lg">
                        Book
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No movies found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
