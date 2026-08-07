import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { CityMetricItem } from '../../../lib/supabaseService';

// Resolve MapTiler API Key from Vite Environment Variables with fallback
const getMapTilerApiKey = (): string => {
  const envKey = import.meta.env?.VITE_MAPTILER_API_KEY;
  if (envKey && envKey.trim().length > 0 && envKey !== 'undefined') {
    return envKey.trim();
  }
  return 'afTVudwgJUV6GtrdHg3h';
};

// Mask API key for secure console logging e.g. "afTV...Hg3h"
const maskApiKey = (key: string): string => {
  if (key.length <= 8) return '****';
  return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
};

interface MoroccoEmploymentHeatMapProps {
  isLoading: boolean;
  isDarkMode: boolean;
  citiesData?: CityMetricItem[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const MoroccoEmploymentHeatMap: React.FC<MoroccoEmploymentHeatMapProps> = ({
  isLoading,
  isDarkMode,
  selectedCity,
  setSelectedCity
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [mapStatus, setMapStatus] = useState<'initializing' | 'style-loaded' | 'loaded' | 'error'>('initializing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tilesLoadedCount, setTilesLoadedCount] = useState<number>(0);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = getMapTilerApiKey();
    const maskedKey = maskApiKey(apiKey);

    // Style URL using streets-v2 (or dataviz-dark in dark mode)
    const styleUrl = isDarkMode
      ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`
      : `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`;

    console.log(`[MEIP MapLibre] Initializing base map with API Key: ${maskedKey}`);
    console.log(`[MEIP MapLibre] Target Style URL: ${styleUrl}`);

    setMapStatus('initializing');
    setErrorMessage(null);

    let mapInstance: maplibregl.Map | null = null;

    try {
      mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: [-7.0, 28.8],
        zoom: 5.2,
        pitch: 0,
        bearing: 0
      });

      // Navigation Controls (zoom + compass)
      mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right');

      // Event Listener 1: Error Handling
      mapInstance.on('error', (e) => {
        const errText = e.error?.message || e.error || 'MapLibre GL tile loading error';
        console.error('[MapLibre GL Error Event]:', errText, e);
        setErrorMessage(String(errText));
      });

      // Event Listener 2: Style Load
      mapInstance.on('style.load', () => {
        console.log('[MapLibre GL] Style.load event fired - MapTiler Vector Style JSON loaded successfully.');
        setMapStatus('style-loaded');
      });

      // Event Listener 3: Source Data (Vector Tiles loading)
      mapInstance.on('sourcedata', (e) => {
        if (e.isSourceLoaded) {
          setTilesLoadedCount(prev => prev + 1);
        }
      });

      // Event Listener 4: Map Load Complete
      mapInstance.on('load', () => {
        console.log('[MapLibre GL] Map.load event fired - All base vector tiles & fonts loaded.');
        setMapStatus('loaded');
        if (mapInstance) {
          mapInstance.resize();
        }
      });

      mapRef.current = mapInstance;
    } catch (err: any) {
      console.error('[MEIP MapLibre Initialization Exception]:', err);
      setMapStatus('error');
      setErrorMessage(err?.message || 'Failed to initialize MapLibre GL map instance');
    }

    // Force map resize after mount to handle any dynamic layout flex sizing
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        console.log('[MEIP MapLibre] Cleaning up map instance.');
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDarkMode]);

  return (
    <div id="heat-map" className={`p-6 rounded-2xl border shadow-xs space-y-6 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#27272A] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-[#E6004D]/10 text-[#E6004D] rounded-xl">
            <MapPin className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-space font-extrabold text-lg text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight flex items-center gap-2">
              Morocco MapLibre Base Map
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#E6004D]/10 text-[#E6004D] border border-[#E6004D]/20">
                MapLibre GL • MapTiler Vector Engine
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans-body">
              Base vector map of Morocco powered by MapLibre GL JS & MapTiler Streets-v2
            </p>
          </div>
        </div>

        {/* Telemetry Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
          {mapStatus === 'loaded' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Tiles Loaded (HTTP 200)</span>
            </>
          ) : mapStatus === 'error' || errorMessage ? (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-amber-600 dark:text-amber-400">Map Event Alert</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-[#E6004D] animate-spin" />
              <span className="text-gray-600 dark:text-zinc-300">Loading MapTiler Tiles...</span>
            </>
          )}
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="w-full relative flex flex-col items-center justify-center p-2 bg-gray-50 dark:bg-[#121215] rounded-2xl border border-gray-200 dark:border-[#27272A] min-h-[460px]">
        <div
          ref={mapContainerRef}
          className="w-full h-[460px] rounded-xl overflow-hidden shadow-inner"
        />

        {/* Console Error Overlay Banner if error occurs */}
        {errorMessage && (
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-mono-code backdrop-blur-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">Telemetry Note: {errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
