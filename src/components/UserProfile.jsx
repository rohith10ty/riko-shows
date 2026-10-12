import React, { useState } from 'react';
import { 
  User, 
  Ticket, 
  Film, 
  CreditCard, 
  Crown, 
  Star, 
  Clock, 
  Calendar, 
  MapPin, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChevronRight, 
  QrCode, 
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Edit2,
  X
} from 'lucide-react';

export default function UserProfile({ 
  user, 
  onLogout, 
  onBackToHome, 
  onViewTicketPass, 
  bookings = [] 
}) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'watched' | 'cards' | 'vip'
  
  // Editable profile states
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.name || 'Rohith');
  const [userEmail, setUserEmail] = useState(user?.email || 'rohith@rikoshow.com');
  const [userPhone, setUserPhone] = useState(user?.phone || '+91 98765 43210');

  // Saved payment methods
  const [savedCards, setSavedCards] = useState([
    {
      id: "card-1",
      type: "upi",
      title: "Google Pay (UPI)",
      detail: "rohith@okhdfcbank",
      isDefault: true
    },
    {
      id: "card-2",
      type: "card",
      title: "HDFC Bank Regalia",
      detail: "•••• •••• •••• 4242",
      expiry: "12/28",
      network: "Visa",
      isDefault: false
    },
    {
      id: "card-3",
      type: "card",
      title: "ICICI Bank Coral",
      detail: "•••• •••• •••• 8819",
      expiry: "09/27",
      network: "RuPay",
      isDefault: false
    }
  ]);

  const [newCardOpen, setNewCardOpen] = useState(false);
  const [newCardType, setNewCardType] = useState('card');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDetail, setNewCardDetail] = useState('');

  // Movies watched history
  const [watchedMovies, setWatchedMovies] = useState([
    {
      id: "w-1",
      title: "Kalki 2898 AD",
      rating: 5,
      watchedOn: "12 Aug 2024",
      theatre: "Prasads Multiplex: Large Screen (PCX)",
      format: "IMAX 3D",
      review: "Visual masterpiece! The mythological fusion was pure goosebumps."
    },
    {
      id: "w-2",
      title: "Stree 2: Sarkate Ka Aatank",
      rating: 4.5,
      watchedOn: "28 Aug 2024",
      theatre: "AMB Cinemas: Screen 1 VIP",
      format: "Dolby Atmos",
      review: "Hilarious and genuinely scary. Rajkummar and Shraddha nailed it."
    },
    {
      id: "w-3",
      title: "Devara: Part 1",
      rating: 4.5,
      watchedOn: "05 Oct 2024",
      theatre: "PVR INOX: Nexus Mall, Kukatpally",
      format: "IMAX 2D",
      review: "NTR Jr mass screen presence and Anirudh BGM elevated every action scene."
    },
    {
      id: "w-4",
      title: "Jawan",
      rating: 5,
      watchedOn: "18 Sep 2023",
      theatre: "Prasads Multiplex",
      format: "4K Laser",
      review: "Unstoppable energy! Shah Rukh Khan in top form."
    }
  ]);

  // Initial mock booked tickets combined with live bookings
  const allBookings = [
    ...bookings,
    {
      bookingId: "RS-889412",
      movie: {
        title: "Drishyam: The Conclusion",
        languages: ["Hindi", "Telugu"],
        formats: ["IMAX 2D"],
        backdrop: "https://image.tmdb.org/t/p/original/nq73eRdEooripf3k0XHLtX14zyC.jpg",
        poster: "https://image.tmdb.org/t/p/w500/67FsF2kpgEZ1T5Qos4adgqm9dLf.jpg"
      },
      theatre: {
        name: "Prasads Multiplex: Large Screen (PCX)",
        screenType: "4K Dual Laser • Dolby Atmos"
      },
      date: { dayName: "TODAY", dayNum: "12", month: "OCT" },
      showtime: { time: "05:30 PM", format: "IMAX 2D" },
      seats: [
        { id: "H-5", tier: "VIP" },
        { id: "H-6", tier: "VIP" }
      ],
      pricing: { grandTotal: 980 }
    },
    {
      bookingId: "RS-552190",
      movie: {
        title: "Jailer 2",
        languages: ["Tamil", "Telugu", "Hindi"],
        formats: ["Dolby Atmos"],
        backdrop: "https://image.tmdb.org/t/p/original/m0ks2o59mOAz6WdCybJ5FAUNTOU.jpg",
        poster: "https://image.tmdb.org/t/p/w500/upwdEyhhYZ7pT2hD535fr2MGfpx.jpg"
      },
      theatre: {
        name: "AMB Cinemas: Screen 1 VIP",
        screenType: "Laser IMAX • Dolby Atmos"
      },
      date: { dayName: "PREMIERE", dayNum: "15", month: "OCT" },
      showtime: { time: "06:00 PM", format: "Dolby Atmos" },
      seats: [
        { id: "C-7", tier: "PREMIUM" },
        { id: "C-8", tier: "PREMIUM" }
      ],
      pricing: { grandTotal: 720 }
    }
  ];

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardTitle || !newCardDetail) return;
    const cardObj = {
      id: `pay-${Date.now()}`,
      type: newCardType,
      title: newCardTitle,
      detail: newCardDetail,
      network: newCardType === 'card' ? 'Visa / RuPay' : 'UPI',
      isDefault: false
    };
    setSavedCards(prev => [...prev, cardObj]);
    setNewCardTitle('');
    setNewCardDetail('');
    setNewCardOpen(false);
  };

  const handleDeleteCard = (cardId) => {
    setSavedCards(prev => prev.filter(c => c.id !== cardId));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-[#131622] px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-rose-500" />
          <span>Back to Movies</span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:bg-rose-600/10 px-3.5 py-2 rounded-xl border border-rose-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-[#131622] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-3xl shadow-lg border-2 border-white/20 flex-shrink-0">
              {userName[0]}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {userName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-rose-600/20 text-rose-400 border border-rose-600/40 px-2 py-0.5 rounded-full">
                  <Crown className="w-3 h-3 text-rose-400" />
                  <span>VIP Passholder</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">{userEmail} • {userPhone}</p>
              <p className="text-[11px] text-slate-500 font-medium">Member since 2024 • Verified Cinema Account</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-200 border border-white/10 flex items-center gap-2 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-rose-500" />
            <span>{isEditing ? 'Close' : 'Edit Profile'}</span>
          </button>

        </div>

        {/* Edit Profile Drawer / Form */}
        {isEditing && (
          <form 
            onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}
            className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Mobile</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="flex-1 bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Profile Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/[0.08]">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'bookings'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#131622] text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Booked M-Tickets ({allBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('watched')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'watched'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#131622] text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Movies Watched ({watchedMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'cards'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#131622] text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Saved Cards & UPI ({savedCards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vip')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'vip'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#131622] text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>MoviePass VIP Privileges</span>
        </button>
      </div>

      {/* Tab 1: Booked M-Tickets */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Active & Past Cinema Reservations
            </h3>
            <span className="text-xs text-slate-400">Total {allBookings.length} confirmed bookings</span>
          </div>

          <div className="space-y-3">
            {allBookings.map((b, idx) => (
              <div
                key={idx}
                className="bg-[#131622] rounded-2xl p-4 sm:p-5 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-500/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.movie.poster}
                    alt={b.movie.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-22 object-cover rounded-xl shadow-md flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">
                        {b.movie.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold bg-white/[0.06] text-rose-400 px-2 py-0.5 rounded border border-rose-500/30">
                        {b.bookingId}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-400">
                      {b.theatre.name}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold pt-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <span>{b.date.dayName}, {b.date.dayNum} {b.date.month}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-rose-400">{b.showtime.time}</span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Seats: <span className="font-bold text-white">{b.seats.map(s => s.id).join(', ')}</span> ({b.seats.length} Tickets)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06]">
                  <span className="text-sm font-black text-white">
                    Paid ₹{b.pricing?.grandTotal || 750}
                  </span>

                  <button
                    onClick={() => onViewTicketPass(b)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Pass</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Movies Watched History */}
      {activeTab === 'watched' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Rohith's Cinema Diary & Ratings
            </h3>
            <span className="text-xs text-slate-400">Movies Watched in Theatres</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {watchedMovies.map((w) => (
              <div
                key={w.id}
                className="bg-[#131622] rounded-2xl p-4 border border-white/[0.08] space-y-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white truncate">{w.title}</h4>
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs font-bold text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{w.rating} / 5</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  {w.theatre} • <span className="text-rose-400 font-semibold">{w.format}</span>
                </p>

                <p className="text-xs text-slate-300 italic bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                  "{w.review}"
                </p>

                <div className="text-[10px] text-slate-500 pt-1 flex justify-between">
                  <span>Watched on {w.watchedOn}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Ticket
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Saved Cards & UPI */}
      {activeTab === 'cards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Saved Payment Methods
              </h3>
              <p className="text-xs text-slate-400">1-click express checkout for your movie tickets</p>
            </div>

            <button
              onClick={() => setNewCardOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Card / UPI</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {savedCards.map((c) => (
              <div
                key={c.id}
                className="bg-[#131622] rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {c.type === 'upi' ? (
                      <Smartphone className="w-4 h-4 text-rose-500" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-rose-500" />
                    )}
                    <span className="text-xs font-bold text-white">{c.title}</span>
                  </div>
                  {c.isDefault && (
                    <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      Default
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <p className="text-sm font-mono font-bold text-slate-200">{c.detail}</p>
                  {c.expiry && (
                    <p className="text-[10px] text-slate-500 font-mono">Expires {c.expiry} • {c.network}</p>
                  )}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Tokenized & Secure
                  </span>
                  <button
                    onClick={() => handleDeleteCard(c.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove method"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Card Modal */}
          {newCardOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#131622] rounded-2xl p-5 w-full max-w-md border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white">Add New Payment Architecture</h4>
                  <button onClick={() => setNewCardOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 p-1 bg-white/[0.04] rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setNewCardType('card')}
                    className={`py-1.5 rounded-lg ${newCardType === 'card' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    onClick={() => setNewCardType('upi')}
                    className={`py-1.5 rounded-lg ${newCardType === 'upi' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
                  >
                    UPI ID
                  </button>
                </div>

                <form onSubmit={handleAddCard} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      {newCardType === 'card' ? 'Bank & Card Name' : 'UPI App Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={newCardType === 'card' ? "e.g. SBI SimplyCLICK" : "e.g. PhonePe UPI"}
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      className="w-full bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      {newCardType === 'card' ? 'Card Number' : 'UPI VPA Address'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={newCardType === 'card' ? "•••• •••• •••• 1234" : "name@okhdfcbank"}
                      value={newCardDetail}
                      onChange={(e) => setNewCardDetail(e.target.value)}
                      className="w-full bg-[#0E111B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                  >
                    Save & Tokenize
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: MoviePass VIP Privileges */}
      {activeTab === 'vip' && (
        <div className="bg-[#131622] rounded-3xl p-6 sm:p-8 border border-rose-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-rose-400 tracking-wider">
                Active Subscription
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Riko's Show Black Card Passholder
              </h3>
              <p className="text-xs text-slate-400">Renews on 31 December 2026 • ₹199/month</p>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 self-start">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Membership Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05]">
              <span className="text-slate-400 block mb-1">Convenience Fees Saved</span>
              <span className="text-xl font-black text-rose-400">₹1,420</span>
              <span className="text-[10px] text-slate-500 block mt-1">Across 18 Bookings</span>
            </div>

            <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05]">
              <span className="text-slate-400 block mb-1">Free Concessions Claimed</span>
              <span className="text-xl font-black text-rose-400">4 Tubs</span>
              <span className="text-[10px] text-slate-500 block mt-1">Gourmet Cheese Popcorn</span>
            </div>

            <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05]">
              <span className="text-slate-400 block mb-1">Priority FDFS Bookings</span>
              <span className="text-xl font-black text-rose-400">6 Shows</span>
              <span className="text-[10px] text-slate-500 block mt-1">24h Early Bird Access</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
