import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  Maximize2, 
  Crown, 
  Zap 
} from 'lucide-react';

const EXPERIENCES = [
  {
    title: "IMAX 4K Laser & PCX",
    subtitle: "Massive Screens • 18K Perceived Fidelity",
    desc: "Experience Indian epics like Kalki and Pushpa 2 on towering screens with pin-sharp dual laser projection and uncompressed dynamic range.",
    tag: "Director's Vision",
    icon: Maximize2,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Dolby Atmos 128-Channel",
    subtitle: "Overhead Spatial Audio Transducers",
    desc: "Sound that moves three-dimensionally around you. Feel every thumping beat, gunshot, and background score with studio precision.",
    tag: "Sonic Precision",
    icon: Volume2,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "PVR Luxe & Recliner Suites",
    subtitle: "Motorized Recliners • In-Seat Dining",
    desc: "Coupled plush Italian leather loungers with personal steward service delivering piping hot samosas and caramel popcorn right to your seat.",
    tag: "Ultra Luxury",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "4DX Dynamic Motion Seats",
    subtitle: "Synchronized Pneumatic Haptics & Fog",
    desc: "Real-time haptic motion, wind, water sprays, and atmospheric fog pitched to the movie for adrenaline-pumping immersion.",
    tag: "Adrenaline",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ExperiencesSection({ onExploreShowtimes }) {
  return (
    <section id="experiences" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
          World-Class Formats
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Cinema Formats Available in Your City
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Every auditorium across our partner multiplexes is engineered for pure sensory thrills.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXPERIENCES.map((exp, idx) => {
          const Icon = exp.icon;
          return (
            <div
              key={idx}
              className="bg-[#131622] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-rose-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-transparent to-black/30" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase bg-rose-600 text-white px-2 py-0.5 rounded">
                  {exp.tag}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{exp.title}</h3>
                  <p className="text-[10px] text-rose-400 font-semibold">{exp.subtitle}</p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.05]">
                  <button
                    onClick={onExploreShowtimes}
                    className="text-xs font-bold text-rose-400 hover:text-white transition-colors"
                  >
                    View Showtimes →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
