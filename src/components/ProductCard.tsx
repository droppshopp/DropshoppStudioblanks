import React from 'react';
import { Product } from '../types';
import { Star, Eye, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  // Determine color theme depending on product type to drive visual interest
  const categoryBadgeColors: Record<string, string> = {
    'Drinkware': 'bg-[#4ECDC4] text-black border-black border-2',
    'Apparel': 'bg-[#FF5A5F] text-white border-black border-2',
    'Stationery': 'bg-[#FFE66D] text-black border-black border-2',
    'Accessories': 'bg-black text-white border-black border-2'
  };

  const categoryShadows: Record<string, string> = {
    'Drinkware': 'shadow-neo-teal',
    'Apparel': 'shadow-neo-red',
    'Stationery': 'shadow-neo-yellow',
    'Accessories': 'shadow-neo-black'
  };

  const currentShadow = categoryShadows[product.category] || 'shadow-neo-black';

  return (
    <div
      onClick={() => onSelect(product)}
      className={`bg-white border-4 border-black rounded-[2rem] overflow-hidden ${currentShadow} transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 group flex flex-col justify-between cursor-pointer relative`}
      id={`prod-card-${product.id}`}
    >
      {/* Upper Thumbnail Image Area */}
      <div className="relative pb-[95%] bg-[#F7F7F7] rounded-2xl border-2 border-dashed border-gray-300 m-3 overflow-hidden shrink-0 flex items-center justify-center p-6">
        
        {/* Dynamic labels top left */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
          {product.label && (
            <span className="bg-[#FF5A5F] text-white font-black text-[9px] tracking-widest px-2.5 py-1 rounded border-2 border-black uppercase text-center">
              {product.label}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-black text-[#FFE66D] font-black text-[8px] tracking-wider px-2 py-1 rounded border border-black uppercase flex items-center gap-0.5">
              ★ BESTSELLER
            </span>
          )}
        </div>

        {/* Hover quick spec glance eye icon button shape */}
        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <span className="flex items-center gap-1.5 bg-[#4ECDC4] text-black font-black text-[10px] uppercase px-4 py-2.5 rounded-xl border-2 border-black shadow-neo-small-black tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>Inspect Specs</span>
          </span>
        </div>

        {/* Dynamic Simplified Mockup Representer (SVG) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-stone-50/50">
          {/* We draw a simplified representation of each base print item vector directly in client browser! */}
          {product.imagePreset === 'mug' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#2F4F4F" strokeWidth="1.5" className="w-[60%] h-[60%] transition-transform duration-500 group-hover:scale-105">
              <path d="M 30,30 C 14,30 14,70 30,70" fill="none" strokeWidth="6" />
              <rect x="30" y="24" width="45" height="52" rx="4" fill="#F4EAE1" strokeWidth="2" />
              <ellipse cx="52.5" cy="24" rx="22.5" ry="3" fill="#EEF2F6" strokeWidth="2" />
              {/* Retro Sun stamp print preview */}
              <circle cx="52" cy="50" r="8" fill="#FF7F50" stroke="none" />
              <circle cx="52" cy="50" r="12" stroke="#FF7F50" strokeWidth="1.5" strokeDasharray="2,2" />
            </svg>
          )}

          {product.imagePreset === 'tote' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#CD5C5C" strokeWidth="2" className="w-[52%] h-[52%] transition-transform duration-500 group-hover:scale-105">
              <path d="M 35,40 L 35,16 C 35,10 65,10 65,16 L 65,40" strokeWidth="4" />
              <path d="M 22,38 Q 20,92 24,92 H 76 Q 80,92 78,38 Z" fill="#F5EFE6" strokeWidth="2" />
              {/* Daisy stamp print preview */}
              <circle cx="50" cy="65" r="5" fill="#DA70D6" stroke="none" />
              <circle cx="50" cy="65" r="10" stroke="#FFD700" strokeWidth="1" strokeDasharray="3,1" />
            </svg>
          )}

          {product.imagePreset === 'journal' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#556B2F" strokeWidth="2" className="w-[50%] h-[50%] transition-transform duration-500 group-hover:scale-105">
              <rect x="22" y="14" width="56" height="72" rx="4" fill="#E8EBFC" />
              <rect x="22" y="14" width="6" height="72" fill="#556B2F" className="opacity-45" />
              {/* Lightning stamp print preview */}
              <polygon points="50,28 60,28 45,55 58,55 35,82 46,60 37,60" fill="#DA70D6" stroke="none" />
            </svg>
          )}

          {product.imagePreset === 'tumbler' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#4169E1" strokeWidth="2" className="w-[55%] h-[55%] transition-transform duration-500 group-hover:scale-105">
              <rect x="30" y="15" width="40" height="6" rx="2" fill="#E2E8F0" />
              <path d="M 30,22 L 35,84 Q 36,88 41,88 L 59,88 Q 64,88 65,84 L 70,22 Z" fill="#E3F2FD" />
              {/* Wave vector design inside */}
              <path d="M 35,55 Q 50,42 65,55" stroke="#4169E1" strokeWidth="3" />
            </svg>
          )}

          {product.imagePreset === 'apparel_tee' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#2F4F4F" strokeWidth="1.5" className="w-[62%] h-[62%] transition-transform duration-500 group-hover:scale-105">
              <path d="M 50,11 C 45,11 41,13 38,13 Q 34,7 28,11 L 10,21 Q 8,24 13,32 L 23,28 L 22,42 C 22,78 24,93 30,93 L 70,93 C 76,93 78,78 78,42 L 77,28 L 87,32 Q 92,24 90,21 L 72,11 Q 66,7 62,13 C 59,13 55,11 50,11 Z" fill="#FDF6EC" strokeWidth="2" />
              <circle cx="50" cy="40" r="10" fill="#CD5C5C" opacity="0.8" />
            </svg>
          )}

          {product.imagePreset === 'apparel_hoodie' && (
            <svg viewBox="0 0 100 100" fill="none" stroke="#3D3D3D" strokeWidth="1.5" className="w-[62%] h-[62%] transition-transform duration-500 group-hover:scale-105">
              <path d="M 50,11 C 45,11 41,13 38,13 Q 34,7 28,11 L 10,21 Q 8,24 13,32 L 23,28 L 22,42 C 22,78 24,93 30,93 L 70,93 C 76,93 78,78 78,42 L 77,28 L 87,32 Q 92,24 90,21 L 72,11 Q 66,7 62,13 C 59,13 55,11 50,11 Z" fill="#ECEFF1" strokeWidth="2" />
              {/* Pocket and hood */}
              <path d="M 38,13 Q 50,3 62,13" fill="none" strokeWidth="1.5" />
              <path d="M 35,70 L 40,55 H 60 L 65,70" strokeWidth="1.5" />
              <path d="M 50,36 M 44,42 C 44,45 56,45 50,36" fill="#DA70D6" />
            </svg>
          )}
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t-4 border-black">
        <div>
          {/* Label and Stars alignment */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className={`text-[9px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-sm ${categoryBadgeColors[product.category] || 'bg-stone-50 border-2 border-black text-stone-500'}`}>
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-[#FFFBF0] border-2 border-black px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-[#FFE66D] text-black shrink-0" />
              <span className="text-[10px] font-black text-[#1A1A1A]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-sm font-black text-[#1A1A1A] leading-snug group-hover:text-[#FF5A5F] transition truncate uppercase tracking-tight">
            {product.title}
          </h3>

          <p className="text-[11px] text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing tag list + dynamic color pop-up bubbles */}
        <div className="mt-4 pt-3.5 border-t-2 border-dashed border-stone-200 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-[#1A1A1A]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-[11px] line-through text-stone-400 font-bold">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Canvas Colors Indicators list */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.hex}
                style={{ backgroundColor: col.hex }}
                className="w-3.5 h-3.5 rounded-full border-2 border-black block shadow-xs"
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] font-mono font-black text-black ml-0.5 bg-gray-100 border border-black px-1 rounded-sm">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
