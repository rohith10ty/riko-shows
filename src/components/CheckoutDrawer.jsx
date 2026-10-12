import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  CreditCard, 
  Check, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { INDIAN_SNACKS } from '../data/cinemaData';

export default function CheckoutDrawer({
  isOpen,
  onClose,
  bookingData,
  onBookingComplete
}) {
  const [selectedSnacks, setSelectedSnacks] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('nikhil@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('review'); // 'review' | 'payment'

  if (!isOpen || !bookingData) return null;

  const { movie, date, theatre, showtime, seats, subtotal } = bookingData;

  const handleUpdateSnack = (snackId, delta) => {
    setSelectedSnacks(prev => {
      const current = prev[snackId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[snackId];
        return copy;
      }
      return { ...prev, [snackId]: next };
    });
  };

  const snacksTotal = Object.entries(selectedSnacks).reduce((sum, [id, qty]) => {
    const item = INDIAN_SNACKS.find(s => s.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const convenienceFee = Math.round(35 * seats.length);
  const gst = Math.round((convenienceFee + snacksTotal) * 0.18);
  const grandTotal = subtotal + snacksTotal + convenienceFee + gst;

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FFFFFF', '#F43F5E']
    });
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerCelebration();

      const finalBooking = {
        bookingId: `RS-${Math.floor(100000 + Math.random() * 900000)}`,
        movie,
        date,
        theatre,
        showtime,
        seats,
        snacks: Object.entries(selectedSnacks).map(([id, qty]) => ({
          ...INDIAN_SNACKS.find(s => s.id === id),
          qty
        })),
        pricing: {
          seatsTotal: subtotal,
          snacksTotal,
          convenienceFee,
          gst,
          grandTotal
        },
        bookedAt: new Date().toISOString()
      };

      onBookingComplete(finalBooking);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide Drawer */}
      <div className="relative w-full max-w-lg bg-[#0E111B] border-l border-white/10 shadow-2xl h-full flex flex-col z-10 overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#0E111B]/95 backdrop-blur-md border-b border-white/[0.08] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button 
                onClick={() => setStep('review')}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h3 className="text-sm font-extrabold text-white">
                {step === 'review' ? 'Food & Concessions' : 'Review & Pay'}
              </h3>
              <p className="text-[10px] text-rose-400 font-semibold">
                Riko's Show • M-Ticket Booking
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 flex-1">
          
          {/* Movie Summary Card */}
          <div className="bg-[#131622] p-3.5 rounded-2xl border border-white/[0.06] flex gap-3.5">
            <img 
              src={movie.poster} 
              alt={movie.title}
              referrerPolicy="no-referrer"
              className="w-14 h-20 object-cover rounded-xl shadow-md flex-shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] uppercase font-bold text-rose-400 bg-rose-600/10 px-1.5 py-0.5 rounded">
                {theatre.tag}
              </span>
              <h4 className="text-xs font-bold text-white mt-1 truncate">
                {movie.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                {theatre.name}
              </p>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-300">
                <span className="font-semibold text-white">{date.dayName}, {date.dayNum} {date.month}</span>
                <span>•</span>
                <span className="text-rose-400 font-bold">{showtime.time}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Seats: <span className="font-bold text-white">{seats.map(s => s.id).join(', ')}</span>
              </div>
            </div>
          </div>

          {step === 'review' ? (
            <>
              {/* Snacks Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <ShoppingBag className="w-4 h-4 text-rose-500" />
                    <span>Popular Cinema Food & Beverages</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Delivered to Seat</span>
                </div>

                <div className="space-y-2">
                  {INDIAN_SNACKS.map((snack) => {
                    const count = selectedSnacks[snack.id] || 0;
                    return (
                      <div
                        key={snack.id}
                        className="bg-[#131622] p-2.5 rounded-xl border border-white/[0.05] flex items-center justify-between gap-3"
                      >
                        <img 
                          src={snack.image} 
                          alt={snack.name}
                          className="w-11 h-11 rounded-lg object-cover flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">{snack.name}</h5>
                          <p className="text-[10px] text-slate-400 truncate">{snack.description}</p>
                          <span className="text-xs font-black text-rose-400 block mt-0.5">
                            ₹{snack.price}
                          </span>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 bg-white/[0.04] p-1 rounded-lg border border-white/10">
                          <button
                            onClick={() => handleUpdateSnack(snack.id, -1)}
                            disabled={count === 0}
                            className={`w-6 h-6 rounded flex items-center justify-center ${
                              count === 0 ? 'text-slate-600' : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-white">
                            {count}
                          </span>
                          <button
                            onClick={() => handleUpdateSnack(snack.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#131622] p-3.5 rounded-xl border border-white/[0.06] space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tickets Subtotal ({seats.length} Tickets)</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                {snacksTotal > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Food & Beverage</span>
                    <span className="text-white font-medium">₹{snacksTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Internet Convenience Fee</span>
                  <span className="text-white font-medium">₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Integrated GST (18%)</span>
                  <span className="text-white font-medium">₹{gst}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex justify-between font-black">
                  <span className="text-white text-sm">Total Amount</span>
                  <span className="text-rose-400 text-base">₹{grandTotal}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Payment Method Selector */}
              <div className="space-y-3.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Select Indian Payment Method
                </label>

                <div className="space-y-2.5">
                  {/* UPI */}
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-rose-500 bg-rose-600/10 text-white'
                        : 'border-white/[0.06] bg-[#131622] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-rose-500" />
                      <div>
                        <div className="text-xs font-bold">UPI / QR Code</div>
                        <div className="text-[10px] text-slate-400">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-rose-500" />}
                  </button>

                  {paymentMethod === 'upi' && (
                    <div className="bg-[#131622] p-3 rounded-xl border border-white/10 space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 block">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                        placeholder="yourname@okhdfcbank"
                      />
                    </div>
                  )}

                  {/* Card */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-rose-500 bg-rose-600/10 text-white'
                        : 'border-white/[0.06] bg-[#131622] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-rose-500" />
                      <div>
                        <div className="text-xs font-bold">Debit / Credit Card</div>
                        <div className="text-[10px] text-slate-400">Visa, MasterCard, RuPay</div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-rose-500" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Safe & Secure Payment via RBI Guidelines</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 bg-[#0E111B]/95 backdrop-blur-md border-t border-white/[0.08] p-4">
          {step === 'review' ? (
            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Continue to Payment (₹{grandTotal})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled={isProcessing}
              onClick={handleSimulatePayment}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <span>Pay ₹{grandTotal} & Get M-Ticket</span>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
