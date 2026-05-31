import React, { useState, useEffect } from 'react';
import { CustomDesign, CartItem } from '../types';
import ProductMockup from './ProductMockup';
import { Sparkles, Palette, HelpCircle, Check, ShoppingBag, Sliders, Type, Flame } from 'lucide-react';

interface StudioLabProps {
  onAddToBasket: (item: Omit<CartItem, 'id'>) => void;
}

const PRODUCTS_PRESETS = [
  { type: 'Apparel' as const, basePrice: 28.00, title: 'Premium Everyday Tee', desc: 'Pre-shrunk ringspun heavy cotton, soft modern vintage wash surface.' },
  { type: 'Mug' as const, basePrice: 18.00, title: 'Colorista Ceramic Mug', desc: '15oz glossy lead-free ceramic with comfort-grip pop color handle.' },
  { type: 'Journal' as const, basePrice: 15.00, title: 'A5 Grid Hardcover Journal', desc: '120GSM bleed-free dot grid pages with layflat thread bound spine.' },
  { type: 'Tote' as const, basePrice: 21.00, title: 'Heavy Cotton Canvas Tote', desc: '12oz high-density organic canvas featuring reinforced cross-stitch.' },
  { type: 'Tumbler' as const, basePrice: 29.00, title: 'Insulated Splash Tumbler', desc: '20oz double-wall stainless steel vacuum insulated shell.' }
];

const PRESET_CANVAS_COLORS = [
  { name: 'Peach Coral', hex: '#FF7F50' },
  { name: 'Sunny Yellow', hex: '#FFD700' },
  { name: 'Lilac Orchid', hex: '#DA70D6' },
  { name: 'Soft Teal', hex: '#20B2AA' },
  { name: 'Retro Cream', hex: '#FFFDD0' },
  { name: 'Deep Sage', hex: '#8FBC8F' },
  { name: 'Midnight Charcoal', hex: '#2F4F4F' },
  { name: 'White Linen', hex: '#FDFBF7' }
];

const PRESET_STAMP_COLORS = [
  { name: 'Snow Cream', hex: '#FFFFFF' },
  { name: 'Midnight Onyx', hex: '#1E1E1E' },
  { name: 'Gold Dust', hex: '#FFA502' },
  { name: 'Retro Orange', hex: '#FF6B6B' },
  { name: 'Electric Lilac', hex: '#A55EEA' },
  { name: 'Fresh Mint', hex: '#20BF6B' }
];

const STAMPS = ['Retro Sun', 'Lightning Zap', 'Daisy Bloom', 'Heart', 'Ocean Wave'] as const;

const FONTS = ['Space Grotesk', 'Playfair', 'Outfit', 'JetBrains Mono'] as const;

const PRESET_MOTTOES = [
  'MIND VIBES',
  'SLOW LIVING',
  'CREATE TODAY',
  'COFFEE FIRST',
  'STAY WILD',
  'BUILD ON!'
];

export default function StudioLab({ onAddToBasket }: StudioLabProps) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_PRESETS[0]);
  const [canvasColor, setCanvasColor] = useState(PRESET_CANVAS_COLORS[0].hex);
  const [stampType, setStampType] = useState<typeof STAMPS[number]>('Retro Sun');
  const [mottoText, setMottoText] = useState('MIND VIBES');
  const [typographyFont, setTypographyFont] = useState<typeof FONTS[number]>('Space Grotesk');
  const [stampScale, setStampScale] = useState(1.0);
  const [stampColor, setStampColor] = useState('#FFFFFF');
  const [placement, setPlacement] = useState<'top' | 'center' | 'bottom'>('center');
  const [successNotice, setSuccessNotice] = useState(false);

  // Auto pricing calculation
  const printFee = stampScale > 1.1 ? 3.50 : 2.50; // Dynamic print pricing!
  const totalCost = selectedProduct.basePrice + printFee;

  // Sync color canvas choice with product presets if they click one
  const handleProductTypeChange = (type: string) => {
    const preset = PRODUCTS_PRESETS.find(p => p.type === type);
    if (preset) {
      setSelectedProduct(preset);
    }
  };

  const handleAddCustom = () => {
    const design: CustomDesign = {
      productType: selectedProduct.type,
      canvasColor,
      stampType,
      mottoText: mottoText.toUpperCase(),
      typographyFont,
      fontSize: 14,
      stampScale,
      stampColor,
      placement
    };

    onAddToBasket({
      title: `Custom ${selectedProduct.title}`,
      subtitle: `Sticker: ${stampType} / Font: ${typographyFont}`,
      productType: selectedProduct.type,
      price: totalCost,
      quantity: 1,
      canvasColor,
      stampType,
      mottoText: mottoText.toUpperCase(),
      customDesign: design
    });

    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
    }, 1500);
  };

  return (
    <section 
      className="bg-[#FFFBF0] border-4 border-black rounded-[2rem] p-6 md:p-8 shadow-neo-teal"
      id="custom-studio-lab-container"
    >
      {/* Upper header block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] bg-black text-white px-2.5 py-1 rounded font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-black">
            <Sparkles className="w-3 h-3 text-[#FFE66D] fill-[#FFE66D] animate-spin-slow" /> Custom Studio Lab 2.0
          </span>
          <h2 className="text-3xl font-black italic text-[#1A1A1A] tracking-tighter mt-2">
            Live PRINT Sandbox
          </h2>
          <p className="text-sm font-bold text-stone-600 mt-1">
            Toggle canvas types, customize dynamic art stamps, adjust sizes, and lock your bespoke order.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFE66D] border-2 border-black text-black px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 self-start md:self-auto shadow-neo-small-black">
          <Flame className="w-4 h-4 text-[#FF5A5F] fill-current" />
          <span>Automatic Bundle Tier Applied!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: THE DETAILED PHYSICAL MOCK-UP */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
          <div className="bg-white border-4 border-black rounded-[2rem] overflow-hidden p-6 shadow-neo-black relative h-full flex flex-col justify-center">
            
            {/* Direct interactive preview */}
            <ProductMockup
              design={{
                productType: selectedProduct.type,
                canvasColor,
                stampType,
                mottoText: mottoText.toUpperCase(),
                typographyFont,
                fontSize: 14,
                stampScale,
                stampColor,
                placement
              }}
              className="bg-[#F7F7F7] border-2 border-dashed border-gray-300 rounded-2xl p-4"
            />
            
            {/* Visual indicator card showing live modifications */}
            <div className="mt-4 bg-[#FF5A5F] text-white border-2 border-black p-3 rounded-xl flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span className="font-mono">Live Render: Active</span>
              </div>
              <span className="font-mono">
                {selectedProduct.type} &bull; {stampType}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS PORTAL */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6">
          {/* STEP 1: CHOOSE TARGET CANVAS TYPE */}
          <div>
            <h3 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-black">1</span>
              SELECT BLANK CANVAS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRODUCTS_PRESETS.map((p) => {
                const isSelected = selectedProduct.type === p.type;
                return (
                  <button
                    key={p.type}
                    onClick={() => handleProductTypeChange(p.type)}
                    className={`flex flex-col items-center justify-center py-3 px-1.5 rounded-xl border-2 border-black text-center transition-all cursor-pointer select-none active:translate-y-0.5 ${
                      isSelected
                        ? 'bg-[#FF5A5F] text-white shadow-neo-small-black font-black scale-[1.02]'
                        : 'bg-white text-black font-bold hover:bg-[#FFE66D]'
                    }`}
                    id={`sandbox-preset-${p.type.toLowerCase()}`}
                  >
                    <span className="text-xs font-black leading-tight uppercase">{p.type}</span>
                    <span className="text-[10px] font-mono opacity-95 mt-1 font-bold">${p.basePrice.toFixed(0)} Base</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-bold text-stone-500 mt-2 italic leading-snug">
              {selectedProduct.title}: {selectedProduct.desc}
            </p>
          </div>

          {/* STEP 2: STAMP DESIGNER ELEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color Canvas */}
            <div>
              <h3 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-black">2</span>
                CANVAS SHADE COLOR
              </h3>
              <div className="flex flex-wrap gap-2 bg-white p-3 border-2 border-black rounded-2xl shadow-neo-small-black">
                {PRESET_CANVAS_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setCanvasColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 border-black cursor-pointer relative hover:scale-110 active:scale-95 transition ${
                      canvasColor === c.hex ? 'ring-2 ring-offset-2 ring-black font-bold scale-105 shadow-sm' : ''
                    }`}
                    title={c.name}
                    id={`sandbox-color-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {canvasColor === c.hex && (
                      <Check className={`w-4 h-4 mx-auto stroke-[3] ${c.name === 'White Linen' || c.name === 'Retro Cream' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ART STAMP TYPE */}
            <div>
              <h3 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-black">3</span>
                DESIGNER ART STAMP
              </h3>
              <select
                value={stampType}
                onChange={(e) => setStampType(e.target.value as typeof STAMPS[number])}
                className="w-full bg-white border-2 border-black rounded-xl px-3 py-3 text-xs font-black uppercase tracking-wider text-black focus:outline-none focus:ring-0 focus:border-[#FF5A5F] shadow-neo-small-black cursor-pointer"
                id="sandbox-stamp-select"
              >
                {STAMPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 4: CUSTOM MOTTO & TYPOGRAPHY FONT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-black">4</span>
                CUSTOM MOTTO TEXT
              </h3>
              <div className="relative">
                <input
                  type="text"
                  maxLength={18}
                  placeholder="e.g. SLOW JOURNAL"
                  value={mottoText}
                  onChange={(e) => setMottoText(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl px-3 py-3 text-xs font-black uppercase tracking-wider text-black focus:outline-none focus:ring-0 focus:border-[#FF5A5F] shadow-neo-small-black"
                  id="sandbox-motto-input"
                />
                <span className="absolute right-3.5 top-3.5 text-[8.5px] font-mono font-black text-stone-400 uppercase">
                  {mottoText.length}/18 Chars
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {PRESET_MOTTOES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMottoText(m)}
                    className="text-[9px] font-mono bg-white border border-black hover:bg-[#FFE66D] text-black font-black px-2 py-0.5 rounded transition cursor-pointer uppercase shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                    type="button"
                    title={`Apply motto preset: ${m}`}
                  >
                    +{m}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography fonts */}
            <div>
              <h3 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-black">5</span>
                TYPOGRAPHY FONT STYLE
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((font) => {
                  const isSelected = typographyFont === font;
                  return (
                    <button
                      key={font}
                      onClick={() => setTypographyFont(font)}
                      className={`py-3 px-1.5 border-2 border-black text-[10px] rounded-xl text-center font-black uppercase tracking-wide cursor-pointer transition select-none active:translate-y-0.5 ${
                        isSelected
                          ? 'bg-[#FFE66D] text-black shadow-neo-small-black'
                          : 'bg-white text-black hover:bg-[#4ECDC4]'
                      }`}
                      id={`sandbox-font-${font.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {font}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 5: DETAIL SLIDERS & STAMP COLORING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border-2 border-black">
            {/* Scale adjustments */}
            <div>
              <h3 className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 px-1">
                STAMP SIZING SCALE ({Math.round(stampScale * 100)}%)
              </h3>
              <input
                type="range"
                min="0.80"
                max="1.20"
                step="0.05"
                value={stampScale}
                onChange={(e) => setStampScale(parseFloat(e.target.value))}
                className="w-full accent-[#FF5A5F] cursor-pointer h-2 bg-stone-200 rounded-lg outline-none"
                id="sandbox-scale-slider"
              />
              <div className="flex justify-between text-[8px] font-mono font-black text-stone-400 px-1 mt-1.5">
                <span>Compact (80%)</span>
                <span>Standard</span>
                <span>Blowout (120%)</span>
              </div>
            </div>

            {/* Ink Stamp Color selection */}
            <div>
              <h3 className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 px-1">
                INK STAMP ACCENT COLOR
              </h3>
              <div className="flex gap-2">
                {PRESET_STAMP_COLORS.map((st) => (
                  <button
                    key={st.hex}
                    onClick={() => setStampColor(st.hex)}
                    style={{ backgroundColor: st.hex }}
                    className={`w-7 h-7 rounded-md border-2 border-black cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                      stampColor === st.hex ? 'ring-2 ring-offset-2 ring-black scale-105' : ''
                    }`}
                    title={st.name}
                    id={`sandbox-stamp-color-${st.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t-2 border-dashed border-stone-200 max-w-full">
            {/* PRICING BLOCK */}
            <div className="flex items-center gap-4 bg-[#FFE66D] px-5 py-3.5 rounded-2xl border-2 border-black w-full sm:w-auto shrink-0 justify-between sm:justify-start shadow-neo-small-black font-black">
              <div>
                <span className="text-[9px] font-mono uppercase text-black tracking-widest block leading-none">
                  Calculated Price
                </span>
                <span className="text-2xl font-black text-[#1A1A1A] inline-block mt-1">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
              <div className="text-[9px] text-stone-800 font-mono text-right sm:text-left leading-tight border-l-2 pl-3 border-black">
                <span>Blank Base: ${selectedProduct.basePrice.toFixed(2)}</span>
                <br />
                <span>Ink Plate: ${printFee.toFixed(2)}</span>
              </div>
            </div>

            {/* ACTION */}
            <button
              onClick={handleAddCustom}
              className="w-full select-none flex-1 flex items-center justify-center gap-2 bg-[#FF5A5F] border-2 border-black text-white hover:bg-[#ff4349] font-black text-sm py-4.5 px-6 rounded-full shadow-neo-small-black hover:-translate-x-0.5 hover:-translate-y-0.5 transition active:translate-x-0 active:translate-y-0 cursor-pointer uppercase tracking-wider"
              id="sandbox-add-custom-tobasket"
            >
              {successNotice ? (
                <>
                  <Check className="w-5 h-5 text-white stroke-[4]" />
                  <span>Custom Item Sent to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span>Lock Design & Add Base Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
