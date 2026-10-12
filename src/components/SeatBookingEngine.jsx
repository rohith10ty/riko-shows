import React, { useState, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Crown, 
  Sparkles,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getTheatresForCity, SEAT_TIERS, generateSeatLayout, generateShowDates } from '../data/cinemaData';

export default function SeatBookingEngine({ 
  movie, 
  currentCity,
  onClose, 
  onProceedToCheckout,
  initialSeats = []
}) {
  const dates = useMemo(() => generateShowDates(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  // Theatres for current city
  const cityTheatres = useMemo(() => getTheatresForCity(currentCity), [currentCity]);
  const [selectedTheatre, setSelectedTheatre] = useState(() => cityTheatres[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(movie.showtimes[1] || movie.showtimes[0]);
  
  const [seatLayout] = useState(() => generateSeatLayout());
  const [selectedSeats, setSelectedSeats] = useState(initialSeats);

  // Calculate pricing in INR ₹
  const pricingBreakdown = useMemo(() => {
    let subtotal = 0;
    selectedSeats.forEach(seat => {
      const tierInfo = SEAT_TIERS[seat.tier];
      const price = Math.round(movie.basePrice * (tierInfo?.priceMultiplier || 1));
      subtotal += price;
    });

    return {
      subtotal,
      count: selectedSeats.length
    };
  }, [selectedSeats, movie.basePrice]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    const isAlreadySelected = selectedSeats.some(s => s.id === seat.id);
    if (isAlreadySelected) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
    } else {
      const tierInfo = SEAT_TIERS[seat.tier];
      const seatWithPrice = {
        ...seat,
        price: Math.round(movie.basePrice * (tierInfo?.priceMultiplier || 1))
      };
      setSelectedSeats(prev => [...prev, seatWithPrice]);
    }
  };

  const removeSeat = (seatId) => {
    setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    onProceedToCheckout({
      movie,
      date: selectedDate,
      theatre: selectedTheatre,
      showtime: selectedShowtime,
      seats: selectedSeats,
      subtotal: pricingBreakdown.subtotal
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0D14] text-white flex flex-col justify-between">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0D14]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white truncate max-w-[200px] sm:max-w-md">
                  {movie.title}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-600 text-white">
                  {movie.ageRating}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-white/[0.08] text-slate-300">
                  {movie.formats[0]}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedTheatre?.name} • {currentCity?.name}
              </p>
            </div>
          </div>

          {/* Quick Header Price */}
          <div className="flex items-center gap-3">
            {selectedSeats.length > 0 && (
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total</span>
                <span className="text-base font-black text-rose-400">
                  ₹{pricingBreakdown.subtotal}
                </span>
              </div>
            )}
            <button
              disabled={selectedSeats.length === 0}
              onClick={handleCheckout}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedSeats.length > 0
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                  : 'bg-white/[0.05] text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Continue ({selectedSeats.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Flow Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        
        {/* Step 1: Horizontal Date Ribbon */}
        <section>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>Select Date</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((d) => {
              const isSelected = selectedDate.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-3 rounded-xl border transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-rose-600 border-rose-500 text-white font-bold shadow-md'
                      : 'bg-[#131622] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-[10px] font-semibold opacity-80 uppercase">
                    {d.dayName}
                  </span>
                  <span className="text-lg font-black mt-0.5">
                    {d.dayNum}
                  </span>
                  <span className="text-[10px] uppercase font-bold opacity-80">
                    {d.month}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Cinema Theatres & Showtimes */}
        <section className="bg-[#131622] rounded-2xl p-4 sm:p-5 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Cinemas & Showtimes in {currentCity?.name}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Dolby Atmos • 4K Laser Projection
            </span>
          </div>

          <div className="space-y-3">
            {cityTheatres.map((th) => {
              const isCurrentTheatre = selectedTheatre.id === th.id;
              return (
                <div 
                  key={th.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrentTheatre
                      ? 'bg-white/[0.04] border-rose-500/50'
                      : 'bg-[#0B0D14]/60 border-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {th.name}
                        </h4>
                        <span className="text-[9px] uppercase font-bold text-rose-400 bg-rose-600/10 px-1.5 py-0.5 rounded">
                          {th.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {th.location} • {th.screenType}
                      </p>
                    </div>
                  </div>

                  {/* Showtimes for this theater */}
                  <div className="flex flex-wrap items-center gap-2">
                    {movie.showtimes.map((st, sIdx) => {
                      const isShowtimeSelected = isCurrentTheatre && selectedShowtime.time === st.time;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setSelectedTheatre(th);
                            setSelectedShowtime(st);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                            isShowtimeSelected
                              ? 'bg-rose-600 border-rose-500 text-white shadow-sm'
                              : 'bg-[#131622] border-white/10 text-slate-300 hover:text-white hover:border-rose-500/40'
                          }`}
                        >
                          <span>{st.time}</span>
                          <span className="text-[9px] font-normal opacity-75">
                            {st.format}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 3: Cinema Curved Screen Element */}
        <section className="bg-[#131622] rounded-2xl p-5 sm:p-8 border border-white/[0.08] relative">
          
          <div className="max-w-2xl mx-auto mb-12 text-center">
            {/* Screen Arc */}
            <div className="w-full h-4 rounded-[50%_50%_0_0] border-t-[4px] border-rose-500/90 shadow-[0_0_25px_rgba(225,29,72,0.4)] cinema-curved-screen mx-auto" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3 block">
              SCREEN THIS WAY
            </span>
          </div>

          {/* Seating Grid */}
          <div className="max-w-3xl mx-auto space-y-4">
            {seatLayout.map((rowItem) => {
              const isVip = rowItem.tier === 'VIP';
              const tierInfo = SEAT_TIERS[rowItem.tier];
              const seatPrice = Math.round(movie.basePrice * (tierInfo?.priceMultiplier || 1));

              return (
                <div key={rowItem.row} className="flex items-center justify-center gap-2 sm:gap-4">
                  
                  {/* Row Letter */}
                  <span className="w-5 text-center text-xs font-bold text-slate-400">
                    {rowItem.row}
                  </span>

                  {/* Row Seats */}
                  <div className={`flex items-center justify-center gap-1.5 sm:gap-2 ${isVip ? 'gap-2.5' : ''}`}>
                    {rowItem.seats.map((seat, seatIdx) => {
                      const isSelected = selectedSeats.some(s => s.id === seat.id);
                      const isBooked = seat.isBooked;
                      const isAisleGap = !isVip && (seatIdx === 3 || seatIdx === 8);

                      return (
                        <React.Fragment key={seat.id}>
                          {isAisleGap && <div className="w-3 sm:w-6" />}
                          
                          <button
                            onClick={() => handleSeatClick(seat)}
                            disabled={isBooked}
                            className={`rounded-lg flex items-center justify-center font-bold text-[10px] transition-all ${
                              isVip ? 'w-8 sm:w-9 h-7 sm:h-8' : 'w-6 sm:w-7 h-6 sm:h-7'
                            } ${
                              isBooked
                                ? 'bg-white/[0.04] text-slate-600 border border-white/[0.04] cursor-not-allowed'
                                : isSelected
                                ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.6)] font-black scale-105'
                                : isVip
                                ? 'bg-rose-600/15 border border-rose-600/40 text-rose-300 hover:bg-rose-600/30'
                                : 'bg-white/[0.05] border border-white/10 text-slate-300 hover:bg-white/[0.1] hover:text-white'
                            }`}
                            title={`${seat.id} (${seat.tier}) - ₹${seatPrice}`}
                          >
                            {seat.number}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Row Letter */}
                  <span className="w-5 text-center text-xs font-bold text-slate-400">
                    {rowItem.row}
                  </span>

                </div>
              );
            })}
          </div>

          {/* Seat Tiers Legend */}
          <div className="mt-10 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                1
              </div>
              <span className="text-slate-400">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-rose-600 text-white font-bold flex items-center justify-center text-[10px]">
                ✓
              </div>
              <span className="text-white font-semibold">Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white/[0.04] text-slate-600 flex items-center justify-center text-[10px]">
                ✕
              </div>
              <span className="text-slate-500">Sold</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-400">VIP Recliner (₹{Math.round(movie.basePrice * 1.6)})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Executive Prime (₹{Math.round(movie.basePrice * 1.25)})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-400">Classic (₹{movie.basePrice})</span>
            </div>
          </div>

        </section>

      </main>

      {/* Sticky Bottom Bar */}
      {selectedSeats.length > 0 && (
        <footer className="sticky bottom-0 z-40 bg-[#0B0D14]/95 backdrop-blur-md border-t border-white/[0.08] px-4 sm:px-6 py-3">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-bold text-slate-400">Seats:</span>
              {selectedSeats.map((s) => (
                <button
                  key={s.id}
                  onClick={() => removeSeat(s.id)}
                  className="px-2 py-0.5 rounded bg-rose-600/15 border border-rose-600/30 text-rose-300 text-xs font-bold hover:bg-rose-600 hover:text-white transition-colors"
                  title="Click to remove"
                >
                  {s.id} ✕
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Payable</span>
                <span className="text-xl font-black text-rose-400">₹{pricingBreakdown.subtotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Proceed to Pay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
