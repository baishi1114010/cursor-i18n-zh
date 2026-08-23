const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawnSync } = require('child_process');

const PLATFORM = os.platform();

const TARGET_FILES = [
  {
    rel: 'out/vs/workbench/workbench.desktop.main.js',
    hashKey: 'vs/workbench/workbench.desktop.main.js',
    label: 'Cursor Settings / Agent',
  },
  {
    rel: 'out/vs/workbench/workbench.glass.main.js',
    hashKey: null,
    label: 'Glass 主页',
  },
  {
    rel: 'out/vs/workbench/workbench.anysphere-ui-automations.js',
    hashKey: null,
    label: 'Automations 自动化页',
  },
];

const PRODUCT_REL = 'product.json';

function buildCursorPaths(appPath) {
  const appBundlePath =
    PLATFORM === 'darwin' && appPath.includes('/Contents/Resources/app')
      ? appPath.split('/Contents/Resources/app')[0]
      : null;

  return {
    appPath,
    appBundlePath,
    productJsonPath: path.join(appPath, PRODUCT_REL),
    targets: TARGET_FILES.map((t) => ({
      ...t,
      abs: path.join(appPath, t.rel),
    })),
  };
}

function resolveAppPath(input) {
  if (!input) return null;

  const normalized = path.resolve(input);
  const candidates = [normalized];

  if (PLATFORM === 'win32') {
    candidates.push(path.join(normalized, 'resources', 'app'));
    candidates.push(path.join(normalized, 'cursor', 'resources', 'app'));
  } else if (PLATFORM === 'darwin') {
    candidates.push(path.join(normalized, 'Contents', 'Resources', 'app'));
  } else {
    candidates.push(path.join(normalized, 'resources', 'app'));
  }

  return candidates.find((p) => fs.existsSync(path.join(p, PRODUCT_REL))) || null;
}

function detectCursorPath(customPath) {
  if (customPath) {
    const appPath = resolveAppPath(customPath);
    return appPath ? buildCursorPaths(appPath) : null;
  }

  const appPath = getDefaultCursorCandidates().find((p) => fs.existsSync(p));
  if (!appPath) return null;

  return buildCursorPaths(appPath);
}

function getDefaultCursorCandidates() {
  if (PLATFORM === 'win32') {
    return [
      path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'Programs', 'cursor', 'resources', 'app'),
      path.join(process.env.ProgramFiles || 'C:\\Program Files', 'cursor', 'resources', 'app'),
    ];
  }
  if (PLATFORM === 'darwin') {
    return [
      '/Applications/Cursor.app/Contents/Resources/app',
      path.join(os.homedir(), 'Applications', 'Cursor.app', 'Contents', 'Resources/app'),
    ];
  }
  return [
    '/opt/Cursor/resources/app',
    path.join(os.homedir(), '.local/share/cursor/resources/app'),
  ];
}

function readCursorVersion(appPath) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(appPath, 'package.json'), 'utf8'));
    return pkg.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

function isCursorRunning() {
  try {
    if (PLATFORM === 'darwin') {
      const out = execSync('pgrep -x Cursor 2>/dev/null || true', { encoding: 'utf8' }).trim();
      return out.length > 0;
    }
    if (PLATFORM === 'win32') {
      const out = execSync('tasklist /FI "IMAGENAME eq Cursor.exe" 2>nul', { encoding: 'utf8' });
      return out.includes('Cursor.exe');
    }
    const out = execSync('pgrep -f cursor 2>/dev/null || true', { encoding: 'utf8' }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
}

function hasWritePermission(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function needsElevation(paths) {
  const files = [paths.productJsonPath, ...paths.targets.map((t) => t.abs)];
  return files.some((f) => fs.existsSync(f) && !hasWritePermission(f));
}

function isRoot() {
  return typeof process.getuid === 'function' && process.getuid() === 0;
}

function elevateAndRun(action) {
  if (action !== 'localize' && action !== 'restore') {
    throw new Error(`Invalid action: ${action}`);
  }
  const entry = path.resolve(__dirname, '..', 'index.js');
  const projectDir = path.dirname(entry);
  const safeFlag = action === 'localize' ? '--action=localize' : '--action=restore';
  const shellCmd = [
    `cd ${JSON.stringify(projectDir)}`,
    `${JSON.stringify(process.execPath)} ${JSON.stringify(entry)} ${safeFlag}`,
  ].join(' && ');
  const script = `do shell script ${JSON.stringify(shellCmd)} with administrator privileges`;
  spawnSync('osascript', ['-e', script], { stdio: 'inherit' });
}

function prepareAppForWrite(appBundlePath, filePaths) {
  if (PLATFORM !== 'darwin') return;

  if (appBundlePath && fs.existsSync(appBundlePath)) {
    try {
      spawnSync('xattr', ['-cr', appBundlePath], { stdio: 'pipe' });
    } catch {
      /* ignore */
    }
  }

  for (const f of filePaths) {
    if (!fs.existsSync(f)) continue;
    try {
      fs.chmodSync(f, 0o644);
    } catch {
      /* ignore */
    }
  }
}

function getStatePath() {
  return path.join(os.homedir(), '.cursor-i18n-zh', 'state.json');
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(getStatePath(), 'utf8'));
  } catch {
    return {};
  }
}

function writeState(state) {
  const dir = path.dirname(getStatePath());
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(getStatePath(), JSON.stringify(state, null, 2), 'utf8');
}

module.exports = {
  PLATFORM,
  TARGET_FILES,
  detectCursorPath,
  resolveAppPath,
  getDefaultCursorCandidates,
  readCursorVersion,
  isCursorRunning,
  hasWritePermission,
  needsElevation,
  isRoot,
  elevateAndRun,
  prepareAppForWrite,
  readState,
  writeState,
  getStatePath,
};
