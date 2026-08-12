#!/usr/bin/env node
/**
 * Cross-platform hook install (Windows PowerShell / macOS / Linux).
 * Does NOT require WSL or bash on PATH.
 * Reversible: git config --unset core.hooksPath
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const hooksDir = path.join(root, "scripts", "git-hooks");
const prePush = path.join(hooksDir, "pre-push");

if (!fs.existsSync(prePush)) {
  console.error("Missing", prePush);
  process.exit(1);
}

try {
  fs.chmodSync(prePush, 0o755);
} catch (_) {
  /* Windows has no chmod semantics; Git for Windows still runs the hook via its own sh */
}

execSync("git config core.hooksPath scripts/git-hooks", { cwd: root, stdio: "inherit" });
const set = execSync("git config --get core.hooksPath", { cwd: root, encoding: "utf8" }).trim();
console.log("hooksPath ->", set);
console.log("pre-push will run on `git push` via Git's own sh (not WSL).");
console.log("Skip:  $env:MARCIALE_HOOK_SKIP=1; git push   (PowerShell)");
