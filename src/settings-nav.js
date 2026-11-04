/**
 * Cursor Settings 侧栏导航映射 (Wmu) 精准替换
 * 这些键值对不在标准 UI 属性中，需单独处理
 */
const SETTINGS_NAV_REPLACEMENTS = [
  ['general:"General"', 'general:"通用"'],
  ['profile:"Profile"', 'profile:"账号"'],
  ['"vscode-settings":"VS Code Settings"', '"vscode-settings":"VS Code 设置"'],
  ['appearance:"Appearance"', 'appearance:"外观"'],
  ['fun:"Fun"', 'fun:"趣味"'],
  ['chat:"Agents"', 'chat:"智能体"'],
  ['browser:"Browser & Network"', 'browser:"浏览器与网络"'],
  ['tab:"Tab"', 'tab:"Tab 补全"'],
  ['models:"Models"', 'models:"模型"'],
  ['voice:"Voice"', 'voice:"语音"'],
  ['"git-prs":"Git & PRs"', '"git-prs":"Git 与拉取请求"'],
  ['"git-prs":"Source Control"', '"git-prs":"源码管理"'],
  ['mcp:"Tools & MCPs"', 'mcp:"工具与 MCP"'],
  ['hooks:"Hooks"', 'hooks:"钩子"'],
  ['beta:"Beta"', 'beta:"测试功能"'],
  ['network:"Network"', 'network:"网络"'],
  ['"self-driving":"Self-driving PRs"', '"self-driving":"自动 PR"'],
  ['worktrees:"Worktrees"', 'worktrees:"工作树"'],
  ['developer:"Developer"', 'developer:"开发者"'],
  ['docs:"Docs"', 'docs:"官方文档"'],
  ['contact:"Contact"', 'contact:"联系我们"'],
  ['indexing:"Indexing & Docs"', 'indexing:"索引与文档"'],
  ['indexing:"Code Intelligence"', 'indexing:"代码智能"'],
  ['projects:"Projects"', 'projects:"项目"'],
  ['plugins:"Plugins"', 'plugins:"插件"'],
  ['customize:"Customize"', 'customize:"自定义"'],
  ['workspaces:"Workspaces"', 'workspaces:"工作区"'],
];
function applySettingsNav(content) {
  let result = content;
  for (const [from, to] of SETTINGS_NAV_REPLACEMENTS) {
    result = result.split(from).join(to);
  }
  return result;
}

module.exports = { applySettingsNav, SETTINGS_NAV_REPLACEMENTS };
