import React from 'react';

interface NavalhaLogoProps {
  className?: string;
  size?: number | string;
  withCircle?: boolean;
}

export const NavalhaLogo: React.FC<NavalhaLogoProps> = ({
  className = 'w-10 h-10',
  size,
  withCircle = true,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none flex-shrink-0 ${className}`}
      style={style}
      aria-label="Logo Barbearia Navalha"
    >
      <defs>
        {/* Blue circle radial depth */}
        <radialGradient id="navalhaBlue" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#2F60E8" />
          <stop offset="65%" stopColor="#204EC8" />
          <stop offset="100%" stopColor="#17399B" />
        </radialGradient>

        {/* Subtle drop shadow for razor */}
        <filter id="razorShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#091432" floodOpacity="0.45" />
        </filter>
      </defs>

      {withCircle && (
        <>
          {/* Outer dark ring */}
          <circle
            cx="250"
            cy="250"
            r="234"
            fill="#090d18"
            stroke="#1b233a"
            strokeWidth="4"
          />

          {/* Main Blue Circle */}
          <circle
            cx="250"
            cy="250"
            r="222"
            fill="url(#navalhaBlue)"
            stroke="#0b1122"
            strokeWidth="14"
          />
        </>
      )}

      {/* Razor Graphics Group */}
      <g filter="url(#razorShadow)">
        {/* Left Arm: Blade & Shank (Navalha) */}
        <path
          d="M 238 162 
             L 214 246 
             L 229 250 
             L 204 350 
             C 194 390, 142 414, 126 376 
             C 112 342, 144 300, 168 250 
             L 220 148 
             Z"
          fill="#FFFFFF"
          stroke="#0D111A"
          strokeWidth="15"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Notch / Step detail on inner blade edge */}
        <path
          d="M 216 238 
             L 230 242 
             L 220 280 
             L 206 276 
             Z"
          fill="#0D111A"
        />

        {/* Tang / Hook (Espiga da navalha curva no topo) */}
        <path
          d="M 242 165 
             C 246 142, 256 122, 270 112 
             C 278 106, 286 112, 282 124 
             C 274 146, 262 166, 252 182 
             Z"
          fill="#FFFFFF"
          stroke="#0D111A"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Right Arm: Handle (Cabo do navalhete) */}
        <path
          d="M 228 152 
             C 242 142, 258 144, 268 158 
             L 348 316 
             C 368 356, 372 388, 350 414 
             C 328 436, 298 424, 284 386 
             L 222 178 
             Z"
          fill="#FFFFFF"
          stroke="#0D111A"
          strokeWidth="15"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Pivot Pin / Rivet (Rebite de articulação central) */}
        <circle
          cx="248"
          cy="172"
          r="9"
          fill="#0D111A"
        />
      </g>
    </svg>
  );
};
