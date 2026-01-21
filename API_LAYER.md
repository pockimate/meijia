# 🔌 API Layer Documentation

## Overview
Complete API service layer with mock implementations, ready for real backend integration. All API calls are simulated with realistic delays and error handling.

## Architecture

```
composables/
├── useApi.ts              # Base API client
├── useProductApi.ts       # Product endpoints
├── useAuthApi.ts          # Authentication endpoints
├── useOrderApi.ts         # Order management endpoints
├── useReviewApi.ts        # Review endpoints
├── useAddressApi.ts       # Address management endpoints
└── useApiError.ts         # Error handling utilities
```

## Base API Client (useApi)

### Configuration
```typescript
const api = useApi();

// Base URL (configurable via environment)
const baseURL = 'http://localhost:3001/api';

// Mock delay (800ms by default)
const MOCK_DELAY = 800;
```

### Methods
- `get<T>(endpoint, mockData)` - GET request
- `post<T>(endpoint, body, mockData)` - POST request
- `put<T>(endpoint, body, mockData)` - PUT request
- `delete<T>(endpoint, mockData)` - DELETE request
- `patch<T>(endpoint, body, mockData)` - PATCH request

### Response Format
```typescript
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  success: boolean;
}
```

### Example Usage
```typescript
const api = useApi();

// GET request
const response = await api.get('/products', mockProducts);

// POST request
const response = await api.post('/orders', orderData, mockOrder);

// Handle response
if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

## Product API (useProductApi)

### Endpoints

#### Get All Products
```typescript
const { getProducts } = useProductApi();

const response = await getProducts({
  category: 'press-on',
  search: 'cosmic',
  minPrice: 10,
  maxPrice: 50,
  minRating: 4,
  sortBy: 'price-asc',
  limit: 10,
  offset: 0,
});
```

**Response:**
```typescript
{
  products: Product[],
  total: number,
  page: number,
  pageSize: number,
}
```

#### Get Single Product
```typescript
const { getProduct } = useProductApi();
const response = await getProduct(1);
```

#### Get Related Products
```typescript
const { getRelatedProducts } = useProductApi();
const response = await getRelatedProducts(1, 4);
```

#### Get Popular Products
```typescript
const { getPopularProducts } = useProductApi();
const response = await getPopularProducts(8);
```

#### Get New Products
```typescript
const { getNewProducts } = useProductApi();
const response = await getNewProducts(8);
```

#### Search Products
```typescript
const { searchProducts } = useProductApi();
const response = await searchProducts('cosmic', 10);
```

**Response:**
```typescript
{
  query: string,
  results: Product[],
  total: number,
}
```

## Authentication API (useAuthApi)

### Endpoints

#### Login
```typescript
const { login } = useAuthApi();

const response = await login({
  email: 'user@example.com',
  password: 'password123',
});
```

**Response:**
```typescript
{
  user: User,
  token: string,
  expiresIn: number,
}
```

#### Register
```typescript
const { register } = useAuthApi();

const response = await register({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  zodiacSign: 'Aries',
});
```

#### Logout
```typescript
const { logout } = useAuthApi();
const response = await logout();
```

#### Get Current User
```typescript
const { getCurrentUser } = useAuthApi();
const response = await getCurrentUser();
```

#### Update Profile
```typescript
const { updateProfile } = useAuthApi();

const response = await updateProfile(userId, {
  name: 'Jane Doe',
  zodiacSign: 'Leo',
});
```

#### Change Password
```typescript
const { changePassword } = useAuthApi();

const response = await changePassword(
  'oldPassword123',
  'newPassword456'
);
```

#### Request Password Reset
```typescript
const { requestPasswordReset } = useAuthApi();
const response = await requestPasswordReset('user@example.com');
```

## Order API (useOrderApi)

### Endpoints

#### Create Order
```typescript
const { createOrder } = useOrderApi();

const response = await createOrder({
  userId: 1,
  items: cartItems,
  subtotal: 100,
  shipping: 10,
  tax: 11,
  total: 121,
  shippingAddress: address,
  paymentMethod: 'card',
  couponCode: 'SAVE10',
});
```

**Response:** Order object with generated order number

#### Get User Orders
```typescript
const { getUserOrders } = useOrderApi();

const response = await getUserOrders(userId, {
  status: 'processing',
  limit: 10,
  offset: 0,
});
```

**Response:**
```typescript
{
  orders: Order[],
  total: number,
}
```

#### Get Single Order
```typescript
const { getOrder } = useOrderApi();
const response = await getOrder(orderId);
```

#### Get Order by Number
```typescript
const { getOrderByNumber } = useOrderApi();
const response = await getOrderByNumber('AST123ABC');
```

#### Update Order Status
```typescript
const { updateOrderStatus } = useOrderApi();

const response = await updateOrderStatus(
  orderId,
  'shipped'
);
```

#### Cancel Order
```typescript
const { cancelOrder } = useOrderApi();
const response = await cancelOrder(orderId, 'Changed my mind');
```

#### Get Order Statistics
```typescript
const { getOrderStats } = useOrderApi();
const response = await getOrderStats(userId);
```

**Response:**
```typescript
{
  total: number,
  pending: number,
  processing: number,
  shipped: number,
  delivered: number,
  cancelled: number,
  totalSpent: number,
}
```

## Review API (useReviewApi)

### Endpoints

#### Get Product Reviews
```typescript
const { getProductReviews } = useReviewApi();

const response = await getProductReviews(productId, {
  rating: 5,
  sortBy: 'helpful',
  limit: 10,
  offset: 0,
});
```

**Response:**
```typescript
{
  reviews: Review[],
  total: number,
  averageRating: number,
  ratingDistribution: {
    5: number,
    4: number,
    3: number,
    2: number,
    1: number,
  },
}
```

#### Create Review
```typescript
const { createReview } = useReviewApi();

const response = await createReview({
  productId: 1,
  userId: 1,
  rating: 5,
  comment: 'Great product!',
  images: ['url1', 'url2'],
});
```

#### Update Review
```typescript
const { updateReview } = useReviewApi();

const response = await updateReview(reviewId, {
  rating: 4,
  comment: 'Updated review',
});
```

#### Delete Review
```typescript
const { deleteReview } = useReviewApi();
const response = await deleteReview(reviewId);
```

#### Like Review
```typescript
const { likeReview } = useReviewApi();
const response = await likeReview(reviewId);
```

#### Unlike Review
```typescript
const { unlikeReview } = useReviewApi();
const response = await unlikeReview(reviewId);
```

#### Report Review
```typescript
const { reportReview } = useReviewApi();
const response = await reportReview(reviewId, 'Spam');
```

## Address API (useAddressApi)

### Endpoints

#### Get User Addresses
```typescript
const { getUserAddresses } = useAddressApi();
const response = await getUserAddresses(userId);
```

#### Create Address
```typescript
const { createAddress } = useAddressApi();

const response = await createAddress({
  userId: 1,
  name: 'John Doe',
  phone: '+1234567890',
  address: '123 Main St',
  city: 'New York',
  postalCode: '10001',
  country: 'USA',
  isDefault: true,
});
```

#### Update Address
```typescript
const { updateAddress } = useAddressApi();

const response = await updateAddress(addressId, {
  phone: '+0987654321',
  isDefault: true,
});
```

#### Delete Address
```typescript
const { deleteAddress } = useAddressApi();
const response = await deleteAddress(addressId);
```

#### Set Default Address
```typescript
const { setDefaultAddress } = useAddressApi();
const response = await setDefaultAddress(userId, addressId);
```

#### Get Default Address
```typescript
const { getDefaultAddress } = useAddressApi();
const response = await getDefaultAddress(userId);
```

## Error Handling (useApiError)

### Error Interface
```typescript
interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}
```

### Methods

#### Handle Error
```typescript
const { handleError } = useApiError();

try {
  const response = await api.get('/endpoint');
  if (!response.success) {
    await handleError({
      message: response.error,
      status: response.status,
    });
  }
} catch (error) {
  await handleError(error);
}
```

#### Create Error
```typescript
const { createError } = useApiError();

const error = createError(
  'Invalid input',
  422,
  'VALIDATION_ERROR',
  { field: 'email' }
);
```

#### Error Type Checks
```typescript
const { 
  isValidationError,
  isAuthError,
  isNetworkError,
  isServerError 
} = useApiError();

if (isAuthError(error)) {
  // Redirect to login
}

if (isNetworkError(error)) {
  // Show retry button
}
```

### Error Status Codes
- `400` - Bad Request
- `401` - Unauthorized (auto-redirects to login)
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable

## Mock Features

### Simulated Delays
All API calls have an 800ms delay to simulate network latency.

### Random Errors
5% chance of random errors to test error handling.

### localStorage Integration
- Orders stored in `astro_orders`
- Addresses stored in `astro_addresses`
- Auth data stored in `astro_auth`

## Real Backend Integration

### Step 1: Update Base URL
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    }
  }
})
```

### Step 2: Remove Mock Data
Replace mock data with real $fetch calls:

```typescript
// Before (Mock)
return api.get('/products', mockProducts);

// After (Real)
const response = await $fetch<Product[]>(`${baseURL}/products`);
return createSuccessResponse(response);
```

### Step 3: Add Authentication Headers
```typescript
const token = localStorage.getItem('auth_token');

const response = await $fetch(`${baseURL}/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### Step 4: Update Error Handling
```typescript
try {
  const response = await $fetch(`${baseURL}/endpoint`);
  return createSuccessResponse(response);
} catch (error: any) {
  return createErrorResponse(
    error.data?.message || error.message,
    error.status || 500
  );
}
```

## Environment Variables

Create `.env` file:
```env
NUXT_PUBLIC_API_URL=http://localhost:3001/api
NUXT_PUBLIC_API_TIMEOUT=30000
NUXT_PUBLIC_API_RETRY=3
```

## Testing

### Unit Tests
```typescript
import { useProductApi } from '~/composables/useProductApi';

describe('Product API', () => {
  it('should fetch products', async () => {
    const { getProducts } = useProductApi();
    const response = await getProducts();
    
    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
  });
});
```

### Integration Tests
```typescript
describe('Order Flow', () => {
  it('should create order successfully', async () => {
    const { createOrder } = useOrderApi();
    
    const response = await createOrder({
      userId: 1,
      items: mockItems,
      total: 100,
      // ...
    });
    
    expect(response.success).toBe(true);
    expect(response.data?.orderNumber).toBeDefined();
  });
});
```

## Best Practices

### 1. Always Handle Errors
```typescript
const response = await api.get('/endpoint');

if (!response.success) {
  await handleError({
    message: response.error,
    status: response.status,
  });
  return;
}

// Use response.data
```

### 2. Use TypeScript Types
```typescript
const response = await api.get<Product[]>('/products');

if (response.success && response.data) {
  // response.data is typed as Product[]
  response.data.forEach(product => {
    console.log(product.name);
  });
}
```

### 3. Loading States
```typescript
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  
  try {
    const response = await api.get('/endpoint');
    // Handle response
  } finally {
    loading.value = false;
  }
};
```

### 4. Caching
```typescript
const cache = new Map();

const getCachedData = async (key: string) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const response = await api.get(`/endpoint/${key}`);
  
  if (response.success) {
    cache.set(key, response.data);
  }
  
  return response.data;
};
```

## Migration Checklist

- [ ] Set up backend API server
- [ ] Update `NUXT_PUBLIC_API_URL` environment variable
- [ ] Replace mock data with real $fetch calls
- [ ] Add authentication token handling
- [ ] Implement proper error handling
- [ ] Add request/response interceptors
- [ ] Set up API rate limiting
- [ ] Add request caching
- [ ] Implement retry logic
- [ ] Add API monitoring
- [ ] Write API tests
- [ ] Update documentation

## Summary

Complete API service layer with:
- ✅ 6 API modules (Product, Auth, Order, Review, Address, Error)
- ✅ Mock implementations with realistic delays
- ✅ Comprehensive error handling
- ✅ TypeScript type safety
- ✅ localStorage integration
- ✅ Ready for real backend integration
- ✅ Consistent response format
- ✅ Automatic error notifications
