# Feature Spec: 浅色 / 深色主题切换

> 此文件由 Git Worktree Design Skill 自动产生，供 AI Agent 作为开发指引。

## 分支资讯

| 项目 | 值 |
|------|-----|
| 分支名称 | `feature/theme-toggle` |
| 基于分支 | `master` |
| Worktree 路径 | `/Users/zhanglei/Desktop/pro/practice/git-worktree-demo-theme` |
| 建立时间 | `2026-09-17 09:21:48` |

## 目标

在现有深色设计系统上增加浅色主题，使用者可在 Navbar 切换，偏好持久化到 localStorage，并尊重系统 `prefers-color-scheme`。

## 实作范围

- [ ] 扩展 `src/index.css`：保留现有 `:root` 为深色默认，新增 `[data-theme="light"]`（或等价）浅色 CSS Custom Properties，覆盖背景、文字、边框、卡片、阴影等
- [ ] 新增主题工具（如 `src/hooks/useTheme.js` 或 `src/utils/theme.js`）：读取 / 写入 localStorage、解析系统偏好、设置 `document.documentElement` 的 `data-theme`
- [ ] 在 Navbar 加入主题切换按钮（SVG 图标，禁止 emoji），含 `aria-label`，可键盘操作
- [ ] 首屏避免闪烁：在 `index.html` 或入口尽早套用已保存主题
- [ ] 检查关键组件在浅色模式下的对比度与玻璃拟态可见度（Navbar、卡片、按钮）
- [ ] 简单自测：`pnpm build` 通过；手动切换 / 刷新后主题保持

## 验收标准

- 点击切换按钮可在浅色 / 深色间即时切换整页外观
- 刷新页面后仍保持使用者上次选择
- 首次访问且无 localStorage 时，跟随系统偏好
- 浅色模式下正文对比度可读（约 4.5:1），边框与卡片在浅色下可见
- 不新增任何 npm 依赖

## 技术约束

- React 18 + Vite + Vanilla CSS（CSS Custom Properties）
- 不得引入新的 npm 依赖
- 沿用现有 config-driven / 组件结构惯例
- 图标使用 SVG，不用 emoji
- 需兼容既有 Navbar、Hero、卡片等组件（优先改变量，少改硬编码色）

## 跨分支备注

- **建议最先合并**到 master，因其改动全局 CSS 与 Navbar
- 与 `feature/faq-section`、`feature/cookie-consent` 可能在 `App.jsx` / `Navbar.jsx` / `index.css` 产生冲突，合并时优先保留主题变量与切换按钮
- 其他分支应尽量用 CSS 变量而不是硬编码颜色，以便主题生效
