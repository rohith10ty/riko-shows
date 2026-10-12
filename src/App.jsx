import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { MOVIES, UPCOMING_MOVIES, ALL_MOVIES, CITIES } from './data/cinemaData';
import Navbar from './components/Navbar';
import HeroBillboard from './components/HeroBillboard';
import MovieListing from './components/MovieListing';
import MovieDetailsModal from './components/MovieDetailsModal';
import SeatBookingEngine from './components/SeatBookingEngine';
import CheckoutDrawer from './components/CheckoutDrawer';
import DigitalTicketPass from './components/DigitalTicketPass';
import TrailerModal from './components/TrailerModal';
import AuthModal from './components/AuthModal';
import ExperiencesSection from './components/ExperiencesSection';
import VipClubSection from './components/VipClubSection';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

export default function App() {
  // Cities and Movies State
  const [currentCity, setCurrentCity] = useState(CITIES[0]); // Defaults to Hyderabad
  const [movies] = useState(MOVIES);
  const [upcomingMovies] = useState(UPCOMING_MOVIES);
  const [allMovies] = useState(ALL_MOVIES);
  const [currentMovie, setCurrentMovie] = useState(MOVIES[0]);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'movies' | 'experiences' | 'vip' | 'profile'
  const [catalogMode, setCatalogMode] = useState('now_showing'); // 'now_showing' | 'upcoming'

  // Modals Flow
  const [bookingMovie, setBookingMovie] = useState(null);
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Authenticated User State (Rohith)
  const [user, setUser] = useState({
    name: 'Rohith',
    email: 'rohith@rikoshow.com',
    phone: '+91 98765 43210',
    isVip: true
  });

  // Track session bookings
  const [userBookings, setUserBookings] = useState([]);

  const handleSelectCity = (city) => {
    setCurrentCity(city);
    const cityMovies = allMovies.filter(m => m.cities && m.cities.includes(city.id));
    if (cityMovies.length > 0) {
      setCurrentMovie(cityMovies[0]);
    }
  };

  const handleOpenBooking = (movieToBook) => {
    const target = movieToBook || currentMovie;
    setBookingMovie(target);
  };

  const handleProceedToCheckout = (data) => {
    setBookingMovie(null);
    setCheckoutData(data);
  };

  const handleBookingComplete = (finalBooking) => {
    setCheckoutData(null);
    setUserBookings(prev => [finalBooking, ...prev]);
    setActiveTicket(finalBooking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] text-slate-100 font-['Outfit',sans-serif] antialiased">
      
      {/* Navbar with Indian City Switcher & Rohith Profile */}
      <Navbar
        movies={allMovies}
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        onSelectMovie={(movie) => {
          setCurrentMovie(movie);
          setDetailsMovie(movie);
        }}
        onOpenBooking={() => handleOpenBooking(currentMovie)}
        selectedSeatsCount={checkoutData?.seats?.length || 0}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view === 'movies') {
            document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
          } else if (view === 'experiences') {
            document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
          } else if (view === 'vip') {
            document.getElementById('vip-club')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        catalogMode={catalogMode}
        onSelectCatalogMode={setCatalogMode}
      />

      {/* Main Content Router */}
      {activeTicket ? (
        <DigitalTicketPass
          booking={activeTicket}
          onBackToHome={() => {
            setActiveTicket(null);
            setActiveView('home');
          }}
        />
      ) : activeView === 'profile' ? (
        <UserProfile
          user={user}
          onLogout={handleLogout}
          onBackToHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onViewTicketPass={(ticket) => {
            setActiveTicket(ticket);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          bookings={userBookings}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <HeroBillboard
            movies={allMovies}
            currentMovie={currentMovie}
            onSelectMovie={setCurrentMovie}
            onOpenBooking={handleOpenBooking}
            onOpenTrailer={setTrailerMovie}
            currentCity={currentCity}
            onSelectCity={handleSelectCity}
          />

          {/* Movies Playing in Current City */}
          <MovieListing
            movies={movies}
            upcomingMovies={upcomingMovies}
            currentCity={currentCity}
            onSelectMovie={setCurrentMovie}
            onOpenBooking={handleOpenBooking}
            onOpenDetails={setDetailsMovie}
            onOpenTrailer={setTrailerMovie}
            catalogMode={catalogMode}
            onCatalogModeChange={setCatalogMode}
          />

          {/* Formats Showcase */}
          <ExperiencesSection 
            onExploreShowtimes={() => {
              document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* MoviePass VIP Club */}
          <VipClubSection
            onJoinVip={() => {
              if (user) {
                setActiveView('profile');
              } else {
                setAuthModalOpen(true);
              }
            }}
            user={user}
          />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'movies') {
            document.getElementById('movie-catalog')?.scrollIntoView({ behavior: 'smooth' });
          } else if (view === 'experiences') {
            document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
          } else if (view === 'vip') {
            document.getElementById('vip-club')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectCity={handleSelectCity}
        currentCity={currentCity}
      />

      {/* Seat Booking Modal */}
      <AnimatePresence>
        {bookingMovie && (
          <SeatBookingEngine
            movie={bookingMovie}
            currentCity={currentCity}
            onClose={() => setBookingMovie(null)}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}
      </AnimatePresence>

      {/* Checkout Drawer */}
      <AnimatePresence>
        {checkoutData && (
          <CheckoutDrawer
            isOpen={Boolean(checkoutData)}
            onClose={() => setCheckoutData(null)}
            bookingData={checkoutData}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </AnimatePresence>

      {/* Movie Details Modal */}
      <AnimatePresence>
        {detailsMovie && (
          <MovieDetailsModal
            movie={detailsMovie}
            onClose={() => setDetailsMovie(null)}
            onOpenBooking={(m) => {
              setDetailsMovie(null);
              handleOpenBooking(m);
            }}
            onOpenTrailer={(m) => {
              setDetailsMovie(null);
              setTrailerMovie(m);
            }}
          />
        )}
      </AnimatePresence>

      {/* Trailer Modal with YouTube Embed & Direct Fallback */}
      <AnimatePresence>
        {trailerMovie && (
          <TrailerModal
            movie={trailerMovie}
            onClose={() => setTrailerMovie(null)}
          />
        )}
      </AnimatePresence>

      {/* Auth Modal with Sign In / Sign Out */}
      <AnimatePresence>
        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onLoginSuccess={(u) => {
              setUser(u);
              setActiveView('profile');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
