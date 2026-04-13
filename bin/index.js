#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const pkg = require("../package.json");

const args = process.argv.slice(2);
const projectRoot = process.cwd();

const hooksDir = path.join(projectRoot, ".githooks");
const templateHook = path.join(__dirname, "..", "templates", "post-checkout");
const targetHook = path.join(hooksDir, "post-checkout");

function log(message) {
  console.log(`[rn-branch-guard] ${message}`);
}

function showHelp() {
  console.log(`
rn-branch-guard

A tiny CLI that installs a Git post-checkout hook
to warn when dependency files change between branches.

Usage:
  rn-branch-guard init
  rn-branch-guard doctor
  rn-branch-guard uninstall
  rn-branch-guard --help
  rn-branch-guard --version
`);
}

function ensureGitRepository() {
  try {
    execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { stdio: "ignore" });
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
  if (fs.existsSync(targetHook)) {
    log("post-checkout hook already exists. Skipping install.");
    return;
  }

  try {
    fs.copyFileSync(templateHook, targetHook);
    fs.chmodSync(targetHook, 0o755);
    log("Installed post-checkout hook.");
  } catch (error) {
    log(`Failed to install post-checkout hook: ${error.message}`);
  }
}

function setHooksPath() {
  try {
    execFileSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "ignore" });
    log("Configured Git hooks path to .githooks.");
  } catch {
    log("Failed to configure Git hooks path.");
    process.exit(1);
  }
}

function getHooksPath() {
  try {
    return execFileSync("git", ["config", "--get", "core.hooksPath"], {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    }).trim();
  } catch {
    return null;
  }
}

function init() {
  ensureGitRepository();
  ensureHooksDirectory();
  ensureTemplateExists();
  installHook();
  setHooksPath();
  log("Setup complete.");
}

function doctor() {
  ensureGitRepository();

  const hooksDirExists = fs.existsSync(hooksDir);
  const hookExists = fs.existsSync(targetHook);
  const hooksPath = getHooksPath();
  const templateExists = fs.existsSync(templateHook);

  console.log("");
  console.log("rn-branch-guard doctor");
  console.log("");

  console.log(`Git repository: yes`);
  console.log(`.githooks directory: ${hooksDirExists ? "yes" : "no"}`);
  console.log(`post-checkout hook: ${hookExists ? "installed" : "missing"}`);
  console.log(`core.hooksPath: ${hooksPath || "not set"}`);
  console.log(`template file: ${templateExists ? "found" : "missing"}`);

  if (hooksPath !== ".githooks") {
    console.log("");
    console.log("Suggestion: run `rn-branch-guard init`");
  }

  console.log("");
}

function uninstall() {
  ensureGitRepository();

  if (fs.existsSync(targetHook)) {
    fs.unlinkSync(targetHook);
    log("Removed post-checkout hook.");
  } else {
    log("No post-checkout hook found.");
  }

  const hooksPath = getHooksPath();
  if (hooksPath === ".githooks") {
    try {
      execFileSync("git", ["config", "--unset", "core.hooksPath"], { stdio: "ignore" });
      log("Removed Git hooks path configuration.");
    } catch {
      log("Failed to unset Git hooks path.");
    }
  }

  try {
    if (fs.existsSync(hooksDir) && fs.readdirSync(hooksDir).length === 0) {
      fs.rmdirSync(hooksDir);
      log("Removed empty .githooks directory.");
    }
  } catch {
    log("Could not remove .githooks directory.");
  }

  log("Uninstall complete.");
}

if (args.includes("--help") || args.length === 0) {
  showHelp();
} else if (args.includes("--version")) {
  console.log(pkg.version);
} else if (args[0] === "init") {
  init();
} else if (args[0] === "doctor") {
  doctor();
} else if (args[0] === "uninstall") {
  uninstall();
} else {
  showHelp();
}
