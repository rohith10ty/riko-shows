// Cinema Data Store for Riko's Show (Current Theatrical Releases Across India)

export const CITIES = [
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", popular: true },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", popular: true },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", popular: true },
  { id: "delhi", name: "Delhi-NCR", state: "Delhi", popular: true },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", popular: true },
  { id: "pune", name: "Pune", state: "Maharashtra", popular: true },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", popular: true },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", popular: true },
  { id: "kochi", name: "Kochi", state: "Kerala", popular: true },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", popular: false },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", popular: false },
  { id: "chandigarh", name: "Chandigarh", state: "Punjab", popular: false },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", popular: false },
  { id: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", popular: false },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", popular: false },
  { id: "indore", name: "Indore", state: "Madhya Pradesh", popular: false },
  { id: "surat", name: "Surat", state: "Gujarat", popular: false },
  { id: "patna", name: "Patna", state: "Bihar", popular: false },
  { id: "bhopal", name: "Bhopal", state: "Madhya Pradesh", popular: false },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", popular: false },
  { id: "mysuru", name: "Mysuru", state: "Karnataka", popular: false },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", popular: false },
  { id: "warangal", name: "Warangal", state: "Telangana", popular: false },
  { id: "tirupati", name: "Tirupati", state: "Andhra Pradesh", popular: false }
];

export const getTheatresForCity = (cityObj) => {
  const cityName = cityObj?.name || "Hyderabad";
  const cityId = cityObj?.id || "hyderabad";

  const specificTheatres = {
    hyderabad: [
      { id: "th-hyd-1", name: "Prasads Multiplex: Large Screen (PCX)", location: "Necklace Road, Khairatabad", screenType: "4K Dual Laser • Dolby Atmos", tag: "Iconic PCX" },
      { id: "th-hyd-2", name: "AMB Cinemas: Screen 1 VIP", location: "Gachibowli - Miyapur Road", screenType: "Laser IMAX • Dolby Atmos 128 Ch", tag: "Super Luxury" },
      { id: "th-hyd-3", name: "PVR INOX: Nexus Mall, Kukatpally", location: "KPHB Phase 6", screenType: "PVR P[XL] 4K & Dolby 7.1", tag: "Popular" },
      { id: "th-hyd-4", name: "Cinepolis: DSL Virtue Mall, Uppal", location: "Ramanthapur, Uppal", screenType: "Macro XE RealD 3D", tag: "Prime" }
    ],
    mumbai: [
      { id: "th-mum-1", name: "PVR INOX: Maison PVR, Jio World Drive", location: "BKC, Bandra East", screenType: "Laser IMAX & Dolby Atmos Luxe", tag: "Flagship Luxe" },
      { id: "th-mum-2", name: "PVR INOX: Phoenix Palladium, Lower Parel", location: "Senapati Bapat Marg", screenType: "4DX Dynamic • Dolby Atmos", tag: "Premium" },
      { id: "th-mum-3", name: "Cinepolis: Nexus Seawoods Grand Central", location: "Seawoods Station, Navi Mumbai", screenType: "IMAX Laser 3D Screen", tag: "Popular" }
    ],
    bengaluru: [
      { id: "th-blr-1", name: "PVR INOX: Forum South Bangalore", location: "Konanakunte Cross, Kanakapura Rd", screenType: "IMAX Laser 4K • Dolby Atmos", tag: "Flagship" },
      { id: "th-blr-2", name: "PVR Director's Cut: Forum Rex Walk", location: "Brigade Road, Central Bengaluru", screenType: "Ultra VIP Recliner • Fine Dining", tag: "Luxury Recliners" },
      { id: "th-blr-3", name: "Cinepolis: Lulu Global Malls, Rajajinagar", location: "Gopalapura, Binnypet", screenType: "VIP 4K Dolby Atmos", tag: "Popular" }
    ],
    delhi: [
      { id: "th-del-1", name: "PVR Director's Cut: Ambience Mall", location: "Vasant Kunj, South Delhi", screenType: "Luxe Platinum Recliner • Dolby Atmos", tag: "Ultra Luxury" },
      { id: "th-del-2", name: "PVR INOX: Vegas Mall, Dwarka", location: "Sector 14, Dwarka", screenType: "IMAX 4K Laser & P[XL]", tag: "Flagship" },
      { id: "th-del-3", name: "Cinepolis: DLF Avenue, Saket", location: "Saket District Centre", screenType: "RealD 3D & Dolby Atmos", tag: "Popular" }
    ],
    chennai: [
      { id: "th-chn-1", name: "SPI Cinemas: Sathyam Cinemas", location: "Thiru Vi Ka Road, Royapettah", screenType: "RDX 4K Projection • Dolby Atmos", tag: "Legendary" },
      { id: "th-chn-2", name: "PVR INOX: Phoenix MarketCity, Velachery", location: "Velachery Main Road", screenType: "IMAX Laser & Dolby Atmos", tag: "Flagship" },
      { id: "th-chn-3", name: "AGS Cinemas: OMR Navallur", location: "Rajiv Gandhi Salai, OMR", screenType: "4K Dolby Atmos Surround", tag: "Popular" }
    ]
  };

  if (specificTheatres[cityId]) {
    return specificTheatres[cityId];
  }

  return [
    {
      id: `th-${cityId}-1`,
      name: `PVR INOX: ${cityName} Central Mall`,
      location: `Main City Centre, ${cityName}`,
      screenType: "4K Laser Projection • Dolby Atmos",
      tag: "Flagship"
    },
    {
      id: `th-${cityId}-2`,
      name: `Cinepolis: Grand Mall, ${cityName}`,
      location: `Commercial Hub, ${cityName}`,
      screenType: "Macro XE RealD 3D & 7.1 Sound",
      tag: "Popular"
    },
    {
      id: `th-${cityId}-3`,
      name: `Miraj Cinemas: City Square, ${cityName}`,
      location: `Station Road, ${cityName}`,
      screenType: "RGB Laser 4K • Dolby Surround",
      tag: "Prime"
    }
  ];
};

export const INDIAN_SNACKS = [
  {
    id: "snack-1",
    name: "Large Cheese & Caramel Popcorn Tub",
    category: "Popcorn",
    description: "Crispy freshly popped golden corn coated with gourmet cheddar & sweet caramel mix.",
    price: 360,
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: "snack-2",
    name: "Crispy Punjabi Paneer Samosas (2 pcs)",
    category: "Hot Bites",
    description: "Golden fried flaky pastry stuffed with spiced cottage cheese, potatoes & fresh mint chutney.",
    price: 180,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: "snack-3",
    name: "Fountain Coca-Cola (Large 600ml)",
    category: "Beverages",
    description: "Chilled fountain ice-cold soda served in branded cinema takeaway cup.",
    price: 220,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: "snack-4",
    name: "Crispy Nachos with Warm Jalapeño Dip",
    category: "Hot Bites",
    description: "Crunchy corn tortilla chips served with warm melted Mexican cheese & salsa.",
    price: 280,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80",
    popular: false
  },
  {
    id: "snack-5",
    name: "Cold Brew Hazelnut Frappe",
    category: "Beverages",
    description: "Rich blended espresso coffee infused with toasted hazelnut and topped with cream.",
    price: 240,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80",
    popular: false
  }
];

// Current Theatrical Blockbusters (Now Showing as of 12 October 2026)
export const MOVIES = [
  {
    id: "movie-drishyam-conclusion",
    title: "Drishyam: The Conclusion",
    tagline: "The 2nd October secret can never stay buried.",
    synopsis: "Years after outsmarting the police, Vijay Salgaonkar's past resurfaces when startling forensic evidence threatens to expose his secret. As IG Tarun Ahlawat and Meera Deshmukh reopen the case, Vijay must execute one final, unthinkable plan to protect his family.",
    rating: 9.3,
    votes: "295K+",
    ageRating: "UA",
    duration: "2h 42m",
    releaseDate: "02 Oct 2026",
    status: "now_showing",
    director: "Abhishek Pathak",
    cast: ["Ajay Devgn", "Tabu", "Shriya Saran", "Akshaye Khanna", "Ishita Dutta"],
    genres: ["Thriller", "Crime", "Mystery"],
    languages: ["Hindi", "Telugu", "Tamil"],
    formats: ["2D", "IMAX 2D", "Dolby Atmos"],
    basePrice: 290,
    cities: ["mumbai", "delhi", "pune", "ahmedabad", "bengaluru", "hyderabad", "kolkata", "jaipur", "lucknow", "chandigarh", "indore", "bhopal", "nagpur", "surat", "patna"],
    poster: "https://image.tmdb.org/t/p/w500/67FsF2kpgEZ1T5Qos4adgqm9dLf.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/nq73eRdEooripf3k0XHLtX14zyC.jpg",
    trailerUrl: "https://www.youtube.com/embed/BSZZwBaNQAA?autoplay=1",
    featured: true,
    badge: "RUNNING NOW • RELEASED 02 OCT",
    showtimes: [
      { time: "10:30 AM", status: "Available", period: "Morning", format: "IMAX 2D" },
      { time: "01:45 PM", status: "Fast Filling", period: "Matinee", format: "2D" },
      { time: "05:30 PM", status: "Almost Full", period: "Evening", format: "IMAX 2D" },
      { time: "09:15 PM", status: "Almost Full", period: "Prime Night", format: "Dolby Atmos" }
    ]
  },
  {
    id: "movie-avengers-endgame-encore",
    title: "Avengers: Endgame (Encore)",
    tagline: "Whatever it takes. The record-breaking phenomenon returns to theatres.",
    synopsis: "After the catastrophic events of Infinity War, the universe is left in ruins. Earth's Mightiest Heroes assemble one final time across time itself to undo Thanos' destruction in spectacular 4K IMAX 3D and Dolby Atmos.",
    rating: 9.4,
    votes: "460K+",
    ageRating: "UA",
    duration: "3h 02m",
    releaseDate: "09 Oct 2026",
    status: "now_showing",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Scarlett Johansson", "Mark Ruffalo", "Paul Rudd"],
    genres: ["Action", "Sci-Fi", "Adventure"],
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    formats: ["IMAX 3D", "3D", "4DX", "Dolby Atmos"],
    basePrice: 320,
    cities: ["hyderabad", "mumbai", "bengaluru", "delhi", "chennai", "pune", "kolkata", "ahmedabad", "kochi", "jaipur", "lucknow", "chandigarh", "visakhapatnam", "vijayawada", "coimbatore", "indore", "surat", "patna", "bhopal", "nagpur", "mysuru", "thiruvananthapuram", "warangal", "tirupati"],
    poster: "https://image.tmdb.org/t/p/w500/bR8ISy1O9XQxqiy0fQFw2BX72RQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1",
    featured: true,
    badge: "SPECIAL ENCORE RE-RELEASE",
    showtimes: [
      { time: "11:00 AM", status: "Available", period: "Morning", format: "IMAX 3D" },
      { time: "02:45 PM", status: "Fast Filling", period: "Matinee", format: "4DX" },
      { time: "06:30 PM", status: "Almost Full", period: "Evening", format: "IMAX 3D" },
      { time: "10:15 PM", status: "Almost Full", period: "Prime Night", format: "Dolby Atmos" }
    ]
  },
  {
    id: "movie-war2",
    title: "War 2",
    tagline: "Kabir vs Vikram. Two unstoppable legends collide.",
    synopsis: "When legendary intelligence operative Kabir goes rogue, India sends its most lethal and ruthless black-ops agent, Vikram, on an adrenaline-charged global manhunt across Italy, Spain, and India.",
    rating: 9.0,
    votes: "345K+",
    ageRating: "UA",
    duration: "2h 40m",
    releaseDate: "14 Aug 2026",
    status: "now_showing",
    director: "Ayan Mukerji",
    cast: ["Hrithik Roshan", "Jr NTR", "Kiara Advani", "John Abraham", "Ashutosh Rana"],
    genres: ["Action", "Thriller", "Adventure"],
    languages: ["Hindi", "Telugu", "Tamil"],
    formats: ["IMAX 2D", "4DX", "2D"],
    basePrice: 350,
    cities: ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "pune", "kolkata", "ahmedabad", "chandigarh", "jaipur", "lucknow", "surat", "indore", "patna"],
    poster: "https://image.tmdb.org/t/p/w500/2Yc8Kl2ldPpDzLrG2M5Ddv62FXB.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/pKIRUTnwY3YYU9urSdsuobdcliP.jpg",
    trailerUrl: "https://www.youtube.com/embed/9Dve2VMOv5U?autoplay=1",
    featured: true,
    badge: "YRF SPY UNIVERSE",
    showtimes: [
      { time: "10:00 AM", status: "Available", period: "Morning", format: "IMAX 2D" },
      { time: "01:15 PM", status: "Fast Filling", period: "Matinee", format: "4DX" },
      { time: "05:00 PM", status: "Almost Full", period: "Evening", format: "IMAX 2D" },
      { time: "08:30 PM", status: "Almost Full", period: "Prime Night", format: "IMAX 2D" }
    ]
  },
  {
    id: "movie-therajasaab",
    title: "The Raja Saab",
    tagline: "Royal romance meets grand supernatural thrills.",
    synopsis: "Seeking his lost royal ancestry, a charming heir enters an eerie vintage palace only to unearth a dormant supernatural dynasty curse that tests his courage and love.",
    rating: 8.8,
    votes: "275K+",
    ageRating: "UA",
    duration: "2h 35m",
    releaseDate: "10 Sep 2026",
    status: "now_showing",
    director: "Maruthi",
    cast: ["Prabhas", "Malavika Mohanan", "Nidhhi Agerwal", "Riddhi Kumar", "Sanjay Dutt"],
    genres: ["Comedy", "Horror", "Romance"],
    languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
    formats: ["2D", "Dolby Atmos", "IMAX 2D"],
    basePrice: 300,
    cities: ["hyderabad", "visakhapatnam", "vijayawada", "warangal", "tirupati", "bengaluru", "mumbai", "chennai"],
    poster: "https://image.tmdb.org/t/p/w500/nvK6gYa4diCnQkDVN42uoYXPrdT.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/kCwmLYy9ZMto1eMH8BI9KcVVIH2.jpg",
    trailerUrl: "https://www.youtube.com/embed/YFZMBqyXkqQ?autoplay=1",
    featured: false,
    badge: "HOUSEFULL HIT",
    showtimes: [
      { time: "11:30 AM", status: "Available", period: "Morning", format: "2D" },
      { time: "03:00 PM", status: "Fast Filling", period: "Matinee", format: "Dolby Atmos" },
      { time: "06:45 PM", status: "Almost Full", period: "Evening", format: "IMAX 2D" },
      { time: "10:15 PM", status: "Fast Filling", period: "Prime Night", format: "Dolby Atmos" }
    ]
  },
  {
    id: "movie-coolie",
    title: "Coolie",
    tagline: "The master of port underworld reigns.",
    synopsis: "Deva, a seasoned harbour boss, discovers a global gold smuggling syndicate linked to dark secrets of his past. Armed with deadly wit and unyielding power, he dismantles enemies across the coast.",
    rating: 8.9,
    votes: "265K+",
    ageRating: "UA",
    duration: "2h 44m",
    releaseDate: "15 Aug 2026",
    status: "now_showing",
    director: "Lokesh Kanagaraj",
    cast: ["Rajinikanth", "Nagarjuna", "Soubin Shahir", "Shruti Haasan", "Upendra", "Sathyaraj"],
    genres: ["Action", "Crime", "Drama"],
    languages: ["Tamil", "Telugu", "Hindi", "Kannada"],
    formats: ["2D", "Dolby Atmos", "IMAX 2D"],
    basePrice: 310,
    cities: ["chennai", "coimbatore", "bengaluru", "hyderabad", "kochi", "thiruvananthapuram", "mumbai", "visakhapatnam", "madurai"],
    poster: "https://image.tmdb.org/t/p/w500/kr36awqmziEI5mfUElsHB0pj9zP.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/bLn0CPzrrqFLicjNTgrzaIyE0gZ.jpg",
    trailerUrl: "https://www.youtube.com/embed/l8qlUDRSaTU?autoplay=1",
    featured: false,
    badge: "LOKESH ACTION",
    showtimes: [
      { time: "10:45 AM", status: "Available", period: "Morning", format: "Dolby Atmos" },
      { time: "02:15 PM", status: "Fast Filling", period: "Matinee", format: "2D" },
      { time: "06:30 PM", status: "Almost Full", period: "Evening", format: "IMAX 2D" },
      { time: "09:45 PM", status: "Almost Full", period: "Prime Night", format: "Dolby Atmos" }
    ]
  },
  {
    id: "movie-kantara-chapter1",
    title: "Kantara: Chapter 1",
    tagline: "The origin legend of the sacred Kadamba forest deity.",
    synopsis: "Set during the Kadamba dynasty, a visionary tribal chieftain encounters ancient cosmic spirits in the primeval forests, defending his sacred soil and people from royal invaders seeking supreme power.",
    rating: 9.2,
    votes: "285K+",
    ageRating: "UA",
    duration: "2h 46m",
    releaseDate: "02 Oct 2026",
    status: "now_showing",
    director: "Rishab Shetty",
    cast: ["Rishab Shetty", "Rukmini Vasanth", "Achyuth Kumar", "Pramod Shetty"],
    genres: ["Action", "Drama", "Fantasy"],
    languages: ["Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"],
    formats: ["IMAX 2D", "Dolby Atmos", "2D"],
    basePrice: 290,
    cities: ["bengaluru", "mysuru", "hyderabad", "chennai", "mumbai", "kochi", "pune", "delhi"],
    poster: "https://image.tmdb.org/t/p/w500/ehQPboTPaIMkMUOoNOh8e7pZ5Rp.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/w57nxiBIODAYHLRs1xmrCY9zEFe.jpg",
    trailerUrl: "https://www.youtube.com/embed/Frp0zC4643U?autoplay=1",
    featured: true,
    badge: "DIVINE PHENOMENON",
    showtimes: [
      { time: "10:15 AM", status: "Available", period: "Morning", format: "2D" },
      { time: "01:30 PM", status: "Fast Filling", period: "Matinee", format: "IMAX 2D" },
      { time: "05:15 PM", status: "Almost Full", period: "Evening", format: "IMAX 2D" },
      { time: "08:45 PM", status: "Almost Full", period: "Prime Night", format: "Dolby Atmos" }
    ]
  }
];

// Upcoming Theatrical Releases & Advance Bookings (October & Winter 2026)
export const UPCOMING_MOVIES = [
  {
    id: "movie-jailer2",
    title: "Jailer 2",
    tagline: "Tiger Muthuvel Pandian unleashes the rage.",
    synopsis: "When an international underworld syndicate targets his family's peace, retired prison warden Tiger Muthuvel Pandian returns to the frontline. Joined by fierce allies across South India, he unleashes ruthless vengeance in a massive action-packed spectacle.",
    rating: 9.3,
    votes: "320K+ Anticipating",
    ageRating: "UA",
    duration: "2h 48m",
    releaseDate: "15 Oct 2026",
    daysLeft: "In 3 Days",
    status: "upcoming",
    advanceBooking: true,
    director: "Nelson Dilipkumar",
    cast: ["Rajinikanth", "Mohanlal", "Vijay Sethupathi", "Shivarajkumar", "Ramya Krishnan"],
    genres: ["Action", "Crime", "Thriller"],
    languages: ["Tamil", "Telugu", "Hindi", "Kannada", "Malayalam"],
    formats: ["IMAX 2D", "2D", "4DX", "Dolby Atmos"],
    basePrice: 340,
    cities: ["chennai", "coimbatore", "bengaluru", "hyderabad", "visakhapatnam", "kochi", "thiruvananthapuram", "mysuru", "mumbai", "madurai", "tirupati", "vijayawada"],
    poster: "https://image.tmdb.org/t/p/w500/upwdEyhhYZ7pT2hD535fr2MGfpx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/m0ks2o59mOAz6WdCybJ5FAUNTOU.jpg",
    trailerUrl: "https://www.youtube.com/embed/-mYAvoEvX7I?autoplay=1",
    featured: true,
    badge: "RELEASING 15 OCT • ADVANCE BOOKING OPEN",
    showtimes: [
      { time: "11:00 AM", status: "Available", period: "Morning", format: "IMAX 2D" },
      { time: "02:15 PM", status: "Fast Filling", period: "Matinee", format: "4DX" },
      { time: "06:00 PM", status: "Almost Full", period: "Evening", format: "Dolby Atmos" },
      { time: "09:30 PM", status: "Almost Full", period: "Prime Night", format: "IMAX 2D" }
    ]
  },
  {
    id: "movie-vishwambhara",
    title: "Vishwambhara",
    tagline: "Beyond celestial realms, the guardian ascends.",
    synopsis: "An epic mythological fantasy where a legendary warrior travels through mystical dimensional realms and celestial worlds to battle ancient dark titans and restore cosmic equilibrium.",
    rating: 9.1,
    votes: "245K+ Anticipating",
    ageRating: "UA",
    duration: "2h 38m",
    releaseDate: "16 Oct 2026",
    daysLeft: "In 4 Days",
    status: "upcoming",
    advanceBooking: true,
    director: "Mallidi Vassishta",
    cast: ["Chiranjeevi", "Trisha Krishnan", "Ashika Ranganath", "Kunal Kapoor"],
    genres: ["Action", "Fantasy", "Adventure"],
    languages: ["Telugu", "Hindi", "Tamil"],
    formats: ["IMAX 3D", "3D", "2D", "Dolby Atmos"],
    basePrice: 310,
    cities: ["hyderabad", "visakhapatnam", "vijayawada", "warangal", "tirupati", "bengaluru", "chennai"],
    poster: "https://image.tmdb.org/t/p/w500/ygmxv156YvURmnFN6eG3i2dIg4U.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/lGcndSIRbY3CDZiekSWiAahIju.jpg",
    trailerUrl: "https://www.youtube.com/embed/TiAaJQ4leNc?autoplay=1",
    featured: true,
    badge: "RELEASING 16 OCT • DUSSEHRA PREMIERE",
    showtimes: [
      { time: "10:15 AM", status: "Available", period: "Morning", format: "IMAX 3D" },
      { time: "01:30 PM", status: "Fast Filling", period: "Matinee", format: "3D" },
      { time: "05:15 PM", status: "Almost Full", period: "Evening", format: "IMAX 3D" },
      { time: "08:45 PM", status: "Almost Full", period: "Prime Night", format: "Dolby Atmos" }
    ]
  },
  {
    id: "movie-ranabaali",
    title: "Ranabaali",
    tagline: "The ferocious 1870s rebel who shook colonial rulers.",
    synopsis: "In 19th-century colonial India, a drought-ravaged province finds its saviour in a fierce rebel warlord who orchestrates an uprising against ruthless British oppressors in the badlands.",
    rating: 8.9,
    votes: "165K+ Anticipating",
    ageRating: "UA",
    duration: "2h 32m",
    releaseDate: "16 Oct 2026",
    daysLeft: "In 4 Days",
    status: "upcoming",
    advanceBooking: true,
    director: "Rahul Sankrityan",
    cast: ["Vijay Deverakonda", "Rashmika Mandanna", "Anupam Kher", "Boman Irani"],
    genres: ["Action", "History", "Drama"],
    languages: ["Telugu", "Hindi", "Tamil"],
    formats: ["2D", "Dolby Atmos"],
    basePrice: 260,
    cities: ["hyderabad", "visakhapatnam", "vijayawada", "warangal", "tirupati", "bengaluru"],
    poster: "https://image.tmdb.org/t/p/w500/fmqDwVpmiAk4cav5ElC2KAJRM3F.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/xpImgnsxuqb3VOp0QRtXTS5uBRi.jpg",
    trailerUrl: "https://www.youtube.com/embed/W8EKIHOq9h8?autoplay=1",
    featured: false,
    badge: "RELEASING 16 OCT • ADVANCE BOOKING OPEN",
    showtimes: [
      { time: "11:15 AM", status: "Available", period: "Morning", format: "2D" },
      { time: "02:45 PM", status: "Fast Filling", period: "Matinee", format: "Dolby Atmos" },
      { time: "06:15 PM", status: "Almost Full", period: "Evening", format: "Dolby Atmos" },
      { time: "09:45 PM", status: "Fast Filling", period: "Prime Night", format: "2D" }
    ]
  },
  {
    id: "movie-ramayana",
    title: "Ramayana: Part 1",
    tagline: "The timeless epic for the ages. Dussehra advance booking.",
    synopsis: "Directed by Nitesh Tiwari with music by A.R. Rahman and Hans Zimmer, this breathtaking visual spectacle chronicles Prince Rama's righteous exile, devotion with Sita, and legendary battles against the demon kingdom of Lanka.",
    rating: 9.6,
    votes: "420K+ Anticipating",
    ageRating: "U",
    duration: "3h 05m",
    releaseDate: "05 Nov 2026",
    daysLeft: "Diwali 2026",
    status: "upcoming",
    advanceBooking: true,
    director: "Nitesh Tiwari",
    cast: ["Ranbir Kapoor", "Sai Pallavi", "Yash", "Sunny Deol", "Lara Dutta", "Arun Govil"],
    genres: ["Action", "Adventure", "Drama"],
    languages: ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"],
    formats: ["IMAX 3D", "3D", "Dolby Atmos 70mm"],
    basePrice: 380,
    cities: ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "kolkata", "pune", "ahmedabad", "jaipur", "lucknow", "chandigarh", "kochi", "visakhapatnam", "vijayawada", "patna", "indore", "bhopal", "nagpur", "surat"],
    poster: "https://image.tmdb.org/t/p/w500/gYIpKLZwFSuPtzeeGJCwcsPh6Rh.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/svGHaToRKhlxwTBslsOxuntz0D7.jpg",
    trailerUrl: "https://www.youtube.com/embed/1zip1rNaNYs?autoplay=1",
    featured: true,
    badge: "RELEASING 05 NOV • DIWALI PRE-BOOKING",
    showtimes: [
      { time: "10:45 AM", status: "Available", period: "Morning", format: "IMAX 3D" },
      { time: "02:15 PM", status: "Fast Filling", period: "Matinee", format: "3D" },
      { time: "06:30 PM", status: "Almost Full", period: "Evening", format: "IMAX 3D" },
      { time: "09:45 PM", status: "Almost Full", period: "Prime Night", format: "IMAX 3D" }
    ]
  },
  {
    id: "movie-avengers-doomsday",
    title: "Avengers: Doomsday",
    tagline: "The Multiverse collides. Robert Downey Jr returns as Doctor Doom.",
    synopsis: "The Marvel Cinematic Universe enters Phase 6 as Earth's mightiest heroes and multiversal defenders face their supreme existential menace: Victor Von Doom. A catastrophic collision of timelines forces disparate factions into an unprecedented war for survival.",
    rating: 9.7,
    votes: "550K+ Anticipating",
    ageRating: "UA",
    duration: "2h 55m",
    releaseDate: "18 Dec 2026",
    daysLeft: "Releasing Dec 2026",
    status: "upcoming",
    advanceBooking: false,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Pedro Pascal", "Vanessa Kirby", "Anthony Mackie", "Florence Pugh", "Sebastian Stan"],
    genres: ["Action", "Sci-Fi", "Adventure"],
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    formats: ["IMAX 3D", "4DX", "Dolby Atmos 70mm"],
    basePrice: 400,
    cities: ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "pune", "kolkata", "ahmedabad", "chandigarh", "kochi", "jaipur", "visakhapatnam", "vijayawada", "lucknow", "surat", "indore"],
    poster: "https://image.tmdb.org/t/p/w500/jzPwsojjFStf5lR5Nm07w2hH56G.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s4v0UX1anfXm0UvloLsTTJ4v222.jpg",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1",
    featured: true,
    badge: "RELEASING 18 DEC • MARVEL PHASE 6",
    showtimes: []
  }
];

export const ALL_MOVIES = [...MOVIES, ...UPCOMING_MOVIES];

export const SEAT_TIERS = {
  VIP: {
    name: "VIP Recliner Suite",
    desc: "Plush motorized leather lounger with legrest, in-seat steward dining service",
    priceMultiplier: 1.6,
    rows: ["G", "H"],
    badge: "Recliner",
    color: "rose"
  },
  PREMIUM: {
    name: "Executive Prime",
    desc: "Optimal sightline audio center with ergonomic cushioned seats",
    priceMultiplier: 1.25,
    rows: ["C", "D", "E", "F"],
    badge: "Prime Center",
    color: "rose"
  },
  STANDARD: {
    name: "Classic Standard",
    desc: "Comfortable cinema seats with spacious legroom",
    priceMultiplier: 1.0,
    rows: ["A", "B"],
    badge: "Standard",
    color: "slate"
  }
};

export const generateSeatLayout = () => {
  const rows = [
    { row: "H", tier: "VIP", seatsCount: 10, pairMode: true },
    { row: "G", tier: "VIP", seatsCount: 10, pairMode: true },
    { row: "F", tier: "PREMIUM", seatsCount: 12, pairMode: false },
    { row: "E", tier: "PREMIUM", seatsCount: 12, pairMode: false },
    { row: "D", tier: "PREMIUM", seatsCount: 12, pairMode: false },
    { row: "C", tier: "PREMIUM", seatsCount: 12, pairMode: false },
    { row: "B", tier: "STANDARD", seatsCount: 12, pairMode: false },
    { row: "A", tier: "STANDARD", seatsCount: 12, pairMode: false }
  ];

  const initiallyBooked = new Set([
    "H-3", "H-4", "G-7", "G-8",
    "F-5", "F-6", "F-7",
    "E-6", "E-7", "E-8", "E-9",
    "D-4", "D-5", "C-8", "C-9",
    "B-3", "A-5", "A-6"
  ]);

  return rows.map((r) => {
    const seatList = [];
    for (let i = 1; i <= r.seatsCount; i++) {
      const seatId = `${r.row}-${i}`;
      seatList.push({
        id: seatId,
        row: r.row,
        number: i,
        tier: r.tier,
        isBooked: initiallyBooked.has(seatId),
        isPair: r.pairMode
      });
    }
    return {
      row: r.row,
      tier: r.tier,
      seats: seatList
    };
  });
};

export const generateShowDates = () => {
  const dates = [];
  const today = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      id: `date-${i}`,
      dayName: i === 0 ? "TODAY" : i === 1 ? "TOMORROW" : days[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
      fullDateString: d.toLocaleDateString("en-IN", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  return dates;
};
