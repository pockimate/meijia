# 🚀 在 Vercel 导入项目 - 详细步骤

## ✅ 第 1 步已完成：代码已推送到 GitHub

你的代码现在在：https://github.com/pockimate/meijia

---

## 🎯 第 2 步：在 Vercel 导入项目

### 1. 访问 Vercel

打开浏览器，访问：**https://vercel.com/new**

如果还没登录，请先登录（推荐使用 GitHub 登录）

---

### 2. 导入 Git 仓库

你会看到 "Import Git Repository" 页面

#### 选项 A：如果看到你的仓库
- 在列表中找到 `pockimate/meijia`
- 点击 "Import" 按钮

#### 选项 B：如果没看到仓库
1. 点击 "Add GitHub Account" 或 "Adjust GitHub App Permissions"
2. 授权 Vercel 访问你的 GitHub 仓库
3. 选择 "All repositories" 或选择 `meijia` 仓库
4. 点击 "Install"
5. 返回 Vercel，刷新页面
6. 现在应该能看到 `pockimate/meijia` 了

---

### 3. 配置项目

导入后，你会看到配置页面：

#### 项目设置（通常不需要修改）

```
Project Name: meijia
Framework Preset: Nuxt.js (自动检测)
Root Directory: nuxt-version (重要！)
Build Command: npm run build (自动)
Output Directory: .output/public (自动)
Install Command: npm install (自动)
```

#### ⚠️ 重要：设置 Root Directory

因为你的 Nuxt 项目在 `nuxt-version` 文件夹中：

1. 找到 "Root Directory" 设置
2. 点击 "Edit"
3. 输入：`nuxt-version`
4. 点击 "Continue"

---

### 4. 环境变量（可选）

如果需要 API 密钥，点击 "Environment Variables" 添加：

```
Name: NUXT_PUBLIC_GEMINI_API_KEY
Value: 你的 Gemini API 密钥（如果有）
```

**对于演示项目，可以跳过这一步**

---

### 5. 部署

点击 **"Deploy"** 按钮

---

## ⏱️ 第 3 步：等待部署完成

### 部署过程（约 2-3 分钟）

你会看到实时日志：

```
1. Cloning repository...
2. Installing dependencies...
3. Building application...
4. Deploying to production...
```

### 成功标志

当你看到：
```
✅ Deployment Ready
🎉 Your project is live!
```

---

## 🎊 第 4 步：访问你的网站

部署完成后，你会看到：

### 网站地址
```
https://meijia.vercel.app
或
https://meijia-pockimate.vercel.app
```

点击链接访问你的网站！

---

## 📊 部署后检查

### 1. 测试功能
- [ ] 首页加载正常
- [ ] 导航菜单工作
- [ ] 产品列表显示
- [ ] 购物车功能
- [ ] 搜索功能
- [ ] 多语言切换
- [ ] 移动端响应式

### 2. 测试 Demo 账号

**管理员登录**：
- 访问：https://你的域名.vercel.app/admin/login
- Email: `admin@astronails.com`
- Password: `admin123`

**用户登录**：
- 访问：https://你的域名.vercel.app/auth/login
- Email: `test@example.com`
- Password: `password123`

### 3. 测试优惠券
- `WELCOME10` - 10% off
- `SAVE20` - 20% off orders over $50
- `FREESHIP` - Free shipping

---

## 🔧 部署后配置

### 1. 自定义域名（可选）

在 Vercel 项目设置中：
1. 点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS

### 2. 环境变量

如果需要添加 API 密钥：
1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加变量
4. 重新部署

### 3. 查看分析

在 Vercel 仪表板查看：
- 访问量
- 性能指标
- 错误日志
- 带宽使用

---

## 🔄 自动部署已配置

现在，每次你推送代码到 GitHub：

```bash
# 修改代码
git add .
git commit -m "Update feature"
git push

# Vercel 自动部署 ✅
```

---

## 🐛 常见问题

### 问题 1: 找不到仓库

**解决方案**：
1. 确保已授权 Vercel 访问 GitHub
2. 在 GitHub 设置中检查 Vercel 应用权限
3. 刷新 Vercel 页面

### 问题 2: 构建失败

**解决方案**：
1. 检查 Root Directory 是否设置为 `nuxt-version`
2. 查看构建日志找到错误
3. 确保本地 `npm run build` 成功

### 问题 3: 页面 404

**解决方案**：
1. 确保 Root Directory 正确
2. 检查 Output Directory 是否为 `.output/public`
3. 查看部署日志

### 问题 4: 环境变量不生效

**解决方案**：
1. 确保变量名以 `NUXT_PUBLIC_` 开头
2. 添加变量后需要重新部署
3. 检查变量值是否正确

---

## 📱 分享你的网站

部署成功后，你可以：

1. **分享链接**：
   ```
   https://meijia.vercel.app
   ```

2. **展示功能**：
   - 18 个完整功能
   - 购物车、支付、认证
   - 多语言、多货币
   - 管理后台
   - AI 造型师

3. **提供 Demo 账号**：
   - Admin: admin@astronails.com / admin123
   - User: test@example.com / password123

---

## 🎉 恭喜！

你的 Astro Nails 网站现在已经在线了！

**下一步**：
1. 测试所有功能
2. 分享给朋友
3. 收集反馈
4. 持续优化

---

## 📞 需要帮助？

如果遇到任何问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台
3. 告诉我具体错误信息

**祝你部署顺利！** 🚀
