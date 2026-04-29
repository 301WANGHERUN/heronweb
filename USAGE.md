# HeronWeb 使用指南

## 项目简介

基于 Next.js 的个人技术博客，Markdown 写作，自动构建静态页面，部署到 GitHub Pages。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# → http://localhost:3000/heronweb

# 构建静态网站
npm run build
# → 产出 out/ 目录
```

## 文章编写

### 创建文章

在 `content/posts/` 目录下新建 `.md` 文件，文件名会自动作为 URL 路径：

```
content/posts/
├── my-first-post.md       → /posts/my-first-post
├── react-hooks-guide.md   → /posts/react-hooks-guide
└── deep-dive-rsc.md       → /posts/deep-dive-rsc
```

### 文章格式

每篇文章顶部必须包含 YAML frontmatter：

```markdown
---
title: "深入理解 React Server Components"
date: 2026-04-29
tags: ["react", "ssr", "architecture"]
description: "RSC 的设计动机与运行时原理解析"
---

文章正文（Markdown 格式）...
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期 YYYY-MM-DD |
| `tags` | 是 | 标签列表，用于分类和搜索 |
| `description` | 是 | 文章摘要，首页卡片和 SEO 使用 |

### Markdown 支持

- 标题、段落、列表、引用
- **加粗**、*斜体*、`行内代码`
- 代码块（自动语法高亮 + 复制按钮）
- 表格、图片、分割线
- 链接（支持外部链接）

### 代码高亮

````markdown
```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/heronweb",
};
```
````

支持所有 Shiki 语法高亮语言，暗色/亮色自适应。

## 页面功能

### 首页 (`/`)
- Hero 区：个人信息 + 社交链接
- 最新文章列表（取前 5 篇）
- 超出 5 篇时显示 "View All Posts" 入口

### 文章详情 (`/posts/[slug]`)
- 完整正文
- 侧边栏目录（h2/h3 自动生成）
- 代码块高亮 + 一键复制
- 底部 Giscus 评论（需配置）

### 标签页 (`/tags/[tag]`)
- 按标签筛选文章
- 标签云在归档页

### 归档 (`/archive`)
- 按年份分组的时间线
- 顶部标签云展示所有标签

### 搜索 (`Cmd+K`)
- 全文模糊搜索（标题、摘要、标签）
- 快捷键 `Cmd+K`（Windows: `Ctrl+K`）唤起
- `ESC` 关闭
- 搜索结果点击跳转

## 自定义配置

### 修改个人信息

**Hero 区：** 编辑 `src/components/Hero.tsx`

- 标题：`Hi, I'm a Developer`
- 简介文字
- GitHub / Twitter 链接

**关于页：** 编辑 `src/app/about/page.tsx`

**站点标题：** 编辑以下文件中的标题/描述：
- `src/app/layout.tsx` — 全局 SEO 标题和描述
- `scripts/build-rss.mjs` — RSS 标题和站点 URL

### 主题

- 默认暗色主题
- 点击右上角太阳/月亮图标切换
- 颜色变量在 `src/app/globals.css` 中修改：

```css
:root {                /* 亮色主题 */
  --color-bg: #ffffff;
  --color-fg: #1a1a2e;
  --color-accent: #3b82f6;
  /* ... */
}
.dark {                /* 暗色主题 */
  --color-bg: #0f0f1a;
  --color-fg: #e2e8f0;
  --color-accent: #60a5fa;
  /* ... */
}
```

### Giscus 评论

1. 访问 https://giscus.app 配置
2. 获取 repoId 和 categoryId
3. 在 `src/app/posts/[slug]/page.tsx` 中取消注释并填入：

```tsx
<GiscusComments
  repo="301WANGHERUN/heronweb"
  repoId="YOUR_REPO_ID"
  category="Comments"
  categoryId="YOUR_CATEGORY_ID"
  mapping="pathname"
/>
```

### GitHub Actions 部署

推送 `master` 分支自动触发构建和部署，配置文件在 `.github/workflows/deploy.yml`。

**注意事项：**
- 仓库需设为 Public
- Settings → Pages → Source 选 "GitHub Actions"
- 部署地址：`https://301wangherun.github.io/heronweb/`

**如果更换了仓库名或用户名，需要同步修改：**
- `next.config.ts` 中的 `basePath`
- `scripts/build-rss.mjs` 中的 `SITE_URL`

### 自定义域名（可选）

1. 在 `public/` 下创建 `CNAME` 文件，写入域名
2. DNS 添加 CNAME 记录指向 `301wangherun.github.io`
3. 移除 `next.config.ts` 中的 `basePath`
4. 更新 `scripts/build-rss.mjs` 中的 `SITE_URL`

## 项目结构

```
├── content/posts/         ← 文章都在这里
├── src/
│   ├── app/               ← 页面路由
│   ├── components/        ← UI 组件
│   └── lib/               ← 工具函数（数据层、Markdown 渲染）
├── scripts/               ← 构建脚本（搜索索引、RSS）
├── public/                ← 构建产物（搜索索引、RSS）
├── .github/workflows/     ← GitHub Actions 部署
├── next.config.ts         ← Next.js 配置
└── package.json           ← 依赖和脚本
```

## 常用命令

```bash
npm run dev       # 本地开发
npm run build     # 生产构建（先自动生成搜索索引和 RSS）
git push          # 推送后 GitHub Actions 自动部署
```
