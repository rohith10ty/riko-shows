import React from 'react';
import { Film, MapPin, Send, Heart } from 'lucide-react';
import { CITIES } from '../data/cinemaData';

export default function Footer({ onNavigate, onSelectCity, currentCity }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#08090E] pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Popular Cities in India */}
        <div className="space-y-2">
          <div className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Movies in Popular Indian Cities</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCity(c);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  currentCity?.id === c.id
                    ? 'border-rose-500 text-rose-400 bg-rose-600/10 font-bold'
                    : 'border-white/[0.06] hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-white/[0.06]">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-xs">
                R
              </div>
              <span className="font-extrabold text-white text-base">Riko's Show</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India's premium movie ticket booking destination. Book tickets for Kalki, Pushpa 2, Jawan and latest releases across PVR INOX, Cinepolis, and iconic single screens.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-3 text-[11px]">
              Now Showing
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('movies')} className="hover:text-rose-400">Kalki 2898 AD (Telugu & Hindi)</button></li>
              <li><button onClick={() => onNavigate('movies')} className="hover:text-rose-400">Pushpa 2: The Rule</button></li>
              <li><button onClick={() => onNavigate('movies')} className="hover:text-rose-400">Stree 2: Sarkate Ka Aatank</button></li>
              <li><button onClick={() => onNavigate('movies')} className="hover:text-rose-400">Jawan (Shah Rukh Khan)</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-3 text-[11px]">
              Cinema Formats
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('experiences')} className="hover:text-rose-400">IMAX 4K Laser & 3D</button></li>
              <li><button onClick={() => onNavigate('experiences')} className="hover:text-rose-400">Dolby Atmos 128 Channel</button></li>
              <li><button onClick={() => onNavigate('experiences')} className="hover:text-rose-400">PVR Luxe & Recliners</button></li>
              <li><button onClick={() => onNavigate('experiences')} className="hover:text-rose-400">4DX Dynamic Motion</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-3 text-[11px]">
              Newsletter & Alerts
            </h4>
            <p className="text-slate-400 mb-2 text-[11px]">
              Get secret FDFS midnight drop alerts & coupon codes.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Riko's Show alerts!"); }} className="flex gap-1.5">
              <input
                type="email"
                required
                placeholder="yourname@gmail.com"
                className="bg-[#131622] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 flex-1"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Riko's Show Entertainment India Pvt. Ltd. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-current inline" /> for Indian Movie Fans
          </p>
        </div>

      </div>
    </footer>
  );
}
