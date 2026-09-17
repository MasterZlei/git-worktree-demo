# Feature Spec: 常见 QA 问答区

> 此文件由 Git Worktree Design Skill 自动产生，供 AI Agent 作为开发指引。

## 分支资讯

| 项目 | 值 |
|------|-----|
| 分支名称 | `feature/faq-section` |
| 基于分支 | `master` |
| Worktree 路径 | `/Users/zhanglei/Desktop/pro/practice/git-worktree-demo-faq` |
| 建立时间 | `2026-09-17 09:21:48` |

## 目标

在官网 Pricing 与 CallToAction 之间新增「常见问题」手风琴区块，文案 config-driven，风格与现有 SalesPilot 深色落地页一致。

## 实作范围

- [x] 新增 `src/data/faq.js`：标题、副标、至少 5–6 条 QA（围绕 CRM / 方案 / 试用 / 资料安全等）
- [x] 新增 `src/components/FAQ.jsx`：手风琴列表，一次可开一项或多项（择一并保持一致），含 `aria-expanded` / `aria-controls`
- [x] 在 `src/index.css` 增加 FAQ 区块样式，复用既有 section / container / 卡片视觉语言
- [x] 在 `App.jsx` 于 Pricing 与 CallToAction 之间挂载 `<FAQ />`
- [x] 在 `src/data/navigation.js` 增加「常见问题」锚点链接（如 `#faq`）
- [x] 简单自测：`pnpm build` 通过；桌面与窄屏排版正常

## 验收标准

- 页面出现 FAQ 区块，点击问题可展开 / 收起答案
- 键盘可聚焦并操作展开控件
- 导览列可跳转到 `#faq`
- 修改 `faq.js` 即可改文案，无需改组件逻辑
- 不新增任何 npm 依赖

## 技术约束

- React 18 + Vite + Vanilla CSS
- 不得引入新的 npm 依赖
- 文案与资料放在 `src/data/`，组件保持展示逻辑
- 颜色尽量使用既有 CSS 变量（`--color-*`），便于后续主题分支合并
- 图标用 SVG，不用 emoji

## 跨分支备注

- 与 `feature/theme-toggle` 可能冲突：`App.jsx`、`navigation.js`、`index.css` — 合并时保留 FAQ 区块与导航项
- 与 `feature/cookie-consent` 可能冲突：`App.jsx` — FAQ 放在 main 内容流，Cookie 为独立浮层
- 建议合并顺序：theme → **faq** → cookie
