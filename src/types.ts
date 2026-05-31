/**
 * Types and static dataset for DropshoppStudio Pod e-commerce app
 */

export interface Product {
  id: string;
  title: string;
  category: 'Drinkware' | 'Apparel' | 'Stationery' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  colors: { name: string; hex: string }[];
  description: string;
  imagePreset: string; // Used to drive our custom SVG-based live-render in product cards
  isBestSeller?: boolean;
  label?: string;
  features: string[];
}

export type SandboxProductType = 'Apparel' | 'Drinkware' | 'Stationery' | 'Accessories';

export interface CustomDesign {
  productType: 'Apparel' | 'Mug' | 'Journal' | 'Tote' | 'Tumbler';
  canvasColor: string; // e.g. '#FF6B6B'
  stampType: 'Retro Sun' | 'Lightning Zap' | 'Daisy Bloom' | 'Heart' | 'Ocean Wave';
  mottoText: string;
  typographyFont: 'Space Grotesk' | 'Playfair' | 'Outfit' | 'JetBrains Mono';
  fontSize: number;
  stampScale: number;
  stampColor: string;
  placement: 'center' | 'top' | 'bottom';
}

export interface CartItem {
  id: string; // unique for this combination of options or customized designs
  productId?: string; // empty if completely custom from sandbox
  title: string;
  subtitle: string;
  productType: string;
  price: number;
  quantity: number;
  canvasColor: string;
  stampType?: string;
  mottoText?: string;
  customDesign?: CustomDesign; // attached if fully custom
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minSpend?: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarColor: string;
  rating: number;
  comment: string;
  productPurchased: string;
}

// Global products list (fully compliant with Drinkware & Mugs, Totes, Journals, Apparel, no home decor canvas/interior wall art)
export const CURATED_PRODUCTS: Product[] = [
  {
    id: 'prod-mug-colorista',
    title: 'Colorista Ceramic Mug (15oz)',
    category: 'Drinkware',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewsCount: 142,
    colors: [
      { name: 'Peach Coral', hex: '#FF7F50' },
      { name: 'Sunny Yellow', hex: '#FFD700' },
      { name: 'Lilac Orchid', hex: '#DA70D6' },
      { name: 'Soft Teal', hex: '#20B2AA' }
    ],
    description: 'Perfect dishwasher-safe, oversized ceramic mug with our high-gloss finish and comfortable color-pop C-handle. Ergonomically shaped for cold mornings and extra-hot brew sessions.',
    imagePreset: 'mug',
    isBestSeller: true,
    label: 'Best Seller',
    features: ['100% Lead & BPA Free', 'Double-sided Premium Hard Coat', 'Oversized 15oz Fluid Capacity']
  },
  {
    id: 'prod-tote-retro',
    title: 'Heavy Cotton Canvas Tote (12oz)',
    category: 'Accessories',
    price: 21.00,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 96,
    colors: [
      { name: 'True Cream', hex: '#FDFBF7' },
      { name: 'Sage Green', hex: '#8FBC8F' },
      { name: 'Midnight Charcoal', hex: '#2F4F4F' },
      { name: 'Clay Red', hex: '#CD5C5C' }
    ],
    description: 'Ultra-durable, thick ring-spun cotton canvas with bound inner seams and secure cross-stitched webbed handles. Fits your daily laptop, journals, and reusable tumbler easily.',
    imagePreset: 'tote',
    label: 'Eco-Friendly',
    features: ['100% GOTS Certified Organic Cotton', 'ReinforcedStress Points', 'Spacious 4-inch deep bottom gusset']
  },
  {
    id: 'prod-journal-metallic',
    title: 'Minimalist Grid Hardcover Journal',
    category: 'Stationery',
    price: 15.99,
    rating: 4.7,
    reviewsCount: 68,
    colors: [
      { name: 'Lilac Orchid', hex: '#DA70D6' },
      { name: 'Deep Olive', hex: '#556B2F' },
      { name: 'Peach Coral', hex: '#FF7F50' },
      { name: 'Pure Charcoal', hex: '#2F4F4F' }
    ],
    description: 'An elegant A5 lay-flat hardcover notebook with dot-grid high-opacity leaves. Specifically curated for clean bullet journaling, sketch typography, and stamping.',
    imagePreset: 'journal',
    features: ['160 lay-flat numbered pages', '120 GSM ink-friendly bleed-proof paper', 'Ribbon marker & rear expandable packet']
  },
  {
    id: 'prod-tumbler-insulated',
    title: 'Insulated Splash-Proof Tumbler (20oz)',
    category: 'Drinkware',
    price: 29.50,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 218,
    colors: [
      { name: 'Ice Mint', hex: '#AFEEEE' },
      { name: 'Orchid Pink', hex: '#FF69B4' },
      { name: 'Cobalt Blue', hex: '#4169E1' },
      { name: 'Sunny Yellow', hex: '#FFD700' }
    ],
    description: 'Double-walled vacuum-sealed stainless steel that guards beverage temps for 24 hours ice-cold or 8 hours steaming hot. Equipped with a sliding spill-proof magnetic lid.',
    imagePreset: 'tumbler',
    isBestSeller: true,
    label: 'Popular',
    features: ['18/8 Culinary Grade Stainless Steel', 'Condensation-Free Powder Coat finish', 'Copper insulation barrier']
  },
  {
    id: 'prod-tee-cotton',
    title: 'Everyday Premium Ringspun Tee',
    category: 'Apparel',
    price: 28.00,
    originalPrice: 35.00,
    rating: 5.0,
    reviewsCount: 312,
    colors: [
      { name: 'Warm Cream', hex: '#FFFDD0' },
      { name: 'Soft Sage', hex: '#A3B18A' },
      { name: 'Sunset Terracotta', hex: '#E07A5F' },
      { name: 'Classic Charcoal', hex: '#3D3D3D' }
    ],
    description: 'Combed ring-spun cotton offering a premium vintage soft-wash feel and structured standard fit. An exceptional canvas colorway that allows printing colors to radiate cleanly.',
    imagePreset: 'apparel_tee',
    label: 'Perfect Fit',
    features: ['100% Combed Ringspun Cotton (6.1 oz)', 'Pre-shrunk vintage bio-wash treatment', 'Double-needle stitched hem and collar']
  },
  {
    id: 'prod-hoodie-comfy',
    title: 'Color-Pop Heavy Cotton Hoodie',
    category: 'Apparel',
    price: 49.00,
    originalPrice: 62.00,
    rating: 4.8,
    reviewsCount: 184,
    colors: [
      { name: 'Orchid Purple', hex: '#BA55D3' },
      { name: 'Soft Teal', hex: '#20B2AA' },
      { name: 'Sunset Terracotta', hex: '#E07A5F' },
      { name: 'Classic Charcoal', hex: '#3D3D3D' }
    ],
    description: 'Thick, ultra-soft interior fleece hoodie featuring dynamic modern double-dyeing, dropped shoulders, and a heavy double-lined hood. Ideal for layering custom street prints.',
    imagePreset: 'apparel_hoodie',
    label: 'Premium Craft',
    features: ['80% Ringspun Cotton / 20% Polyester Premium Fleece', 'Custom double-lined hood with robust grommets', 'Spacious pouch pocket with double stitching']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Isabella Vance',
    location: 'Austin, TX',
    avatarColor: 'bg-rose-100 text-rose-600',
    rating: 5,
    comment: 'The live Studio Lab mockup was incredibly faithful to the printed mug! The Peach Coral looks gorgeous on my desk and the Retro Sun design has not faded in the dishwasher once.',
    productPurchased: 'Colorista Ceramic Mug'
  },
  {
    id: 't2',
    name: 'Oliver Thorne',
    location: 'Portland, OR',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    rating: 5,
    comment: 'Exceptional thick cotton quality on the tote bags! I designed a Lilac Orchid and Daisy combo and it gets compliments in every grocery run. Highly recommend DropshoppStudio.',
    productPurchased: 'Heavy Cotton Canvas Tote'
  },
  {
    id: 't3',
    name: 'Marcus Sterling',
    location: 'Brooklyn, NY',
    avatarColor: 'bg-amber-100 text-amber-600',
    rating: 5,
    comment: 'I customized the everyday tee with the Lightning Zap and my classic Dev motto. It is the softest shirt I own now. The print is crisp and sits seamlessly with the fabric threads.',
    productPurchased: 'Everyday Ringspun Tee'
  }
];

export const COUPONS: Coupon[] = [
  { code: 'WELCOME15', discountPercentage: 15, description: '15% Off Your Entire Cart (Unlocked via Email Signup!)' },
  { code: 'DROPSHOPP25', discountPercentage: 25, minSpend: 100, description: '25% Off orders over $100' },
  { code: 'BUNDLEUP', discountPercentage: 10, description: 'Extra 10% discount on print designs' }
];
