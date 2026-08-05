import React from 'react';

interface SimplonLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'badge';
  ringColor?: string;
  textColor?: string;
  height?: number;
}

export const SimplonLogo: React.FC<SimplonLogoProps> = ({
  className = '',
  variant = 'full',
  ringColor = '#E3004F',
  textColor = '#12333E',
  height = 36,
}) => {
  // SVG Icon element
  const iconSvg = (
    <svg
      viewBox="0 0 100 100"
      className="shrink-0"
      style={{ height: `${height}px`, width: `${height}px` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke={ringColor}
        strokeWidth="14"
        fill="none"
      />
      {/* Top Square Dot */}
      <rect
        x="44"
        y="33"
        width="12"
        height="12"
        fill={ringColor}
        rx="1"
      />
      {/* Bottom Square Dot */}
      <rect
        x="44"
        y="55"
        width="12"
        height="12"
        fill={ringColor}
        rx="1"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{iconSvg}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs ${className}`}>
        {iconSvg}
        <div className="flex flex-col leading-none text-left">
          <span className="font-sans text-xs font-bold tracking-tight" style={{ color: textColor }}>
            simplon
          </span>
          <span className="font-sans text-[8px] font-semibold tracking-widest uppercase opacity-80" style={{ color: textColor }}>
            MAGHREB
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {iconSvg}
      <div className="flex flex-col justify-center leading-none text-left">
        <span
          className="font-sans font-bold tracking-tight leading-none"
          style={{
            color: textColor,
            fontSize: `${Math.max(14, height * 0.58)}px`,
          }}
        >
          simplon
        </span>
        <span
          className="font-sans font-semibold uppercase tracking-[0.2em] leading-none mt-0.5"
          style={{
            color: textColor,
            fontSize: `${Math.max(8, height * 0.32)}px`,
            opacity: 0.85,
          }}
        >
          MAGHREB
        </span>
      </div>
    </div>
  );
};
