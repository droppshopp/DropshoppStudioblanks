import React, { useState } from 'react';
import { CartItem, Coupon, COUPONS } from '../types';
import { X, Trash2, Tag, Check, Award, ArrowRight, Truck, Gift, ShoppingCart, ShoppingBag } from 'lucide-react';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function BasketDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: BasketDrawerProps) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Item counts and standard math
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const baseSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Bundle discounts rules:
  // 1 item: no discount
  // 2 items: 15% off
  // 3+ items: 25% off + Free Shipping
  let bundleDiscountPercentage = 0;
  let freeShippingThresholdReached = false;

  if (totalItemCount === 2) {
    bundleDiscountPercentage = 15;
  } else if (totalItemCount >= 3) {
    bundleDiscountPercentage = 25;
    freeShippingThresholdReached = true;
  }

  const bundleDiscountAmount = baseSubtotal * (bundleDiscountPercentage / 100);
  const runningSubtotalAfterBundle = baseSubtotal - bundleDiscountAmount;

  // Coupon calculations
  let couponDiscountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.minSpend && runningSubtotalAfterBundle < activeCoupon.minSpend) {
      // Void coupon if minspend not satisfied
      // Don't auto-remove but show in details
    } else {
      couponDiscountAmount = runningSubtotalAfterBundle * (activeCoupon.discountPercentage / 100);
    }
  }

  const shippingCost = freeShippingThresholdReached ? 0 : (baseSubtotal > 0 ? 5.99 : 0);
  const finalTotalFee = runningSubtotalAfterBundle - couponDiscountAmount + shippingCost;

  // Render visual bundle discount progress pointer meter
  const renderBundleMeter = () => {
    if (totalItemCount === 0) return null;

    let progressLabel = '';
    let progressBg = 'bg-stone-200';
    let progressWidth = 'w-12';

    if (totalItemCount === 1) {
      progressLabel = '🔒 Buy 2 items for 15% Off Your Entire Cart!';
      progressWidth = 'w-[33%]';
      progressBg = 'bg-[#FFE66D]';
    } else if (totalItemCount === 2) {
      progressLabel = '🎉 15% Off bundle unlocked! Add 1 more for the ultimate 25% Off + Free Shipping!';
      progressWidth = 'w-[66%]';
      progressBg = 'bg-[#4ECDC4]';
    } else {
      progressLabel = '🚀 ULTIMATE DETONATOR: 25% Off entire cart & Free Shipping Unlocked!';
      progressWidth = 'w-[100%]';
      progressBg = 'bg-[#FF5A5F]';
    }

    return (
      <div className="bg-white border-4 border-black p-4 rounded-[1.5rem] mb-4 text-xs font-black text-black shadow-neo-small-black" id="basket-bundle-meter-widget">
        <div className="flex justify-between items-center mb-1.5">
          <span className="flex items-center gap-1">
            <Gift className="w-5 h-5 text-[#FF5A5F] shrink-0" />
            <span className="text-[11px] leading-none uppercase font-black tracking-widest text-[#1A1A1A]">Bundle Discount Meter</span>
          </span>
          <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded border border-black">Items: {totalItemCount}</span>
        </div>
        
        {/* The visual progress bar */}
        <div className="w-full bg-stone-200 h-4 rounded-full border-2 border-black overflow-hidden mb-2">
          <div className={`h-full ${progressBg} border-r-2 border-black ${progressWidth} transition-all duration-500`} />
        </div>

        <p className="text-[10px] text-stone-700 italic leading-snug">
          {progressLabel}
        </p>
      </div>
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const query = couponInput.trim().toUpperCase();
    if (!query) return;

    const found = COUPONS.find(c => c.code === query);
    if (!found) {
      setCouponError('Invalid coupon code. Try WELCOME15 or BUNDLEUP!');
      return;
    }

    if (found.minSpend && runningSubtotalAfterBundle < found.minSpend) {
      setCouponError(`Min spend of $${found.minSpend} required for ${found.code}`);
      return;
    }

    setActiveCoupon(found);
    setCouponSuccess(`Coupon ${found.code} successfully integrated!`);
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponSuccess('');
    setCouponInput('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      id="basket-drawer-portal"
    >
      <div className="w-full max-w-md bg-[#FFFBF0] h-full shadow-2xl flex flex-col justify-between relative border-l-4 border-black">
        
        {/* Header bar */}
        <div className="p-5 bg-white border-b-4 border-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="text-lg font-black tracking-tighter text-black uppercase">Your Print Basket</span>
            <span className="bg-black text-[#FFE66D] border border-black rounded-full text-xs font-black px-2.5 py-0.5" id="cart-header-count">
              {totalItemCount}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 text-stone-500 hover:text-black rounded-full hover:bg-stone-100 border border-transparent hover:border-black transition cursor-pointer"
            id="btn-close-basket"
            aria-label="Close basket drawer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
         </div>

        {/* Content body space */}
        <div className="flex-1 overflow-y-auto p-4 content-scrollbar space-y-4" id="basket-items-scroller">
          
          {/* Bundle discount meter bar */}
          {renderBundleMeter()}

          {/* Cart list content */}
          {cart.length === 0 ? (
            <div className="text-center py-24 px-4 flex flex-col items-center justify-center bg-white border-4 border-black rounded-[2rem] shadow-neo-small-black m-2">
              <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-black flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-black stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black">Your basket space is currently blank.</h3>
              <p className="text-xs text-stone-600 mt-2 max-w-[250px] mx-auto leading-relaxed">
                Head over to our Curated Products Grid or design a bespoke print directly in our Sandbox Studio!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-[#FFE66D] text-black text-xs font-black uppercase tracking-widest rounded-full border-2 border-black shadow-neo-small-black hover:bg-yellow-300 transition cursor-pointer"
                id="btn-basket-empty-start-shopping"
              >
                Start Designing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                // Determine a background color or decorative box represent item
                return (
                  <div
                    key={item.id}
                    className="bg-white border-4 border-black p-4 rounded-[2rem] flex gap-3 shadow-neo-small-black transition-all group"
                    id={`cart-item-${item.id}`}
                  >
                    {/* Compact dynamic mockup preview */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border-2 border-black overflow-hidden relative shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: item.canvasColor }}
                    >
                      {/* Custom indicator badge for customized prints versus presets */}
                      {item.customDesign ? (
                        <span className="absolute bottom-0 right-0 z-10 bg-[#FFE66D] text-black border-t border-l border-black font-black text-[7px] px-1 py-0.5 tracking-wider uppercase leading-none">
                          STUDIO
                        </span>
                      ) : (
                        <span className="absolute bottom-0 right-0 z-10 bg-black text-white border-t border-l border-black font-black text-[7px] px-1 py-0.5 tracking-wider uppercase leading-none">
                          PRESET
                        </span>
                      )}

                      {/* Micro-drawing visual indicator */}
                      <div className="w-10 h-10 transform scale-110 pointer-events-none opacity-90">
                        {item.stampType === 'Retro Sun' && (
                          <svg viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="6" className="w-full h-full text-white">
                            <circle cx="50" cy="50" r="18" fill="#FFFFFF" />
                            <line x1="50" y1="10" x2="50" y2="25" />
                            <line x1="50" y1="75" x2="50" y2="90" />
                            <line x1="10" y1="50" x2="25" y2="50" />
                            <line x1="75" y1="50" x2="90" y2="50" />
                          </svg>
                        )}
                        {item.stampType === 'Lightning Zap' && (
                          <svg viewBox="0 0 100 100" fill="#FFFFFF" className="w-full h-full text-white">
                            <polygon points="45,8 65,8 40,46 62,46 25,92 42,54 28,54" />
                          </svg>
                        )}
                        {item.stampType === 'Daisy Bloom' && (
                          <svg viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="8" className="w-full h-full text-white">
                            <circle cx="50" cy="50" r="12" fill="#FFA502" />
                            <circle cx="50" cy="22" r="10" fill="#FFFFFF" />
                            <circle cx="50" cy="78" r="10" fill="#FFFFFF" />
                            <circle cx="22" cy="50" r="10" fill="#FFFFFF" />
                            <circle cx="78" cy="50" r="10" fill="#FFFFFF" />
                          </svg>
                        )}
                        {item.stampType === 'Heart' && (
                          <svg viewBox="0 0 100 100" fill="#FFFFFF" className="w-full h-full text-white">
                            <path d="M 50,30 C 50,30 40,14 24,24 C 8,34 16,66 50,86 C 84,66 92,34 76,24 C 60,14 50,30 50,30 Z" />
                          </svg>
                        )}
                        {item.stampType === 'Ocean Wave' && (
                          <svg viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="6" className="w-full h-full text-white">
                            <circle cx="50" cy="50" r="42" strokeWidth="6" />
                            <path d="M 12,65 Q 25,40 45,55 Q 60,70 75,50" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-black text-black tracking-tight leading-tight uppercase truncate">
                          {item.title}
                        </h4>
                        
                        {/* Remove trash button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 -mt-1 -mr-1 text-stone-400 hover:text-red-500 hover:bg-rose-50 border border-transparent hover:border-black rounded-lg transition cursor-pointer"
                          id={`btn-remove-item-${item.id}`}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-tight mt-0.5 truncate">
                        {item.subtitle}
                      </p>

                      {/* Display custom mottos clearly inside basket list! */}
                      {item.mottoText && (
                        <p className="text-[9px] font-mono bg-[#FFFBF0] text-black border border-black font-black px-1.5 py-0.5 rounded inline-block mt-2 uppercase shadow-[1px_1px_rgba(0,0,0,1)]">
                          Motto: &ldquo;{item.mottoText}&rdquo;
                        </p>
                      )}

                      {/* Quantity & item cost controller */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border-2 border-black rounded-lg overflow-hidden bg-white shadow-[1px_1px_rgba(0,0,0,1)]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-black hover:bg-[#FFE66D] border-r-2 border-black font-black text-xs cursor-pointer"
                            id={`btn-cart-dec-${item.id}`}
                          >
                            -
                          </button>
                          <span className="px-2.5 text-black text-xs font-mono font-black">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-black hover:bg-[#FFE66D] border-l-2 border-black font-black text-xs cursor-pointer"
                            id={`btn-cart-inc-${item.id}`}
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-black text-black font-mono bg-stone-100 border border-black px-2 py-0.5 rounded">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pricing Summary, coupons + final action footer */}
        <div className="bg-white border-t-4 border-black p-4 shrink-0 shadow-lg mt-auto" id="basket-price-summary-portal">
          {cart.length > 0 && (
            <>
              {/* Coupon form system */}
              <form onSubmit={handleApplyCoupon} className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#FFFBF0] border-2 border-black rounded-xl pl-9 pr-2.5 py-2.5 text-[10px] font-mono font-bold tracking-wider placeholder-zinc-400 focus:outline-none focus:ring-0 focus:border-[#FF5A5F] uppercase"
                      id="input-coupon-code"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#4ECDC4] border-2 border-black text-black hover:bg-opacity-90 text-[10px] font-extrabold uppercase px-4 rounded-xl transition cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                    id="btn-apply-coupon"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-[10px] text-[#FF5A5F] font-semibold mt-1.5 pl-1">
                    &times; {couponError}
                  </p>
                )}

                {couponSuccess && (
                  <p className="text-[10px] text-emerald-600 font-bold mt-1.5 pl-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{couponSuccess}</span>
                  </p>
                )}

                {/* Offer a clickable helpful link for WELCOME15 shortcut */}
                {!activeCoupon && (
                  <div className="mt-2 text-[10px] text-stone-500 flex justify-between items-center bg-[#FFFBF0] px-2 py-1.5 rounded-lg border-2 border-dashed border-black">
                    <span>Psst! Try code: <strong className="font-mono text-neutral-800 text-[11px]">WELCOME15</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('WELCOME15');
                        setActiveCoupon(COUPONS[0]);
                        setCouponSuccess('Coupon WELCOME15 applied! 15% Off unlocked.');
                      }}
                      className="text-[9px] text-[#FF5A5F] hover:underline font-extrabold uppercase"
                    >
                      Auto-apply
                    </button>
                  </div>
                )}
              </form>

              {/* Price calculations details list */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t-2 border-dashed border-black pt-3.5">
                <div className="flex justify-between">
                  <span>Product Subtotal:</span>
                  <span className="font-mono">${baseSubtotal.toFixed(2)}</span>
                </div>

                {/* Bundle Discount details show */}
                {bundleDiscountPercentage > 0 && (
                  <div className="flex justify-between text-[#FF5A5F] font-bold">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{bundleDiscountPercentage}% Bundle discount:</span>
                    </span>
                    <span className="font-mono">-${bundleDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Active Coupon details split */}
                {activeCoupon && (
                  <div className="flex justify-between text-yellow-700 font-bold bg-[#FFE66D] px-2.5 py-1 rounded-lg border-2 border-black">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 fill-amber-200 text-amber-700 shrink-0" />
                      <span>Coupon ({activeCoupon.code}):</span>
                    </span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span>-${couponDiscountAmount.toFixed(2)}</span>
                      <button
                        onClick={removeCoupon}
                        className="text-[10px] underline text-red-500 hover:text-red-700 ml-1 cursor-pointer font-sans"
                        title="Remove coupon discount"
                      >
                        [Delete]
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Eco-conscious POD Shipping:</span>
                  <span className="font-mono">
                    {freeShippingThresholdReached ? (
                      <strong className="text-emerald-600 uppercase text-[10px] font-bold">FREE SHIPPING</strong>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-neutral-800 font-black pt-2 border-t-2 border-black">
                  <span>Outstanding Total:</span>
                  <span className="font-mono text-base">${finalTotalFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout Action */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    alert(`🔐 Checkout Activated for $${finalTotalFee.toFixed(2)}!\n\nThank you for choosing DropshoppStudio. In the production app, this launches our payment gateway to print & ship your custom items.`);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#4ECDC4] text-black border-4 border-black font-extrabold text-xs tracking-wider uppercase py-4 rounded-2xl shadow-neo-small-black transition transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 cursor-pointer"
                  id="btn-basket-checkout"
                >
                  <span>Proceed to Safe SECURE Checkout</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <p className="text-[9.5px] font-mono text-zinc-400 text-center uppercase tracking-wider mt-2.5">
                  🛡️ 256-bit SSL encrypted connection verified
                </p>
              </div>
            </>
          )}

          {cart.length > 0 && (
            <div className="mt-2.5 text-center">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to completely clear your design basket?')) {
                    onClearCart();
                  }
                }}
                className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold uppercase hover:underline cursor-pointer"
                id="btn-clear-basket"
              >
                Clear Entire Basket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
