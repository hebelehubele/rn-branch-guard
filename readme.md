# rn-branch-guard

![npm version](https://img.shields.io/npm/v/rn-branch-guard)
![npm downloads](https://img.shields.io/npm/dm/rn-branch-guard)
![license](https://img.shields.io/npm/l/rn-branch-guard)
![GitHub stars](https://img.shields.io/github/stars/boletroy/rn-branch-guard)

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

## Usage

Run inside your project:

```bash
npx rn-branch-guard init


## COMMANDS
rn-branch-guard init
rn-branch-guard doctor
rn-branch-guard uninstall
rn-branch-guard --help
rn-branch-guard --version

Example warning
📦 Dependency files changed between branches.
⚠️ Run your package manager install command.
Examples: npm install yarn install / pnpm install

Doctor output
rn-branch-guard doctor

```
