/**
 * 特殊格式词条的正则替换（含模板字符串、Unicode 引号等）
 */
function applyTrickyReplacements(content) {
  const rules = [
    {
      regex:
        /Reset\s+(?:\\?["']|\\u201[CD]|\\u0022|")Don(?:'|\\'|\\u2019|'|')t\s+Ask\s+Again(?:\\?["']|\\u201[CD]|\\u0022|")\s+Dialogs/gi,
      zh: '重置「不再询问」弹窗',
    },
    {
      regex: /See\s+warnings\s+and\s+tips\s+that\s+you(?:'|\\'|\\u2019|'|')ve\s+hidden/gi,
      zh: '查看您已隐藏的警告和提示',
    },
    {
      regex: /No\s+Hidden\s+Dialogs\s+Yet/gi,
      zh: '暂无隐藏的弹窗',
    },
    {
      regex:
        /You\s+haven(?:'|\\'|\\u2019|'|')t\s+marked\s+any\s+dialogs\s+as\s+(?:\\?["']|\\u201[CD]|\\u0022|")Don(?:'|\\'|\\u2019|'|')t\s+ask\s+again(?:\\?["']|\\u201[CD]|\\u0022|")\.\s*Any\s+hidden\s+dialogs\s+will\s+appear\s+here\s+to\s+manage\./gi,
      zh: '您尚未将任何弹窗标记为「不再询问」。任何隐藏的弹窗都将显示在此处以供管理。',
    },
    {
      regex:
        /Use\s+with\s+caution\.\s*Skip\s+symlinks\s+during\s+\.cursorignore\s+file\s+discovery\.[\s\S]{0,220}?Changing\s+this\s+setting\s+(?:will\s+require\s+a\s+restart\s+of|requires\s+restarting)\s+Cursor\./gi,
      zh: '请谨慎使用。在查找 .cursorignore 文件时跳过符号链接。仅当所有 .cursorignore 均可不经符号链接直接访问时才启用。更改此设置需重启 Cursor。',
    },
    {
      regex: /Submit\s+with\s+(\$\{[^}]+\}|Ctrl\s*\+\s*)Enter/gi,
      zh: '使用 $1Enter 提交',
    },
    {
      regex:
        /When\s+enabled,\s+(\$\{[^}]+\}|Ctrl\s*\+\s*)Enter\s+submits\s+chat\s+and\s+Enter\s+inserts\s+a\s+newline/gi,
      zh: '启用后，$1Enter 提交聊天，Enter 插入换行',
    },
    {
      regex:
        /Apply\s+(.{0,10}?)\.cursorignore(.{0,10}?)\s+files\s+to\s+all\s+subdirectories[\s\S]{0,120}?Changing\s+this\s+setting\s+(?:will\s+require\s+a\s+restart\s+of|requires\s+restarting)\s+Cursor\./gi,
      zh: '将 $1.cursorignore$2 文件应用于所有子目录。更改此设置需重启 Cursor。',
    },
    {
      regex: /Automatically\s+import\s+necessary\s+modules\s+for\s+(\$\{[^}]+\}|TypeScript|C\+\+)/gi,
      zh: '自动为 $1 导入必要的模块',
    },
    {
      regex: /Accept\s+the\s+next\s+word\s+of\s+a\s+suggestion\s+via\s+(\$\{[^}]+\}|Ctrl\+RightArrow)/gi,
      zh: '使用 $1 接受建议的下一个词',
    },
    {
      regex:
        /Embed\s+codebase\s+for\s+improved\s+contextual\s+understanding[\s\S]{0,120}?stored\s+locally\./gi,
      zh: '嵌入代码库以提升上下文理解和知识运用。嵌入向量和元数据存储在云端，但所有代码均存储在本地。',
    },
    {
      regex: /Automatically\s+parse\s+links\s+when\s+pasted\s+into\s+Quick\s+Edit\s+\((\$\{[^}]+\}|Ctrl\+)K\)\s+input/gi,
      zh: '粘贴到快速编辑 ($1K) 输入框时自动解析链接',
    },
    {
      regex:
        /Automatically\s+jump\s+to\s+the\s+next\s+diff\s+when\s+accepting\s+changes\s+with\s+(\$\{[^}]+\}|Ctrl\+)Y/gi,
      zh: '使用 $1Y 接受更改时自动跳转到下一个差异',
    },
    {
      regex: /Show\s+a\s+hint\s+for\s+(\$\{[^}]+\}|Ctrl\+)K\s+in\s+the\s+Terminal/gi,
      zh: '在终端中显示 $1K 提示',
    },
    {
      regex: /Preview\s+Box\s+for\s+Terminal\s+(\$\{[^}]+\}|Ctrl\+)K/gi,
      zh: '终端 $1K 的预览框',
    },
    {
      regex:
        /"Automatically\s+index\s+repositories\s+to\s+speed\s+up\s+Grep\s+searches\.\s+All\s+data\s+is\s+stored\s+locally\."/gi,
      zh: '"自动索引代码库以加速 Grep 搜索。所有数据均存储在本地。"',
    },
    {
      regex: /You(?:'|\\'|\\u2019|'|')re\s+over\s+your\s+current\s+usage\s+limit[\s\S]{0,80}?slow\s+queue\./gi,
      zh: '您已超出当前使用额度，您的请求正在慢速队列中处理。',
    },
    {
      regex: /Choose\s+GitHub\s+or\s+Graphite\s+for\s+pull\s+request\s+links[\s\S]{0,40}?desktop\./gi,
      zh: '选择 GitHub 或 Graphite 作为网页和桌面端拉取请求链接提供方。',
    },
    {
      regex: /Open\s+pull\s+request\s+links\s+inside\s+Cursor\s+or\s+in\s+the\s+default\s+browser\./gi,
      zh: '在 Cursor 内或默认浏览器中打开拉取请求链接。',
    },
    {
      regex: /Show\s+warning-level\s+in-app\s+toasts\.?/gi,
      zh: '显示应用内警告级别提示',
    },
    {
      regex: /Show\s+Cursor\s+in\s+menu\s+bar\.?/gi,
      zh: '在菜单栏显示 Cursor',
    },
    {
      regex:
        /Show\s+warning-level\s+in-app\s+notifications\s+in\s+Glass\s+mode\.\s*Errors\s+and\s+informational\s+notifications\s+are\s+always\s+shown\./gi,
      zh: '在 Glass 模式下显示应用内警告级别通知。错误和信息类通知始终显示。',
    },
    {
      // 保留原有 ${...} 表达式，禁止写死旧版本压缩函数名（会白屏）
      regex: /Choose\s+(\$\{[^}]+\})\s+for\s+pull\s+request\s+links\s+on\s+web\s+and\s+desktop/gi,
      zh: '选择 $1 作为网页和桌面端拉取请求链接提供方',
    },
    {
      regex: /\?"Show Cursor in menu bar"/g,
      zh: '?"在菜单栏显示 Cursor"',
    },
    {
      regex: /\?"Show warning-level in-app toasts"/g,
      zh: '?"显示应用内警告级别提示"',
    },
    {
      regex: /P40="Open pull request links inside Cursor or in the default browser"/g,
      zh: 'P40="在 Cursor 内或默认浏览器中打开拉取请求链接"',
    },
    {
      regex: /return\s*"Less"\s*:\s*"More"/g,
      zh: 'return"收起":"更多"',
    },
    {
      regex: /e\(\)\?"Less":"More"/g,
      zh: 'e()?"收起":"更多"',
    },
    {
      regex: /Drag\s+and\s+drop\s+agent\s+chats\s+to\s+split\s+your\s+view\s+into\s+tiled\s+panes/gi,
      zh: '拖放智能体聊天，将视图拆分为平铺窗格',
    },
    {
      regex: /Plan,\s+Build,\s+\/\s+for\s+skills,\s+@\s+for\s+context/gi,
      zh: '规划、构建，/ 调用技能，@ 添加上下文',
    },
    {
      regex: /Refer\s+friends,\s+earn\s+up\s+to\s+\$250/gi,
      zh: '推荐好友，最高赚取 $250',
    },
    // Appearance 主题选项（仅替换 label，不破坏 includes("System") 等逻辑）
    { regex: /\{mode:"light",label:"Light"\}/g, zh: '{mode:"light",label:"浅色"}' },
    { regex: /\{mode:"dark",label:"Dark"\}/g, zh: '{mode:"dark",label:"深色"}' },
    { regex: /\{mode:"system",label:"System"\}/g, zh: '{mode:"system",label:"跟随系统"}' },
    { regex: /\{value:"auto",label:"System"\}/g, zh: '{value:"auto",label:"跟随系统"}' },
    { regex: /qrS=\{icon:"color-mode",label:"System"\}/g, zh: 'qrS={icon:"color-mode",label:"跟随系统"}' },
    { regex: /light:\{icon:"sun",label:"Light"\}/g, zh: 'light:{icon:"sun",label:"浅色"}' },
    { regex: /dark:\{icon:"moon",label:"Dark"\}/g, zh: 'dark:{icon:"moon",label:"深色"}' },
    // Plan & Usage JSX 片段
    { regex: /Current Plan<\/div>/g, zh: '当前套餐</div>' },
    { regex: /Upgrade Available<\/div>/g, zh: '可升级</div>' },
    { regex: /Included in \$\{/g, zh: '包含于 ${' },
    { regex: /Resets on '/g, zh: "重置于 '" },
    { regex: /"% Auto and"/g, zh: '"% 自动模式，"' },
    { regex: /"% API used"/g, zh: '"% API 已用"' },
    // Customize 迁移横幅（Hooks / Tools & MCP）
    { regex: / are moving to Customize/g, zh: ' 即将迁移至 Customize' },
    { regex: /Configured Hooks \(\$\{/g, zh: '已配置的钩子 (${' },
    { regex: /title:`\$\{je\} are moving to Customize`/g, zh: 'title:`${je} 即将迁移至 Customize`' },
    // JSX / HTML 内嵌文案
    { regex: />On-Demand Usage/g, zh: '>按需用量' },
    { regex: />Browser Automation<\/div>/g, zh: '>浏览器自动化</div>' },
    { regex: / \(Remote Control\)/g, zh: ' (远程控制)' },
    { regex: /`Remote Control \(/g, zh: '`远程控制 (' },
    { regex: /`Remote Control \(\$\{/g, zh: '`远程控制 (${' },
    { regex: /permissions\.json\)`:"Run Mode"/g, zh: 'permissions.json)`:"运行模式"' },
    { regex: /`Run Mode \(enforced by/g, zh: '`运行模式（由' },
    { regex: /Connecting to \$\{il\}\. Remote Control will be ready once its agent worker registers\./g, zh: '正在连接到 ${il}。远程控制将在其智能体工作进程注册后就绪。' },
    // ── v1.2.0：套餐用量 / 规则列表 / 分支 等模板 ──
    { regex: /Usage limits reset on <!> \(<!>\)/g, zh: '用量额度将于 <!> 重置（<!>)' },
    { regex: /> day<!> left/g, zh: '> 天剩余<!>' },
    // 禁止按旧版压缩变量名改写复数逻辑（跨版本会误伤）
    { regex: />% used<\/span>/g, zh: '>已使用</span>' },
    { regex: /% used · /g, zh: '% 已使用 · ' },
    { regex: /% used`/g, zh: '% 已使用`' },
    { regex: /% used \\xB7 /g, zh: '% 已使用 · ' },
    { regex: /Show all \(<!> more\)/g, zh: '显示全部（另有 <!> 个）' },
    { regex: />Show less</g, zh: '>收起<' },
    { regex: /title:"Git & PRs"/g, zh: 'title:"Git 与拉取请求"' },
    { regex: /title:"Branches"/g, zh: 'title:"分支"' },
    { regex: /label:"Branches"/g, zh: 'label:"分支"' },
    { regex: /"aria-label":"Branches"/g, zh: '"aria-label":"分支"' },
    { regex: /p=l===void 0\?"Branches":l/g, zh: 'p=l===void 0?"分支":l' },
    { regex: /_\|\|"Branches"/g, zh: '_||"分支"' },
    { regex: />View All Models</g, zh: '>查看全部模型<' },
    { regex: />API Keys</g, zh: '>API 密钥<' },
    { regex: /Your plan includes at least \$/g, zh: '你的套餐至少包含 $' },
    { regex: / of API usage\./g, zh: ' 的 API 用量。' },
    { regex: /\(controlled by admin\)/g, zh: '（由管理员控制）' },
    // ── v1.3.0：Cursor 3.17 截图补全模板 ──
    { regex: /isGlass\?"Code Intelligence":"Indexing & Docs"/g, zh: 'isGlass?"代码智能":"索引与文档"' },
    { regex: /isGlass\?"Code Intelligence":"索引与文档"/g, zh: 'isGlass?"代码智能":"索引与文档"' },
    { regex: /"Usage limits reset on "/g, zh: '"用量额度将于 "' },
    { regex: /return"0 minutes left"/g, zh: 'return"还剩 0 分钟"' },
    { regex: /return`\$\{a\} day\$\{a===1\?"":"s"\} left`/g, zh: 'return`还剩 ${a} 天`' },
    { regex: /return`\$\{s\} hour\$\{s===1\?"":"s"\} and \$\{o\} minute\$\{o===1\?"":"s"\} left`/g, zh: 'return`还剩 ${s} 小时 ${o} 分钟`' },
    { regex: /return`\$\{s\} hour\$\{s===1\?"":"s"\} left`/g, zh: 'return`还剩 ${s} 小时`' },
    { regex: /return`\$\{o\} minute\$\{o===1\?"":"s"\} left`/g, zh: 'return`还剩 ${o} 分钟`' },
    { regex: / of Other Models usage\./g, zh: ' 的其他模型用量。' },
    { regex: /g\?"Hide":"Show"/g, zh: 'g?"隐藏":"显示"' },
    { regex: /S\?"Copied":"Copy Domains"/g, zh: 'S?"已复制":"复制域名"' },
    { regex: /T\?"Running Diagnostic":"Run Diagnostic"/g, zh: 'T?"正在运行诊断":"运行诊断"' },
    { regex: /title:"Startup"/g, zh: 'title:"启动"' },
    { regex: /accessibleLabel:"Startup"/g, zh: 'accessibleLabel:"启动"' },
    { regex: /title:"Conversation"/g, zh: 'title:"对话"' },
    { regex: /accessibleLabel:"Conversation"/g, zh: 'accessibleLabel:"对话"' },
    { regex: /title:"Third-Party Imports"/g, zh: 'title:"第三方导入"' },
    { regex: /accessibleLabel:"Third-Party Imports"/g, zh: 'accessibleLabel:"第三方导入"' },
    { regex: /title:"Context and Tools"/g, zh: 'title:"上下文与工具"' },
    { regex: /accessibleLabel:"Context and Tools"/g, zh: 'accessibleLabel:"上下文与工具"' },
    { regex: /title:"Execution and Approvals"/g, zh: 'title:"执行与审批"' },
    { regex: /accessibleLabel:"Execution and Approvals"/g, zh: 'accessibleLabel:"执行与审批"' },
    { regex: /title:"Agent Conversations"/g, zh: 'title:"智能体对话"' },
    { regex: /title:"Fun"/g, zh: 'title:"趣味"' },
    { regex: /label:"Fun"/g, zh: 'label:"趣味"' },
    { regex: /`Link \$\{ge\+1\}`/g, zh: '`链接 ${ge+1}`' },
    { regex: /"Upload image":"Change image"/g, zh: '"上传图片":"更换图片"' },
    { regex: /children:"Remove image"/g, zh: 'children:"移除图片"' },
    { regex: /children:"Add link"/g, zh: 'children:"添加链接"' },
    { regex: /showLocalhostLinks:"Open Local Links in Cursor Browser"/g, zh: 'showLocalhostLinks:"在 Cursor 浏览器中打开本地链接"' },
    { regex: /openWebLinks:"Open Web Links in Cursor Browser"/g, zh: 'openWebLinks:"在 Cursor 浏览器中打开网页链接"' },
    {
      regex: /submits chat, Enter inserts a newline, and primary actions move to \$\{/g,
      zh: '提交聊天，Enter 插入换行，主要操作移至 ${',
    },
    { regex: /label:`Submit with \$\{/g, zh: 'label:`使用 ${' },
    // ── v1.3.1：Glass / 3.28 截图补全 ──
    { regex: /="No Repo"/g, zh: '="无仓库"' },
    { regex: /="New Project"/g, zh: '="新建项目"' },
    { regex: /="Start from scratch"/g, zh: '="从零开始"' },
    { regex: /="Agent Voice"/g, zh: '="智能体语音"' },
    { regex: /="Status chimes"/g, zh: '="状态提示音"' },
    { regex: /="Computer Name"/g, zh: '="电脑名称"' },
    { regex: /="Unregister All"/g, zh: '="全部注销"' },
    { regex: /="Enable Remote Control for this computer"/g, zh: '="为本机启用远程控制"' },
    { regex: /="Allow agents on this computer to be controlled from your other devices"/g, zh: '="允许从你的其他设备控制本机上的智能体"' },
    { regex: /="No devices are currently paired with this computer\."/g, zh: '="当前没有设备与此电脑配对。"' },
    { regex: /="Remote Machine"/g, zh: '="远程机器"' },
    { regex: /children:"Use Existing\.\.\."/g, zh: 'children:"使用已有…"' },
    { regex: /children:"Narrow"/g, zh: 'children:"窄"' },
    { regex: /children:"Wide"/g, zh: 'children:"宽"' },
    { regex: /\?"保存中…":"Save"/g, zh: '?"保存中…":"保存"' },
    { regex: /const q=g\?"保存中…":"Save"/g, zh: 'const q=g?"保存中…":"保存"' },
    { regex: /return Jo\?"This PC":Kn\?"This Mac":"This Computer"/g, zh: 'return Jo?"本机 PC":Kn?"本机 Mac":"本机"' },
    { regex: /return Va\?"This PC":wr\?"This Mac":"This Computer"/g, zh: 'return Va?"本机 PC":wr?"本机 Mac":"本机"' },
    { regex: /\?"Search workspaces\.\.\.":"Search repos, cloud environments\.\.\."/g, zh: '?"搜索工作区…":"搜索仓库、云端环境…"' },
    { regex: /placeholder:"Search Remote Machines\\u2026"/g, zh: 'placeholder:"搜索远程机器…"' },
    { regex: /:"No remote machines yet\."/g, zh: ':"暂无远程机器。"' },
    { regex: /"Data Sharing Enabled"/g, zh: '"数据共享已启用"' },
    { regex: /r\?"Window Colors":"Colors"/g, zh: 'r?"窗口颜色":"颜色"' },
    { regex: /n===void 0\?"More":n/g, zh: 'n===void 0?"更多":n' },
    { regex: /s===void 0\?"Automations":s/g, zh: 's===void 0?"自动化":s' },
    { regex: /auto:"Auto-detect"/g, zh: 'auto:"自动检测"' },
    { regex: /columnHeader:"Repositories"/g, zh: 'columnHeader:"仓库"' },
    { regex: /"aria-label":"Pinned"/g, zh: '"aria-label":"已固定"' },
    // ── v1.3.3：Agent 菜单 / 输入框 / 账号菜单 ──
    { regex: /="Steer without interrupting"/g, zh: '="引导而不打断"' },
    { regex: /="Send follow-up"/g, zh: '="发送跟进"' },
    { regex: /defaultPlaceholder:"Send follow-up"/g, zh: 'defaultPlaceholder:"发送跟进"' },
    { regex: /ln\?"Send follow-up with subagent"/g, zh: 'ln?"使用子智能体发送跟进"' },
    { regex: /children:"Get Cursor for iOS"/g, zh: 'children:"获取 Cursor iOS 版"' },
    { regex: /children:"Get Grok Bot"/g, zh: 'children:"获取 Grok Bot"' },
    { regex: /"aria-label":"Meet Grok Bot"/g, zh: '"aria-label":"认识 Grok Bot"' },
    { regex: /title:"Meet Grok Bot"/g, zh: 'title:"认识 Grok Bot"' },
    { regex: /children:"Contact Us"/g, zh: 'children:"联系我们"' },
    { regex: /children:"Shortcuts"/g, zh: 'children:"快捷键"' },
    { regex: /children:"Report Issue"/g, zh: 'children:"报告问题"' },
    { regex: /title:"Report Issue"/g, zh: 'title:"报告问题"' },
    // Close Settings 可能已被字典先替换为「关闭设置」
    { regex: /\$=(\w+)\?"(?:Close Settings|关闭设置)":"Settings"/g, zh: '$=$1?"关闭设置":"设置"' },
    { regex: /"aria-label":"Settings"/g, zh: '"aria-label":"设置"' },
    { regex: /hintText:"Settings"/g, zh: 'hintText:"设置"' },
    { regex: /settings:"Settings"/g, zh: 'settings:"设置"' },
    { regex: /autoTitle:"Cursor Models"/g, zh: 'autoTitle:"Cursor 模型"' },
    { regex: /autoDescription:"Includes Cursor Grok and Composer"/g, zh: 'autoDescription:"包含 Cursor Grok 与 Composer"' },
    { regex: /name:"Context"/g, zh: 'name:"上下文"' },
    { regex: /defaultLabel:"Context"/g, zh: 'defaultLabel:"上下文"' },
    { regex: /"aria-label":"Context"/g, zh: '"aria-label":"上下文"' },
    { regex: /markdownTooltip:"Maximum context window size"/g, zh: 'markdownTooltip:"最大上下文窗口大小"' },
    { regex: /name:"Thinking"/g, zh: 'name:"思考"' },
    { regex: /label:"Model"/g, zh: 'label:"模型"' },
    { regex: /return"Context"/g, zh: 'return"上下文"' },
    { regex: /AgentContext:return"Context"/g, zh: 'AgentContext:return"上下文"' },
  ];

  let result = content;
  for (const { regex, zh } of rules) {
    result = result.replace(regex, zh);
  }
  return result;
}

module.exports = { applyTrickyReplacements };
