#!/bin/bash

# Directory setup
BASE_DIR="/Users/tori/Development_new/notion_versioning"
EXPORT_DIR="$BASE_DIR/notion_exports"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
TARGET_DIR="$EXPORT_DIR/export_$TIMESTAMP"

# Notion token and page (replace PAGE_ID with your actual root page ID)
NOTION_TOKEN="your-integration-token-here"
PAGE_ID="your-shared-page-id-here"  # You MUST share the page with the integration

# Export
mkdir -p "$TARGET_DIR"
NOTION_TOKEN=$NOTION_TOKEN npx notion-to-md -p "$PAGE_ID" -o "$TARGET_DIR"

# Git add/commit/push
cd "$BASE_DIR"
git add .
git commit -m "Backup on $TIMESTAMP"
git push origin main
