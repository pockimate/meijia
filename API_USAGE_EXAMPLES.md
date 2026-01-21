# 🔌 API Usage Examples

## Quick Start

All API composables are auto-imported in Nuxt 3. Just use them directly in your components!

## Product API Examples

### Example 1: Fetch Products with Filters
```vue
<script setup lang="ts">
const { getProducts } = useProductApi();
const loading = ref(false);
const products = ref([]);

const fetchProducts = async () => {
  loading.value = true;
  
  const response = await getProducts({
    category: 'press-on',
    minPrice: 10,
    maxPrice: 50,
    minRating: 4,
    sortBy: 'price-asc',
    limit: 12,
  });
  
  if (response.success && response.data) {
    products.value = response.data.products;
  }
  
  loading.value = false;
};

onMounted(() => {
  fetchProducts();
});
</script>
```

### Example 2: Search Products
```vue
<script setup lang="ts">
const { searchProducts } = useProductApi();
const searchQuery = ref('');
const searchResults = ref([]);

const handleSearch = async () => {
  if (!searchQuery.value) return;
  
  const response = await searchProducts(searchQuery.value, 10);
  
  if (response.success && response.data) {
    searchResults.value = response.data.results;
  }
};

watch(searchQuery, debounce(handleSearch, 300));
</script>
```

### Example 3: Get Product Details
```vue
<script setup lang="ts">
const route = useRoute();
const { getProduct, getRelatedProducts } = useProductApi();

const product = ref(null);
const relatedProducts = ref([]);

const fetchProductData = async () => {
  const productId = Number(route.params.id);
  
  // Fetch product details
  const productResponse = await getProduct(productId);
  if (productResponse.success) {
    product.value = productResponse.data;
  }
  
  // Fetch related products
  const relatedResponse = await getRelatedProducts(productId, 4);
  if (relatedResponse.success) {
    relatedProducts.value = relatedResponse.data;
  }
};

onMounted(() => {
  fetchProductData();
});
</script>
```

## Authentication API Examples

### Example 4: Login Form
```vue
<script setup lang="ts">
const { login } = useAuthApi();
const { handleError } = useApiError();
const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  
  const response = await login({
    email: form.value.email,
    password: form.value.password,
  });
  
  if (response.success && response.data) {
    // Save auth data
    authStore.setUser(response.data.user);
    authStore.setToken(response.data.token);
    
    // Redirect to home
    router.push('/');
  } else {
    await handleError({
      message: response.error || 'Login failed',
      status: response.status,
    });
  }
  
  isLoading.value = false;
};
</script>
```

### Example 5: Register Form
```vue
<script setup lang="ts">
const { register } = useAuthApi();
const toastStore = useToastStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  name: '',
  zodiacSign: 'Aries',
});

const handleRegister = async () => {
  const response = await register(form.value);
  
  if (response.success) {
    toastStore.success('Account created successfully!');
    router.push('/auth/login');
  } else {
    toastStore.error(response.error || 'Registration failed');
  }
};
</script>
```

### Example 6: Update Profile
```vue
<script setup lang="ts">
const { updateProfile } = useAuthApi();
const authStore = useAuthStore();

const form = ref({
  name: authStore.user?.name || '',
  zodiacSign: authStore.user?.zodiacSign || '',
});

const handleUpdate = async () => {
  if (!authStore.user) return;
  
  const response = await updateProfile(authStore.user.id, form.value);
  
  if (response.success && response.data) {
    authStore.setUser(response.data);
    toastStore.success('Profile updated successfully!');
  }
};
</script>
```

## Order API Examples

### Example 7: Create Order
```vue
<script setup lang="ts">
const { createOrder } = useOrderApi();
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const handleCheckout = async (shippingAddress, paymentMethod) => {
  if (!authStore.user) {
    router.push('/auth/login');
    return;
  }
  
  const response = await createOrder({
    userId: authStore.user.id,
    items: cartStore.cartItems,
    subtotal: cartStore.cartTotal,
    shipping: 10,
    tax: cartStore.cartTotal * 0.1,
    total: cartStore.cartTotal + 10 + (cartStore.cartTotal * 0.1),
    shippingAddress,
    paymentMethod,
  });
  
  if (response.success && response.data) {
    cartStore.clearCart();
    router.push(`/order/${response.data.id}`);
  }
};
</script>
```

### Example 8: Get User Orders
```vue
<script setup lang="ts">
const { getUserOrders } = useOrderApi();
const authStore = useAuthStore();

const orders = ref([]);
const loading = ref(false);

const fetchOrders = async () => {
  if (!authStore.user) return;
  
  loading.value = true;
  
  const response = await getUserOrders(authStore.user.id, {
    limit: 10,
    offset: 0,
  });
  
  if (response.success && response.data) {
    orders.value = response.data.orders;
  }
  
  loading.value = false;
};

onMounted(() => {
  fetchOrders();
});
</script>
```

### Example 9: Track Order
```vue
<script setup lang="ts">
const route = useRoute();
const { getOrder } = useOrderApi();

const order = ref(null);

const fetchOrder = async () => {
  const orderId = Number(route.params.id);
  
  const response = await getOrder(orderId);
  
  if (response.success && response.data) {
    order.value = response.data;
  }
};

onMounted(() => {
  fetchOrder();
});
</script>
```

## Review API Examples

### Example 10: Get Product Reviews
```vue
<script setup lang="ts">
const { getProductReviews } = useReviewApi();

const reviews = ref([]);
const stats = ref(null);
const sortBy = ref('helpful');

const fetchReviews = async () => {
  const response = await getProductReviews(productId, {
    sortBy: sortBy.value,
    limit: 10,
  });
  
  if (response.success && response.data) {
    reviews.value = response.data.reviews;
    stats.value = {
      average: response.data.averageRating,
      distribution: response.data.ratingDistribution,
    };
  }
};

watch(sortBy, () => {
  fetchReviews();
});
</script>
```

### Example 11: Submit Review
```vue
<script setup lang="ts">
const { createReview } = useReviewApi();
const authStore = useAuthStore();

const form = ref({
  rating: 5,
  comment: '',
  images: [],
});

const handleSubmit = async () => {
  if (!authStore.user) return;
  
  const response = await createReview({
    productId: props.productId,
    userId: authStore.user.id,
    rating: form.value.rating,
    comment: form.value.comment,
    images: form.value.images,
  });
  
  if (response.success) {
    toastStore.success('Review submitted successfully!');
    form.value = { rating: 5, comment: '', images: [] };
    emit('review-added');
  }
};
</script>
```

### Example 12: Like Review
```vue
<script setup lang="ts">
const { likeReview, unlikeReview } = useReviewApi();

const isLiked = ref(false);

const toggleLike = async (reviewId: number) => {
  const response = isLiked.value
    ? await unlikeReview(reviewId)
    : await likeReview(reviewId);
  
  if (response.success) {
    isLiked.value = !isLiked.value;
  }
};
</script>
```

## Address API Examples

### Example 13: Get User Addresses
```vue
<script setup lang="ts">
const { getUserAddresses } = useAddressApi();
const authStore = useAuthStore();

const addresses = ref([]);

const fetchAddresses = async () => {
  if (!authStore.user) return;
  
  const response = await getUserAddresses(authStore.user.id);
  
  if (response.success && response.data) {
    addresses.value = response.data;
  }
};

onMounted(() => {
  fetchAddresses();
});
</script>
```

### Example 14: Add New Address
```vue
<script setup lang="ts">
const { createAddress } = useAddressApi();
const authStore = useAuthStore();

const form = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  isDefault: false,
});

const handleSubmit = async () => {
  if (!authStore.user) return;
  
  const response = await createAddress({
    userId: authStore.user.id,
    ...form.value,
  });
  
  if (response.success) {
    toastStore.success('Address added successfully!');
    emit('address-added');
  }
};
</script>
```

### Example 15: Set Default Address
```vue
<script setup lang="ts">
const { setDefaultAddress } = useAddressApi();
const authStore = useAuthStore();

const handleSetDefault = async (addressId: number) => {
  if (!authStore.user) return;
  
  const response = await setDefaultAddress(authStore.user.id, addressId);
  
  if (response.success) {
    toastStore.success('Default address updated!');
    emit('refresh');
  }
};
</script>
```

## Error Handling Examples

### Example 16: Global Error Handler
```vue
<script setup lang="ts">
const { handleError, isAuthError, isNetworkError } = useApiError();

const fetchData = async () => {
  const response = await api.get('/endpoint');
  
  if (!response.success) {
    const error = {
      message: response.error,
      status: response.status,
    };
    
    // Check error type
    if (isAuthError(error)) {
      // Will auto-redirect to login
      await handleError(error);
    } else if (isNetworkError(error)) {
      // Show retry button
      showRetryButton.value = true;
      await handleError(error, false); // Don't show toast
    } else {
      // Show error toast
      await handleError(error);
    }
  }
};
</script>
```

### Example 17: Custom Error Handling
```vue
<script setup lang="ts">
const { createError } = useApiError();

const validateForm = () => {
  if (!form.value.email) {
    const error = createError(
      'Email is required',
      422,
      'VALIDATION_ERROR',
      { field: 'email' }
    );
    
    handleError(error);
    return false;
  }
  
  return true;
};
</script>
```

## Advanced Patterns

### Example 18: Pagination
```vue
<script setup lang="ts">
const { getProducts } = useProductApi();

const page = ref(1);
const pageSize = ref(12);
const products = ref([]);
const total = ref(0);

const fetchPage = async () => {
  const response = await getProducts({
    limit: pageSize.value,
    offset: (page.value - 1) * pageSize.value,
  });
  
  if (response.success && response.data) {
    products.value = response.data.products;
    total.value = response.data.total;
  }
};

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

watch(page, () => {
  fetchPage();
});
</script>
```

### Example 19: Infinite Scroll
```vue
<script setup lang="ts">
const { getProducts } = useProductApi();

const products = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);

const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  
  loading.value = true;
  
  const response = await getProducts({
    limit: 12,
    offset: (page.value - 1) * 12,
  });
  
  if (response.success && response.data) {
    products.value.push(...response.data.products);
    hasMore.value = response.data.products.length === 12;
    page.value++;
  }
  
  loading.value = false;
};

// Use with intersection observer or scroll event
</script>
```

### Example 20: Caching
```vue
<script setup lang="ts">
const { getProduct } = useProductApi();

const cache = new Map();

const getCachedProduct = async (id: number) => {
  // Check cache first
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  // Fetch from API
  const response = await getProduct(id);
  
  if (response.success && response.data) {
    // Store in cache
    cache.set(id, response.data);
    return response.data;
  }
  
  return null;
};
</script>
```

## Tips & Best Practices

### 1. Always Check Response Success
```typescript
const response = await api.get('/endpoint');

if (response.success && response.data) {
  // Use response.data
} else {
  // Handle error
  console.error(response.error);
}
```

### 2. Use Loading States
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

### 3. Handle Errors Gracefully
```typescript
const { handleError } = useApiError();

const response = await api.get('/endpoint');

if (!response.success) {
  await handleError({
    message: response.error,
    status: response.status,
  });
}
```

### 4. Use TypeScript Types
```typescript
import type { Product } from '~/types';

const products = ref<Product[]>([]);

const response = await api.get<Product[]>('/products');

if (response.success && response.data) {
  products.value = response.data;
}
```

### 5. Debounce Search Inputs
```typescript
import { debounce } from 'lodash-es';

const searchQuery = ref('');

const handleSearch = debounce(async () => {
  const response = await searchProducts(searchQuery.value);
  // Handle response
}, 300);

watch(searchQuery, handleSearch);
```

## Summary

Complete API usage examples covering:
- ✅ Product fetching and searching
- ✅ Authentication flows
- ✅ Order management
- ✅ Review system
- ✅ Address management
- ✅ Error handling
- ✅ Advanced patterns (pagination, caching, infinite scroll)
- ✅ Best practices and tips
