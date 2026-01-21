# 🚀 部署到 Vercel - 完整步骤

## 📋 准备工作

### 1. 确保你有以下账号：
- ✅ GitHub 账号
- ✅ Vercel 账号（可以用 GitHub 登录）

---

## 🎯 方法 1: 使用 Vercel CLI（推荐，最快）

### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel

```bash
vercel login
```

选择登录方式（推荐 GitHub）

### 步骤 3: 部署

```bash
cd nuxt-version
vercel
```

按照提示操作：
```
? Set up and deploy "~/nuxt-version"? [Y/n] Y
? Which scope do you want to deploy to? 选择你的账号
? Link to existing project? [y/N] N
? What's your project's name? astro-nails
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### 步骤 4: 等待部署完成

```
✅ Production: https://astro-nails.vercel.app
```

**完成！** 🎉

---

## 🎯 方法 2: 通过 GitHub + Vercel 网站（推荐，自动 CI/CD）

### 步骤 1: 初始化 Git 仓库

```bash
cd nuxt-version

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Astro Nails e-commerce platform"
```

### 步骤 2: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`astro-nails`
3. 描述：`Cosmic nail art e-commerce platform`
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize with README"
6. 点击 "Create repository"

### 步骤 3: 推送代码到 GitHub

```bash
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/astro-nails.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 4: 在 Vercel 导入项目

1. 访问 https://vercel.com
2. 点击 "Add New..." → "Project"
3. 选择 "Import Git Repository"
4. 找到并选择 `astro-nails` 仓库
5. 点击 "Import"

### 步骤 5: 配置项目（通常不需要修改）

Vercel 会自动检测到 Nuxt 3：
```
Framework Preset: Nuxt.js
Build Command: npm run build
Output Directory: .output/public
Install Command: npm install
```

### 步骤 6: 部署

点击 "Deploy" 按钮

等待 2-3 分钟...

**完成！** 🎉

---

## 🔧 部署后配置

### 1. 查看部署状态

访问你的项目：
```
https://astro-nails.vercel.app
或
https://astro-nails-你的用户名.vercel.app
```

### 2. 配置环境变量（可选）

如果需要 API 密钥：

1. 进入项目设置 → Environment Variables
2. 添加变量：
```
NUXT_PUBLIC_GEMINI_API_KEY=你的密钥
NUXT_PUBLIC_API_URL=https://your-api.com
```

### 3. 配置自定义域名（可选）

1. 进入项目设置 → Domains
2. 添加你的域名
3. 按照提示配置 DNS

---

## 🔄 自动部署设置

### GitHub 集成（已自动配置）

每次推送代码到 GitHub，Vercel 会自动部署：

```bash
# 修改代码
git add .
git commit -m "Update feature"
git push

# Vercel 自动部署 ✅
```

### 预览部署

创建 Pull Request 时，Vercel 会自动创建预览环境：

```bash
git checkout -b feature/new-feature
# 修改代码
git push origin feature/new-feature
# 在 GitHub 创建 PR
# Vercel 自动创建预览 URL ✅
```

---

## 📊 部署检查清单

部署完成后，检查以下内容：

### 功能测试
- [ ] 首页加载正常
- [ ] 导航菜单工作
- [ ] 产品列表显示
- [ ] 产品详情页正常
- [ ] 购物车功能正常
- [ ] 搜索功能正常
- [ ] 多语言切换正常
- [ ] 移动端响应式正常

### 性能测试
- [ ] 运行 Lighthouse 测试
- [ ] 检查 Core Web Vitals
- [ ] 查看控制台无错误

### SEO 检查
- [ ] Meta 标签正确
- [ ] Open Graph 标签存在
- [ ] 结构化数据正确

---

## 🐛 常见问题

### 问题 1: 构建失败

**错误**: `Build failed`

**解决方案**:
```bash
# 本地测试构建
npm run build

# 如果本地成功，检查 Vercel 日志
# 通常是依赖问题
```

### 问题 2: 页面 404

**错误**: 某些页面显示 404

**解决方案**:
检查 `nuxt.config.ts` 中的路由配置

### 问题 3: 环境变量不生效

**错误**: API 调用失败

**解决方案**:
1. 确保在 Vercel 设置中添加了环境变量
2. 变量名必须以 `NUXT_PUBLIC_` 开头
3. 重新部署项目

### 问题 4: 图片不显示

**错误**: 图片 404

**解决方案**:
确保图片路径正确，使用相对路径或 CDN

---

## 📈 监控和分析

### Vercel Analytics

1. 进入项目设置 → Analytics
2. 启用 Analytics
3. 查看：
   - 页面浏览量
   - 性能指标
   - 用户地理位置

### 性能监控

查看 Vercel 仪表板：
- 构建时间
- 部署历史
- 带宽使用
- 错误日志

---

## 🎯 下一步

### 1. 设置自定义域名

```
免费域名: astro-nails.vercel.app
自定义域名: www.astronails.com
```

### 2. 配置 SSL（自动）

Vercel 自动提供 HTTPS

### 3. 设置 CI/CD

已自动配置，每次 push 自动部署

### 4. 监控性能

使用 Vercel Analytics 或 Google Analytics

---

## 💡 专业提示

### 1. 使用环境分支

```bash
# 开发分支
git checkout -b develop
git push origin develop

# 在 Vercel 设置中配置：
# develop 分支 → 开发环境
# main 分支 → 生产环境
```

### 2. 预览部署

每个 PR 都会创建预览 URL，方便测试

### 3. 回滚部署

如果新版本有问题：
1. 进入 Vercel 仪表板
2. 选择之前的部署
3. 点击 "Promote to Production"

### 4. 性能优化

- 启用 Vercel Edge Network
- 使用 Image Optimization
- 配置缓存策略

---

## 🎉 完成！

你的 Astro Nails 网站现在已经部署到 Vercel！

**访问地址**: https://astro-nails.vercel.app

**管理面板**: https://vercel.com/dashboard

**下一步**:
1. 分享你的网站链接
2. 监控性能和流量
3. 持续优化和更新

---

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Nuxt 文档: https://nuxt.com/docs
- 社区支持: https://github.com/vercel/vercel/discussions

**祝你部署顺利！** 🚀
