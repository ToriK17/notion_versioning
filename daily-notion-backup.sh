#!/bin/bash
set -e

BASE_DIR="/Users/tori/Development_new/notion_versioning"
EXPORT_DIR="$BASE_DIR/notion_exports"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
TARGET_DIR="$EXPORT_DIR/export_$TIMESTAMP"

# Load Notion cookies from .env
source "$BASE_DIR/.env"

mkdir -p "$TARGET_DIR"

# Node script to export pages
node "$BASE_DIR/export-pages.mjs" "$TARGET_DIR"
sleep 9999

# Git commit and push
cd "$BASE_DIR"
git add .
git commit -m "Backup on $TIMESTAMP" || echo "🪹 Nothing to commit."
git push
