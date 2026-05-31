/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CURATED_PRODUCTS,
  Product,
  CartItem,
  TESTIMONIALS,
} from './types';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import StudioLab from './components/StudioLab';
import BasketDrawer from './components/BasketDrawer';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Palette,
  CheckCircle,
  Mail,
  Zap,
  BookOpen,
  ArrowRight,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';

export default function App() {
  // --- STATE SYSTEM ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  
  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [promoUnlockedCode, setPromoUnlockedCode] = useState('');

  // --- LOCAL PERSISTENCE ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dropshopp_basket_v2');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    try {
      localStorage.setItem('dropshopp_basket_v2', JSON.stringify(updatedCart));
    } catch (e) {
      console.warn('LocalStorage error saving:', e);
    }
  };

  // --- CART MUTATIONS ---
  const handleAddToBasket = (newItem: Omit<CartItem, 'id'>) => {
    // Check if matching combination exists
    const matchIndex = cart.findIndex((item) => {
      const canvasMatch = item.canvasColor === newItem.canvasColor;
      const titleMatch = item.title === newItem.title;
      const subtitleMatch = item.subtitle === newItem.subtitle;
      const mMatch = item.mottoText === newItem.mottoText;
      return canvasMatch && titleMatch && subtitleMatch && mMatch;
    });

    let updated: CartItem[];
    if (matchIndex > -1) {
      updated = [...cart];
      updated[matchIndex].quantity += newItem.quantity;
    } else {
      const idStr = `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      updated = [...cart, { ...newItem, id: idStr }];
    }

    setCart(updated);
    saveCartToStorage(updated);
    setIsBasketOpen(true); // Auto drawer reveal when item added for exceptional UX feel
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item));
    setCart(updated);
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  // Filter products by active custom tab selection
  const filteredProducts = activeCategory === 'All'
    ? CURATED_PRODUCTS
    : CURATED_PRODUCTS.filter(p => p.category === activeCategory);

  // Handle Newsletter Join
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setNewsletterSubscribed(true);
    setPromoUnlockedCode('WELCOME15');
    // Save to storage indicator
    localStorage.setItem('dropshopp_unlocked_welcome15', 'true');
  };

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans antialiased relative">
      
      {/* 1. ANNOUNCEMENT RIBBON BANNER */}
      <div className="bg-neutral-900 text-amber-50 text-[11px] font-mono uppercase tracking-widest text-center py-2 px-4 shadow-sm flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-orange-400" />
          <span>Super Fast Printing</span>
        </span>
        <span className="opacity-40 select-none">|</span>
        <span>🔥 Buy any 2 get 15% Off entire cart &bull; Buy 3+ items save 25% + FREE Shipping!</span>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100/40 shadow-xs px-4 md:px-8 py-4.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with Dynamic Style Accents */}
          <div 
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-2xl bg-neutral-950 flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 shadow-md">
              <Palette className="w-5.5 h-5.5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black text-neutral-800 tracking-tight leading-none block">
                Dropshopp<span className="text-orange-500 font-extrabold">Studio</span>
              </span>
              <span className="text-[9.5px] font-mono tracking-widest text-[#20B2AA] font-bold block uppercase mt-0.5">
                Vibrant Print Sandbox
              </span>
            </div>
          </div>

          {/* Nav quicklinks */}
          <div className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-stone-600">
            <a href="#curated-collection" className="hover:text-orange-500 transition">Blanks Collection</a>
            <a href="#sandbox-portal" className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-sm border border-indigo-100">
              <Sparkles className="w-3 h-3 text-red-500 fill-current" />
              <span>Studio Sandbox</span>
            </a>
            <a href="#about-shipping" className="hover:text-orange-500 transition">Our Fabric Pledge</a>
            <a href="#customer-love" className="hover:text-orange-500 transition">Testimonials</a>
          </div>

          {/* Cart triggers with Pop Counts */}
          <button
            onClick={() => setIsBasketOpen(true)}
            className="select-none flex items-center gap-2.5 bg-neutral-900 text-amber-50 hover:bg-neutral-800 py-2.5 px-5 rounded-2xl transition shadow-md active:scale-95 cursor-pointer"
            id="nav-btn-view-basket"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-amber-300 fill-neutral-900 group-hover:scale-110" />
            <span className="hidden sm:inline text-xs font-black tracking-wider uppercase">Bag</span>
            <span className="bg-orange-500 text-white font-extrabold text-[10.5px] px-2 py-0.5 rounded-full inline-block scale-105" id="nav-cart-badge">
              {totalItemCount}
            </span>
          </button>
        </div>
      </nav>

      {/* 3. HERO SHOWCASE SPACE */}
      <header className="relative bg-linear-to-b from-orange-50/70 to-[#FBF9F5] pt-12 pb-16 px-4" id="home-interior-hero">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 bg-white border border-orange-100 px-3 py-1.5 rounded-3xl shadow-xs text-[10px] font-mono uppercase text-stone-600 font-bold mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse block" />
            <span>2026 Vibrant Palette Launch Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-neutral-800 tracking-tight leading-[1.08] mb-6">
            Bespoke <span className="text-orange-500 italic decoration-orange-300 decoration-wavy underline">Print-on-Demand</span>,
            <br />
            Configured Right Live.
          </h1>

          <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            Explore premium ring-spun apparel, heavy cotton totes, lay-flat hardcover notebooks, and travel-insulated mugs. Tap custom color canvas, add stamps instantly, and see dynamic prices update before your eyes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#sandbox-portal"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 text-amber-50 hover:bg-neutral-800 font-extrabold text-xs tracking-wider uppercase py-4 px-8 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Launch Studio Lab Sandbox</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </a>

            <a
              href="#curated-collection"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-stone-800 border border-stone-200 hover:bg-stone-50 font-extrabold text-xs tracking-wider uppercase py-4 px-8 rounded-2xl shadow-sm transition"
            >
              <span>Explore Curated Blanks</span>
            </a>
          </div>

          {/* Quick micro trust features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-14 pt-8 border-t border-orange-150/55 text-left">
            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-[#20B2AA] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-neutral-800 uppercase">Compliant Stencils</h4>
                <p className="text-[10.5px] text-zinc-500 mt-0.5 leading-tight">No home decor wood / art canvasses. Only premium apparel, drinkware & bag gear.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-neutral-800 uppercase">Interactive Studio</h4>
                <p className="text-[10.5px] text-zinc-500 mt-0.5 leading-tight">Pick Retro Sun, Lightning, Daisy or Wave and watch it draw dynamically in real-time.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-neutral-800 uppercase">Tier Discounts</h4>
                <p className="text-[10.5px] text-zinc-500 mt-0.5 leading-tight">Buy 2 items for 15% discount; Buy 3+ items for 25% discount and free shipping.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-neutral-800 uppercase">Eco-Conscious</h4>
                <p className="text-[10.5px] text-zinc-500 mt-0.5 leading-tight">Produced only when ordered. Zero bulk toxic wastewater footprint.</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 4. MAIN CURATED BLANKS GRID SECTION */}
      <section className="py-16 px-4 md:px-8 border-t border-orange-100/30 bg-white" id="curated-collection">
        <div className="max-w-7xl mx-auto">
          
          {/* Section title header area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase bg-orange-100 text-orange-850 px-2.5 py-1 rounded-sm font-bold tracking-widest">
                Original Merch Preset Blanks
              </span>
              <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight mt-2">
                Curated Products Grid
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Browse pre-built professional designs. Click any blueprint to inspect materials, select personalized colors, and add directly to your bag.
              </p>
            </div>

            {/* Custom filters toolbar tabs aligned beautifully */}
            <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl self-start md:self-auto border border-stone-200/50">
              {['All', 'Drinkware', 'Apparel', 'Stationery', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer select-none ${
                    activeCategory === cat
                      ? 'bg-neutral-900 text-amber-50 shadow-sm'
                      : 'text-stone-600 hover:bg-stone-200'
                  }`}
                  id={`cat-filter-btn-${cat.toLowerCase()}`}
                >
                  {cat === 'All' ? 'All Blanks' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actual grid content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" id="curated-products-grid">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
              <p className="text-neutral-500 text-xs font-bold">No products match your chosen category filters.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-xs font-extrabold uppercase text-orange-500 hover:underline"
              >
                Reset Filter Tabs
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. DYNAMIC CUSTOM Studio Lab PORTAL */}
      <section className="py-16 px-4 md:px-8 border-y border-orange-100/35 bg-[#FAF9F5]" id="sandbox-portal">
        <div className="max-w-7xl mx-auto">
          <StudioLab onAddToBasket={handleAddToBasket} />
        </div>
      </section>

      {/* 6. TECHNICAL STENCIL & FABRIC PLEDGE INDICATORS */}
      <section className="py-16 px-4 bg-white border-b border-orange-100/20" id="about-shipping">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Craft Quality Standards</span>
            <h3 className="text-2xl md:text-3xl font-black text-neutral-800 tracking-tight mt-1.5">
              The DropshoppStudio Zero-Fleck Quality Pledge
            </h3>
            <p className="text-sm text-neutral-500 max-w-xl mx-auto mt-2">
              Every item is print-certified, packed using eco-friendly compostable mail wrappers, and shipped securely in sturdy box bundles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-50 border border-stone-200/40 p-6 rounded-3xl hover:border-teal-100 transition">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#20B2AA]" />
              </div>
              <h4 className="font-extrabold text-neutral-800 text-sm uppercase">100% Organic Fiber Canvas</h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Totes are made from certified double-weave GOTS organic cotton. Mugs and tumblers are fired under precise high heat with lead-free glazes. Feel the premium physical difference immediately.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200/40 p-6 rounded-3xl hover:border-orange-100 transition">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="font-extrabold text-neutral-800 text-sm uppercase">Ultra-Saturated Ink Plate curing</h4>
              <p className="text-xs text-stone-650 mt-2 leading-relaxed">
                We use commercial-grade dye sublimation and high-fidelity DTG systems. The colors fuse directly with core fibers to resist peeling, crack-fanning, or shade-loss in wash cycles.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200/40 p-6 rounded-3xl hover:border-indigo-100 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <h4 className="font-extrabold text-neutral-800 text-sm uppercase">Bespoke Production Transparency</h4>
              <p className="text-xs text-stone-650 mt-2 leading-relaxed">
                We print on demand to target zero bulk fabric waste. By bypassing bulk imports we prevent environmental landfills overflow. Track each print cycle from layout to parcel scans!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIAL CARDS */}
      <section className="py-16 px-4 md:px-8 bg-zinc-50 border-b border-orange-100/30" id="customer-love">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Colorista Testimonials</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-800 tracking-tight mt-2">
              Loved by Digital Designers & Creators
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Read real-life printing feedback from creators who customized dynamic designs in our Sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white border border-stone-200/60 p-5 rounded-3xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-xs text-amber-400">★</span>
                    ))}
                    <span className="text-[10px] text-stone-400 font-mono ml-1 uppercase bg-stone-100 px-1.5 py-0.5 rounded">
                      Purchased: {t.productPurchased}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 italic leading-relaxed mb-4">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3.5 border-t border-stone-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-xs ${t.avatarColor}`}>
                    {t.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-800 leading-none">{t.name}</h5>
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5 inline-block">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FOOTER WITH NEWSLETTER AND CUPON CODE DISPENSER */}
      <footer className="bg-neutral-900 text-amber-50 pt-16 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-stone-800 pb-12 mb-12">
            
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center transform rotate-6 shadow-sm">
                  <Palette className="w-5 h-5 text-neutral-900" />
                </div>
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  Dropshopp<span className="text-amber-300">Studio</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                The modern full-fidelity e-commerce experience to order premium everyday ring-spun items. Double cured vector prints, organic cotton canvas, and dishwasher-safe hard-coats.
              </p>
              
              <div className="text-[10px] text-stone-500 font-mono">
                <span>&bull; Port 3000 Ingress Verified</span>
                <br />
                <span>&bull; Server-Side Gemini API Integrated</span>
              </div>
            </div>

            {/* QUICK LINK COLUMNS */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-xs font-semibold text-stone-400">
              <div className="space-y-2.5">
                <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-1 text-orange-400 font-mono">CATEGORIES</h5>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { setActiveCategory('Drinkware'); window.scrollTo({top: document.getElementById('curated-collection')?.offsetTop, behavior: 'smooth'}); }}>Drinkware & Mugs</p>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { setActiveCategory('Apparel'); window.scrollTo({top: document.getElementById('curated-collection')?.offsetTop, behavior: 'smooth'}); }}>Daily Apparel</p>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { setActiveCategory('Accessories'); window.scrollTo({top: document.getElementById('curated-collection')?.offsetTop, behavior: 'smooth'}); }}>Totes Accessories</p>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { setActiveCategory('Stationery'); window.scrollTo({top: document.getElementById('curated-collection')?.offsetTop, behavior: 'smooth'}); }}>Journals</p>
              </div>

              <div className="space-y-2.5">
                <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-1 text-amber-300 font-mono">STUDIO LAB</h5>
                <a href="#sandbox-portal" className="block hover:text-amber-50 transition">Sandbox Portal</a>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { alert('DropshoppStudio Print Quality Standard is compliant with our 2026 Zero-Fleck Pledge.'); }}>Quality Pledge</p>
                <p className="hover:text-amber-50 transition cursor-pointer animate-pulse text-rose-300 font-semibold" onClick={() => { setIsBasketOpen(true); }}>View Current Cart</p>
                <p className="hover:text-amber-50 transition cursor-pointer" onClick={() => { alert('For support, email us at: shop.dropp28@gmail.com\nOur 24-hour agent will respond instantly.'); }}>Direct Support</p>
              </div>
            </div>

            {/* Newsletter dispatch column (unlocked WELCOME15!) */}
            <div className="lg:col-span-5 space-y-4" id="newsletter-form-container">
              <h5 className="font-extrabold text-amber-50 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>UNSPLASH A WELCOME15 PROMO DISCOUNT</span>
              </h5>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Unlock our popular 15% off coupon code and stay updated on limited ink releases. We will never spam you!
              </p>

              {!newsletterSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email to unlock"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-stone-800 border border-stone-700 text-stone-200 placeholder-zinc-500 rounded-xl px-3.5 py-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-400"
                    id="input-newsletter-email"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-400 text-neutral-900 text-xs font-black uppercase px-5 rounded-xl tracking-wider transition cursor-pointer"
                    id="btn-newsletter-subscribe"
                  >
                    Unlock
                  </button>
                </form>
              ) : (
                <div className="bg-amber-100/10 border border-amber-300/20 p-4 rounded-2xl max-w-md space-y-2">
                  <p className="text-xs text-emerald-400 font-extrabold flex items-center gap-1.5">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                    <span>Welcome to the dropshopp crew!</span>
                  </p>
                  <p className="text-[11px] text-stone-300 leading-snug">
                    Here is your unlocked 15% discount coupon. Type it in your Shopping Bag summary during checkout:
                  </p>
                  <div className="flex items-center justify-between bg-stone-900 border border-stone-800 p-2.5 rounded-lg">
                    <code className="text-amber-300 font-mono text-sm font-bold tracking-widest">{promoUnlockedCode}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(promoUnlockedCode);
                        alert('Promo code copied! Select your customization styles in the bag.');
                      }}
                      className="text-[10px] text-stone-400 hover:text-white uppercase font-black tracking-widest"
                    >
                      [Copy Code]
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-mono uppercase tracking-widest leading-none">
            <p>&copy; {new Date().getFullYear()} DropshoppStudio Pod. All rights reserved.</p>
            <p>Direct Support: shop.dropp28@gmail.com</p>
          </div>

        </div>
      </footer>

      {/* 9. MODALS & SLIDING DRAWERS TRIGGER OUTLETS */}
      <BasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToBasket={handleAddToBasket}
        />
      )}

    </div>
  );
}
