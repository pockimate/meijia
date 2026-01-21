# 🔐 Admin Panel Documentation

## Overview
Complete admin dashboard for managing the Astro Nails e-commerce platform. Includes order management, product management, user management, and analytics dashboard.

## Access

### Demo Credentials
```
Email: admin@astronails.com
Password: admin123
```

### Login URL
```
http://localhost:3000/admin/login
```

## Features

### 1. Dashboard (`/admin/dashboard`)
Main analytics and overview page with:

#### Statistics Cards
- **Total Revenue** 💰
  - Shows total revenue from all orders
  - Today's revenue
  - Growth percentage
  
- **Total Orders** 📦
  - Total number of orders
  - Orders today
  - Growth percentage
  
- **Total Users** 👥
  - Total registered users
  - New users today
  - Growth percentage
  
- **Average Order Value** 📊
  - Average order value calculation
  - Total products count

#### Sales Chart
- Last 7 days sales overview
- Visual bar chart showing daily revenue
- Order count per day
- Interactive hover states

#### Recent Orders
- 5 most recent orders
- Order number, date, total
- Status indicator
- Quick link to order details

#### Quick Actions
- **Manage Orders** - Navigate to orders page
- **Manage Products** - Navigate to products page
- **Manage Users** - Navigate to users page

### 2. Orders Management (`/admin/orders`)

#### Features
- **Order List Table**
  - Order number
  - Date and time
  - Customer name
  - Number of items
  - Total amount
  - Status
  - Actions

- **Filters**
  - Filter by status (All, Pending, Processing, Shipped, Delivered, Cancelled)
  - Search by order number or customer name
  - Apply/Reset filters

- **Status Management**
  - Update order status directly from dropdown
  - Real-time status updates
  - Color-coded status indicators:
    - 🟡 Pending - Yellow
    - 🔵 Processing - Blue
    - 🟣 Shipped - Purple
    - 🟢 Delivered - Green
    - 🔴 Cancelled - Red

- **Pagination**
  - 10 orders per page
  - Previous/Next navigation
  - Page counter

- **Actions**
  - View order details (links to customer order page)
  - Update status inline

### 3. Products Management (`/admin/products`)

#### Features
- **Product Grid**
  - Product image
  - Product name and category
  - Price
  - Rating and review count
  - Product ID
  - Badge (if applicable)

- **Actions** (UI only - not functional in demo)
  - Add new product
  - Edit product
  - Delete product

- **Product Display**
  - 3-column grid on desktop
  - 2-column on tablet
  - 1-column on mobile
  - Hover effects

### 4. Users Management (`/admin/users`)

#### Features
- **User Statistics**
  - Total users count
  - Active users count
  - New users this month

- **User Table**
  - User avatar and name
  - Email address
  - Zodiac sign
  - Number of orders
  - Total spent
  - Account status
  - Join date

- **User Data**
  - Mock user data for demonstration
  - Realistic user profiles
  - Order history integration

## Store: admin.ts

### State
```typescript
{
  isAdmin: boolean,
  adminUser: any,
  stats: AdminStats | null,
  salesData: SalesData[],
  recentOrders: any[],
}
```

### AdminStats Interface
```typescript
{
  totalOrders: number,
  totalRevenue: number,
  totalUsers: number,
  totalProducts: number,
  ordersToday: number,
  revenueToday: number,
  newUsersToday: number,
  averageOrderValue: number,
}
```

### Actions
- `initAdmin()` - Load admin data from localStorage
- `adminLogin(email, password)` - Authenticate admin
- `adminLogout()` - Clear admin session
- `loadStats()` - Load dashboard statistics
- `generateSalesData(orders)` - Generate sales chart data
- `updateOrderStatus(orderId, status)` - Update order status

### Getters
- `isAuthenticated` - Check if admin is logged in
- `todayGrowth` - Calculate today's growth percentages

## Middleware: admin.ts

### Purpose
Protect admin routes from unauthorized access

### Functionality
- Checks for admin authentication in localStorage
- Redirects to login if not authenticated
- Runs only on client-side

### Usage
```typescript
definePageMeta({
  middleware: 'admin',
});
```

## Data Sources

### Orders
- Loaded from `localStorage` (`astro_orders`)
- Real-time updates
- Persistent across sessions

### Products
- Loaded from `data/products.ts`
- Static product catalog
- 24 products total

### Users
- Mock data for demonstration
- Realistic user profiles
- Can be replaced with real API

### Statistics
- Calculated from real order data
- Today's metrics
- Growth percentages
- Sales trends

## Security

### Authentication
- Simple email/password authentication
- Session stored in localStorage
- Protected routes with middleware

### Demo Limitations
- ⚠️ Not production-ready
- ⚠️ No real authentication
- ⚠️ No password hashing
- ⚠️ No role-based access control
- ⚠️ No audit logging

### Production Requirements
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based permissions
- ✅ Audit logging
- ✅ Session management
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ 2FA support

## Styling

### Theme
- Consistent with main site theme
- Dark mode design
- Cosmic color palette
- Gradient accents

### Components
- Responsive tables
- Interactive charts
- Status badges
- Action buttons
- Filter controls

### Colors
- **Primary**: Astro Purple (#8B5CF6)
- **Secondary**: Astro Teal (#14B8A6)
- **Background**: Dark (#0A0A0F)
- **Card**: Dark Card (#1A1A24)
- **Border**: White/10% opacity

## Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Multi-column layouts
- Expanded tables
- Large charts

### Tablet (768px - 1023px)
- Collapsed sidebar
- 2-column grids
- Scrollable tables
- Medium charts

### Mobile (< 768px)
- Bottom navigation
- Single column
- Card-based layouts
- Compact tables

## Usage Examples

### Check Admin Status
```typescript
const adminStore = useAdminStore();

if (adminStore.isAuthenticated) {
  // Admin is logged in
}
```

### Load Dashboard Data
```typescript
const adminStore = useAdminStore();

await adminStore.loadStats();

console.log(adminStore.stats);
console.log(adminStore.salesData);
console.log(adminStore.recentOrders);
```

### Update Order Status
```typescript
const adminStore = useAdminStore();

const success = await adminStore.updateOrderStatus(orderId, 'shipped');

if (success) {
  // Status updated
}
```

### Logout
```typescript
const adminStore = useAdminStore();

adminStore.adminLogout();
router.push('/admin/login');
```

## Future Enhancements

### Phase 1: Core Features
- [ ] Real authentication API
- [ ] Product CRUD operations
- [ ] User management actions
- [ ] Bulk order operations
- [ ] Export data (CSV, PDF)

### Phase 2: Advanced Features
- [ ] Advanced analytics
- [ ] Sales reports
- [ ] Inventory management
- [ ] Customer segmentation
- [ ] Email notifications
- [ ] Discount code management

### Phase 3: Enterprise Features
- [ ] Multi-admin support
- [ ] Role-based permissions
- [ ] Activity logs
- [ ] API rate limiting
- [ ] Webhook management
- [ ] Integration marketplace

## Testing

### Manual Testing Checklist
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] View dashboard statistics
- [ ] Navigate between pages
- [ ] Filter orders by status
- [ ] Search orders
- [ ] Update order status
- [ ] View order details
- [ ] Browse products
- [ ] View users
- [ ] Logout

### Test Scenarios

#### Scenario 1: Admin Login
1. Navigate to `/admin/login`
2. Enter demo credentials
3. Click "Sign In"
4. Verify redirect to dashboard
5. Verify admin data in localStorage

#### Scenario 2: Order Management
1. Navigate to `/admin/orders`
2. View order list
3. Filter by status
4. Search for order
5. Update order status
6. Verify status change
7. View order details

#### Scenario 3: Dashboard Analytics
1. Navigate to `/admin/dashboard`
2. View statistics cards
3. Check sales chart
4. View recent orders
5. Click quick actions
6. Verify navigation

## Troubleshooting

### Issue: Can't login
**Solution**: Use demo credentials exactly as shown:
- Email: `admin@astronails.com`
- Password: `admin123`

### Issue: Dashboard shows no data
**Solution**: 
1. Add some orders from the main store
2. Refresh the dashboard
3. Data is loaded from localStorage

### Issue: Redirected to login
**Solution**: 
1. Check if admin session exists in localStorage
2. Login again
3. Session expires on logout

### Issue: Order status not updating
**Solution**:
1. Check browser console for errors
2. Verify order exists in localStorage
3. Refresh the page

## API Integration (Future)

### Endpoints Needed

#### Authentication
```
POST /api/admin/login
POST /api/admin/logout
GET  /api/admin/me
```

#### Dashboard
```
GET /api/admin/stats
GET /api/admin/sales-data
GET /api/admin/recent-orders
```

#### Orders
```
GET    /api/admin/orders
GET    /api/admin/orders/:id
PATCH  /api/admin/orders/:id/status
DELETE /api/admin/orders/:id
```

#### Products
```
GET    /api/admin/products
POST   /api/admin/products
GET    /api/admin/products/:id
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
```

#### Users
```
GET    /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id
```

## Summary

Complete admin panel with:
- ✅ Dashboard with analytics
- ✅ Order management with status updates
- ✅ Product catalog view
- ✅ User management view
- ✅ Authentication system
- ✅ Protected routes
- ✅ Responsive design
- ✅ Real-time data from localStorage
- ✅ Ready for API integration
