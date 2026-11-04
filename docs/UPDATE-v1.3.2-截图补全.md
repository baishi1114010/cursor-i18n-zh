# v1.3.2 截图补全汉化

基于 Cursor 3.28.7 用户截图，补全仍为英文的界面文案。

## 新增 / 修改文件

| 文件 | 说明 |
|------|------|
| `src/dict-ui-328.js` | **新增** 截图词条字典 |
| `src/dict.js` | 合并 `ui328Dict` |
| `src/settings-nav.js` | Appearance / Voice / Source Control 等侧栏映射 |
| `src/tricky.js` | No Repo、本机 Mac、远程机器、保存按钮等特殊模板 |
| `index.js` / `package.json` | 版本 **1.3.2** |

## 覆盖范围（截图）

1. Glass 主页：自动化、项目、已固定、仓库、无仓库、本机 Mac、从零开始、工作区、远程机器…
2. Settings 侧栏：外观、语音、源码管理
3. 通用：次要通知、数据共享已启用
4. 外观：聊天宽度、窄/宽、颜色
5. 套餐与用量：升级文案、按需用量说明、保存
6. 智能体：远程控制、电脑名称、自托管、读取权限、Computer Use
7. 语音：智能体语音、语速、语言、麦克风、状态提示音
8. 源码管理：审查提供商描述、工作树清理

## 推送 GitHub

```bash
cd ~/Projects/cursor-i18n-zh
git add src/dict-ui-328.js src/dict.js src/settings-nav.js src/tricky.js index.js package.json README.md docs/
git commit -m "feat: v1.3.2 补全 3.28 Glass/Voice/源码管理等截图汉化"
git push origin main
```

## 本地应用

```bash
# Cmd+Q 退出 Cursor 后
cd ~/Projects/cursor-i18n-zh
node index.js localize
```
