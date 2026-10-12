import React from 'react';
import { 
  Crown, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export default function VipClubSection({ onJoinVip, user }) {
  const perks = [
    "Zero Internet Handling & Convenience Fees on Every Booking",
    "24-Hour Early Access to First-Day-First-Show (FDFS) Tickets",
    "Free Cheese Popcorn Tub Voucher Every Month",
    "Free Ticket Cancellation or Reschedule up to 2 hours before show",
    "Exclusive Access to Star Premiere & Fan Meet Events"
  ];

  return (
    <section id="vip-club" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#131622] rounded-3xl p-6 sm:p-10 border border-rose-500/30 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/15 border border-rose-600/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-rose-500" />
              <span>Riko's Show MoviePass Privileges</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get Unlimited Cinema Perks for ₹199/month
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Never pay extra booking fees again. Join over 150,000 cinephiles across India who save on every single movie ticket and snack.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onJoinVip}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-colors"
              >
                <span>{user ? 'Manage MoviePass' : 'Join MoviePass (₹199/mo)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-[1.6/1] rounded-2xl p-5 bg-gradient-to-br from-[#1C2030] to-[#0E111B] border border-rose-500/40 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-white">Riko's Show</span>
                <span className="text-[9px] uppercase font-bold text-rose-400 border border-rose-500/40 px-1.5 py-0.5 rounded">
                  MOVIEPASS
                </span>
              </div>

              <div className="w-8 h-6 rounded bg-rose-500/40 border border-rose-500/60" />

              <div>
                <span className="text-[10px] font-mono text-slate-400 block">CARDHOLDER</span>
                <span className="text-xs font-bold text-white uppercase">
                  {user ? user.name : "ROHITH"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
