import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { X, Star, Check, ShieldCheck, Truck, RefreshCw, ShoppingCart } from 'lucide-react';
import ProductMockup from './ProductMockup';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToBasket: (item: Omit<CartItem, 'id'>) => void;
}

export default function ProductModal({ product, onClose, onAddToBasket }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAdd = () => {
    // Map product category to mockup productType
    let podType: 'Apparel' | 'Mug' | 'Journal' | 'Tote' | 'Tumbler' = 'Mug';
    if (product.imagePreset === 'mug') podType = 'Mug';
    else if (product.imagePreset === 'tote') podType = 'Tote';
    else if (product.imagePreset === 'journal') podType = 'Journal';
    else if (product.imagePreset === 'tumbler') podType = 'Tumbler';
    else if (product.imagePreset.startsWith('apparel')) podType = 'Apparel';

    // Set a matching sticker/stamp style for standard items
    const stampTypes: Record<string, 'Retro Sun' | 'Lightning Zap' | 'Daisy Bloom' | 'Heart' | 'Ocean Wave'> = {
      'mug': 'Retro Sun',
      'tote': 'Daisy Bloom',
      'journal': 'Lightning Zap',
      'tumbler': 'Ocean Wave',
      'apparel_tee': 'Retro Sun',
      'apparel_hoodie': 'Heart'
    };

    const mottoTexts: Record<string, string> = {
      'mug': 'COFFEE FIRST',
      'tote': 'SLOW LIVING',
      'journal': 'CREATE TODAY',
      'tumbler': 'HYDRATE',
      'apparel_tee': 'MIND VIBES',
      'apparel_hoodie': 'LOVED'
    };

    const defaults = {
      productType: podType,
      canvasColor: selectedColor.hex,
      stampType: stampTypes[product.imagePreset] || 'Retro Sun',
      mottoText: mottoTexts[product.imagePreset] || 'SUNSHINE',
      typographyFont: 'Space Grotesk' as const,
      fontSize: 14,
      stampScale: 1.0,
      stampColor: '#FFFFFF',
      placement: 'center' as const
    };

    onAddToBasket({
      productId: product.id,
      title: product.title,
      subtitle: `Color: ${selectedColor.name}`,
      productType: product.category,
      price: product.price,
      quantity: quantity,
      canvasColor: selectedColor.hex,
      stampType: defaults.stampType,
      mottoText: defaults.mottoText,
      customDesign: defaults
    });

    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all"
      id={`modal-${product.id}`}
    >
      <div className="relative bg-[#FFFBF0] rounded-[2.5rem] max-w-4xl w-full border-4 border-black overflow-hidden shadow-neo-teal flex flex-col md:flex-row my-8 max-h-[90vh] md:max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#FFE66D] text-black border-2 border-black rounded-full p-2 hover:bg-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer"
          id="btn-close-modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Left Side: Large Mockup Frame */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-[#FFFBF0] border-b-4 md:border-b-0 md:border-r-4 border-black">
          <div className="relative w-full max-w-sm rounded-[2rem] border-4 border-black overflow-hidden shadow-neo-small-black bg-stone-50">
            {/* Visual Label Tag */}
            {product.label && (
              <span className="absolute top-3 left-3 z-[15] bg-[#FF5A5F] text-black font-black border-2 border-black text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                {product.label}
              </span>
            )}
            
            {/* Live-rendering mock matching color selection! */}
            <ProductMockup
              design={{
                productType: (product.imagePreset === 'mug' ? 'Mug' :
                             product.imagePreset === 'tote' ? 'Tote' :
                             product.imagePreset === 'journal' ? 'Journal' :
                             product.imagePreset === 'tumbler' ? 'Tumbler' : 'Apparel'),
                canvasColor: selectedColor.hex,
                stampType: (product.imagePreset === 'mug' ? 'Retro Sun' :
                             product.imagePreset === 'tote' ? 'Daisy Bloom' :
                             product.imagePreset === 'journal' ? 'Lightning Zap' :
                             product.imagePreset === 'tumbler' ? 'Ocean Wave' :
                             product.imagePreset === 'apparel_tee' ? 'Retro Sun' : 'Heart'),
                mottoText: (product.imagePreset === 'mug' ? 'COFFEE FIRST' :
                             product.imagePreset === 'tote' ? 'SLOW LIVING' :
                             product.imagePreset === 'journal' ? 'CREATE TODAY' :
                             product.imagePreset === 'tumbler' ? 'HYDRATE' :
                             product.imagePreset === 'apparel_tee' ? 'MIND VIBES' : 'LOVED'),
                typographyFont: 'Space Grotesk',
                fontSize: 14,
                stampScale: 1.0,
                stampColor: '#FFFFFF',
                placement: 'center'
              }}
              className="bg-transparent"
            />
          </div>

          <p className="mt-3 text-[11px] font-mono text-zinc-500 font-bold text-center uppercase tracking-widest">
            Mockup renders live &bull; 100% custom colors
          </p>
        </div>

        {/* Right Side: Specifications details */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between" id="modal-specifications-container">
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-mono uppercase bg-[#FFE66D] text-black border border-black font-black px-2 py-0.5 rounded shadow-[1px_1px_rgba(0,0,0,1)]">
                Category: {product.category}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black leading-none mb-2 uppercase">
              {product.title}
            </h2>

            {/* Stars Rating */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-neutral-200'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-black text-black">{product.rating}</span>
              <span className="text-xs text-neutral-500 font-bold">({product.reviewsCount} reviews)</span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2.5 mb-5 bg-[#FFE66D] p-3 rounded-2xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <span className="text-3xl font-black text-black">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm line-through text-stone-600 font-bold">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="ml-auto text-[10px] font-mono text-black bg-white px-2 py-0.5 border border-black rounded font-black uppercase">
                Active Promo
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-700 font-bold leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Choose Canvas Color */}
            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase text-stone-500 font-bold tracking-wider mb-2">
                Choose Canvas Color: <span className="text-black font-black bg-white border border-black px-1.5 py-0.5 rounded">{selectedColor.name}</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.hex === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-full border-2 border-black transition-all hover:scale-110 active:scale-95 flex items-center justify-center relative cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] ${
                        isSelected ? 'ring-2 ring-black scale-105' : ''
                      }`}
                      title={color.name}
                      id={`btn-color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {isSelected && (
                        <Check 
                          className={`w-4 h-4 stroke-[3.5] ${
                            color.hex === '#FFFFFF' || color.hex === '#FDFBF7' || color.hex === '#FFFDD0' || color.hex === '#AFEEEE'
                              ? 'text-black' 
                              : 'text-white'
                          }`} 
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specs Bullet Points */}
            <div className="mb-6 space-y-2">
              <h4 className="text-xs font-mono uppercase text-stone-500 font-bold tracking-wider mb-2">
                Material Specifications
              </h4>
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#1A1A1A] font-bold">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4] border border-black shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Zone */}
          <div className="pt-4 border-t-2 border-black">
            <div className="flex items-center gap-4 mb-4">
              {/* Quantity Select */}
              <div className="flex items-center border-2 border-black rounded-xl bg-white overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-black hover:bg-[#FFE66D] border-r-2 border-black font-black transition cursor-pointer"
                  id="btn-qty-dec"
                >
                  -
                </button>
                <span className="px-3 font-mono font-black text-black text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-black hover:bg-[#FFE66D] border-l-2 border-black font-black transition cursor-pointer"
                  id="btn-qty-inc"
                >
                  +
                </button>
              </div>

              {/* Add to Basket button */}
              <button
                onClick={handleAdd}
                className="flex-1 select-none flex items-center justify-center gap-2 bg-[#FF5A5F] text-black border-4 border-black font-black text-xs md:text-sm py-3.5 px-6 rounded-full shadow-neo-small-black uppercase tracking-wider transition-all cursor-pointer transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                id="btn-modal-add-tobasket"
              >
                {addedMessage ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFFBF0] stroke-[4]" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 stroke-[3]" />
                    <span>Add to Basket &bull; ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Micro-Badges */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-[#1A1A1A] font-black uppercase tracking-tight py-2 bg-white border-2 border-black rounded-xl shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-center">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center justify-center gap-1 border-x-2 border-black px-1">
                <Truck className="w-3.5 h-3.5 text-black shrink-0" />
                <span>USA POD</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
