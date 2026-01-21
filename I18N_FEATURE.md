# 🌍 Multi-language Support (i18n) & Currency Switching

## Overview
Complete internationalization (i18n) support with 3 languages and 6 currencies, allowing users to browse the Astro Nails store in their preferred language and currency.

## Features Implemented

### 1. Language Support
- **English (en)** 🇺🇸 - Default language
- **Chinese (zh)** 🇨🇳 - Simplified Chinese
- **Japanese (ja)** 🇯🇵 - Japanese

### 2. Currency Support
- **USD ($)** - US Dollar (base currency, rate: 1.0)
- **EUR (€)** - Euro (rate: 0.92)
- **GBP (£)** - British Pound (rate: 0.79)
- **JPY (¥)** - Japanese Yen (rate: 149.50)
- **CNY (¥)** - Chinese Yuan (rate: 7.24)
- **KRW (₩)** - Korean Won (rate: 1329.50)

### 3. Components

#### LanguageSwitcher.vue
- Dropdown menu with language selection
- Shows flag emoji and language name
- Persists selection in cookie (`astro_locale`)
- Smooth transitions and hover effects

#### CurrencySwitcher.vue
- Dropdown menu with currency selection
- Shows currency symbol and code
- Persists selection in localStorage (`astro_currency`)
- Real-time price conversion

### 4. Store: locale.ts
Manages currency conversion and formatting:
- `initLocale()` - Load saved currency from localStorage
- `setCurrency(code)` - Switch currency
- `convertPrice(priceUSD)` - Convert USD price to selected currency
- `formatPrice(priceUSD, showSymbol)` - Format price with currency symbol

### 5. Composable: useCurrency.ts
Helper composable for easy currency formatting in components:
```typescript
const { formatPrice, convertPrice, currencySymbol, currentCurrency } = useCurrency();
```

### 6. Translation Files
Located in `locales/` directory:
- `en.json` - English translations
- `zh.json` - Chinese translations
- `ja.json` - Japanese translations

Translation structure:
```json
{
  "nav": { ... },
  "common": { ... },
  "product": { ... },
  "cart": { ... },
  "checkout": { ... },
  "account": { ... },
  "footer": { ... }
}
```

## Configuration

### nuxt.config.ts
```typescript
modules: ['@nuxtjs/i18n'],

i18n: {
  locales: [
    { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
    { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '中文' },
    { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
  ],
  lazy: true,
  langDir: 'locales',
  defaultLocale: 'en',
  strategy: 'no_prefix',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'astro_locale',
    redirectOn: 'root',
  },
}
```

## Usage

### In Templates
```vue
<!-- Use translation keys -->
<h1>{{ $t('nav.home') }}</h1>
<button>{{ $t('common.addToCart') }}</button>

<!-- Format prices -->
<span>{{ formatPrice(product.price) }}</span>
```

### In Script
```typescript
const { t } = useI18n();
const { formatPrice } = useCurrency();

// Use translations
const message = t('cart.empty');

// Format prices
const formattedPrice = formatPrice(29.99);
```

## Updated Components

### Layout (default.vue)
- Added LanguageSwitcher and CurrencySwitcher to navbar
- Translated navigation links
- Translated footer sections

### ProductCard.vue
- Price display uses `formatPrice()`
- Translated "Add to Cart" and "Quick View" buttons

### CartDrawer.vue
- Translated cart title, empty state, and buttons
- All prices use `formatPrice()`
- Translated subtotal, shipping, tax labels

## Browser Language Detection
The app automatically detects the user's browser language on first visit and sets the appropriate locale. Users can manually switch languages at any time using the LanguageSwitcher.

## Persistence
- **Language**: Stored in cookie (`astro_locale`)
- **Currency**: Stored in localStorage (`astro_currency`)
- Both persist across sessions

## Special Handling
- **JPY & KRW**: No decimal places (whole numbers only)
- **Other currencies**: 2 decimal places
- **Price conversion**: All prices stored in USD, converted on display

## Future Enhancements
- Add more languages (French, Spanish, German, Korean)
- Add more currencies (AUD, CAD, etc.)
- Update exchange rates from API
- Translate product names and descriptions
- Add RTL support for Arabic/Hebrew
