# 🎬 Riko's Show — Ultra-Premium Cinema & Ticket Booking Experience

> **Awwwards / FWA-Caliber Digital Cinema Booking Platform** built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Lenis Smooth Scroll**, and **Lucide React**.

Designed with an obsidian-dark aesthetic (`#08080C`), subtle radial neon ambient lighting (cyan, magenta, IMAX gold), glassmorphism, micro-interactions, and a next-generation 3D curved seating engine.

---

## 🌟 Key Architectural Features

### 1. 🎟️ Next-Gen 3D Curved Cinema Seating Engine
- **Illuminated Curved Cinema Screen**: Features a realistic curved screen arc element with ambient neon down-glow and realistic 3D perspective projection (`perspective: 1200px`).
- **Tiered Seating Architecture**:
  - **VIP Recliner Suite (Rows G & H)**: Plush dual coupled loungers with cocktail table indicators and priority butler call.
  - **Premium Center (Rows C–F)**: Sweet-spot optimal viewing zone with cyan illuminated halos.
  - **Standard Class (Rows A–B)**: Ergonomic cinema seats.
- **Dynamic Seat States**:
  - `Available`: Interactive hover glow & elevation.
  - `Selected`: Spring pop animation, brand cyan glow, real-time ticket tally.
  - `Reserved/Booked`: Subtle muted dark gray with locked states.
- **Live Seat Tally & Removal**: Interactive seat badges with instant removal and real-time subtotal recalculation.

### 2. 🍿 Gourmet Add-On Concessions Bar
- In-seat curated concessions upsell tray:
  - *Truffle & Herb Popcorn*
  - *Smoked Vanilla Artisanal Soda*
  - *Belgian Dark Pretzel Bites*
  - *IMAX 3D Laser Glasses (Pro-Fit)*
  - *VIP Valet & Sky Lounge Pass*
- Incremental quantity stepper (`+` / `-`) with live receipt calculation.

### 3. 💳 Slide-Over Glass Checkout Drawer
- Itemized cost breakdown (Seats Subtotal + Concessions + Digital Processing Fee + Taxes).
- Express payment options: **Apple Pay**, **Google Pay**, and **Credit / Debit Card**.
- Simulated 256-bit encrypted checkout with animated processing spinner and celebration confetti.

### 4. 🎫 Holographic Digital Pass Generation
- Ultra-realistic digital ticket receipt with metallic sheen and animated holographic shimmer.
- Perforated divider with semi-circular notch cutouts.
- High-tech barcode & QR code ticket receipt.
- **Print / Save Pass (PDF)**, **Add to Apple Wallet**, and **Add to Google Wallet** export triggers.

### 5. 🎥 Interactive Hero Stage (Billboard Showcase)
- Dynamic cinematic backdrop imagery with subtle zoom and ambient atmospheric glow shift matching each movie's color palette (Cyan, Magenta, Amber).
- Official video trailer preview modal player with backdrop dimming.
- IMDb, Rotten Tomatoes, age classification, Dolby Atmos, and IMAX 70mm badges.
- Interactive movie reel thumbnail carousel with active indicators.

### 6. 🔍 Real-Time Catalog, Search & Filters
- Filterable showtime pills (Morning, Matinee, Evening, Prime Night) with occupancy indicators (*Available*, *Fast Filling*, *Almost Full*).
- Live search modal with instant title, director, and genre query matching.
- Multiplex hall switcher (Grand Omniplex, IMAX Experience Center, Starlight VIP Lounge).
- Deep Movie Specs Modal with director, cast avatars, and full synopsis.

### 7. 👑 VIP Black Card Passholder Club
- Dedicated VIP membership tier section highlighting private recliner allocations, zero convenience fees, complimentary popcorn upgrades, and director masterclass invitations.

### 8. 🌊 Smooth Scroll & Typography
- **Lenis Smooth Scroll** seamlessly integrated across all pages and views.
- **Outfit** font paired with dark mode obsidian styling.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd "movie booking system"
npm install
```

### 2. Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
Build for production:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install Vercel CLI or import repository directly on [Vercel Dashboard](https://vercel.com/):
```bash
npm i -g vercel
vercel
```
`vercel.json` is already configured for single-page routing.

### Deploy to Netlify
1. Connect repository on [Netlify Dashboard](https://www.netlify.com/):
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
2. `public/_redirects` and `netlify.toml` are pre-configured to ensure direct client routing works seamlessly.

---

## 📂 Project Structure

```
├── public/
│   └── _redirects                  # Netlify SPA redirect rule
├── src/
│   ├── assets/                     # Icons & graphic assets
│   ├── components/
│   │   ├── AuthModal.jsx           # VIP Login & Sign-up Modal
│   │   ├── CheckoutDrawer.jsx      # Slide-over checkout & concessions upsell
│   │   ├── DigitalTicketPass.jsx   # Holographic digital ticket pass
│   │   ├── ExperiencesSection.jsx  # IMAX, Dolby Atmos & VIP formats
│   │   ├── Footer.jsx              # High-end cinematic footer
│   │   ├── HeroBillboard.jsx       # Interactive Hero showcase & trailer CTA
│   │   ├── MovieDetailsModal.jsx   # Deep movie specs, synopsis & cast
│   │   ├── MovieListing.jsx        # Curated catalog with filters & search
│   │   ├── Navbar.jsx              # Floating glass nav with location & search
│   │   ├── SeatBookingEngine.jsx   # 3D Curved Cinema Seating matrix
│   │   ├── TrailerModal.jsx        # Cinematic video modal player
│   │   └── VipClubSection.jsx      # Black card passholder perks
│   ├── data/
│   │   └── cinemaData.js           # Comprehensive movies, seats & snacks dataset
│   ├── App.jsx                     # Root application coordinator with Lenis
│   ├── index.css                   # Custom 3D perspective & glow utilities
│   └── main.jsx                    # Application entry point
├── index.html                      # Outfit font & dark mode setup
├── netlify.toml                    # Netlify deployment settings
├── vercel.json                     # Vercel deployment settings
├── vite.config.js                  # Vite + Tailwind v4 config
└── package.json
```

---

## 📄 License
MIT License. Crafted for film enthusiasts and high-fidelity cinema lovers.
