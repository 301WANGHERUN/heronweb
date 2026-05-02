# HeronWeb

基于 Next.js 的个人技术博客，Markdown 写作，自动构建静态页面，一键部署到 GitHub Pages。

**在线地址：** [301wangherun.github.io/heronweb](https://301wangherun.github.io/heronweb)

## 功能

- **Markdown 写作** — YAML frontmatter 驱动，自动解析标题、日期、标签、摘要
- **全文搜索** — `Cmd+K` 唤起，Fuse.js 模糊匹配标题、摘要、标签
- **代码高亮** — Shiki 语法高亮，暗色/亮色自适应，悬停一键复制
- **标签分类** — 文章标签筛选 + 标签云
- **时间归档** — 按年份分组的文章时间线
- **目录导航** — 文章内 h2/h3 自动生成侧边栏目录
- **RSS 订阅** — 构建时自动生成 `rss.xml`
- **主题切换** — 默认暗色主题，一键切换亮色，偏好持久化
- **评论系统** — Giscus 集成，基于 GitHub Discussions
- **移动端适配** — 响应式布局 + 汉堡菜单
- **CI/CD** — GitHub Actions 自动构建并部署到 GitHub Pages

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 内容 | MDX / Markdown + gray-matter |
| 搜索 | Fuse.js (客户端模糊搜索) |
| 高亮 | Shiki (rehype-pretty-code) |
| 评论 | Giscus |
| 部署 | GitHub Pages + GitHub Actions |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# → http://localhost:3000/heronweb

# 构建
npm run build
```

## 编写文章

在 `content/posts/` 下创建 `.md` 文件：

```markdown
---
title: "深入理解 React Server Components"
date: 2026-04-29
tags: ["react", "ssr"]
description: "RSC 的设计动机与运行时原理解析"
---

文章正文...
```

文件名即 URL 路径，构建时自动生成搜索索引和 RSS 订阅源。

## 项目结构

```
├── content/posts/          ← 文章目录
├── src/
│   ├── app/                ← 页面路由 (App Router)
│   ├── components/         ← UI 组件
│   └── lib/                ← 工具函数 (数据层、渲染管线)
├── scripts/                ← 构建脚本 (搜索索引、RSS)
├── public/                 ← 构建产物 (搜索索引、RSS)
├── .github/workflows/      ← CI/CD 部署配置
└── next.config.ts          ← Next.js 配置
```

## 自定义

参见 [USAGE.md](./USAGE.md) 了解如何修改个人信息、主题色、评论配置和自定义域名。

## 构建方式

本项目完全由 [Claude Code](https://claude.ai/code) Agent 驱动构建——从架构设计、组件实现到 CI/CD 部署，通过 21 次原子化提交完成全流程。
