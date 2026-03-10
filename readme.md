# rn-branch-guard

A tiny CLI that installs a Git `post-checkout` hook to warn you when dependency files change between branches.

## Why?

When switching branches in React Native / Expo projects, dependency files may change while your installed packages remain outdated. This often causes confusing build or runtime errors.

`rn-branch-guard` helps by showing a warning after checkout when files like these change:

- `package.json`
- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`

## Usage

Run this inside your project:

```bash
npx rn-branch-guard

