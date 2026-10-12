import React, { useRef } from 'react';
import { 
  CheckCircle, 
  ArrowLeft,
  QrCode,
  Printer,
  Share2,
  Ticket
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalTicketPass({ booking, onBackToHome }) {
  const ticketRef = useRef(null);

  if (!booking) return null;

  const { bookingId, movie, date, theatre, showtime, seats, snacks, pricing } = booking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      
      {/* Success Notification */}
      <div className="text-center mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Booking Confirmed</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Your M-Ticket is Ready!
        </h1>
        <p className="text-xs text-slate-400">
          Present this digital QR ticket at the cinema turnstile or usher.
        </p>
      </div>

      {/* The Ticket Pass */}
      <div
        ref={ticketRef}
        className="w-full max-w-md bg-[#131622] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        
        {/* Banner */}
        <div className="relative h-36 overflow-hidden">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-[#131622]/60 to-transparent" />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-white bg-rose-600 px-2 py-0.5 rounded shadow">
              Riko's Show
            </span>
            <span className="text-[11px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded border border-white/20">
              {bookingId}
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3">
            <h2 className="text-xl font-black text-white truncate">
              {movie.title}
            </h2>
            <p className="text-xs text-rose-400 font-semibold">
              {movie.languages[0]} • {movie.formats[0]}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-3.5 text-xs">
          
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Cinema</span>
              <span className="font-bold text-white block truncate">{theatre.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date & Time</span>
              <span className="font-bold text-rose-400 block">
                {date.dayName}, {date.dayNum} {date.month} • {showtime.time}
              </span>
            </div>
          </div>

          {/* Seats */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Seats ({seats.length})</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">AUDI 2 • Level 1</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {seats.map((seat) => (
                <span 
                  key={seat.id}
                  className="px-2.5 py-1 rounded-lg bg-rose-600/15 border border-rose-600/30 text-rose-300 font-black text-xs"
                >
                  {seat.id} ({seat.tier})
                </span>
              ))}
            </div>
          </div>

          {/* Total Paid */}
          <div className="flex justify-between items-center pt-2 border-t border-white/[0.06]">
            <span className="text-slate-400">Total Amount Paid</span>
            <span className="text-base font-black text-white">₹{pricing.grandTotal}</span>
          </div>

        </div>

        {/* Perforated divider */}
        <div className="relative py-2 flex items-center">
          <div className="w-5 h-5 rounded-full bg-[#0B0D14] -ml-2.5 border-r border-white/10" />
          <div className="flex-1 border-t-2 border-dashed border-white/15 mx-1" />
          <div className="w-5 h-5 rounded-full bg-[#0B0D14] -mr-2.5 border-l border-white/10" />
        </div>

        {/* Barcode & QR Code */}
        <div className="p-4 bg-[#0E111B] flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block">
              Scan at cinema turnstile
            </span>
            <div className="h-8 flex items-center gap-1 opacity-90 overflow-hidden">
              {[2, 1, 4, 1, 3, 2, 1, 4, 2, 5, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3].map((w, i) => (
                <div 
                  key={i} 
                  className="h-full bg-white rounded-[1px]" 
                  style={{ width: `${w * 2}px` }} 
                />
              ))}
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 block">
              {bookingId}
            </span>
          </div>

          <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0">
            <QrCode className="w-full h-full text-black" />
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-[#131622] hover:bg-white/[0.08] text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-rose-500" />
          <span>Print / Save M-Ticket</span>
        </button>

        <button
          onClick={() => alert("Booking confirmation sent to your WhatsApp!")}
          className="px-4 py-2 rounded-xl bg-[#131622] hover:bg-white/[0.08] text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Share via WhatsApp</span>
        </button>

        <button
          onClick={onBackToHome}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Book Another Movie</span>
        </button>
      </div>

    </div>
  );
}
