#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, "..");

const PROJECTS = [
  { id: "orbit-shop", name: "Orbit Shop", aliases: ["orbit-shop", "Orbit Shop"] },
  { id: "garden-notes", name: "Garden Notes", aliases: ["Garden Notes", "garden-notes"] },
  { id: "home-companion", name: "Home Companion", aliases: ["Home Companion", "home-companion"] },
  { id: "memory-lab", name: "Memory Lab", aliases: ["Memory Lab", "memory-lab"] }
];

const TYPE_LABELS = {
  decision: "Decisions",
  risk: "Risks",
  todo: "Todos",
  project_state: "Current State",
  fact: "Facts",
  preference: "Preferences",
  person: "People",
  question: "Open Questions"
};

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function memoryRoot(args) {
  return path.resolve(PACKAGE_ROOT, args.root || "memory");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function writeIfMissing(file, content) {
  if (await exists(file)) return false;
  await ensureDir(path.dirname(file));
  await fs.writeFile(file, content);
  return true;
}

function nowIso() {
  return new Date().toISOString();
}

function slugDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function splitStatements(text) {
  const lines = normalizeText(text)
    .split(/\n+/)
    .map((line) => {
      const roleMatch = line.match(/^(User|Assistant|用户|助手)\s*[:：]\s*(.*)$/i);
      if (roleMatch) {
        const rawRole = roleMatch[1].toLowerCase();
        return {
          role: rawRole === "assistant" || rawRole === "助手" ? "assistant" : "user",
          text: roleMatch[2].trim()
        };
      }
      return { role: "note", text: line.trim() };
    })
    .filter((entry) => entry.text && !entry.text.startsWith("#"))
    .filter(Boolean);

  const out = [];
  for (const line of lines) {
    const parts = line.text
      .split(/(?<=[。！？!?；;])\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    for (const part of parts) out.push({ role: line.role, text: part });
  }
  return out;
}

function detectProjects(statement) {
  const normalized = statement.toLowerCase();
  return PROJECTS.filter((project) =>
    project.aliases.some((alias) => normalized.includes(alias.toLowerCase()))
  );
}

function inferTypes(statement) {
  const types = [];
  if (/待办|让.+补|需要.+补|需要.+确认|要.+验证|跟进|安排|下一步/.test(statement)) {
    types.push("todo");
    if (/风险|卡在|担心|不确定|阻塞|问题|隐患/.test(statement)) types.push("risk");
    return [...new Set(types)];
  }

  if (/风险|卡在|担心|不确定|阻塞|问题|隐患/.test(statement)) types.push("risk");
  if (/先别定|先不|暂缓|暂时不要|不做|否决|定案|暂停|决定(?!是否)/.test(statement)) types.push("decision");
  if (types.length === 0 && /状态|当前|先推进|进入下一步|方案|进展/.test(statement)) types.push("project_state");
  if (/偏好|我喜欢|我倾向|不要.+风格|沟通/.test(statement)) types.push("preference");
  if (/谁|负责人|客户|同事|联系人|open_id|电话|邮箱/.test(statement)) types.push("person");
  if (/为什么|怎么|是否|能不能|要不要/.test(statement)) types.push("question");
  if (types.length === 0) types.push("fact");
  return [...new Set(types)];
}

function inferStatus(type, statement) {
  if (type === "todo") {
    if (/已完成|完成了|搞定/.test(statement)) return "done";
    return "open";
  }
  if (/待确认|不确定|感觉|可能|也许/.test(statement)) return "pending";
  if (/先别定|先不|暂缓|暂停/.test(statement)) return "active";
  return "confirmed";
}

function confidenceFor(statement, type, role) {
  let score = 0.62;
  if (/记住|决定|先别定|先不|暂缓|待办|风险|需要/.test(statement)) score += 0.2;
  if (type === "fact") score -= 0.08;
  if (/感觉|可能|也许|似乎/.test(statement)) score -= 0.15;
  if (role === "assistant") score -= 0.08;
  return Math.max(0.2, Math.min(0.95, Number(score.toFixed(2))));
}

function extractCandidates(text, source) {
  const statements = splitStatements(text);
  const candidates = [];

  let activeProjects = [];
  for (const statementEntry of statements) {
    const statement = statementEntry.text;
    const mentioned = detectProjects(statement);
    if (mentioned.length > 0) activeProjects = mentioned;
    if (activeProjects.length === 0) continue;

    const types = inferTypes(statement);
    if (types.length === 1 && types[0] === "fact" && statement.length < 12) continue;
    if (statementEntry.role === "assistant" && !/待办|决定|风险|状态|暂缓|补|验证/.test(statement)) continue;

    for (const project of activeProjects) {
      for (const type of types) {
        candidates.push({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          project: project.id,
          projectName: project.name,
          type,
          content: statement,
          status: inferStatus(type, statement),
          confidence: confidenceFor(statement, type, statementEntry.role),
          source,
          role: statementEntry.role,
          createdAt: nowIso()
        });
      }
    }
  }

  return dedupeCandidates(candidates);
}

function dedupeCandidates(candidates) {
  const seen = new Set();
  const out = [];
  for (const candidate of candidates) {
    const key = `${candidate.project}|${candidate.type}|${candidate.content}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(candidate);
  }
  return out;
}

function formatCandidate(candidate) {
  const status = candidate.status ? ` status=${candidate.status}` : "";
  const confidence = ` confidence=${candidate.confidence}`;
  return `- ${candidate.content} <!-- type=${candidate.type}${status}${confidence} source=${candidate.source} at=${candidate.createdAt} -->`;
}

function sectionHeading(type) {
  return `## ${TYPE_LABELS[type] || type}`;
}

function ensureSection(markdown, type) {
  const heading = sectionHeading(type);
  if (markdown.includes(`${heading}\n`)) return markdown;
  return `${markdown.trim()}\n\n${heading}\n\n`;
}

function appendToSection(markdown, type, lines) {
  let next = ensureSection(markdown, type);
  const heading = sectionHeading(type);
  const idx = next.indexOf(`${heading}\n`);
  const afterHeading = idx + heading.length + 1;
  const nextSection = next.slice(afterHeading).search(/\n## /);
  const insertAt = nextSection === -1 ? next.length : afterHeading + nextSection;
  const before = next.slice(0, insertAt).trimEnd();
  const after = next.slice(insertAt);
  return `${before}\n${lines.join("\n")}\n${after}`;
}

async function initStore(root) {
  const dirs = [
    "hot",
    "warm/projects",
    "warm/indexes",
    "cold/conversations",
    "state"
  ];
  for (const dir of dirs) await ensureDir(path.join(root, dir));

  await writeIfMissing(path.join(root, "hot/CORE.md"), `# Daemon Hot Memory\n\n## User Core\n\n- Keep this short. Store durable user profile and communication preferences only.\n\n## Active Projects\n\n- Orbit Shop: one-line state pending first extraction.\n- Garden Notes: one-line state pending first extraction.\n- Home Companion: one-line state pending first extraction.\n- Memory Lab: one-line state pending first extraction.\n\n## Boundaries\n\n- Do not treat raw chat logs as long-term memory.\n- Retrieve focused warm memory instead of loading full history.\n`);

  for (const project of PROJECTS) {
    await writeIfMissing(path.join(root, `warm/projects/${project.id}.md`), `# ${project.name}\n\n## Current State\n\n- No curated state yet.\n\n## Decisions\n\n## Risks\n\n## Todos\n\n## Facts\n\n## Open Questions\n`);
  }

  for (const index of ["decisions", "risks", "todos", "people", "questions"]) {
    await writeIfMissing(path.join(root, `warm/indexes/${index}.md`), `# ${titleCase(index)} Index\n\n`);
  }

  await writeIfMissing(path.join(root, "state/candidates.jsonl"), "");
  await writeIfMissing(path.join(root, "state/maintenance.md"), "# Maintenance Report\n\nNo maintenance run yet.\n");
}

function titleCase(value) {
  return value.replace(/(^|[-_ ])\w/g, (m) => m.toUpperCase()).replace(/[-_]/g, " ");
}

async function appendJsonl(file, objects) {
  if (objects.length === 0) return;
  await ensureDir(path.dirname(file));
  await fs.appendFile(file, `${objects.map((object) => JSON.stringify(object)).join("\n")}\n`);
}

function candidateLooksDuplicate(markdown, candidate) {
  const normalized = normalizeForCompare(candidate.content);
  const section = sectionHeading(candidate.type);
  const sectionStart = markdown.indexOf(`${section}\n`);
  if (sectionStart === -1) return false;
  const sectionBody = markdown.slice(sectionStart + section.length + 1);
  const nextSection = sectionBody.search(/\n## /);
  const scoped = nextSection === -1 ? sectionBody : sectionBody.slice(0, nextSection);
  return scoped.split("\n").some((line) => normalizeForCompare(line).includes(normalized.slice(0, 42)));
}

function normalizeForCompare(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

async function applyCandidates(root, candidates) {
  const applied = [];
  const skipped = [];

  for (const candidate of candidates) {
    const projectFile = path.join(root, `warm/projects/${candidate.project}.md`);
    let markdown = await fs.readFile(projectFile, "utf8");
    if (candidateLooksDuplicate(markdown, candidate)) {
      skipped.push(candidate);
      continue;
    }
    markdown = appendToSection(markdown, candidate.type, [formatCandidate(candidate)]);
    await fs.writeFile(projectFile, markdown);
    applied.push(candidate);
  }

  await updateIndexes(root, applied);
  return { applied, skipped };
}

async function updateIndexes(root, candidates) {
  const indexMap = {
    decision: "decisions",
    risk: "risks",
    todo: "todos",
    person: "people",
    question: "questions"
  };
  const grouped = new Map();
  for (const candidate of candidates) {
    const index = indexMap[candidate.type];
    if (!index) continue;
    if (!grouped.has(index)) grouped.set(index, []);
    grouped.get(index).push(candidate);
  }

  for (const [index, items] of grouped.entries()) {
    const file = path.join(root, `warm/indexes/${index}.md`);
    const lines = items.map((candidate) =>
      `- [${candidate.projectName}](../projects/${candidate.project}.md): ${candidate.content} <!-- status=${candidate.status} source=${candidate.source} at=${candidate.createdAt} -->`
    );
    await fs.appendFile(file, `${lines.join("\n")}\n`);
  }
}

async function ingest(args) {
  const root = memoryRoot(args);
  await initStore(root);

  const input = args.input ? path.resolve(PACKAGE_ROOT, args.input) : null;
  if (!input) throw new Error("Missing --input <file>");

  const text = await fs.readFile(input, "utf8");
  const session = args.session || path.basename(input, path.extname(input));
  const coldFile = path.join(root, `cold/conversations/${slugDate()}-${session}.md`);
  await fs.copyFile(input, coldFile);

  const candidates = extractCandidates(text, path.relative(root, coldFile));
  await appendJsonl(path.join(root, "state/candidates.jsonl"), candidates);
  const result = await applyCandidates(root, candidates);

  printJson({
    input,
    coldFile,
    extracted: candidates.length,
    applied: result.applied.length,
    skipped: result.skipped.length,
    candidates: result.applied.map(({ projectName, type, status, confidence, content }) => ({
      projectName,
      type,
      status,
      confidence,
      content
    }))
  });
}

async function retrieve(args) {
  const root = memoryRoot(args);
  const query = args.query || args.q;
  if (!query) throw new Error("Missing --query <text>");
  const docs = await loadWarmDocs(root);
  const scored = docs
    .filter((doc) => !/^-\s+No curated state yet\./.test(doc.text.trim()))
    .map((doc) => ({ ...doc, score: scoreDoc(query, doc) }))
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score);
  const uniqueScored = [];
  const seen = new Set();
  for (const doc of scored) {
    const key = normalizeForCompare(stripHtmlComment(doc.text).replace(/\[[^\]]+\]\([^)]+\):\s*/g, ""));
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueScored.push(doc);
    if (uniqueScored.length >= Number(args.limit || 5)) break;
  }

  const contextPack = uniqueScored.map((doc) => ({
    score: doc.score,
    file: path.relative(root, doc.file),
    heading: doc.heading,
    text: doc.text
  }));

  printJson({
    query,
    contextPack,
    answerHint: buildAnswerHint(query, contextPack)
  });
}

async function loadWarmDocs(root) {
  const warmRoot = path.join(root, "warm");
  const files = await listMarkdownFiles(warmRoot);
  const docs = [];
  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    docs.push(...chunkMarkdown(file, text));
  }
  return docs;
}

async function listMarkdownFiles(dir) {
  const out = [];
  async function walk(current) {
    if (!(await exists(current))) return;
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
    }
  }
  await walk(dir);
  return out;
}

function chunkMarkdown(file, text) {
  if (file.includes(`${path.sep}indexes${path.sep}`)) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => ({
        file,
        heading: path.basename(file),
        text: line
      }));
  }

  const lines = text.split("\n");
  const chunks = [];
  let heading = path.basename(file);
  let buffer = [];

  function flush() {
    const body = buffer.join("\n").trim();
    if (body) chunks.push({ file, heading, text: body });
    buffer = [];
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      heading = line.replace(/^##\s+/, "").trim();
    } else if (!line.startsWith("# ")) {
      buffer.push(line);
    }
  }
  flush();
  return chunks;
}

function tokenize(text) {
  const ascii = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  const chinese = text.match(/[\p{Script=Han}]{2,}/gu) || [];
  const known = PROJECTS.flatMap((project) => project.aliases).filter((alias) => text.includes(alias));
  return [...new Set([...ascii, ...chinese, ...known])];
}

function scoreDoc(query, doc) {
  const terms = tokenize(query);
  const cleanText = stripHtmlComment(doc.text).replace(/\((?:\.\.\/)?[^)]+\.md\)/g, "");
  const fileHint = path.basename(doc.file, ".md");
  const haystack = `${doc.heading}\n${fileHint}\n${cleanText}`;
  let score = 0;
  for (const term of terms) {
    if (!term) continue;
    if (haystack.toLowerCase().includes(term.toLowerCase())) score += term.length > 3 ? 3 : 1;
  }
  if (/供应商/.test(query) && /供应商/.test(haystack)) score += 4;
  if (/风险|卡/.test(query) && /风险|卡|不确定/.test(haystack)) score += 4;
  if (/待办|下一步/.test(query) && /待办|补|验证|下一步/.test(haystack)) score += 4;
  return score;
}

function buildAnswerHint(query, contextPack) {
  if (contextPack.length === 0) return "No warm memory matched. Ask a clarifying question or search cold memory.";
  const lines = contextPack.flatMap((item) =>
    item.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- ") && !line.includes("No curated state yet"))
  );
  return [...new Set(lines.map(stripHtmlComment))].slice(0, 4).join("\n");
}

function stripHtmlComment(line) {
  return line.replace(/\s*<!--[\s\S]*?-->\s*/g, " ").trim();
}

async function maintain(args) {
  const root = memoryRoot(args);
  await initStore(root);
  const projectFiles = await listMarkdownFiles(path.join(root, "warm/projects"));
  const report = [];

  for (const file of projectFiles) {
    const text = await fs.readFile(file, "utf8");
    const lines = text.split("\n").filter((line) => line.trim().startsWith("- "));
    const unique = new Set(lines.map(normalizeForCompare));
    report.push(`- ${path.basename(file)}: ${lines.length} bullets, ${unique.size} unique-normalized bullets`);
  }

  const content = `# Maintenance Report\n\nGenerated: ${nowIso()}\n\n## Warm Memory Shape\n\n${report.join("\n")}\n\n## Next Checks\n\n- Review low-confidence candidates in state/candidates.jsonl.\n- Promote stable project state into hot/CORE.md manually or with an LLM summarizer.\n- Search for contradictions before compacting long sessions.\n`;

  await fs.writeFile(path.join(root, "state/maintenance.md"), content);
  console.log(content);
}

async function demo(args) {
  const root = args.root
    ? memoryRoot(args)
    : path.join(PACKAGE_ROOT, "tmp/demo-memory");
  await fs.rm(root, { recursive: true, force: true });
  await initStore(root);
  await ingest({
    ...args,
    root: path.relative(PACKAGE_ROOT, root),
    input: "examples/orbit-shop-supplier-conversation.md",
    session: "demo-orbit-shop"
  });
  console.log("\n--- Retrieval demo ---");
  await retrieve({
    ...args,
    root: path.relative(PACKAGE_ROOT, root),
    query: "Orbit Shop 供应商当时卡在哪里？",
    limit: 5
  });
}

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];

  if (!command || command === "help" || args.help) {
    console.log(`Usage:
  node src/daemon-memory.mjs init [--root memory]
  node src/daemon-memory.mjs ingest --input <file> [--session id] [--root memory]
  node src/daemon-memory.mjs retrieve --query <text> [--limit 5] [--root memory]
  node src/daemon-memory.mjs maintain [--root memory]
  node src/daemon-memory.mjs demo [--root memory]
`);
    return;
  }

  if (command === "init") {
    await initStore(memoryRoot(args));
    console.log(`Initialized memory store at ${memoryRoot(args)}`);
    return;
  }
  if (command === "ingest") return ingest(args);
  if (command === "retrieve") return retrieve(args);
  if (command === "maintain") return maintain(args);
  if (command === "demo") return demo(args);

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
