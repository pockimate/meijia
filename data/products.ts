import type { Product } from '~/types';

export const products: Product[] = [
  { 
    id: 1, 
    name: "Nebula Noir", 
    price: 24.00, 
    category: "press-on", 
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=800&auto=format&fit=crop"
    ],
    isNew: true, 
    rating: 4.8,
    reviewCount: 127,
    description: "Channel the mystery of deep space with Nebula Noir. These press-ons feature a deep void black base with holographic glitter that mimics distant stars. Perfect for Scorpio season or anyone wanting to tap into their dark feminine energy.",
    benefits: ["Hand-painted finish", "Reusable up to 5 times", "Includes application kit"],
    variants: {
      sizes: [
        { id: 'xs', name: 'Extra Small', value: 'XS', inStock: true },
        { id: 's', name: 'Small', value: 'S', inStock: true },
        { id: 'm', name: 'Medium', value: 'M', inStock: true },
        { id: 'l', name: 'Large', value: 'L', inStock: false }
      ]
    },
    reviews: [
      { id: 1, author: "Luna M.", rating: 5, date: "2026-01-15", comment: "Absolutely stunning! The holographic effect is even better in person. Got so many compliments.", verified: true, zodiacSign: "Scorpio" },
      { id: 2, author: "Sarah K.", rating: 5, date: "2026-01-10", comment: "These lasted 2 weeks without chipping. The quality is incredible!", verified: true },
      { id: 3, author: "Alex R.", rating: 4, date: "2026-01-05", comment: "Love the design but wish they had more size options. Still gorgeous though!", verified: true, zodiacSign: "Pisces" }
    ],
    howToUse: [
      "Clean and buff your natural nails",
      "Select the correct size for each finger",
      "Apply adhesive tabs or nail glue",
      "Press firmly for 30 seconds",
      "File edges if needed"
    ]
  },
  { 
    id: 2, 
    name: "Cyber Glaze", 
    price: 22.50, 
    category: "press-on", 
    image: "https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599695683918-1c491566378e?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 89,
    description: "A chromatic silver finish that reflects the digital future. Cyber Glaze is designed for the modern android. High-shine mirror effect that catches every photon of light.",
    benefits: ["Mirror chrome effect", "Short almond shape", "Waterproof adhesive"],
    variants: {
      sizes: [
        { id: 'xs', name: 'Extra Small', value: 'XS', inStock: true },
        { id: 's', name: 'Small', value: 'S', inStock: true },
        { id: 'm', name: 'Medium', value: 'M', inStock: true },
        { id: 'l', name: 'Large', value: 'L', inStock: true }
      ]
    },
    reviews: [
      { id: 1, author: "Nova T.", rating: 5, date: "2026-01-18", comment: "The chrome finish is INSANE! Looks like liquid metal.", verified: true, zodiacSign: "Aquarius" },
      { id: 2, author: "Jamie L.", rating: 5, date: "2026-01-12", comment: "Perfect for my futuristic aesthetic. Love them!", verified: true }
    ]
  },
  { 
    id: 3, 
    name: "Mars Dust", 
    price: 18.00, 
    category: "polish", 
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 64,
    description: "A terracotta burnt orange polish infused with fine gold shimmer. Inspired by the red planet, this shade brings warmth, grounding, and Martian energy to your fingertips.",
    benefits: ["7-free formula", "Quick dry", "Chip resistant"],
    ingredients: ["Butyl Acetate", "Ethyl Acetate", "Nitrocellulose", "Gold Mica", "Natural Pigments"],
    reviews: [
      { id: 1, author: "Emma W.", rating: 4, date: "2026-01-14", comment: "Beautiful color! Dries fast and lasts about a week.", verified: true, zodiacSign: "Aries" },
      { id: 2, author: "Mia C.", rating: 5, date: "2026-01-08", comment: "Perfect autumn shade. The gold shimmer is subtle but gorgeous.", verified: true }
    ]
  },
  { 
    id: 4, 
    name: "Starlight Care Kit", 
    price: 35.00, 
    category: "care", 
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800&auto=format&fit=crop", 
    isNew: true, 
    rating: 5.0,
    description: "Maintain your cosmic claws with the Starlight Care Kit. Includes our signature Moon Oil for cuticles, a crystal glass file, and a strengthening serum infused with diamond dust.",
    benefits: ["Hydrating cuticle oil", "Genuine crystal file", "Strengthening serum"]
  },
  { 
    id: 5, 
    name: "Emerald City", 
    price: 26.00, 
    category: "press-on", 
    image: "https://images.unsplash.com/photo-1599695683918-1c491566378e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1599695683918-1c491566378e?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 73,
    description: "Deep green cat-eye gel that shifts with movement. Evokes the energy of growth, prosperity, and alien flora. The magnetic effect creates a 3D depth that looks like a portal.",
    benefits: ["Cat-eye magnetic effect", "Medium coffin shape", "Glossy finish"],
    variants: {
      sizes: [
        { id: 'xs', name: 'Extra Small', value: 'XS', inStock: true },
        { id: 's', name: 'Small', value: 'S', inStock: true },
        { id: 'm', name: 'Medium', value: 'M', inStock: true },
        { id: 'l', name: 'Large', value: 'L', inStock: true }
      ]
    },
    reviews: [
      { id: 1, author: "Jade P.", rating: 5, date: "2026-01-16", comment: "The cat-eye effect is mesmerizing! Perfect for Taurus energy.", verified: true, zodiacSign: "Taurus" }
    ]
  },
  { 
    id: 6, 
    name: "Moonstone", 
    price: 16.00, 
    category: "polish", 
    image: "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=800&auto=format&fit=crop", 
    rating: 4.3,
    description: "A sheer, iridescent white that flashes blue and purple. Wear it alone for a ghostly glow or layer it over black for a cosmic transformation. Harnesses lunar intuition.",
    benefits: ["Sheer buildable coverage", "Blue/Purple shift", "Vegan brush"]
  },
  { 
    id: 7, 
    name: "Crystal File", 
    price: 12.00, 
    category: "care", 
    image: "https://images.unsplash.com/photo-1595867359560-a292437651a0?q=80&w=800&auto=format&fit=crop", 
    rating: 4.9,
    description: "A precision glass file that seals the keratin layers of your nails, preventing peeling and splitting. Etched with a star map pattern.",
    benefits: ["Prevents splitting", "Washable & hygienic", "Lasts forever"]
  },
  { 
    id: 8, 
    name: "Void Matte", 
    price: 25.00, 
    category: "press-on", 
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop", 
    rating: 4.7,
    description: "Sometimes you just need to embrace the void. Super matte black nails with a soft-touch finish. Minimalist, chic, and darker than a black hole.",
    benefits: ["Super matte finish", "Soft touch feel", "Short square shape"]
  },
];
