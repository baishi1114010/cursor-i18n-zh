#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { ensureBackup, restoreFromBackup, hasBackup, getBackupDir } = require('./src/backup');
const { fixProductHashes } = require('./src/hash');
const {
  detectCursorPath,
  getDefaultCursorCandidates,
  readCursorVersion,
  isCursorRunning,
  needsElevation,
  isRoot,
  elevateAndRun,
  prepareAppForWrite,
  readState,
  writeState,
  PLATFORM,
} = require('./src/platform');
const { translateFile, fixMacGatekeeper } = require('./src/translate');
const { configureLocale } = require('./src/locale');

const VERSION = '1.3.2';
let customInstallPath = null;

function getPaths() {
  return requireCursorPaths(customInstallPath);
}

function printHelp() {
  console.log(`
Cursor 界面汉化工具 v${VERSION}

用法:
  node index.js localize   一键汉化（Settings + Glass + Agent）
  node index.js restore    恢复英文原版
  node index.js status     查看当前状态
  node index.js locale     仅配置 VS Code 中文语言包
  node index.js help       显示帮助

选项:
  -p, --path <目录>        手动指定 Cursor 安装路径（Windows 常用）

说明:
  - 汉化前请先完全退出 Cursor（Cmd+Q）
  - 若权限不足，工具会弹出 macOS 授权对话框
  - 也可手动运行: sudo node index.js localize
  - Cursor 更新后需重新运行 localize
`);
}

function parseCustomPath(args) {
  const pathFlagIndex = args.findIndex((a) => a === '-p' || a === '--path');
  if (pathFlagIndex === -1) return null;
  const value = args[pathFlagIndex + 1];
  if (!value || value.startsWith('-')) {
    console.error('❌ 请在使用 -p / --path 后提供 Cursor 安装目录。');
    console.error('   示例: node index.js localize -p "D:\\software\\cursor"');
    process.exit(1);
  }
  return value;
}

function requireCursorPaths(customPath) {
  const paths = detectCursorPath(customPath);
  if (!paths) {
    console.error('❌ 未找到 Cursor 安装目录，请确认 Cursor 已安装。');
    if (customPath) {
      console.error(`   已指定路径: ${customPath}`);
      console.error('   请确认该目录下存在 resources\\app\\product.json');
      console.error('   或直接指定到 resources\\app 目录。');
    } else if (PLATFORM === 'win32') {
      console.error('\n   Windows 默认查找位置:');
      for (const p of getDefaultCursorCandidates()) {
        console.error(`   - ${p}`);
      }
      console.error('\n   若 Cursor 安装在其他盘，请使用:');
      console.error('   node index.js localize -p "D:\\你的路径\\cursor"');
    }
    process.exit(1);
  }
  return paths;
}

function ensureNotRunning() {
  if (isCursorRunning()) {
    console.error('\n❌ 检测到 Cursor 仍在运行。');
    console.error('   请先完全退出 Cursor（Cmd+Q），再重新运行汉化。\n');
    process.exit(1);
  }
}

function cmdStatus() {
  const paths = getPaths();
  const version = readCursorVersion(paths.appPath);
  const state = readState();

  console.log('\n📋 Cursor 汉化状态\n');
  console.log(`  Cursor 版本: ${version}`);
  console.log(`  安装路径:   ${paths.appPath}`);
  console.log(`  平台:       ${PLATFORM}`);
  console.log(`  当前用户:   ${isRoot() ? 'root' : process.env.USER || 'unknown'}`);
  console.log(`  Cursor 运行: ${isCursorRunning() ? '是 ⚠️' : '否 ✅'}`);

  if (state.localizedVersion) {
    const outdated = state.localizedVersion !== version;
    console.log(`  上次汉化:   v${state.localizedVersion}${outdated ? ' ⚠️ 版本已更新，建议重新汉化' : ' ✅'}`);
    if (state.localizedAt) console.log(`  汉化时间:   ${state.localizedAt}`);
  } else {
    console.log('  上次汉化:   未汉化');
  }

  console.log(`\n  备份目录:   ${getBackupDir(version)}`);
  console.log('\n  文件备份状态:');
  for (const t of paths.targets) {
    const ok = hasBackup(t.abs, version);
    console.log(`    ${path.basename(t.rel)}: ${ok ? '✅ 有备份' : '— 无备份'} (${t.label})`);
  }

  const localePath = path.join(require('os').homedir(), 'Library/Application Support/Cursor/User/locale.json');
  if (fs.existsSync(localePath)) {
    try {
      const locale = JSON.parse(fs.readFileSync(localePath, 'utf8'));
      console.log(`\n  VS Code 语言: ${locale.locale || '未设置'}`);
    } catch {
      /* ignore */
    }
  }

  console.log('');
}

function cmdLocale() {
  console.log('\n🌐 配置 VS Code 中文语言包...\n');
  const results = configureLocale();
  for (const r of results) {
    if (r.hint) console.log(`  ${r.hint}`);
    if (r.localePath) console.log(`  ✅ locale.json → ${r.localePath} (${r.locale})`);
    if (r.settingsUpdated) console.log('  ✅ settings.json 已写入 locale: zh-cn');
    else if (r.existingLocale) console.log(`  ℹ️ settings.json 已有 locale: ${r.existingLocale}`);
  }
  console.log('\n请重启 Cursor 使 VS Code 基础界面生效。\n');
}

function cmdLocalize() {
  ensureNotRunning();

  const paths = getPaths();
  const version = readCursorVersion(paths.appPath);
  const writableFiles = [paths.productJsonPath, ...paths.targets.map((t) => t.abs)];

  console.log('\n🚀 Cursor 界面汉化');
  console.log(`   版本: ${version}`);
  console.log(`   路径: ${paths.appPath}`);
  console.log(`   备份: ${getBackupDir(version)}\n`);

  prepareAppForWrite(paths.appBundlePath, writableFiles);

  // 1. 配置 VS Code 语言包
  console.log('📦 步骤 1/4: 配置 VS Code 中文语言包');
  cmdLocale();

  // 2. 备份（存到用户目录，避免 .app 内写文件被 macOS 拦截）
  console.log('💾 步骤 2/4: 备份原始文件');
  for (const f of writableFiles) {
    if (!fs.existsSync(f)) continue;
    try {
      const result = ensureBackup(f, version);
      if (result) {
        const msg = result.action === 'created-backup' ? '已备份' : '已从备份还原到干净状态';
        console.log(`  ✅ ${path.basename(f)}: ${msg}`);
        console.log(`     → ${result.path}`);
      }
    } catch (e) {
      console.error(`  ❌ ${path.basename(f)} 备份失败: ${e.message}`);
      process.exit(1);
    }
  }

  // 3. 翻译
  console.log('\n⚙️ 步骤 3/4: 应用中文翻译');
  const hashTargets = [];
  for (const t of paths.targets) {
    if (!fs.existsSync(t.abs)) {
      console.log(`  ⚠️ 跳过（文件不存在）: ${t.rel}`);
      continue;
    }
    try {
      const { changed } = translateFile(t.abs);
      console.log(`  ${changed ? '✅' : 'ℹ️'} ${path.basename(t.rel)} (${t.label})${changed ? '' : ' — 无变更'}`);
      if (t.hashKey) hashTargets.push({ hashKey: t.hashKey, abs: t.abs });
    } catch (e) {
      console.error(`  ❌ ${path.basename(t.rel)} 翻译失败: ${e.message}`);
      process.exit(1);
    }
  }

  // 4. Hash + 签名
  console.log('\n🛠️ 步骤 4/4: 修复完整性校验');
  try {
    const fixed = fixProductHashes(paths.productJsonPath, hashTargets);
    if (fixed.length > 0) {
      console.log(`  ✅ 已更新 product.json 校验: ${fixed.join(', ')}`);
    } else {
      console.log('  ℹ️ 无需更新校验值');
    }
  } catch (e) {
    console.error(`  ❌ 校验修复失败: ${e.message}`);
    process.exit(1);
  }

  if (PLATFORM === 'darwin') {
    fixMacGatekeeper(paths.appBundlePath);
  }

  writeState({
    localizedVersion: version,
    localizedAt: new Date().toISOString(),
    appPath: paths.appPath,
  });

  console.log('\n🎉 汉化完成！请重启 Cursor 查看中文界面。');
  console.log('   若 Cursor 更新后界面恢复英文，请重新运行: node index.js localize\n');
}

function cmdRestore() {
  ensureNotRunning();

  const paths = getPaths();
  const version = readCursorVersion(paths.appPath);
  const writableFiles = [paths.productJsonPath, ...paths.targets.map((t) => t.abs)];

  prepareAppForWrite(paths.appBundlePath, writableFiles);

  console.log('\n⏪ 恢复英文原版...\n');
  let restored = 0;

  for (const f of writableFiles) {
    if (restoreFromBackup(f, version)) {
      console.log(`  ✅ 已还原: ${path.basename(f)}`);
      restored++;
    }
  }

  if (restored > 0) {
    const hashTargets = paths.targets.filter((t) => t.hashKey).map((t) => ({ hashKey: t.hashKey, abs: t.abs }));
    fixProductHashes(paths.productJsonPath, hashTargets);
    if (PLATFORM === 'darwin') fixMacGatekeeper(paths.appBundlePath);
    writeState({ ...readState(), localizedVersion: null, restoredAt: new Date().toISOString() });
    console.log('\n🎉 已恢复英文原版！请重启 Cursor。\n');
  } else {
    console.log('\n⚠️ 未找到备份文件。请先执行 localize 创建备份。\n');
  }
}

async function main() {
  const args = process.argv.slice(2);
  customInstallPath = parseCustomPath(args);
  const actionFlag = args.find((a) => a.startsWith('--action='));
  const command = actionFlag ? actionFlag.split('=')[1] : args.find((a) => !a.startsWith('-') && a !== customInstallPath && a !== '-p' && a !== '--path') || 'help';

  if (command === 'help' || command === '-h' || command === '--help') {
    printHelp();
    return;
  }

  if (command === 'status') {
    cmdStatus();
    return;
  }

  if (command === 'locale') {
    cmdLocale();
    return;
  }

  if (command === 'localize' || command === 'restore') {
    const paths = getPaths();

    if (needsElevation(paths) && !isRoot() && !actionFlag) {
      console.log('🔐 需要管理员权限以修改 Cursor 安装目录...\n');
      console.log('   即将弹出 macOS 授权对话框，请输入密码。\n');
      try {
        elevateAndRun(command);
      } catch (e) {
        console.error('❌ 提权失败:', e.message);
        console.error('\n   请手动运行以下命令之一:');
        console.error('   sudo node index.js', command);
        console.error('   或在系统设置 → 隐私与安全性 → 完全磁盘访问权限 中授权终端\n');
        process.exit(1);
      }
      return;
    }

    if (command === 'localize') cmdLocalize();
    else cmdRestore();
    return;
  }

  console.error(`未知命令: ${command}`);
  printHelp();
  process.exit(1);
}

main().catch((e) => {
  console.error('❌ 错误:', e.message);
  process.exit(1);
});
