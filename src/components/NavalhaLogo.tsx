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
      viewBox="70 62 876 876"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none flex-shrink-0 ${className}`}
      style={style}
      aria-label="Logo Barbearia Navalha"
    >
      {withCircle && (
        <circle
          cx="508"
          cy="500"
          r="414"
          fill="#0037B3"
          stroke="#000000"
          strokeWidth="24"
        />
      )}

      {/* Black Outer Silhouette of the Razor */}
      <path
        d="M 428 274
           C 418 238, 448 198, 488 208
           C 493 209, 496 212, 498 214
           C 502 194, 502 174, 502 156
           C 502 118, 568 118, 570 160
           C 572 200, 560 238, 544 268
           C 602 358, 662 482, 712 622
           C 728 668, 740 708, 746 734
           C 758 782, 718 818, 672 812
           C 632 806, 610 780, 600 746
           C 566 632, 532 500, 495 368
           C 480 388, 466 408, 456 426
           L 478 442
           C 488 450, 490 460, 484 476
           L 380 738
           C 370 766, 348 778, 320 770
           L 280 756
           C 250 744, 238 718, 250 688
           C 288 596, 328 502, 368 412
           C 390 368, 414 328, 436 292
           Z"
        fill="#000000"
      />

      {/* White Interior of Left Arm (Blade & Shank) */}
      <path
        d="M 461 304
           C 436 344, 412 384, 392 424
           C 352 512, 312 606, 276 696
           C 271 710, 277 722, 292 728
           L 324 741
           C 339 747, 349 741, 355 726
           L 456 466
           C 458 460, 456 456, 450 451
           L 431 437
           C 425 432, 425 426, 429 417
           C 444 388, 462 362, 481 340
           Z"
        fill="#FFFFFF"
      />

      {/* White Interior of Right Arm (Handle & Tang) */}
      <path
        d="M 454 264
           C 446 244, 462 226, 482 234
           C 490 237, 495 242, 498 246
           C 510 224, 520 192, 521 158
           C 521 142, 545 142, 545 160
           C 545 196, 534 236, 516 268
           C 568 348, 628 468, 678 608
           C 696 658, 710 702, 718 730
           C 726 760, 702 784, 674 780
           C 648 776, 634 758, 626 734
           C 578 584, 522 422, 454 264
           Z"
        fill="#FFFFFF"
      />

      {/* Black Pivot Pin */}
      <circle cx="489" cy="280" r="8.5" fill="#000000" />
    </svg>
  );
};



