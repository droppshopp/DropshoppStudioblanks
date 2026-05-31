import React from 'react';
import { CustomDesign } from '../types';

interface ProductMockupProps {
  design: CustomDesign;
  className?: string;
  isMini?: boolean;
}

export default function ProductMockup({ design, className = '', isMini = false }: ProductMockupProps) {
  const {
    productType,
    canvasColor,
    stampType,
    mottoText,
    typographyFont,
    stampScale = 1.0,
    stampColor = '#FFEAA7',
    placement = 'center',
  } = design;

  // Font class dictionary
  const fontClasses: Record<string, string> = {
    'Space Grotesk': 'font-[Space-Grotesk] font-bold tracking-tight',
    'Playfair': 'font-serif italic tracking-wide',
    'Outfit': 'font-sans font-extrabold tracking-tight rounded-md',
    'JetBrains Mono': 'font-mono font-bold tracking-tighter uppercase',
  };

  // Determine text alignment from placement
  const placementClasses = {
    top: 'justify-start pt-6',
    center: 'justify-center',
    bottom: 'justify-end pb-8',
  };

  // Render high-fidelity SVG path for stamp types
  const renderStamp = () => {
    switch (stampType) {
      case 'Retro Sun':
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md animate-pulse-slow"
            fill="none"
            stroke={stampColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Center Sun */}
            <circle cx="50" cy="50" r="16" fill={stampColor} fillOpacity="0.85" />
            
            {/* Retro rays */}
            <line x1="50" y1="12" x2="50" y2="24" strokeWidth="3" />
            <line x1="50" y1="76" x2="50" y2="88" strokeWidth="3" />
            <line x1="12" y1="50" x2="24" y2="50" strokeWidth="3" />
            <line x1="76" y1="50" x2="88" y2="50" strokeWidth="3" />
            
            <line x1="23" y1="23" x2="32" y2="32" strokeWidth="3" />
            <line x1="68" y1="68" x2="77" y2="77" strokeWidth="3" />
            <line x1="77" y1="23" x2="68" y2="32" strokeWidth="3" />
            <line x1="32" y1="68" x2="23" y2="77" strokeWidth="3" />

            {/* Extra retro sparkles */}
            <path d="M 18,35 Q 20,38 22,35 Q 20,32 18,35 Z" fill={stampColor} stroke="none" />
            <path d="M 80,62 Q 82,65 84,62 Q 82,59 80,62 Z" fill={stampColor} stroke="none" />
          </svg>
        );

      case 'Lightning Zap':
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
            fill="none"
            stroke={stampColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Dual glowing lightning look */}
            <polygon
              points="45,8 65,8 40,46 62,46 25,92 42,54 28,54"
              fill={stampColor}
              fillOpacity="0.9"
            />
            {/* Little energy bolts on the side */}
            <path d="M 15 15 L 25 22 M 85 80 L 75 73" strokeWidth="2.5" />
            <polygon points="78,25 82,21 86,25 82,29" fill={stampColor} stroke="none" />
            <polygon points="18,72 22,68 26,72 22,76" fill={stampColor} stroke="none" />
          </svg>
        );

      case 'Daisy Bloom':
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            stroke={stampColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Center pistil */}
            <circle cx="50" cy="50" r="10" fill="#FFA502" stroke="#FFFFFF" strokeWidth="2" />
            
            {/* 8 beautiful distinct flower petals */}
            {/* North */}
            <path d="M 50,40 C 44,22 56,22 50,40" fill={stampColor} fillOpacity="0.8" />
            {/* South */}
            <path d="M 50,60 C 56,78 44,78 50,60" fill={stampColor} fillOpacity="0.8" />
            {/* East */}
            <path d="M 60,50 C 78,44 78,56 60,50" fill={stampColor} fillOpacity="0.8" />
            {/* West */}
            <path d="M 40,50 C 22,56 22,44 40,50" fill={stampColor} fillOpacity="0.8" />
            {/* NE */}
            <path d="M 57,43 C 71,28 79,37 57,43" fill={stampColor} fillOpacity="0.8" />
            {/* SW */}
            <path d="M 43,57 C 29,72 21,63 43,57" fill={stampColor} fillOpacity="0.8" />
            {/* SE */}
            <path d="M 57,57 C 72,71 63,79 57,57" fill={stampColor} fillOpacity="0.8" />
            {/* NW */}
            <path d="M 43,43 C 28,29 37,21 43,43" fill={stampColor} fillOpacity="0.8" />
          </svg>
        );

      case 'Heart':
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            stroke={stampColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Inner Bold Heart */}
            <path
              d="M 50,30 C 50,30 40,14 24,24 C 8,34 16,66 50,86 C 84,66 92,34 76,24 C 60,14 50,30 50,30 Z"
              fill={stampColor}
              fillOpacity="0.9"
            />
            {/* Dynamic retro accent stroke inside the heart */}
            <path
              d="M 33,35 C 33,38 31,45 35,50"
              stroke="#FFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="80" cy="20" r="3" fill="#FFF" stroke="none" />
            <circle cx="20" cy="80" r="4" fill="#FFF" stroke="none" />
          </svg>
        );

      case 'Ocean Wave':
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            stroke={stampColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Retro circular outline frame */}
            <circle cx="50" cy="50" r="42" strokeWidth="2.5" />
            
            {/* Classic woodblock wave swoops */}
            <path
              d="M 12,65 Q 25,40 45,55 Q 60,70 75,50 Q 82,42 88,35"
              strokeWidth="4.5"
            />
            <path
              d="M 12,50 Q 30,32 50,45 Q 68,58 88,40"
              strokeWidth="3"
            />
            {/* Spray droplets */}
            <circle cx="48" cy="38" r="2.5" fill={stampColor} stroke="none" />
            <circle cx="70" cy="35" r="2" fill={stampColor} stroke="none" />
            <circle cx="60" cy="28" r="2.5" fill={stampColor} stroke="none" />
            <circle cx="28" cy="42" r="1.5" fill={stampColor} stroke="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  // Sizing styles depending on modal view vs. thumbnail
  const physicalHeight = isMini ? 'h-36 w-full' : 'h-80 md:h-96 w-full';
  const paddingBox = isMini ? 'p-2' : 'p-6';

  return (
    <div
      className={`relative rounded-3xl overflow-hidden flex items-center justify-center transition-all duration-300 ${physicalHeight} ${paddingBox} ${className}`}
      id={`mockup-${productType.toLowerCase()}-${isMini ? 'mini' : 'full'}`}
    >
      {/* Decorative dynamic neon gradient border to reinforce the "Vibrant Palette" styling */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-color-burn pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${canvasColor} 0%, rgba(255,255,255,0) 70%)`
        }}
      />

      {/* RENDER APPAREL MOCKUP */}
      {productType === 'Apparel' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* High quality T-shirt vector backdrop */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-300"
            fill={canvasColor}
            stroke="#1E1E1E"
            strokeWidth="1.2"
          >
            {/* T-Shirt Body & Sleeves outline */}
            <path d="M 50,11 C 45,11 41,13 38,13 Q 34,7 28,11 L 10,21 Q 8,24 13,32 L 23,28 L 22,42 C 22,78 24,93 30,93 L 70,93 C 76,93 78,78 78,42 L 77,28 L 87,32 Q 92,24 90,21 L 72,11 Q 66,7 62,13 C 59,13 55,11 50,11 Z" />
            {/* Collar Ribbing Detail */}
            <path d="M 38,13 C 38,18 62,18 62,13" fill="none" stroke="#1E1E1E" strokeWidth="1" />
            {/* Stitching lines in sleeve ends and hemline */}
            <path d="M 12,24 L 21,30 M 88,24 L 79,30" stroke="#1E1E1E" strokeWidth="0.5" strokeDasharray="1,1" />
            <path d="M 31,91 L 69,91" stroke="#1E1E1E" strokeWidth="0.5" strokeDasharray="1,1" />
          </svg>

          {/* Dynamic Printable Stamp & Text Overlay Area on chest */}
          <div 
            className={`absolute z-10 flex flex-col items-center ${
              isMini ? 'top-10 w-[45%]' : 'top-[22%] w-[50%] h-[55%]'
            } justify-between text-center pointer-events-none`}
          >
            {/* Print Center Content */}
            <div 
              className="flex-1 flex flex-col items-center justify-center transition-transform"
              style={{ transform: `scale(${isMini ? 0.65 : stampScale})` }}
            >
              <div className={`${isMini ? 'w-12 h-12' : 'w-24 h-24 md:w-28 md:h-28'} transition-colors duration-200`}>
                {renderStamp()}
              </div>
            </div>

            {/* Custom motto text */}
            {mottoText && (
              <p
                className={`mt-1 font-bold tracking-tight text-center transition-all ${fontClasses[typographyFont]} ${
                  isMini ? 'text-[8px] leading-tight max-w-[50px] truncate' : 'text-xs md:text-sm max-w-[125px] line-clamp-2'
                }`}
                style={{ color: stampColor }}
              >
                {mottoText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* RENDER CERAMIC MUG */}
      {productType === 'Mug' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-300"
            fill="none"
          >
            {/* C-Handle (behind) */}
            <path
              d="M 28,26 C 8,26 8,74 28,74"
              fill="none"
              stroke={canvasColor}
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 28,26 C 8,26 8,74 28,74"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="12"
              strokeLinecap="round"
              className="opacity-10 pointer-events-none"
            />
            {/* C-Handle border */}
            <path
              d="M 28,26 C 8,26 8,74 28,74"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Mug Body Cylinder */}
            <rect
              x="28"
              y="18"
              width="50"
              height="64"
              rx="4"
              fill={canvasColor}
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />

            {/* Top Rim Ellipse for Depth */}
            <ellipse
              cx="53"
              cy="18"
              rx="25"
              ry="5"
              fill={canvasColor}
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />
            
            {/* Dark inner mug depth coffee color */}
            <ellipse
              cx="53"
              cy="18"
              rx="22"
              ry="3"
              fill="#2D1A10"
              className="opacity-75"
            />

            {/* Base Ellipse shading */}
            <ellipse
              cx="53"
              cy="82"
              rx="25"
              ry="2"
              fill="rgba(0,0,0,0.15)"
            />
          </svg>

          {/* Print Overlay on Mug Side */}
          <div 
            className={`absolute z-10 flex flex-col items-center ${
              isMini ? 'left-[40%] top-6 w-[40%]' : 'left-[38%] top-[24%] w-[42%] h-[53%]'
            } justify-between text-center pointer-events-none`}
          >
            <div 
              className="flex-1 flex flex-col items-center justify-center transition-transform"
              style={{ transform: `scale(${isMini ? 0.6 : stampScale * 0.95})` }}
            >
              <div className={`${isMini ? 'w-10 h-10' : 'w-20 w-20 md:w-24 md:h-24'}`}>
                {renderStamp()}
              </div>
            </div>

            {mottoText && (
              <p
                className={`mt-1 text-center transition-all ${fontClasses[typographyFont]} ${
                  isMini ? 'text-[7px] max-w-[45px] truncate' : 'text-xs max-w-[100px] line-clamp-2'
                }`}
                style={{ color: stampColor }}
              >
                {mottoText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* RENDER HARDCOVER JOURNAL */}
      {productType === 'Journal' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-300"
            fill="none"
          >
            {/* Journal Back Cover Shadow */}
            <rect
              x="21"
              y="11"
              width="62"
              height="78"
              rx="4"
              fill="#1F2937"
              className="opacity-30"
            />

            {/* Journal Main Cover Body */}
            <rect
              x="18"
              y="10"
              width="62"
              height="78"
              rx="5"
              fill={canvasColor}
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />

            {/* Sturdy Spine spine-bound lines */}
            <rect
              x="18"
              y="10"
              width="6"
              height="78"
              fill="#1E1E1E"
              fillOpacity="0.15"
            />
            <line x1="24" y1="10" x2="24" y2="88" stroke="#1E1E1E" strokeWidth="0.8" />
            <line x1="21" y1="10" x2="21" y2="88" stroke="#1E1E1E" strokeWidth="0.4" strokeDasharray="2,2" />

            {/* Horizontal Book Ribbon Accent */}
            <path
              d="M 50,10 L 50,88 C 50,91 55,93 55,88 L 55,10"
              fill="#1E1E1E"
              fillOpacity="0.08"
            />
          </svg>

          {/* Journal Front cover design center */}
          <div 
            className={`absolute z-10 flex flex-col items-center ${
              isMini ? 'left-[34%] top-6 w-[45%]' : 'left-[32%] top-[20%] w-[50%] h-[58%]'
            } justify-between text-center pointer-events-none`}
          >
            <div 
              className="flex-1 flex flex-col items-center justify-center transition-transform"
              style={{ transform: `scale(${isMini ? 0.6 : stampScale})` }}
            >
              <div className={`${isMini ? 'w-10 h-10' : 'w-20 h-20 md:w-24 md:h-24'}`}>
                {renderStamp()}
              </div>
            </div>

            {mottoText && (
              <p
                className={`mt-1 text-center transition-all ${fontClasses[typographyFont]} ${
                  isMini ? 'text-[7px] max-w-[50px] truncate' : 'text-xs max-w-[110px] line-clamp-2'
                }`}
                style={{ color: stampColor }}
              >
                {mottoText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* RENDER CANVAS TOTE BAG */}
      {productType === 'Tote' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-300"
            fill="none"
          >
            {/* Long Cotton carrying straps */}
            <path
              d="M 33,36 L 33,8 C 33,2 67,2 67,8 L 67,36"
              fill="none"
              stroke="#E2D4C9"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 33,36 L 33,8 C 33,2 67,2 67,8 L 67,36"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Fold over rim strap attachments */}
            <rect x="30" y="32" width="6" height="5" fill="#C5B19A" stroke="#1E1E1E" strokeWidth="1" />
            <rect x="64" y="32" width="6" height="5" fill="#C5B19A" stroke="#1E1E1E" strokeWidth="1" />

            {/* Tote Bag Main Fabric Square Box */}
            <path
              d="M 18,34 Q 16,92 20,92 H 80 Q 84,92 82,34 Z"
              fill={canvasColor}
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />

            {/* Fold & Fabric Crease detailed lines */}
            <path
              d="M 18,34 Q 50,42 82,34"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="0.8"
              strokeLinecap="round"
              className="opacity-25"
            />
            
            {/* Bottom Gusset fold line */}
            <path
              d="M 23,88 Q 50,84 77,88"
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="0.6"
              strokeLinecap="round"
              className="opacity-20"
            />
          </svg>

          {/* Overlay centered on the canvas bag */}
          <div 
            className={`absolute z-10 flex flex-col items-center ${
              isMini ? 'top-[42%] w-[45%]' : 'top-[48%] w-[52%] h-[38%]'
            } justify-between text-center pointer-events-none`}
          >
            <div 
              className="flex-1 flex flex-col items-center justify-center transition-transform"
              style={{ transform: `scale(${isMini ? 0.6 : stampScale})` }}
            >
              <div className={`${isMini ? 'w-10 h-10' : 'w-18 h-18 md:w-22 md:h-22'}`}>
                {renderStamp()}
              </div>
            </div>

            {mottoText && (
              <p
                className={`mt-1 text-center transition-all ${fontClasses[typographyFont]} ${
                  isMini ? 'text-[7px] max-w-[50px] truncate' : 'text-xs max-w-[120px] line-clamp-2'
                }`}
                style={{ color: stampColor }}
              >
                {mottoText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* RENDER INSULATED TUMBLER */}
      {productType === 'Tumbler' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-300"
            fill="none"
          >
            {/* Stainless top rim cap */}
            <rect
              x="26"
              y="11"
              width="48"
              height="8"
              rx="2"
              fill="#E2E8F0"
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />
            <ellipse cx="50" cy="11" rx="24" ry="2.5" fill="#CBD5E1" stroke="#1E1E1E" strokeWidth="1" />

            {/* Clear plastic custom sipping lid */}
            <path d="M 32,11 L 32,6 Q 32,3 36,3 L 64,3 Q 68,3 68,6 L 68,11" fill="rgba(255,255,255,0.4)" stroke="#1E1E1E" strokeWidth="0.8" />
            <rect x="42" y="3" width="16" height="3" fill="#D1D5DB" />

            {/* Tapered Tumbler Body */}
            <path
              d="M 26,19 L 32,84 Q 33,88 38,88 L 62,88 Q 67,88 68,84 L 74,19 Z"
              fill={canvasColor}
              stroke="#1E1E1E"
              strokeWidth="1.2"
            />

            {/* Grip rings powder coat texture ridges */}
            <path d="M 30,60 Q 50,62 70,60" fill="none" stroke="#1E1E1E" strokeWidth="0.8" className="opacity-15" />
            <path d="M 31,70 Q 50,72 69,70" fill="none" stroke="#1E1E1E" strokeWidth="0.8" className="opacity-15" />

            {/* Bottom steel base cap */}
            <path
              d="M 32,82 L 32,84 Q 33,88 38,88 L 62,88 Q 67,88 68,84 L 68,82 Z"
              fill="#CBD5E1"
              stroke="#1E1E1E"
              strokeWidth="0.8"
            />
          </svg>

          {/* Overlay centered down the insulated tumbler */}
          <div 
            className={`absolute z-10 flex flex-col items-center ${
              isMini ? 'top-6 w-[35%]' : 'top-[22%] w-[42%] h-[55%]'
            } justify-between text-center pointer-events-none`}
          >
            <div 
              className="flex-1 flex flex-col items-center justify-center transition-transform"
              style={{ transform: `scale(${isMini ? 0.55 : stampScale * 0.95})` }}
            >
              <div className={`${isMini ? 'w-9 h-9' : 'w-16 h-16 md:w-20 md:h-20'}`}>
                {renderStamp()}
              </div>
            </div>

            {mottoText && (
              <p
                className={`mt-1 text-center transition-all ${fontClasses[typographyFont]} ${
                  isMini ? 'text-[7px] max-w-[40px] truncate' : 'text-xs max-w-[100px] line-clamp-2'
                }`}
                style={{ color: stampColor }}
              >
                {mottoText}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
