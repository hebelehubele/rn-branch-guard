#!/bin/sh
# installed by rn-branch-guard

PREV_HEAD=$1
NEW_HEAD=$2
CHECKOUT_TYPE=$3

# Sadece branch (dal) geçişlerinde çalıştır (1), tekil dosya checkout'larını (0) yoksay
if [ "$CHECKOUT_TYPE" != "1" ]; then
  exit 0
fi

# Monorepo (alt klasör) desteği için regex güncellendi (örn: frontend/package.json)
CHANGED=$(git diff --name-only "$PREV_HEAD" "$NEW_HEAD" 2>/dev/null | grep -E "(^|/)(package\.json|package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$")

if [ -n "$CHANGED" ]; then
  echo ""
  echo "🚨 [rn-branch-guard] Dependency files changed between branches!"
  echo "📦 Modified files:"
  for file in $CHANGED; do
    echo "   - $file"
  done
  echo ""
  echo "⚠️  Don't forget to run your package manager install command:"
  echo "   npm install / yarn install / pnpm install"
  echo ""
fi