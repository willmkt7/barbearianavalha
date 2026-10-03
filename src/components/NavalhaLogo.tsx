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

  const bladePath = `
    M 466 300
    C 402 420, 336 560, 280 695
    C 274 712, 282 728, 298 734
    L 328 742
    C 342 746, 352 736, 358 718
    L 450 466
    C 453 458, 450 452, 442 446
    L 422 432
    C 415 426, 414 418, 420 408
    L 486 308
    Z
  `;

  const handleAndTangPath = `
    M 455 262
    C 450 236, 476 226, 496 246
    C 512 222, 520 190, 520 162
    C 520 144, 544 144, 545 166
    C 546 198, 534 236, 514 268
    C 582 380, 650 520, 712 722
    C 720 752, 694 776, 664 774
    C 640 772, 626 752, 616 722
    C 568 565, 516 415, 458 274
    C 456 269, 455 265, 455 262
    Z
  `;

  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none flex-shrink-0 ${className}`}
      style={style}
      aria-label="Logo Barbearia Navalha"
    >
      {withCircle && (
        <circle
          cx="500"
          cy="500"
          r="430"
          fill="#0037B3"
          stroke="#000000"
          strokeWidth="26"
        />
      )}

      {/* Left Arm: Blade & Notched Shank */}
      <g>
        <path
          d={bladePath}
          fill="#000000"
          stroke="#000000"
          strokeWidth="54"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d={bladePath} fill="#FFFFFF" />
      </g>

      {/* Right Arm: Handle & Tang */}
      <g>
        <path
          d={handleAndTangPath}
          fill="#000000"
          stroke="#000000"
          strokeWidth="54"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d={handleAndTangPath} fill="#FFFFFF" />
      </g>

      {/* Pivot Pin */}
      <circle cx="488" cy="280" r="11" fill="#000000" />
    </svg>
  );
};

