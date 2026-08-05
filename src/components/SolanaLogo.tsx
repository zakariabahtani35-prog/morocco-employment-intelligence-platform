import React from 'react';

/**
 * MEIP "M" Brand Logo
 * Geometric, high-contrast, modern letter "M" representing the 
 * Morocco Employment Intelligence Platform (MEIP).
 */
export const MEIPLogo: React.FC<{ className?: string; fillColor?: string }> = ({ 
  className = "w-6 h-5", 
  fillColor 
}) => {
  const gradientId = "meip-m-gradient";

  return (
    <svg 
      viewBox="0 0 26 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      id="meip-brand-m-logo"
      aria-label="MEIP Logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6004D" />
          <stop offset="45%" stopColor="#B30043" />
          <stop offset="100%" stopColor="#3B388E" />
        </linearGradient>
      </defs>

      {/* Bold Geometric "M" Glyph */}
      <path 
        d="M2.5 3.2C2.5 2.54 3.04 2 3.7 2H6.3C7 2 7.6 2.45 7.8 3.1L13 12.6L18.2 3.1C18.4 2.45 19 2 19.7 2H22.3C22.96 2 23.5 2.54 23.5 3.2V19.8C23.5 20.46 22.96 21 22.3 21H19.7C19.04 21 18.5 20.46 18.5 19.8V8.6L14.2 16.5C13.9 17.1 13.1 17.5 12.5 17.5C11.9 17.5 11.1 17.1 10.8 16.5L6.5 8.6V19.8C6.5 20.46 5.96 21 5.3 21H2.7C2.04 21 2.5 20.46 2.5 19.8V3.2Z" 
        fill={fillColor || `url(#${gradientId})`}
      />

      {/* Subtle modern accent spark at the center apex */}
      <circle 
        cx="13" 
        cy="4" 
        r="1.2" 
        fill={fillColor ? fillColor : "#E6004D"} 
        fillOpacity={fillColor ? "0.8" : "0.9"}
      />
    </svg>
  );
};

// Aliases for compatibility across the codebase
export const SolanaBarsLogo = MEIPLogo;
export const EmploymentPlatformLogo = MEIPLogo;

export const BP26Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
      id="brand-logo-btn"
    >
      <div className="flex items-center gap-2">
        <MEIPLogo className="w-6 h-5" />
        <span className="font-space font-extrabold tracking-tight text-xl text-white">MEIP</span>
      </div>
    </button>
  );
};
