# Feature Spec: Cookie 同意弹窗

> 此文件由 Git Worktree Design Skill 自动产生，供 AI Agent 作为开发指引。

## 分支资讯

| 项目 | 值 |
|------|-----|
| 分支名称 | `feature/cookie-consent` |
| 基于分支 | `master` |
| Worktree 路径 | `/Users/zhanglei/Desktop/pro/practice/git-worktree-demo-cookie` |
| 建立时间 | `2026-09-17 09:21:48` |

## 目标

首次访问时在页面底部（或角落）显示 Cookie 同意条，提供接受 / 拒绝；选择写入 localStorage，之后访问不再弹出。

## 实作范围

- [x] 新增 `src/data/cookie.js`：文案、隐私政策链接占位、storage key
- [x] 新增 `src/components/CookieConsent.jsx`：显示条件、接受 / 拒绝按钮、关闭后持久化
- [x] 在 `src/index.css` 增加同意条样式（固定底部、不遮挡关键 CTA、RWD、z-index 合理）
- [x] 在 `App.jsx` 挂载 `<CookieConsent />`（与 main 内容解耦）
- [x] 无障碍：角色 / `aria-live` 或对话框语义、按钮可聚焦、不阻断整页滚动阅读（除非产品要求 modal）
- [x] 简单自测：`pnpm build` 通过；清除 localStorage 后再次显示

## 验收标准

- 无同意记录时显示 Cookie 条；点击接受或拒绝后消失
- 刷新后不再显示（直到清除对应 localStorage）
- 样式符合现有深色落地页；移动端不溢出、不挡住必要操作过久
- 不新增任何 npm 依赖

## 技术约束

- React 18 + Vite + Vanilla CSS
- 不得引入新的 npm 依赖
- 文案放 `src/data/cookie.js`
- 颜色使用 CSS 变量，便于与主题分支合并
- 本功能仅做同意 UI 与本地记录，不接入真实分析脚本

## 跨分支备注

- 与 `feature/theme-toggle` / `feature/faq-section` 可能冲突：`App.jsx`、`index.css` — 合并时保留 CookieConsent 组件挂载与样式区块
- Cookie 为浮层，尽量少改 Navbar / 内容区块，降低冲突
- 建议最后合并：theme → faq → **cookie**
