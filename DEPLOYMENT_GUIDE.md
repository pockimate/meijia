# 🚀 部署指南 - Astro Nails

## 📋 部署选项对比

### 选项 1: Vercel（推荐）✨
**是否需要新账号**: 可以使用同一个账号，每个项目独立  
**免费额度**: 非常慷慨  
**优点**: 
- ✅ 一个账号可以部署多个项目
- ✅ 每个项目有独立的域名
- ✅ 自动 CI/CD
- ✅ 零配置部署 Nuxt
- ✅ 全球 CDN
- ✅ 自动 HTTPS

**免费计划限制**:
- 100 GB 带宽/月
- 无限项目
- 自动 SSL
- 自定义域名支持

### 选项 2: Netlify
**是否需要新账号**: 可以使用同一个账号，每个项目独立  
**免费额度**: 慷慨  
**优点**:
- ✅ 一个账号多个项目
- ✅ 每个项目独立域名
- ✅ 自动部署
- ✅ 表单处理
- ✅ 函数支持

**免费计划限制**:
- 100 GB 带宽/月
- 300 分钟构建时间/月
- 无限项目

### 选项 3: Cloudflare Pages
**是否需要新账号**: 可以使用同一个账号  
**免费额度**: 非常慷慨  
**优点**:
- ✅ 一个账号无限项目
- ✅ 无限带宽
- ✅ 无限请求
- ✅ 全球 CDN

### 选项 4: GitHub Pages（不推荐 Nuxt）
**说明**: 仅支持静态站点，Nuxt SSR 功能受限

---

## 🎯 推荐方案：Vercel

**为什么选择 Vercel**:
1. **一个账号管理所有项目** - 不需要多个账号
2. **项目完全独立** - 每个项目有自己的：
   - 独立域名（如 `astro-nails.vercel.app`）
   - 独立环境变量
   - 独立构建设置
   - 独立分析数据
3. **完美支持 Nuxt 3** - 零配置
4. **免费额度足够** - 个人项目完全够用

---

## 📦 方案 A: 使用现有 Vercel 账号（推荐）

### 优点
- ✅ 不需要注册新账号
- ✅ 统一管理所有项目
- ✅ 一个仪表板查看所有网站
- ✅ 共享团队成员（如果有）

### 项目隔离
即使使用同一个账号，每个项目也是完全独立的：

```
你的 Vercel 账号
├── 项目 1: my-blog (my-blog.vercel.app)
├── 项目 2: portfolio (portfolio.vercel.app)
└── 项目 3: astro-nails (astro-nails.vercel.app) ← 新项目
```

### 部署步骤

#### 1. 准备 Git 仓库
```bash
cd nuxt-version

# 初始化 Git（如果还没有）
git init

# 添加 .gitignore
echo "node_modules
.nuxt
.output
.env
.DS_Store
dist
coverage" > .gitignore

# 提交代码
git add .
git commit -m "Initial commit: Astro Nails e-commerce"

# 推送到 GitHub（创建新仓库）
# 在 GitHub 创建新仓库: astro-nails
git remote add origin https://github.com/你的用户名/astro-nails.git
git branch -M main
git push -u origin main
```

#### 2. 在 Vercel 部署

**方式 1: 通过 Vercel 网站（推荐）**

1. 访问 https://vercel.com
2. 登录你的现有账号
3. 点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 选择你的 `astro-nails` 仓库
6. Vercel 会自动检测到 Nuxt 3
7. 点击 "Deploy"

**方式 2: 通过 Vercel CLI**

```bash
# 安装 Vercel CLI（全局）
npm install -g vercel

# 登录（使用现有账号）
vercel login

# 部署
vercel

# 按提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - What's your project's name? astro-nails
# - In which directory is your code located? ./
# - Want to override the settings? No
```

#### 3. 配置环境变量（如果需要）

在 Vercel 项目设置中添加：
```
NUXT_PUBLIC_API_URL=https://your-api.com
NUXT_PUBLIC_API_KEY=your-key
```

#### 4. 自定义域名（可选）

在 Vercel 项目设置 → Domains 中添加：
- 免费域名：`astro-nails.vercel.app`
- 自定义域名：`www.astronails.com`（需要购买域名）

---

## 📦 方案 B: 创建新的 Vercel 账号

### 何时选择
- 想要完全独立的账号
- 用于不同的客户/公司
- 需要独立的计费

### 步骤

1. **注册新账号**
   - 访问 https://vercel.com/signup
   - 使用不同的邮箱注册
   - 或使用 GitHub/GitLab/Bitbucket 的不同账号

2. **部署流程**
   - 与方案 A 相同
   - 使用新账号登录

---

## 🔧 部署配置文件

### 创建 `vercel.json`（可选）

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.ts",
      "use": "@nuxtjs/vercel-builder"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### 更新 `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  // ... 现有配置

  // 生产环境配置
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }
  },

  // Vercel 优化
  nitro: {
    preset: 'vercel',
  },
})
```

---

## 📊 部署后检查清单

### 1. 功能测试
- [ ] 首页加载正常
- [ ] 所有路由可访问
- [ ] 购物车功能正常
- [ ] 用户认证正常
- [ ] 图片加载正常
- [ ] 多语言切换正常
- [ ] 移动端响应式正常

### 2. 性能检查
- [ ] Lighthouse 分数 > 90
- [ ] 首屏加载 < 3秒
- [ ] 图片优化正常
- [ ] CDN 缓存生效

### 3. SEO 检查
- [ ] Meta 标签正确
- [ ] 结构化数据存在
- [ ] Sitemap 可访问
- [ ] Robots.txt 正确

---

## 🌐 域名配置

### 使用 Vercel 免费域名
```
https://astro-nails.vercel.app
https://astro-nails-你的用户名.vercel.app
```

### 使用自定义域名

#### 1. 购买域名
推荐域名注册商：
- Namecheap
- GoDaddy
- Cloudflare Registrar
- 阿里云（国内）

#### 2. 在 Vercel 添加域名
1. 进入项目设置 → Domains
2. 添加你的域名：`www.astronails.com`
3. 按照提示配置 DNS

#### 3. DNS 配置
在域名注册商添加记录：
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
```

或使用 A 记录：
```
类型: A
名称: @
值: 76.76.21.21
```

---

## 🔄 自动部署（CI/CD）

### GitHub 集成（推荐）

Vercel 会自动：
1. **监听 Git 推送** - 每次 push 自动部署
2. **预览部署** - 每个 PR 创建预览环境
3. **生产部署** - main 分支自动部署到生产

```bash
# 开发流程
git checkout -b feature/new-feature
# 修改代码
git commit -m "Add new feature"
git push origin feature/new-feature
# 创建 PR → Vercel 自动创建预览
# 合并 PR → 自动部署到生产
```

---

## 💰 费用对比

### Vercel 免费计划
- ✅ 无限项目
- ✅ 100 GB 带宽/月
- ✅ 6,000 分钟构建时间/月
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自定义域名

**足够个人项目使用！**

### 升级到 Pro（可选）
- $20/月
- 1 TB 带宽
- 24,000 分钟构建时间
- 优先支持

---

## 🎯 推荐部署方案

### 对于你的情况

**推荐：使用现有 Vercel 账号 + 新项目**

**原因**：
1. ✅ 不需要注册新账号
2. ✅ 统一管理所有项目
3. ✅ 项目完全独立（独立域名、环境变量）
4. ✅ 免费额度足够
5. ✅ 一个仪表板管理

**项目隔离保证**：
- 每个项目有独立的 URL
- 独立的环境变量
- 独立的构建设置
- 独立的分析数据
- 互不影响

---

## 📝 快速部署命令

```bash
# 1. 准备代码
cd nuxt-version
git init
git add .
git commit -m "Initial commit"

# 2. 推送到 GitHub
# 在 GitHub 创建新仓库后
git remote add origin https://github.com/你的用户名/astro-nails.git
git push -u origin main

# 3. 部署到 Vercel
vercel login  # 使用现有账号登录
vercel        # 部署

# 完成！
```

---

## 🆘 常见问题

### Q: 一个账号可以部署多少个项目？
**A**: Vercel 免费计划支持无限项目。

### Q: 每个项目的域名会冲突吗？
**A**: 不会。每个项目有独立的域名，如：
- `project1.vercel.app`
- `project2.vercel.app`
- `astro-nails.vercel.app`

### Q: 项目之间会互相影响吗？
**A**: 不会。每个项目完全独立：
- 独立的代码库
- 独立的环境变量
- 独立的构建
- 独立的流量统计

### Q: 需要付费吗？
**A**: 免费计划足够个人项目使用。只有当流量很大或需要高级功能时才需要升级。

### Q: 如何删除项目？
**A**: 在 Vercel 仪表板中，进入项目设置 → 删除项目。不影响其他项目。

---

## 🎉 总结

**最佳方案**：
1. ✅ 使用现有 Vercel 账号
2. ✅ 创建新项目 "astro-nails"
3. ✅ 推送代码到 GitHub
4. ✅ 在 Vercel 导入项目
5. ✅ 自动部署完成

**优点**：
- 不需要新账号
- 项目完全独立
- 免费且功能强大
- 自动 CI/CD
- 全球 CDN

**下一步**：
准备好了吗？我可以帮你创建部署所需的配置文件！

---

**部署时间**: 约 5-10 分钟  
**难度**: ⭐⭐☆☆☆ (简单)  
**费用**: 免费
