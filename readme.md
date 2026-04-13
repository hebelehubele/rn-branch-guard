# rn-branch-guard

-Works with any Git-based JavaScript project.

- Detects dependency changes when switching branches
- Works with npm, yarn and pnpm
- Lightweight CLI tool
- Works with any JavaScript project that uses Git.

![npm version](https://img.shields.io/npm/v/rn-branch-guard)
![npm downloads](https://img.shields.io/npm/dm/rn-branch-guard)
![license](https://img.shields.io/npm/l/rn-branch-guard)
![GitHub stars](https://img.shields.io/github/stars/hebelehubele/rn-branch-guard)

A tiny CLI that installs a Git `post-checkout` hook to warn when dependency files change between branches.

## Why?

When switching branches, dependency files may change while your installed packages remain outdated.

This can lead to confusing errors in JavaScript projects such as:

- React
- Next.js
- Node.js
- React Native / Expo
- Vite
- Vue

`rn-branch-guard` helps by warning you after checkout when dependency files change.

## What it checks

- `package.json`
- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`

## 🚀 Usage

Run the following command inside your project directory to set it up:

```bash
npx rn-branch-guard init
```

### 🧰 Available Commands

| Command | Description |
|---|---|
| `npx rn-branch-guard init` | Installs the `post-checkout` hook into your `.githooks` folder. |
| `npx rn-branch-guard doctor` | Checks the health and installation status of the hook. |
| `npx rn-branch-guard uninstall`| Removes the hook and cleans up the `.githooks` directory. |
| `npx rn-branch-guard --help` | Displays help information. |
| `npx rn-branch-guard --version`| Displays the current version. |

## ⚠️ Example Warning

When you switch to a branch with updated dependencies, you'll see a friendly warning like this:

```text
🚨 [rn-branch-guard] Dependency files changed between branches!
📦 Modified files:
   - package.json
   - yarn.lock

⚠️  Don't forget to run your package manager install command:
   npm install / yarn install / pnpm install
```
```
