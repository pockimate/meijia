export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  inStock: boolean;
  priceModifier?: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  zodiac?: string;
  helpful?: number;
  images?: string[];
}

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  zodiacSign?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'press-on' | 'polish' | 'care';
  image: string;
  gallery?: string[];
  isNew?: boolean;
  rating: number;
  reviewCount?: number;
  description?: string;
  benefits?: string[];
  variants?: {
    sizes?: ProductVariant[];
    colors?: ProductVariant[];
  };
  reviews?: ProductReview[];
  ingredients?: string[];
  howToUse?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  zodiacSign?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: number;
  userId: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod?: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
