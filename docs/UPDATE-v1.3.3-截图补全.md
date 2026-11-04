# v1.3.3 截图补全（Agent 菜单 / 输入框 / 账号菜单）

## 本次汉化

| 区域 | 文案 |
|------|------|
| 输入框 | Steer without interrupting → 引导而不打断；Send follow-up → 发送跟进 |
| 账号菜单 | Settings / Close Settings、Get Cursor for iOS、Get Grok Bot、Shortcuts、Contact Us、Report Issue |
| 模型选择器 | Cursor Models、Context / Thinking 标签与说明、Model |
| 短词（仅 UI 属性） | Fast / Effort / Low / Medium / High / Extra High |

## 无法本地汉化（正常）

以下多半来自 **服务端模型目录**，不在本地 JS 字典中：

- `Balanced quality and speed, recommended for most tasks`
- 部分模型自带的 Effort 档位展示文案（若未写死在 bundle 内）

模型品牌名（Grok、Composer、Auto 等）默认保留英文。

## 推送 / 应用

```bash
cd ~/Projects/cursor-i18n-zh
# 已 push 后本地应用：
# Cmd+Q 退出 Cursor
node index.js localize
```
