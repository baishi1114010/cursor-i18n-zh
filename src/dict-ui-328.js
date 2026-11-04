/**
 * Cursor 3.28+ 截图补全字典（Glass 主页 / Settings 侧栏 / Voice / Source Control / Agents）
 * 单词语会由 translate.js 自动降级为 UI 属性安全替换，避免枚举白屏。
 */
const ui328Dict = {
  // ── Glass 侧栏 / 主页 ──
  Automations: '自动化',
  Projects: '项目',
  'New Project': '新建项目',
  '+ New Project': '+ 新建项目',
  Pinned: '已固定',
  Repositories: '仓库',
  More: '更多',
  'No Repo': '无仓库',
  'This Mac': '本机 Mac',
  'This PC': '本机 PC',
  'This Computer': '本机',
  'Search repos, cloud environments...': '搜索仓库、云端环境…',
  'Search workspaces...': '搜索工作区…',
  'Start from scratch': '从零开始',
  '+ Start from scratch': '+ 从零开始',
  Workspaces: '工作区',
  Remote: '远程',
  'Use Existing...': '使用已有…',
  'Run on': '运行于',
  'Remote Machine': '远程机器',
  'All Remote Machines': '全部远程机器',
  'Search Remote Machines…': '搜索远程机器…',
  'Search Remote Machines...': '搜索远程机器…',
  'No remote machines yet.': '暂无远程机器。',
  'Connect via SSH': '通过 SSH 连接',
  'Connect via WSL': '通过 WSL 连接',
  'Cursor for your workflows': '用 Cursor 驱动你的工作流',

  // ── Settings 侧栏（部分靠 settings-nav 精准替换）──
  Appearance: '外观',
  Voice: '语音',
  'Source Control': '源码管理',

  // ── 通用 / 隐私 ──
  'Show notifications for less urgent issues': '显示较不紧急问题的通知',
  'Show notifications for less urgent issues. Errors and informational notifications are always shown.':
    '显示较不紧急问题的通知。错误和信息类通知始终显示。',
  'Data Sharing Enabled': '数据共享已启用',
  'Your codebase, prompts, edits and other usage data will be stored and trained on by Cursor to improve the product.':
    '你的代码库、提示词、编辑记录及其他使用数据将被 Cursor 存储并用于训练，以改进产品。',

  // ── 外观 Appearance ──
  'Chat Width': '聊天宽度',
  'Set the maximum width of Agent conversations': '设置智能体对话的最大宽度',
  Narrow: '窄',
  Wide: '宽',
  Colors: '颜色',
  'Window Colors': '窗口颜色',

  // ── 套餐与用量 ──
  'Usage limits reset on ': '用量额度将于 ',
  'Get maximum value with 20x usage limits and early access to advanced features.':
    '获得 20 倍用量额度与高级功能抢先体验，发挥最大价值。',
  Upgrade: '升级',
  'Auto + Composer': '自动 + Composer',
  'Additional usage beyond limits consumes API quota or on-demand spend.':
    '超出限制的额外用量将消耗 API 额度或按需消费。',
  'Additional usage beyond limits consumes API quota or on-demand usage.':
    '超出限制的额外用量将消耗 API 额度或按需消费。',
  'Additional usage beyond limits consumes on-demand spend.':
    '超出限制的额外用量将消耗按需消费。',
  ' used': ' 已使用',
  '% used': '% 已使用',
  Disabled: '已禁用',
  Save: '保存',

  // ── 智能体 Agents / 远程控制 ──
  'Allow the chat to switch to modes like Planner/Debug without asking. When off, Cursor asks first, but switches if unanswered within 15 seconds.':
    '允许聊天在不询问的情况下切换到规划/调试等模式。关闭时，Cursor 会先询问；若 15 秒内未答复则自动切换。',
  'Enable Remote Control for this computer': '为本机启用远程控制',
  'Allow agents on this computer to be controlled from your other devices':
    '允许从你的其他设备控制本机上的智能体',
  'Automatically register computers': '自动注册电脑',
  'Register eligible computers when you sign in': '登录时自动注册符合条件的电脑',
  'Computer Name': '电脑名称',
  'Change how this computer appears on other devices': '更改此电脑在其他设备上的显示名称',
  'Unregister All': '全部注销',
  'Unregisters every computer on your account; you can register any of them again later':
    '注销你账号下的所有电脑；之后可重新注册任意一台',
  'Disable Remote Control on all of my computers': '在我的所有电脑上禁用远程控制',
  'Disable Remote Control on all of your computers?': '要在你的所有电脑上禁用远程控制吗？',
  'No devices are currently paired with this computer.': '当前没有设备与此电脑配对。',
  'Paired Devices': '已配对设备',
  'Self-Hosted Workers': '自托管工作进程',
  'Enable local self-hosted workers': '启用本地自托管工作进程',
  'Allow cloud agents to run in your local environment.': '允许云端智能体在本地环境运行。',
  'Allow cloud agents to run in your local environment': '允许云端智能体在本地环境运行',
  'Sync Skills for Cloud Agents': '为云端智能体同步技能',
  'Cursor syncs your local skills so they can be used with Cloud Agents':
    'Cursor 会同步你的本地技能，以便在云端智能体中使用',
  'Cursor syncs your local skills so they can be used with Cloud Agents. Turn this off to disable syncing.':
    'Cursor 会同步你的本地技能，以便在云端智能体中使用。关闭此项可停止同步。',
  'Read Access': '读取权限',
  'Control whether agents can read files outside the workspace without approval.':
    '控制智能体是否可在未经批准时读取工作区外的文件。',
  'Control whether agents can read files outside the workspace without approval':
    '控制智能体是否可在未经批准时读取工作区外的文件',
  'You can configure Shell, MCP, Fetch, and Read allowlists for Auto mode. However, Auto works well without these.':
    '可为自动模式配置 Shell、MCP、Fetch 和读取白名单。不过不配置时，自动模式通常也能正常工作。',
  'You can configure Shell, MCP, Fetch, and Read whitelists for Auto mode. However, Auto mode will default these.':
    '可为自动模式配置 Shell、MCP、Fetch 和读取白名单。不过自动模式会使用默认配置。',
  'Computer Use': '电脑操控',
  'Always-allowed apps: Cursor can use these in any chat without asking. Remove one to be asked again.':
    '始终允许的应用：Cursor 可在任意对话中使用这些应用而无需询问。移除后会再次询问。',
  'No always-allowed apps yet. Choose Always Allow when Cursor asks to use an app.':
    '暂无始终允许的应用。当 Cursor 请求使用应用时选择「始终允许」即可。',

  // ── 语音 Voice ──
  'Agent Voice': '智能体语音',
  'Default voice for voice chats': '语音聊天的默认音色',
  'Default voice for voice chats. Changing the voice plays a short sample.':
    '语音聊天的默认音色。更改音色会播放一小段样例。',
  Speed: '语速',
  'How quickly the voice speaks in voice chats': '语音聊天中的语速',
  Language: '语言',
  'Language used in voice chats': '语音聊天使用的语言',
  'Auto-detect': '自动检测',
  Microphone: '麦克风',
  'Microphone used in voice chats.': '语音聊天使用的麦克风。',
  'Microphone used in voice chats': '语音聊天使用的麦克风',
  'System Default': '系统默认',
  'Words that send your prompt while you dictate': '听写时用于发送提示词的关键字',
  'Words that send your prompt while you dictate. Voice chats ignore them.':
    '听写时用于发送提示词的关键字。语音聊天会忽略这些关键字。',
  'Status chimes': '状态提示音',
  'Play subtle tones when a task is sent, a result arrives after silence, the agent needs a decision, or an error occurs.':
    '在任务发送、静默后收到结果、智能体需要决策或发生错误时播放轻提示音。',

  // ── 源码管理 Source Control ──
  'Choose Origin (cursor.com/codebase), GitHub, or Graphite for pull request links on web and desktop':
    '选择 Origin（cursor.com/codebase）、GitHub 或 Graphite 作为网页和桌面端拉取请求链接提供方',
  'Choose Origin (cursor.com/codebase) or GitHub for GitHub pull request links on web and desktop':
    '选择 Origin（cursor.com/codebase）或 GitHub 作为网页和桌面端 GitHub 拉取请求链接提供方',
  'Worktree Cleanup': '工作树清理',
  'Cursor periodically removes old worktrees to free disk space':
    'Cursor 会定期删除旧工作树以释放磁盘空间',
  'Cursor periodically removes old worktrees to free disk space. Tune how aggressively cleanup runs.':
    'Cursor 会定期删除旧工作树以释放磁盘空间。可调整清理强度。',

  // ── Agent 输入框 / 账号菜单 / 模型选择器（3.28 截图补全）──
  'Steer without interrupting': '引导而不打断',
  'Send follow-up': '发送跟进',
  'Send follow-up with subagent': '使用子智能体发送跟进',
  'Get Cursor for iOS': '获取 Cursor iOS 版',
  'Get Grok Bot': '获取 Grok Bot',
  'Meet Grok Bot': '认识 Grok Bot',
  'Contact Us': '联系我们',
  Shortcuts: '快捷键',
  'Report Issue': '报告问题',
  Settings: '设置',
  'Close Settings': '关闭设置',
  'Cursor Models': 'Cursor 模型',
  'Includes Cursor Grok and Composer': '包含 Cursor Grok 与 Composer',
  Context: '上下文',
  'Maximum context window size': '最大上下文窗口大小',
  Thinking: '思考',
  'Enable extended thinking for complex reasoning tasks': '为复杂推理任务启用扩展思考',
  'Enable extended thinking for complex reasoning': '为复杂推理启用扩展思考',
  Model: '模型',
  // 以下短词仅作 UI 属性替换（不会全局替换枚举）
  Fast: '快速',
  Effort: '力度',
  Low: '低',
  Medium: '中',
  High: '高',
  'Extra High': '极高',
  'Balanced quality and speed, recommended for most tasks':
    '质量与速度平衡，推荐用于大多数任务',
};

module.exports = { ui328Dict };
