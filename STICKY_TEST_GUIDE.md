# Sticky Positioning - 测试指南

## 🎯 快速测试步骤

---

## 步骤 1: 打开产品页面

```
URL: http://localhost:3000/product/1
```

**预期:** 页面正常加载，显示产品图片和信息

---

## 步骤 2: 检查浏览器控制台

按 `F12` 打开开发者工具，切换到 Console 标签。

**预期输出:**
```
✅ Sticky element mounted: <div>
Position: sticky
Top: 40px
```

**如果看到警告:**
```
⚠️ Found interfering element: ...
```
→ 说明有 transform 干扰，但我们已经修复了，应该不会出现

---

## 步骤 3: 测试滚动效果

### 桌面端测试

1. **初始状态**
   - 左侧: 产品图片可见
   - 右侧: 产品信息可见
   - 两者并排显示

2. **向下滚动**
   - 左侧图片应该 **保持在原位** (距离顶部 40px)
   - 右侧内容正常滚动
   - 图片始终可见

3. **继续滚动到底部**
   - 左侧图片仍然可见
   - 右侧显示底部内容 (相关产品等)

**✅ 成功标志:**
- 左侧图片像"粘"在屏幕上一样
- 右侧内容独立滚动
- 无跳动、闪烁或延迟

**❌ 失败标志:**
- 图片跟着内容一起滚走
- 图片消失在视口外
- 滚动时有跳动

---

## 步骤 4: 测试移动端响应式

### 方法 1: 浏览器 DevTools

1. 按 `F12` 打开开发者工具
2. 按 `Ctrl+Shift+M` 切换到设备模式
3. 选择 "iPhone 12 Pro" 或 "Pixel 5"
4. 刷新页面

### 方法 2: 调整浏览器窗口

1. 拖动浏览器窗口边缘
2. 缩小到宽度 < 1024px
3. 观察布局变化

**预期结果:**
- ✅ 布局变为垂直 (图片在上，信息在下)
- ✅ Sticky 效果禁用
- ✅ 正常上下滚动
- ✅ 无横向滚动条

---

## 步骤 5: 运行诊断脚本

复制以下脚本到浏览器控制台:

```javascript
// 完整诊断
console.log('=== Sticky Diagnostic ===\n');

const stickyEl = document.querySelector('[style*="position"]');
if (stickyEl) {
  console.log('✅ Sticky element found');
  console.log('Position:', window.getComputedStyle(stickyEl).position);
  console.log('Top:', window.getComputedStyle(stickyEl).top);
} else {
  console.error('❌ Sticky element NOT found');
}

const scrollContainer = document.querySelector('[style*="overflow-y: auto"]');
if (scrollContainer) {
  console.log('✅ Scroll container found');
  console.log('Height:', window.getComputedStyle(scrollContainer).height);
  console.log('Overflow:', window.getComputedStyle(scrollContainer).overflowY);
} else {
  console.error('❌ Scroll container NOT found');
}

// 检查 transform 干扰
let el = stickyEl;
let hasInterference = false;
while (el && el !== document.body) {
  const style = window.getComputedStyle(el);
  if (style.transform !== 'none' || style.willChange !== 'auto') {
    console.error('❌ Transform interference:', el.tagName, el.className);
    hasInterference = true;
  }
  el = el.parentElement;
}

if (!hasInterference) {
  console.log('✅ No transform interference');
}

console.log('\n=== End Diagnostic ===');
```

**预期输出:**
```
=== Sticky Diagnostic ===

✅ Sticky element found
Position: sticky
Top: 40px
✅ Scroll container found
Height: 920px (或其他值)
Overflow: auto
✅ No transform interference

=== End Diagnostic ===
```

---

## 步骤 6: 测试不同浏览器

### Chrome/Edge
```
✅ 应该完美工作
```

### Firefox
```
✅ 应该完美工作
```

### Safari
```
✅ 应该完美工作
可能需要 -webkit-sticky 前缀 (已包含在代码中)
```

---

## 步骤 7: 测试 SSR/Hydration

### 测试 SSR 占位符

1. 打开 DevTools → Network 标签
2. 勾选 "Disable cache"
3. 刷新页面 (F5)
4. 观察页面加载过程

**预期:**
- 初始加载: 显示灰色占位符 (带脉冲动画)
- Hydration 后: 显示真实图片
- 过渡平滑，无闪烁

### 测试禁用 JavaScript

1. DevTools → Settings (F1)
2. 搜索 "JavaScript"
3. 勾选 "Disable JavaScript"
4. 刷新页面

**预期:**
- 显示占位符
- 布局不崩溃
- 内容可读

---

## 步骤 8: 性能测试

### 测试滚动性能

1. 打开 DevTools → Performance 标签
2. 点击 Record (圆形按钮)
3. 滚动页面 5 秒
4. 停止录制
5. 查看 FPS 图表

**预期:**
- FPS: 接近 60fps
- 无明显掉帧
- 无 Layout Shift

### 测试内存使用

1. DevTools → Memory 标签
2. 选择 "Heap snapshot"
3. 点击 "Take snapshot"
4. 滚动页面
5. 再次 "Take snapshot"
6. 比较两次快照

**预期:**
- 内存增长 < 5MB
- 无内存泄漏

---

## 常见问题自查

### ❌ 问题 1: 图片跟着滚动

**检查:**
```javascript
// 控制台运行
const el = document.querySelector('[style*="position"]');
console.log('Position:', window.getComputedStyle(el).position);
```

**如果显示 "static":**
- ClientOnly 未生效
- 等待页面完全加载
- 刷新页面重试

**如果显示 "sticky":**
- 检查滚动容器是否存在
- 运行完整诊断脚本

---

### ❌ 问题 2: 控制台有 Transform 警告

**检查:**
```javascript
// 找到干扰元素
let el = document.querySelector('[style*="position"]');
while (el && el !== document.body) {
  const style = window.getComputedStyle(el);
  if (style.transform !== 'none') {
    console.log('Found:', el);
    el.style.transform = 'none'; // 临时修复
  }
  el = el.parentElement;
}
```

**永久修复:**
- 检查 `layouts/default.vue`
- 确保有 `transform: none !important`

---

### ❌ 问题 3: 移动端布局错乱

**检查:**
```javascript
// 检查响应式类
const el = document.querySelector('[style*="position"]');
console.log('Classes:', el.className);
console.log('Width:', window.getComputedStyle(el).width);
```

**应该包含:**
- `w-full` (移动端)
- `lg:w-[45%]` (桌面端)

---

### ❌ 问题 4: 页面无法滚动

**检查:**
```javascript
// 检查滚动容器
const container = document.querySelector('[style*="overflow-y: auto"]');
console.log('Container:', container);
console.log('Height:', window.getComputedStyle(container).height);
console.log('Scroll height:', container.scrollHeight);
console.log('Client height:', container.clientHeight);
```

**如果 scrollHeight === clientHeight:**
- 内容不够长，无需滚动
- 添加更多内容测试

---

## 成功标准

### ✅ 桌面端

- [ ] 图片保持在视口顶部 40px
- [ ] 右侧内容正常滚动
- [ ] 无跳动或闪烁
- [ ] 控制台无错误
- [ ] FPS 接近 60

### ✅ 移动端

- [ ] 垂直布局
- [ ] Sticky 禁用
- [ ] 正常滚动
- [ ] 无横向滚动条
- [ ] 布局不崩溃

### ✅ 浏览器兼容性

- [ ] Chrome 正常
- [ ] Firefox 正常
- [ ] Safari 正常
- [ ] Edge 正常

### ✅ 性能

- [ ] 滚动流畅 (60fps)
- [ ] 无内存泄漏
- [ ] 快速加载 (<2s)

---

## 报告问题

如果测试失败，请提供:

### 1. 浏览器信息
```javascript
// 控制台运行
console.log(navigator.userAgent);
```

### 2. 诊断脚本输出
```
复制完整的诊断脚本输出
```

### 3. 截图
- 初始状态
- 滚动后状态
- 控制台输出

### 4. 视频 (可选)
- 录制滚动过程
- 显示问题发生

---

## 快速修复命令

### 如果 Sticky 不工作，在控制台运行:

```javascript
// 强制应用 sticky 样式
const el = document.querySelector('[style*="position"]');
if (el) {
  el.style.position = 'sticky';
  el.style.top = '40px';
  el.style.alignSelf = 'flex-start';
  el.style.zIndex = '10';
  console.log('✅ Forced sticky styles');
}

// 移除所有 transform
let parent = el;
while (parent && parent !== document.body) {
  parent.style.transform = 'none';
  parent.style.willChange = 'auto';
  parent = parent.parentElement;
}
console.log('✅ Removed transforms');

// 刷新页面
location.reload();
```

---

## 联系支持

如果所有测试都失败:

1. 检查 `STICKY_DEBUG_SCRIPT.md`
2. 运行完整诊断
3. 查看 `NUXT3_STICKY_SOLUTION.md`
4. 提供详细的错误信息

---

**测试时间:** 约 10-15 分钟
**难度:** 简单
**工具:** 浏览器 + DevTools

**祝测试顺利！** 🚀
