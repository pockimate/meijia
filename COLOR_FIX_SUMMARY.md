# 🎨 颜色修复总结

## 需要更新的文件列表

### 已完成 ✅
1. `layouts/default.vue` - 导航栏
2. `components/ProductCard.vue` - 产品卡片
3. `components/CartDrawer.vue` - 购物车
4. `components/RecommendedProducts.vue` - 推荐产品
5. `pages/index.vue` - 首页
6. `pages/shop.vue` - 商店页
7. `pages/product/[id].vue` - 产品详情
8. `pages/wishlist.vue` - 愿望清单

### 待更新 ⚠️
1. `pages/search.vue` - 搜索页面
2. `pages/stylist.vue` - AI 造型师
3. `pages/zodiac-guide.vue` - 星座指南
4. `pages/compare.vue` - 产品对比
5. `pages/checkout.vue` - 结账页面
6. `pages/auth/login.vue` - 登录页
7. `pages/auth/register.vue` - 注册页
8. `pages/account/index.vue` - 账户页
9. `components/QuickViewModal.vue` - 快速查看
10. `components/CompareBar.vue` - 对比栏
11. `components/ReviewList.vue` - 评论列表
12. `components/ReviewForm.vue` - 评论表单

## 颜色替换规则

### 旧颜色 → 新颜色
```
bg-astro-bg → bg-white
bg-astro-card → bg-gray-50 或 bg-white
text-white → text-gray-900
text-gray-400 → text-gray-500 或 text-gray-600
text-astro-purple → text-black 或 text-gray-900
text-astro-teal → text-gray-900
text-astro-pink → text-gray-500
bg-astro-purple → bg-black
border-white/10 → border-gray-200
border-white/5 → border-gray-100
hover:text-white → hover:text-black 或 hover:opacity-50
```

### 按钮样式
```
旧: bg-astro-purple hover:bg-violet-700
新: bg-black hover:bg-zinc-800

旧: text-astro-teal hover:text-white
新: text-gray-900 hover:opacity-50
```

### 卡片样式
```
旧: bg-astro-card border border-white/10
新: bg-white border border-gray-200

旧: rounded-xl
新: 保持或移除（极简风格）
```

## 排版更新

### 字体大小
```
旧: text-2xl font-serif font-bold
新: text-2xl font-light tracking-widest uppercase

旧: text-sm
新: text-xs font-light

旧: text-base
新: text-sm font-light
```

### 字间距
```
添加: tracking-widest (标题)
添加: tracking-[0.3em] (按钮)
添加: tracking-[0.2em] (导航)
```

### 大写
```
添加: uppercase (所有标题和按钮)
```

## 下一步行动

1. 更新搜索页面 - 最重要
2. 更新 AI 造型师页面
3. 更新星座指南
4. 更新结账流程
5. 更新认证页面
6. 更新模态框组件

## 注意事项

- 保持极简风格
- 使用黑白灰为主
- 超细字体 + 宽字间距
- 移除所有圆角（或使用最小圆角）
- 移除所有发光效果
- 使用 opacity 而不是颜色变化
