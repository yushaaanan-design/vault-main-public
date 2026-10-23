// Validates an n8n workflow export. Run: node validate.js <path>
const fs = require('fs');

const file = process.argv[2] ||
  'C:/OBSIDIAN VAULT/Codebase and learning/Projects/N8N/workflows/reel-to-knowledge.json';

const errors = [];
const warns = [];
const ok = [];

// 1. parses
let wf;
try {
  wf = JSON.parse(fs.readFileSync(file, 'utf8'));
  ok.push('JSON parses (' + fs.statSync(file).size + ' bytes)');
} catch (e) {
  console.error('FATAL: JSON does not parse -', e.message);
  process.exit(1);
}

// 2. top level shape
for (const k of ['name', 'nodes', 'connections', 'settings']) {
  if (!(k in wf)) errors.push('missing top-level key: ' + k);
}
const extra = Object.keys(wf).filter((k) => !['name', 'nodes', 'connections', 'settings', 'pinData'].includes(k));
if (extra.length) warns.push('extra top-level keys (harmless but not required): ' + extra.join(', '));
if (!Array.isArray(wf.nodes)) { console.error('FATAL: nodes is not an array'); process.exit(1); }
ok.push('top-level keys present: ' + Object.keys(wf).join(', '));

// 3. per-node required fields, unique id + name
const ids = new Map();
const names = new Map();
const STICKY = 'n8n-nodes-base.stickyNote';
for (const [i, n] of wf.nodes.entries()) {
  const at = 'nodes[' + i + ']' + (n.name ? ' "' + n.name + '"' : '');
  for (const k of ['parameters', 'id', 'name', 'type', 'typeVersion', 'position']) {
    if (n[k] === undefined) errors.push(at + ': missing ' + k);
  }
  if (n.parameters && typeof n.parameters !== 'object') errors.push(at + ': parameters is not an object');
  if (!Array.isArray(n.position) || n.position.length !== 2 || n.position.some((v) => typeof v !== 'number')) {
    errors.push(at + ': position must be [number, number]');
  }
  if (typeof n.typeVersion !== 'number') errors.push(at + ': typeVersion must be a number, got ' + typeof n.typeVersion);
  if (ids.has(n.id)) errors.push('duplicate node id "' + n.id + '" (' + ids.get(n.id) + ' and ' + n.name + ')');
  else ids.set(n.id, n.name);
  if (names.has(n.name)) errors.push('duplicate node name "' + n.name + '"');
  else names.set(n.name, n);
}
ok.push(wf.nodes.length + ' nodes, all ids unique, all names unique');

// 4. connections keys + targets resolve
const conn = wf.connections || {};
for (const [src, spec] of Object.entries(conn)) {
  if (!names.has(src)) errors.push('connections key "' + src + '" is not a node name');
  if (!spec || !Array.isArray(spec.main)) { errors.push('connections["' + src + '"].main must be an array'); continue; }
  for (const [oi, out] of spec.main.entries()) {
    if (out === null) continue;
    if (!Array.isArray(out)) { errors.push('connections["' + src + '"].main[' + oi + '] must be an array of arrays'); continue; }
    for (const c of out) {
      if (!c || typeof c.node !== 'string') { errors.push('connections["' + src + '"].main[' + oi + '] has a malformed entry'); continue; }
      if (!names.has(c.node)) errors.push('connections["' + src + '"].main[' + oi + '] -> "' + c.node + '" does not exist');
      if (c.type !== 'main') errors.push('connections["' + src + '"].main[' + oi + '] -> "' + c.node + '" has type "' + c.type + '", expected "main"');
      if (typeof c.index !== 'number') errors.push('connections["' + src + '"] -> "' + c.node + '" missing numeric index');
    }
  }
}
ok.push(Object.keys(conn).length + ' connection sources, every key and every target resolves to a real node');

// 5. reachability from the trigger (sticky notes exempt)
const triggers = wf.nodes.filter((n) => /trigger/i.test(n.type) || /\.(webhook)$/.test(n.type));
if (triggers.length !== 1) errors.push('expected exactly 1 trigger node, found ' + triggers.length);
const seen = new Set();
const queue = triggers.map((t) => t.name);
while (queue.length) {
  const cur = queue.shift();
  if (seen.has(cur)) continue;
  seen.add(cur);
  const spec = conn[cur];
  if (!spec) continue;
  for (const out of spec.main || []) for (const c of out || []) queue.push(c.node);
}
const orphans = wf.nodes.filter((n) => n.type !== STICKY && !seen.has(n.name)).map((n) => n.name);
if (orphans.length) errors.push('unreachable from the trigger: ' + orphans.join(', '));
else ok.push((wf.nodes.length - wf.nodes.filter((n) => n.type === STICKY).length) + ' non-sticky nodes all reachable from "' + (triggers[0] && triggers[0].name) + '"');

// sticky notes must have no connections
for (const n of wf.nodes.filter((x) => x.type === STICKY)) {
  if (conn[n.name]) errors.push('sticky note "' + n.name + '" has outgoing connections');
}

// 6. every IF / Switch output wired, and no node with outputs left dangling
const expectedOutputs = (n) => {
  const errOut = n.onError === 'continueErrorOutput' ? 1 : 0;
  if (n.type === 'n8n-nodes-base.if') return 2 + errOut;
  if (n.type === 'n8n-nodes-base.switch') {
    const rules = ((n.parameters.rules || {}).values || []).length;
    const fb = (n.parameters.options || {}).fallbackOutput;
    return rules + (fb === 'extra' ? 1 : 0) + errOut;
  }
  return 1 + errOut;
};
const terminals = new Set();
for (const n of wf.nodes) {
  if (n.type === STICKY) continue;
  const want = expectedOutputs(n);
  const got = conn[n.name] ? (conn[n.name].main || []).length : 0;
  const branchy = n.type === 'n8n-nodes-base.if' || n.type === 'n8n-nodes-base.switch' || n.onError === 'continueErrorOutput';
  if (got === 0) { terminals.add(n.name); continue; }
  if (branchy && got !== want) {
    errors.push(n.name + ' (' + n.type.split('.').pop() + '): expected ' + want + ' wired outputs, found ' + got);
  }
  for (const [oi, out] of (conn[n.name].main || []).entries()) {
    if (!out || out.length === 0) errors.push(n.name + ': output index ' + oi + ' is wired to nothing');
  }
}
const branchNodes = wf.nodes.filter((n) => ['n8n-nodes-base.if', 'n8n-nodes-base.switch'].includes(n.type));
for (const n of branchNodes) if (terminals.has(n.name)) errors.push(n.name + ' is a branch node with no outputs wired at all');
ok.push(branchNodes.length + ' IF/Switch nodes: every output index wired');
ok.push('terminal nodes (no outgoing, expected to be the end of a path): ' + [...terminals].join(', '));

// 7. credentials are placeholders, never a real-looking secret
const SECRET = /(sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{30,}|gsk_[A-Za-z0-9]{20,}|\d{9,10}:[A-Za-z0-9_-]{30,})/;
const blob = JSON.stringify(wf);
if (SECRET.test(blob)) errors.push('the file contains something that looks like a real API key / bot token');
else ok.push('no API-key-shaped strings anywhere in the file');
const credNodes = wf.nodes.filter((n) => n.credentials);
for (const n of credNodes) {
  for (const [ct, c] of Object.entries(n.credentials)) {
    if (!c.name) errors.push(n.name + ': credential ' + ct + ' has no name');
    if (!String(c.id).startsWith('REPLACE')) warns.push(n.name + ': credential ' + ct + ' id is not a REPLACE_ placeholder');
  }
}
ok.push(credNodes.length + ' nodes carry credential placeholders');

// 8. expressions referencing a node by name must reference a real node
const refRe = /\$\(\s*['"]([^'"]+)['"]\s*\)/g;
const badRefs = new Set();
const walk = (v) => {
  if (typeof v === 'string') { let m; while ((m = refRe.exec(v))) if (!names.has(m[1])) badRefs.add(m[1]); }
  else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
};
wf.nodes.forEach((n) => walk(n.parameters));
if (badRefs.size) errors.push("expressions reference node names that do not exist: " + [...badRefs].join(', '));
else ok.push('every $(\'Node Name\') reference in every expression points at a real node');

// 9. every Code node body is syntactically valid JS
for (const n of wf.nodes.filter((x) => x.type === 'n8n-nodes-base.code')) {
  try { new Function(n.parameters.jsCode); } catch (e) { errors.push(n.name + ': jsCode is not valid JavaScript - ' + e.message); }
}
ok.push(wf.nodes.filter((x) => x.type === 'n8n-nodes-base.code').length + ' Code nodes: bodies parse as JavaScript');

// 10. expression fields must start with '=' if they contain {{ }}
for (const n of wf.nodes) {
  const check = (v, path) => {
    if (typeof v === 'string') {
      if (v.includes('{{') && !v.startsWith('=')) errors.push(n.name + '.' + path + ' contains {{ }} but does not start with "=" (n8n will treat it as literal text)');
    } else if (v && typeof v === 'object') {
      for (const [k, vv] of Object.entries(v)) check(vv, path + '.' + k);
    }
  };
  if (n.type !== STICKY) check(n.parameters, 'parameters');
}
ok.push('every parameter containing {{ }} is marked as an expression with a leading "="');

// 11. an Execute Command node REPLACES item json with {exitCode,stdout,stderr}.
// Any node fed only by Execute Command nodes must not read other fields off bare $json.
const preds = new Map();
for (const [src, spec] of Object.entries(conn)) {
  for (const out of spec.main || []) for (const c of out || []) {
    if (!preds.has(c.node)) preds.set(c.node, []);
    preds.get(c.node).push(src);
  }
}
const CMD_FIELDS = new Set(['exitCode', 'stdout', 'stderr', 'error']);
const bareRe = /\$json\.([A-Za-z_][A-Za-z0-9_]*)/g;
for (const n of wf.nodes) {
  const ps = preds.get(n.name) || [];
  if (!ps.length) continue;
  if (!ps.every((p) => names.get(p).type === 'n8n-nodes-base.executeCommand')) continue;
  const hits = new Set();
  const scan = (v) => {
    if (typeof v === 'string') { let m; while ((m = bareRe.exec(v))) if (!CMD_FIELDS.has(m[1])) hits.add(m[1]); }
    else if (Array.isArray(v)) v.forEach(scan);
    else if (v && typeof v === 'object') Object.values(v).forEach(scan);
  };
  scan(n.parameters);
  if (hits.size) {
    errors.push(n.name + ' is fed only by Execute Command (' + ps.join(', ') + ') but reads $json.' +
      [...hits].join(', $json.') + ' - that data is gone. Use $(\'Node Name\').item.json instead.');
  }
}
ok.push('no node reads vanished fields off $json after an Execute Command node');

// report
console.log('validating ' + file + '\n');
for (const o of ok) console.log('  PASS  ' + o);
if (warns.length) { console.log(''); for (const w of warns) console.log('  WARN  ' + w); }
if (errors.length) {
  console.log('');
  for (const e of errors) console.log('  FAIL  ' + e);
  console.log('\n' + errors.length + ' error(s).');
  process.exit(1);
}
console.log('\nALL CHECKS PASSED.');
