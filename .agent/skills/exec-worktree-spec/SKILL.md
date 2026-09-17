---
name: Exec Worktree Spec
description: >-
  读取当前目录的 git-worktree-spec.md，在独立 worktree 中按 checklist 逐项开发并提交；
  完成后提示用户手动 /apply-worktree 或 git 合并，禁止自动合并或删除 worktree。
  在用户执行 /exec-worktree-spec、说「按 worktree 规格开发」、或处于已带
  git-worktree-spec.md 的 feature worktree 中要求实现时使用。
  通常接在 Git Worktree Design 建立 worktree 与规格文件之后。
---

# 执行 Worktree 功能规格任务

按 `git-worktree-spec.md` 在隔离 worktree 中落地功能。上游规格通常由 **Git Worktree Design** skill 写入各 worktree 根目录。

## 前置条件

1. 检查**当前工作目录根目录**是否存在 `git-worktree-spec.md`
   - **不存在**：告知用户当前目录没有规格文档，询问是手动描述需求还是终止本次任务
   - **存在**：继续向下执行

> 若用户在主仓库要求「对某个已有 worktree 执行本 skill」，先 `cd` / 切换到该 worktree 路径，再检查规格文件。

## 读取任务规格

2. 读取根目录下 `git-worktree-spec.md` 的全部内容
3. 解析并充分理解：
   - **目标**：功能要达成的效果
   - **实作范围 / 实现范围**：checklist 清单
   - **验收标准**：完成后必须满足的条件
   - **技术约束**、**跨分支备注**（若有）：合并顺序与冲突注意点

## Worktree 隔离执行开发

4. **Worktree 处理**（二选一，勿重复创建）：
   - 若当前目录**已是**目标 feature worktree（已有对应分支与 `git-worktree-spec.md`）：**跳过创建**，直接在此目录开发
   - 若仍在主工作区且规格要求新分支：再调用 `/worktree`（或 `git worktree add`）创建独立 worktree 与功能分支，基于当前所在分支，并切换到该隔离环境

5. 将解析到的全部规格作为任务指令，在隔离环境中开发

6. 按 checklist **逐项**完成：
   - 每完成一项子任务，执行一次 git commit，提交信息须符合下方「Commit 訊息規範」
   - 每个阶段做简单自测，保证代码可正常运行（如 `pnpm build` / 项目约定的检查）
   - 遵守规格中的技术约束（例如不擅自新增依赖）

7. 全部 checklist 完成后，对照「验收标准」自我检查；可将规格中的 `- [ ]` 勾选为 `- [x]` 并单独 commit（訊息同樣須符合下方規範）

8. 自检通过后输出任务报告：
   - 已生成的 commit 清单（hash + message）
   - 已完成 / 未完成任务清单
   - 提示用户：任务开发完毕，请手动执行 `/apply-worktree` 或使用 git 命令合并回主分支

9. 等待用户操作，**禁止自动合并代码，禁止自动删除 worktree**

## Commit 訊息規範

与 **Git Smart Commit** 保持一致，本仓库提交说明统一如下：

```
<type>(<scope>): <简体中文简短描述>
```

| 规则 | 说明 |
|------|------|
| type | 可用英文：`feat` / `fix` / `style` / `refactor` / `chore` / `docs` / `test` |
| scope | 小写英文模块名，如 `theme`、`faq`、`cookie`、`nav` |
| subject | **必须简体中文**；动词开头（新增、调整、修正、移除、重构）；不超过 50 字；不以句号结尾 |
| 禁止 | subject 使用英文（错误示例：`feat(theme): add light theme CSS`） |

正确示例：

```
feat(theme): 新增浅色主题 CSS 变量
feat(faq): 新增常见问题手风琴组件
fix(cookie): 改善同意条在窄屏下的排版
docs(theme): 勾选规格 checklist 为已完成
```

提交前自检：若 subject 为英文或繁体，改写为简体中文后再 `git commit`。

## 与 Git Worktree Design 的配合

| 阶段 | Skill | 产出 |
|------|--------|------|
| 拆分与建环境 | Git Worktree Design | 多个 worktree + 各目录 `git-worktree-spec.md` |
| 按规格实现 | **Exec Worktree Spec**（本 skill） | 分步 commits + 任务报告 |
| 合并回主线 | 用户手动 `/apply-worktree` 或 git merge | 主分支集成 |

建议合并顺序以各规格「跨分支备注」为准；无备注时优先合并改动全局样式 / 共享入口的分支。
