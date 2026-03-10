#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectRoot = process.cwd();
const hooksDir = path.join(projectRoot, ".githooks");
const templateHook = path.join(__dirname, "..", "templates", "post-checkout");
const targetHook = path.join(hooksDir, "post-checkout");

function log(message) {
  console.log(`[rn-branch-guard] ${message}`);
}

function ensureGitRepository() {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
  } catch {
    log("This directory is not a Git repository.");
    process.exit(1);
  }
}

function ensureHooksDirectory() {
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
    log("Created .githooks directory.");
  }
}

function ensureTemplateExists() {
  if (!fs.existsSync(templateHook)) {
    log(`Template file not found: ${templateHook}`);
    process.exit(1);
  }
}

function installHook() {
  fs.copyFileSync(templateHook, targetHook);
  log("Installed post-checkout hook.");
}

function setHooksPath() {
  try {
    execSync("git config core.hooksPath .githooks", { stdio: "ignore" });
    log("Configured Git hooks path to .githooks.");
  } catch {
    log("Failed to set Git hooks path.");
    process.exit(1);
  }
}

function main() {
  ensureGitRepository();
  ensureHooksDirectory();
  ensureTemplateExists();
  installHook();
  setHooksPath();
  log("Setup complete.");
}

main();