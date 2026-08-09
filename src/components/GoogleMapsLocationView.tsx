import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  GraduationCap, 
  Building2, 
  Layers, 
  Compass, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Phone, 
  Mail, 
  Clock, 
  Map as MapIcon,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AcademicLocation {
  id: string;
  name: string;
  shortName: string;
  category: string;
  address: string;
  cityRegion: string;
  coordinates: { lat: number; lng: number };
  websiteUrl: string;
  googleMapsUrl: string;
  description: string;
  highlights: string[];
  department: string;
  phone?: string;
  badge: string;
  bannerImage: string;
}

const ACADEMIC_LOCATIONS: AcademicLocation[] = [
  {
    id: 'est-fkih-ben-salah',
    name: 'EST Fkih Ben Salah — CCFBS Centre de Codage',
    shortName: 'EST Fkih Ben Salah',
    category: 'ALMA MATER & CODE CENTER',
    address: 'Route de Khouribga, BP 399',
    cityRegion: 'Fkih Ben Salah 25250, Morocco',
    coordinates: { lat: 32.5163125, lng: -6.6659375 },
    websiteUrl: 'https://estfbs.usms.ac.ma/',
    googleMapsUrl: 'https://www.google.com/maps/place/EST+:+%C3%89cole+Sup%C3%A9rieure+de+Technologie_Fkih+Ben+Salah/@32.516312,-6.665937,973m/data=!3m1!1e3!4m6!3m5!1s0xda46bc6644b9563:0x6ee82fe090e3e2f6!8m2!3d32.5163125!4d-6.6659375!16s%2Fg%2F11fq5xl88q?hl=fr&entry=ttu',
    description: 'The premier Higher Institute of Technology and Centre de Codage (CCFBS) in Fkih Ben Salah (Sultan Moulay Slimane University). Primary academic institution of author Zakaria Bahtani for software engineering & analytics specialization.',
    highlights: [
      'Centre de Codage (CCFBS) Software Engineering & Data Labs',
      'Sultan Moulay Slimane University Academic Network',
      'Data Analytics & Software Development Research Hub',
      'Official Co-Sponsor for MEIP Project Defense'
    ],
    department: 'Software Engineering & Data Intelligence Laboratory',
    phone: '+212 5234-34500',
    badge: 'AUTHOR ALMA MATER',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'simplon-casablanca',
    name: 'Simplon Maghreb Innovation Campus',
    shortName: 'Simplon Casablanca',
    category: 'ANALYTICS & DEFENSE VENUE',
    address: 'Boulevard Grande Ceinture, Ain Sebaa',
    cityRegion: 'Casablanca 20300, Morocco',
    coordinates: { lat: 33.595, lng: -7.535 },
    websiteUrl: 'https://simplon.co',
    googleMapsUrl: 'https://maps.google.com/?q=Simplon+Maghreb+Casablanca',
    description: 'Main executive campus hosting the final MEIP project defense, live PostgreSQL compute nodes, and interactive web dashboard presentations.',
    highlights: [
      'Executive Defense Auditorium & Keynote Stage',
      'FastAPI & PostgreSQL Cloud Clusters',
      'Data Engineering Workstations',
      'Industry & Academic Stakeholder Networking'
    ],
    department: 'Data Analytics & Full Stack Engineering Program',
    phone: '+212 5220-00000',
    badge: 'DEFENSE VENUE',
    bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  }
];

export const GoogleMapsLocationView: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<AcademicLocation>(ACADEMIC_LOCATIONS[0]);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
  const hasApiKey = Boolean(apiKey) && apiKey !== 'YOUR_API_KEY';

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-6 md:p-8 border-b border-[#E2E8F0] bg-gradient-to-r from-[#F4F5F7] via-white to-[#F4F5F7] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#E6004D]/10 text-[#E6004D] rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="font-mono-code text-xs uppercase font-bold text-[#E6004D] tracking-wider">
              ACADEMIC INSTITUTION & GOOGLE MAPS LOCATION
            </span>
          </div>
          <h3 className="font-space font-extrabold text-2xl md:text-3xl text-[#3B388E] tracking-tight">
            CCFBS Centre de Codage — EST Fkih Ben Salah
          </h3>
          <p className="font-sans-body text-xs md:text-sm text-gray-600 leading-relaxed">
            Specified academic location for CCF P.S. Centre de Codage & École Supérieure de Technologie Fkih Ben Salah integrated with Google Maps Platform API.
          </p>
        </div>

        {/* Location Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {ACADEMIC_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc);
                  setIsInfoWindowOpen(true);
                }}
                className={`px-4 py-2 rounded-xl font-sans-body font-bold text-xs uppercase transition-all cursor-pointer inline-flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#3B388E] text-white border-[#3B388E] shadow-sm'
                    : 'bg-white text-gray-700 border-[#E2E8F0] hover:bg-[#F4F5F7]'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E6004D]' : 'text-gray-400'}`} />
                <span>{loc.shortName}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#E6004D] animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Google Map + Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Google Map Container */}
        <div className="lg:col-span-7 bg-[#0F172A] relative min-h-[420px] md:min-h-[500px] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
          
          {/* Map Controls Header */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono-code text-[11px] font-bold text-white uppercase flex items-center gap-2 shadow-md pointer-events-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LAT: {selectedLocation.coordinates.lat.toFixed(6)}°</span>
              <span className="text-slate-500">|</span>
              <span>LNG: {selectedLocation.coordinates.lng.toFixed(6)}°</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setMapType('roadmap')}
                className={`px-3 py-1.5 rounded-xl font-mono-code text-[10px] font-bold uppercase transition-all cursor-pointer border ${
                  mapType === 'roadmap'
                    ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8]'
                    : 'bg-slate-900/80 text-white border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`px-3 py-1.5 rounded-xl font-mono-code text-[10px] font-bold uppercase transition-all cursor-pointer border ${
                  mapType === 'satellite'
                    ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8]'
                    : 'bg-slate-900/80 text-white border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                Satellite
              </button>
            </div>
          </div>

          {/* Interactive Google Map Layer */}
          <div className="w-full h-full min-h-[420px] md:min-h-[500px] relative">
            {hasApiKey ? (
              <APIProvider apiKey={apiKey} version="weekly">
                <Map
                  key={`${selectedLocation.id}-${mapType}`}
                  defaultCenter={selectedLocation.coordinates}
                  defaultZoom={16}
                  mapTypeId={mapType === 'satellite' ? 'hybrid' : 'roadmap'}
                  mapId="EST_FBS_LOCATION_MAP"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%', minHeight: '420px' }}
                  gestureHandling="greedy"
                >
                  <AdvancedMarker
                    position={selectedLocation.coordinates}
                    onClick={() => setIsInfoWindowOpen(prev => !prev)}
                    title={selectedLocation.name}
                  >
                    <Pin background="#E6004D" glyphColor="#FFFFFF" borderColor="#3B388E" />
                  </AdvancedMarker>

                  {isInfoWindowOpen && (
                    <InfoWindow
                      position={selectedLocation.coordinates}
                      onCloseClick={() => setIsInfoWindowOpen(false)}
                    >
                      <div className="p-2 max-w-xs font-sans-body text-slate-900 space-y-1">
                        <span className="px-1.5 py-0.5 bg-[#E6004D] text-white text-[9px] font-mono-code font-bold uppercase rounded">
                          {selectedLocation.badge}
                        </span>
                        <h4 className="font-space font-bold text-xs text-[#3B388E] uppercase mt-1">
                          {selectedLocation.name}
                        </h4>
                        <p className="text-[11px] text-gray-600">
                          {selectedLocation.address}, {selectedLocation.cityRegion}
                        </p>
                        <a
                          href={selectedLocation.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E6004D] hover:underline pt-1"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              /* High-Res Interactive Embed Fallback with Live Direct Links */
              <iframe
                title={`Google Maps - ${selectedLocation.name}`}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[420px] border-none"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={
                  selectedLocation.id === 'est-fkih-ben-salah'
                    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.1234567!2d-6.6659375!3d32.5163125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda46bc6644b9563%3A0x6ee82fe090e3e2f6!2sEST%20%3A%20%C3%89cole%20Sup%C3%A9rieure%20de%20Technologie_Fkih%20Ben%20Salah!5e${mapType === 'satellite' ? '1' : '0'}!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma`
                    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-7.535!3d33.595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzAyLjQiTiA3wrAzMicwNi4wIlc!5e0!3m2!1sen!2sma!4v1710000000000`
                }
              />
            )}
          </div>

          {/* Quick Direct Google Maps Link Footer */}
          <div className="bg-slate-900 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-mono-code text-xs text-slate-300">
                Direct Google Maps API Pin Location
              </span>
            </div>

            <a
              href={selectedLocation.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#E6004D] hover:bg-[#c40042] text-white font-sans-body font-bold text-xs uppercase px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>OPEN GOOGLE MAPS DIRECTLY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Academic Details Sidebar */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-6 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-[#FCE4E8] text-[#E6004D] border border-[#E6004D]/30 rounded-full font-mono-code text-[11px] font-bold uppercase tracking-wide">
                {selectedLocation.badge}
              </span>
              <span className="font-mono-code text-xs text-gray-400 font-semibold">
                SULTAN MOULAY SLIMANE UNIV.
              </span>
            </div>

            {/* Title & Category */}
            <div className="space-y-2">
              <span className="font-sans-body text-xs font-bold uppercase tracking-wider text-[#3B388E]">
                {selectedLocation.category}
              </span>
              <h2 className="font-space font-extrabold text-2xl text-[#1A202C] leading-snug">
                {selectedLocation.name}
              </h2>
              <p className="font-sans-body text-xs text-gray-500 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E6004D]" />
                <span>{selectedLocation.address}, {selectedLocation.cityRegion}</span>
              </p>
            </div>

            {/* Description */}
            <p className="font-sans-body text-xs md:text-sm text-gray-600 leading-relaxed border-l-2 border-[#3B388E] pl-3 py-0.5">
              {selectedLocation.description}
            </p>

            {/* Highlights Checklist */}
            <div className="space-y-2 pt-2">
              <h4 className="font-space font-bold text-xs uppercase text-[#3B388E] tracking-tight">
                Academic & Technology Highlights
              </h4>
              <div className="space-y-2">
                {selectedLocation.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-sans-body text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Department Info */}
            <div className="p-4 bg-[#F4F5F7] rounded-2xl border border-[#E2E8F0] space-y-2 font-sans-body text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-bold text-[#3B388E]">Department:</span>
                <span className="text-gray-800 font-semibold">{selectedLocation.department}</span>
              </div>
              {selectedLocation.phone && (
                <div className="flex items-center justify-between text-gray-600 pt-1 border-t border-[#E2E8F0]">
                  <span className="font-bold text-[#3B388E]">Academic Phone:</span>
                  <span className="font-mono-code text-gray-800">{selectedLocation.phone}</span>
                </div>
              )}
            </div>

          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center gap-3">
            <a
              href={selectedLocation.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex-1 bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-5 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Globe className="w-4 h-4" />
              <span>VISIT SCHOOL WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={selectedLocation.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-[#E2E8F0] font-sans-body font-bold text-xs uppercase px-4 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MapIcon className="w-4 h-4 text-[#E6004D]" />
              <span>MAP LOCATION</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
