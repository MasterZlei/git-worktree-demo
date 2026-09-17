---
name: git-commit-upload
description: >-
  读取变更、按约定格式编写中文 conventional commit（含编号正文）、提交并 push。
  在用户要求 commit、提交、上传、push，或任何 git commit / git push 操作前必须使用本 skill。
  禁止绕过本 skill 直接提交。
---

# Git Commit Upload

强制提交流程：分析 diff → 按格式写消息 → commit → push。

## 硬性约束

1. **任何** `git commit` / `git push` 前，必须先完整阅读并执行本 skill。
2. 禁止用一句话英文 subject、无编号正文、或随意消息直接提交。
3. 未得到用户明确要求「只提交不上传」时，commit 成功后必须 `git push`。
4. 有冲突、merge 中、或含 `.env` / 密钥类文件时：停止并告知用户，不自动提交。

## 工作流

### 1. 读取变更

并行执行：

```bash
git status --short
git diff
git diff --cached
git log -8 --oneline
git branch -vv
```

无变更则告知用户并结束。

### 2. 修改文件（若任务要求）

- 先读相关文件，再最小范围修改。
- 改完后再次 `git status` / `git diff`，以最终 diff 为依据写消息。

### 3. 编写提交消息

格式（必须）：

```text
<type>(<scope>): <简体中文摘要>

1. <具体改动点一>
2. <具体改动点二>
3. <具体改动点三>
```

- `scope` 可选；多模块时取最主要一个，或省略。
- 摘要与编号项：**简体中文**，动词开头（新增 / 修复 / 重构 / 调整 / 移除…）。
- 摘要 ≤ 50 字，不以句号结尾。
- 编号列表：按逻辑改动点拆分（通常 2–6 条），每条对应一类可读变更，不要机械按文件名罗列。
- 对照近期 `git log` 风格，优先对齐仓库既有 type/scope 习惯。

**type：**

| type | 时机 |
|------|------|
| `feat` | 新功能 / 新页面 / 新组件能力 |
| `fix` | 修 bug |
| `refactor` | 重构且行为不变 |
| `style` | 纯样式 / 不影响逻辑 |
| `chore` | 工具、依赖、脚手架、杂务 |
| `docs` | 文档 |
| `test` | 测试 |
| `perf` | 性能 |

**正例：**

```text
feat: 为多个页面添加表格加载骨架屏，优化加载体验

1. 重构table-skeleton组件，替换原有加载样式为更直观的多行多列骨架效果
2. 为记忆消息页面添加表格加载状态支持
3. 为用户管理、知识库管理页面替换原有空状态添加加载骨架屏
4. 为记忆列表页面添加全局加载骨架屏
```

```text
fix(backend-error): 优化通用错误码的文案匹配

1. 统一错误码到中文提示文案的映射表
2. 补齐未覆盖错误码的默认回退文案
```

**反例（禁止）：**

- `feat: add skeleton`（英文）
- 只有标题、没有 `1. 2. 3.` 正文
- 正文写空话如「更新代码」「若干修改」

### 4. 提交

```bash
git add <相关文件>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <摘要>

1. ...
2. ...

EOF
)"
```

遵守仓库既有 git 安全约定：不改 git config、不 `--no-verify`（除非用户明确要求）、不 amend 已推送提交、不提交密钥文件。

### 5. 上传（push）

```bash
git push -u origin HEAD
```

若无上游或需先设 remote，说明情况并征求用户意见后再处理。

### 6. 回报结果

向用户展示：

1. 完整 commit message
2. `git status` 与最近一条 `git log -1 --format=fuller`
3. push 是否成功（含远程分支名）

## 与「拆分多 commit」的关系

- 默认：**一次逻辑改动 = 一个 commit**（一条标题 + 编号正文覆盖该次全部要点）。
- 仅当用户明确要求「按模块拆成多个 commit」时，才对每组分别走本 skill 的第 3–5 步；每组仍必须带编号正文。
