# Cursor 3.28.7 汉化白屏修复（v1.3.1）

## 原因

旧版字典把短词（如 `"OK"`、`"Error"`、`"Copy"`、`"Cloud"`）做**全局引号替换**。

Cursor / VS Code 内部大量使用枚举反向映射：

```js
e[e.OK=1]="OK"
```

被改成 `"确定"` 后，运行时查找失败，界面白屏/无法启动。

## 修复

1. `src/translate.js`：单词语不再全局替换，只在 `label`/`title`/`children` 等 UI 属性中替换
2. `src/tricky.js`：去掉写死旧版压缩函数名（如 `D40`）的规则，改为保留原 `${...}` 表达式

## 使用

```bash
# 若已白屏，先恢复
node index.js restore

# 再应用安全汉化（先 Cmd+Q 退出 Cursor）
node index.js localize
```
