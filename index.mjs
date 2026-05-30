#!/usr/bin/env node
/**
 * Conta Azul MCP — npx launcher.
 *
 * Thin bridge that connects a stdio-only MCP client to the HOSTED remote
 * Conta Azul MCP at https://api.mcp.ai/contaazul, using `mcp-remote`.
 *
 * Modern clients (Claude, Cursor, VS Code) can use the URL directly:
 *   { "url": "https://api.mcp.ai/contaazul" }
 * This launcher exists for clients that only accept a local `command`:
 *   { "command": "npx", "args": ["-y", "@mcp.ai/contaazul-mcp"] }
 *
 * Auth happens at runtime (OAuth 2.1 in the browser, or the `authenticate`
 * tool / agent-auth fallback) — this launcher does not handle credentials.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const SERVER_URL = "https://api.mcp.ai/contaazul";
const require = createRequire(import.meta.url);

let binFile;
try {
  const pkgJsonPath = require.resolve("mcp-remote/package.json");
  const pkg = require("mcp-remote/package.json");
  const binRel = typeof pkg.bin === "string" ? pkg.bin : pkg.bin["mcp-remote"];
  binFile = path.join(path.dirname(pkgJsonPath), binRel);
} catch (err) {
  console.error("[contaazul-mcp] could not locate mcp-remote:", err?.message || err);
  process.exit(1);
}

// Pass the endpoint + any extra flags through to mcp-remote (stdio inherited).
const child = spawn(process.execPath, [binFile, SERVER_URL, ...process.argv.slice(2)], {
  stdio: "inherit",
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
