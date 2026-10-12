import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Film, 
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('+91 98765 43210');
  const [password, setPassword] = useState('••••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userProfile = {
      name: tab === 'signup' && name ? name : 'Rohith',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'rohith@rikoshow.com',
      phone: emailOrPhone.includes('@') ? '+91 98765 43210' : emailOrPhone,
      isVip: true
    };
    onLoginSuccess(userProfile);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const userProfile = {
      name: 'Rohith',
      email: 'rohith@rikoshow.com',
      phone: '+91 98765 43210',
      isVip: true
    };
    onLoginSuccess(userProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-[#131622] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-5 sm:p-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1 mb-5">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center mx-auto shadow-md">
            <Film className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black text-white">
            Riko's Show Account
          </h3>
          <p className="text-xs text-slate-400">
            {tab === 'signin' 
              ? 'Sign in to access your booked M-Tickets' 
              : 'Create an account to book movie tickets'}
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-4">
          <button
            onClick={() => setTab('signin')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              tab === 'signin'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'signup' && (
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nikhil Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0E111B] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Mobile Number or Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-[#0E111B] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0E111B] border border-white/10 rounded-lg pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors mt-2"
          >
            <span>{tab === 'signin' ? 'Sign In' : 'Create Free Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-rose-400 text-xs font-bold transition-colors"
          >
            1-Click Demo Login
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/[0.06] text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>OTP & Verified Credentials</span>
        </div>

      </div>
    </div>
  );
}
