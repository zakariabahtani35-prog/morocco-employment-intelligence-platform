import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Plane, 
  Train, 
  Hotel, 
  Building2, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Sparkles,
  Layers
} from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  category: 'venue' | 'transit' | 'hotel' | 'landmark';
  categoryLabel: string;
  address: string;
  distanceFromVenue: string;
  travelTime: string;
  coordinates: { x: number; y: number }; // Percentage coordinates on SVG canvas (0-100)
  description: string;
  highlights: string[];
  googleMapsUrl: string;
  badge?: string;
  priceLevel?: string;
}

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'est-fkih-ben-salah',
    name: 'EST Fkih Ben Salah — CCFBS Centre de Codage',
    category: 'venue',
    categoryLabel: 'AUTHOR ALMA MATER & CODE CENTER',
    address: 'Route de Khouribga, BP 399, Fkih Ben Salah, Morocco',
    distanceFromVenue: '160 km Southeast (Academic Partner Node)',
    travelTime: '2h 15m via A3 Highway / ONCF Rail',
    coordinates: { x: 82, y: 35 },
    description: 'Centre de Codage (CCFBS) & École Supérieure de Technologie Fkih Ben Salah — Primary academic school attended by author Zakaria Bahtani.',
    highlights: ['Centre de Codage (CCFBS) Software Labs', 'Sultan Moulay Slimane Academic Network', 'Analytics & Software Engineering Research', 'Official Academic Co-Sponsor'],
    googleMapsUrl: 'https://www.google.com/maps/place/EST+:+%C3%89cole+Sup%C3%A9rieure+de+Technologie_Fkih+Ben+Salah/@32.516312,-6.665937,973m/data=!3m1!1e3!4m6!3m5!1s0xda46bc6644b9563:0x6ee82fe090e3e2f6!8m2!3d32.5163125!4d-6.6659375!16s%2Fg%2F11fq5xl88q?hl=fr',
    badge: 'AUTHOR ALMA MATER'
  },
  {
    id: 'simplon-campus',
    name: 'Simplon Maghreb Innovation Campus',
    category: 'venue',
    categoryLabel: 'MAIN VENUE & LABS',
    address: 'Boulevard Grande Ceinture, Casablanca 20300, Morocco',
    distanceFromVenue: '0 km (Ground Zero)',
    travelTime: 'Main Event Center',
    coordinates: { x: 52, y: 42 },
    description: 'Headquarters of MEIP Data Warehouse & Analytics Defense. Houses data science workstation labs, keynotes, and PostgreSQL workshops.',
    highlights: ['Keynote Auditorium', 'PostgreSQL Compute Lab', 'Networking Lounge', 'High-speed Fiber & Power'],
    googleMapsUrl: 'https://maps.google.com/?q=Simplon+Maghreb+Casablanca',
    badge: 'PRIMARY HUB'
  },
  {
    id: 'cmn-airport',
    name: 'Mohammed V International Airport (CMN)',
    category: 'transit',
    categoryLabel: 'INTERNATIONAL AIRPORT',
    address: 'Nouasseur, Casablanca, Morocco',
    distanceFromVenue: '32 km South',
    travelTime: '35 mins by Taxi / 45 mins by ONCF Rail',
    coordinates: { x: 75, y: 82 },
    description: 'Morocco’s primary international gateway with direct flights from Paris, New York, Dubai, London, and major African capitals.',
    highlights: ['ONCF Airport Rail Terminal', '24/7 Official Taxis', 'Car Rental Counters', 'SIM Card Kiosks'],
    googleMapsUrl: 'https://maps.google.com/?q=Mohammed+V+International+Airport+Casablanca',
    badge: 'AIR TRANSIT'
  },
  {
    id: 'casa-voyageurs',
    name: 'Casa-Voyageurs High-Speed Rail Station',
    category: 'transit',
    categoryLabel: 'TRAIN HUB (AL BORAQ)',
    address: 'Place Ennassim, Belvédère, Casablanca',
    distanceFromVenue: '3.5 km West',
    travelTime: '10 mins by Taxi / Tramway Line T1',
    coordinates: { x: 42, y: 48 },
    description: 'Primary terminal for Al Boraq high-speed trains connecting Tangier (2h10), Kenitra (50m), and Rabat (45m).',
    highlights: ['Al Boraq High-Speed Line', 'Tramway Line 1 Connection', 'Luggage Storage', 'Taxi Stand'],
    googleMapsUrl: 'https://maps.google.com/?q=Gare+Casa+Voyageurs+Casablanca',
    badge: 'HIGH-SPEED RAIL'
  },
  {
    id: 'casa-port',
    name: 'Casa-Port Rail Terminal',
    category: 'transit',
    categoryLabel: 'COASTAL RAILWAY',
    address: 'Boulevard El Hansali, Casablanca',
    distanceFromVenue: '5.8 km Northwest',
    travelTime: '14 mins by Taxi',
    coordinates: { x: 30, y: 32 },
    description: 'Modern coastal railway hub serving regional trains to Rabat, Fez, and Marrakech with direct shopping gallery.',
    highlights: ['Regional ONCF Trains', 'Marina District Access', 'Dining & Shopping Mall'],
    googleMapsUrl: 'https://maps.google.com/?q=Gare+Casa+Port+Casablanca'
  },
  {
    id: 'radisson-blu',
    name: 'Radisson Blu Hotel Casablanca City Center',
    category: 'hotel',
    categoryLabel: 'RECOMMENDED HOTEL',
    address: '02 Boulevard Mohamed V, Casablanca',
    distanceFromVenue: '4.2 km West',
    travelTime: '12 mins by Taxi / Tram',
    coordinates: { x: 38, y: 38 },
    description: 'Premium 5-star business hotel located on Art Deco Mohamed V Boulevard with partner rates for MEIP attendees.',
    highlights: ['Partner Rate Available', 'Rooftop Lounge & Pool', 'High-speed Wi-Fi', 'Executive Business Center'],
    googleMapsUrl: 'https://maps.google.com/?q=Radisson+Blu+Hotel+Casablanca+City+Center',
    badge: 'PARTNER HOTEL',
    priceLevel: '5★ Luxury'
  },
  {
    id: 'onomo-city-center',
    name: 'ONOMO Hotel Casablanca City Center',
    category: 'hotel',
    categoryLabel: 'BUSINESS HOTEL',
    address: 'Angle Boulevard Massira Khadra, Casablanca',
    distanceFromVenue: '6.5 km Southwest',
    travelTime: '18 mins by Taxi',
    coordinates: { x: 32, y: 58 },
    description: 'Modern eco-friendly business hotel catering to tech travelers with fast fiber internet and work spaces.',
    highlights: ['Tech-friendly workspaces', '24/7 Grab & Go', 'Fitness Room', 'Central Location'],
    googleMapsUrl: 'https://maps.google.com/?q=ONOMO+Hotel+Casablanca+City+Center',
    priceLevel: '4★ Business'
  },
  {
    id: 'four-seasons',
    name: 'Four Seasons Hotel Casablanca',
    category: 'hotel',
    categoryLabel: 'LUXURY OCEANFRONT',
    address: 'Boulevard de la Corniche, Casablanca',
    distanceFromVenue: '9.2 km West',
    travelTime: '22 mins by Taxi',
    coordinates: { x: 18, y: 28 },
    description: 'Oceanfront resort offering Atlantic views, fine dining, and spa facilities near Anfa Place.',
    highlights: ['Atlantic Ocean Views', 'Luxury Spa & Pools', 'Fine Dining Restaurants'],
    googleMapsUrl: 'https://maps.google.com/?q=Four+Seasons+Hotel+Casablanca',
    priceLevel: '5★ Resort'
  },
  {
    id: 'technopark',
    name: 'Technopark Casablanca',
    category: 'landmark',
    categoryLabel: 'TECH & STARTUP HUB',
    address: 'Route de Nouaceur, RS 114, Casablanca',
    distanceFromVenue: '7.8 km South',
    travelTime: '20 mins by Taxi / Tramway T1',
    coordinates: { x: 48, y: 68 },
    description: 'Morocco’s largest IT incubator and startup incubator hosting over 300 tech startups and engineering firms.',
    highlights: ['Startups & Incubators', 'Moroccan Tech Ecosystem', 'Co-working spaces'],
    googleMapsUrl: 'https://maps.google.com/?q=Technopark+Casablanca'
  },
  {
    id: 'hassan-2-mosque',
    name: 'Hassan II Mosque & Esplanade',
    category: 'landmark',
    categoryLabel: 'CULTURAL LANDMARK',
    address: 'Boulevard de la Corniche, Casablanca',
    distanceFromVenue: '7.0 km Northwest',
    travelTime: '16 mins by Taxi',
    coordinates: { x: 24, y: 22 },
    description: 'Architectural masterpiece featuring the world’s second tallest minaret situated directly over the Atlantic ocean.',
    highlights: ['Guided Cultural Tours', 'Oceanfront Promenade', 'Iconic Photo Location'],
    googleMapsUrl: 'https://maps.google.com/?q=Hassan+II+Mosque+Casablanca',
    badge: 'MUST SEE'
  }
];

export const InteractiveTravelMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(MAP_LOCATIONS[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'venue' | 'transit' | 'hotel' | 'landmark'>('all');
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const filteredLocations = MAP_LOCATIONS.filter(loc => {
    if (activeFilter === 'all') return true;
    return loc.category === activeFilter;
  });

  const getCategoryIcon = (category: MapLocation['category']) => {
    switch (category) {
      case 'venue':
        return <Building2 className="w-4 h-4" />;
      case 'transit':
        return <Plane className="w-4 h-4" />;
      case 'hotel':
        return <Hotel className="w-4 h-4" />;
      case 'landmark':
        return <Compass className="w-4 h-4" />;
    }
  };

  const getCategoryBadgeStyle = (category: MapLocation['category']) => {
    switch (category) {
      case 'venue':
        return 'bg-[#E6004D] text-white border-[#E6004D]';
      case 'transit':
        return 'bg-[#3B388E] text-white border-[#3B388E]';
      case 'hotel':
        return 'bg-amber-500 text-white border-amber-500';
      case 'landmark':
        return 'bg-emerald-600 text-white border-emerald-600';
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-6 md:p-8 border-b border-[#E2E8F0] bg-gradient-to-r from-[#F4F5F7] via-white to-[#F4F5F7] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#E6004D]/10 text-[#E6004D] rounded-lg">
              <Compass className="w-5 h-5" />
            </span>
            <span className="font-mono-code text-xs uppercase font-bold text-[#E6004D] tracking-wider">
              INTERACTIVE LOGISTICS MAP
            </span>
          </div>
          <h3 className="font-space font-bold text-2xl md:text-3xl text-[#3B388E] tracking-tight">
            Casablanca Event Radius & Transit Hubs
          </h3>
          <p className="font-sans-body text-xs md:text-sm text-gray-500">
            Click any node or pin on the vector canvas to view logistics, transit times, and navigation links.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-sans-body font-bold text-xs uppercase transition-colors cursor-pointer border ${
              activeFilter === 'all'
                ? 'bg-[#3B388E] text-white border-[#3B388E]'
                : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
            }`}
          >
            All Nodes ({MAP_LOCATIONS.length})
          </button>
          <button
            onClick={() => setActiveFilter('venue')}
            className={`px-3 py-1.5 rounded-xl font-sans-body font-bold text-xs uppercase transition-colors cursor-pointer border inline-flex items-center gap-1.5 ${
              activeFilter === 'venue'
                ? 'bg-[#E6004D] text-white border-[#E6004D]'
                : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Venue
          </button>
          <button
            onClick={() => setActiveFilter('transit')}
            className={`px-3 py-1.5 rounded-xl font-sans-body font-bold text-xs uppercase transition-colors cursor-pointer border inline-flex items-center gap-1.5 ${
              activeFilter === 'transit'
                ? 'bg-[#3B388E] text-white border-[#3B388E]'
                : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            Transit
          </button>
          <button
            onClick={() => setActiveFilter('hotel')}
            className={`px-3 py-1.5 rounded-xl font-sans-body font-bold text-xs uppercase transition-colors cursor-pointer border inline-flex items-center gap-1.5 ${
              activeFilter === 'hotel'
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" />
            Hotels
          </button>
          <button
            onClick={() => setActiveFilter('landmark')}
            className={`px-3 py-1.5 rounded-xl font-sans-body font-bold text-xs uppercase transition-colors cursor-pointer border inline-flex items-center gap-1.5 ${
              activeFilter === 'landmark'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Landmarks
          </button>
        </div>
      </div>

      {/* Main Map Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-8 bg-[#0F172A] relative min-h-[420px] md:min-h-[500px] flex items-center justify-center overflow-hidden p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-[#E2E8F0]/20 select-none">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '24px 24px, 48px 48px, 48px 48px'
            }}
          />

          {/* Atlantic Ocean Coastline Overlay Styling */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="transitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6004D" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Atlantic Ocean Vector Polygon (Northwest Coast) */}
            <path
              d="M 0,0 L 400,0 C 350,100 280,180 200,240 C 120,300 60,420 0,550 Z"
              fill="url(#oceanGrad)"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />

            {/* Ocean Label */}
            <text x="80" y="100" fill="#38BDF8" fontSize="16" fontFamily="monospace" opacity="0.4" fontWeight="bold">
              ATLANTIC OCEAN
            </text>

            {/* Casablanca Highway & Rail Connections (Dashed Vector Lines) */}
            {/* Route from CMN Airport to Venue */}
            <path
              d="M 750,492 Q 620,400 520,252"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.5"
            />
            {/* Route from Casa-Voyageurs to Venue */}
            <path
              d="M 420,288 L 520,252"
              fill="none"
              stroke="#E6004D"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />
            {/* Connection to Hotels */}
            <path
              d="M 520,252 L 380,228 M 520,252 L 320,348"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.6"
            />

            {/* Radius concentric circles around main venue */}
            <circle cx="520" cy="252" r="80" fill="none" stroke="#E6004D" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
            <circle cx="520" cy="252" r="180" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
            <circle cx="520" cy="252" r="300" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="6 6" opacity="0.15" />

            {/* Radius Scale Labels */}
            <text x="520" y="165" fill="#E6004D" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">
              5 KM RADIUS
            </text>
            <text x="520" y="65" fill="#38BDF8" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">
              15 KM RADIUS
            </text>
          </svg>

          {/* Compass Rose Top Right */}
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 flex items-center gap-2 text-slate-300 font-mono-code text-[10px] shadow-lg">
            <Compass className="w-4 h-4 text-[#38BDF8] animate-spin" style={{ animationDuration: '20s' }} />
            <div>
              <div className="font-bold text-white">CASABLANCA HUB</div>
              <div className="text-slate-400">33.5731° N, 7.5898° W</div>
            </div>
          </div>

          {/* Map Legend Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 space-y-1.5 text-slate-300 font-mono-code text-[10px] shadow-lg hidden sm:block">
            <div className="font-bold text-white uppercase text-[11px] mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E6004D]" />
              MAP LAYERS
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6004D] border border-white" />
              <span>Main Venue (Simplon Campus)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B388E] border border-white" />
              <span>Airport & Rail Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
              <span>Partner Accommodation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              <span>Cultural & Tech Hubs</span>
            </div>
          </div>

          {/* Location Pins Overlay */}
          <div className="relative w-full h-full min-h-[400px] z-10">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              const isHovered = hoveredLocationId === loc.id;

              let pinBgClass = 'bg-slate-700 text-white';
              let ringColor = 'ring-slate-400';
              if (loc.category === 'venue') {
                pinBgClass = 'bg-[#E6004D] text-white';
                ringColor = 'ring-[#E6004D]';
              } else if (loc.category === 'transit') {
                pinBgClass = 'bg-[#0284C7] text-white';
                ringColor = 'ring-[#0284C7]';
              } else if (loc.category === 'hotel') {
                pinBgClass = 'bg-amber-500 text-white';
                ringColor = 'ring-amber-500';
              } else if (loc.category === 'landmark') {
                pinBgClass = 'bg-emerald-500 text-white';
                ringColor = 'ring-emerald-500';
              }

              return (
                <div
                  key={loc.id}
                  style={{
                    left: `${loc.coordinates.x}%`,
                    top: `${loc.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300"
                  onClick={() => setSelectedLocation(loc)}
                  onMouseEnter={() => setHoveredLocationId(loc.id)}
                  onMouseLeave={() => setHoveredLocationId(null)}
                >
                  {/* Pulsing Beacon Ring for Selected/Venue */}
                  {(isSelected || loc.category === 'venue') && (
                    <span 
                      className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${
                        loc.category === 'venue' ? 'bg-[#E6004D]' : 'bg-[#38BDF8]'
                      }`}
                      style={{ animationDuration: '2s' }}
                    />
                  )}

                  {/* Pin Node Button */}
                  <div className={`relative flex items-center justify-center p-2 rounded-2xl shadow-xl transition-all duration-300 border border-white/40 ${pinBgClass} ${
                    isSelected ? 'scale-125 ring-4 ring-offset-2 ring-offset-slate-900 ' + ringColor : 'hover:scale-110'
                  }`}>
                    {getCategoryIcon(loc.category)}
                  </div>

                  {/* Pin Label Tooltip */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none whitespace-nowrap transition-all duration-200 z-30 ${
                    isSelected || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                  }`}>
                    <div className="bg-slate-900/95 text-white font-sans-body text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-1.5">
                      <span>{loc.name}</span>
                      {loc.badge && (
                        <span className="bg-[#E6004D] text-white text-[9px] px-1.5 py-0.5 rounded font-mono-code font-bold">
                          {loc.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel Drawer (Right Column) */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
              <div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase border ${getCategoryBadgeStyle(selectedLocation.category)}`}>
                  {getCategoryIcon(selectedLocation.category)}
                  {selectedLocation.categoryLabel}
                </span>
                <h4 className="font-space font-bold text-2xl text-[#3B388E] tracking-tight mt-2 leading-tight">
                  {selectedLocation.name}
                </h4>
              </div>

              {selectedLocation.priceLevel && (
                <span className="font-mono-code text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
                  {selectedLocation.priceLevel}
                </span>
              )}
            </div>

            {/* Address & Logistics Distance */}
            <div className="space-y-3 bg-[#F4F5F7] p-4 rounded-2xl border border-[#E2E8F0]">
              <div className="flex items-start gap-2.5 text-xs font-sans-body text-gray-700">
                <MapPin className="w-4 h-4 text-[#E6004D] shrink-0 mt-0.5" />
                <span>{selectedLocation.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans-body text-gray-700 pt-2 border-t border-[#E2E8F0]">
                <Navigation className="w-4 h-4 text-[#3B388E] shrink-0" />
                <span className="font-bold text-[#3B388E]">Distance:</span>
                <span>{selectedLocation.distanceFromVenue}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans-body text-gray-700">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-emerald-700">Transit:</span>
                <span>{selectedLocation.travelTime}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h5 className="font-mono-code text-[11px] font-bold uppercase text-gray-400 mb-1">LOCATION SUMMARY</h5>
              <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>

            {/* Highlights checklist */}
            <div className="space-y-2">
              <h5 className="font-mono-code text-[11px] font-bold uppercase text-gray-400">KEY LOGISTICS HIGHLIGHTS</h5>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedLocation.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans-body text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <a
              href={selectedLocation.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {selectedLocation.category === 'hotel' && (
              <p className="text-[11px] text-gray-500 text-center font-sans-body pt-1">
                Mention <strong className="text-[#E6004D]">MEIP 2026 / Simplon</strong> during reservation for preferred academic rate.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
