# 🌟 Astro Nails - Cosmic Nail Art E-commerce

Future-forward nail art for the digital age. A full-featured e-commerce platform built with Nuxt 3, featuring cosmic-themed nail products, AI-powered styling recommendations, and a complete shopping experience.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3.20.2-00DC82?style=flat&logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3.5.27-4FC08D?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css)

## ✨ Features

### 🛒 E-commerce Core
- **Shopping Cart** - Add, remove, update quantities with localStorage persistence
- **User Authentication** - Login, register, profile management
- **Product Catalog** - Browse, search, filter by category, price, rating
- **Wishlist** - Save favorite products
- **Product Comparison** - Compare up to 4 products side-by-side
- **Quick View** - Preview products without leaving the page

### 💳 Checkout & Payment
- **Multi-Payment Support** - Credit Card, PayPal, Apple Pay, Google Pay
- **Coupon System** - Apply discount codes and promotions
- **Order Tracking** - Real-time order status and logistics tracking
- **Address Management** - Save multiple shipping addresses

### 🎨 User Experience
- **AI Stylist** - Personalized nail art recommendations powered by Google Gemini
- **Product Recommendations** - 6 intelligent recommendation algorithms
- **Review System** - Rate, review, and upload photos
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🌍 Internationalization
- **Multi-Language** - English, Chinese (简体中文), Japanese (日本語)
- **Multi-Currency** - USD, EUR, GBP, JPY, CNY, KRW
- **Automatic Detection** - Browser language and currency detection

### 👨‍💼 Admin Panel
- **Dashboard** - Sales overview, recent orders, statistics
- **Order Management** - View, update, and manage orders
- **Product Management** - CRUD operations for products
- **User Management** - View and manage customers

### ⚡ Performance & SEO
- **Performance Monitoring** - Core Web Vitals tracking (LCP, FID, CLS)
- **Image Optimization** - Lazy loading, explicit dimensions
- **Code Splitting** - Optimized bundle sizes
- **SEO Optimized** - Structured data, meta tags, Open Graph
- **Caching System** - In-memory cache with TTL

### 🧪 Testing
- **Unit Tests** - Vitest + Vue Test Utils
- **Component Tests** - 65+ test cases
- **Integration Tests** - Complete checkout flow testing
- **Coverage Reports** - HTML and JSON reports

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-nails.git
cd astro-nails/nuxt-version

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
nuxt-version/
├── assets/              # Global styles
├── components/          # Vue components
│   ├── CartDrawer.vue
│   ├── ProductCard.vue
│   ├── QuickViewModal.vue
│   └── ...
├── composables/         # Composable functions
│   ├── useCache.ts
│   ├── useCurrency.ts
│   └── ...
├── data/               # Mock data
│   └── products.ts
├── layouts/            # Layout components
│   └── default.vue
├── locales/            # i18n translations
│   ├── en.json
│   ├── zh.json
│   └── ja.json
├── pages/              # Route pages
│   ├── index.vue
│   ├── shop.vue
│   ├── product/[id].vue
│   ├── checkout.vue
│   ├── admin/
│   └── ...
├── plugins/            # Nuxt plugins
│   └── performance.client.ts
├── stores/             # Pinia stores
│   ├── cart.ts
│   ├── auth.ts
│   ├── wishlist.ts
│   └── ...
├── tests/              # Test files
│   ├── stores/
│   ├── components/
│   └── ...
└── types/              # TypeScript types
    └── index.ts
```

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NUXT_PUBLIC_API_URL=https://your-api.com
NUXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

## 📚 Documentation

- [Progress Summary](./PROGRESS_SUMMARY.md) - Complete feature list
- [Testing Guide](./TESTING.md) - How to write and run tests
- [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md) - Performance best practices
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - How to deploy
- [API Layer](./API_LAYER.md) - API documentation
- [Admin Panel](./ADMIN_PANEL.md) - Admin features
- [Health Check](./HEALTH_CHECK.md) - System health status

## 🎨 Tech Stack

- **Framework**: Nuxt 3.20.2
- **UI Framework**: Vue 3.5.27
- **Language**: TypeScript 5.8.0
- **Styling**: Tailwind CSS 3.x
- **State Management**: Pinia 3.0.4
- **i18n**: @nuxtjs/i18n 10.2.1
- **Testing**: Vitest 4.0.17 + Vue Test Utils 2.4.6
- **AI**: Google Gemini API

## 🎯 Key Features Implemented

✅ 18 Major Features:
1. Shopping Cart System
2. Product Detail Enhancements
3. User Authentication
4. Search & Filtering
5. Wishlist
6. Toast Notifications
7. Quick View Modal
8. Product Comparison
9. Enhanced Review System
10. Coupon & Promotions
11. Product Recommendations
12. Order Tracking
13. Multi-language Support
14. Payment Integration
15. API Service Layer
16. Admin Panel
17. Performance Optimization
18. Testing Framework

## 🔐 Demo Credentials

### Admin Panel
- Email: `admin@astronails.com`
- Password: `admin123`

### Test User
- Email: `test@example.com`
- Password: `password123`

### Test Coupons
- `WELCOME10` - 10% off
- `SAVE20` - 20% off orders over $50
- `FREESHIP` - Free shipping

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance)
- **First Contentful Paint**: ~1.0s
- **Largest Contentful Paint**: ~2.0s
- **Time to Interactive**: ~2.5s
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons and emojis for visual elements
- Unsplash for product images

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Nuxt 3**

🌟 Star this repo if you find it helpful!
