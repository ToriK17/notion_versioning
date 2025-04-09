import * as exporterLib from 'notion-exporter';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const NotionExporter = exporterLib.default.default;
const token = process.env.NOTION_TOKEN;
const fileToken = process.env.FILE_TOKEN;
const pageFile = './.page_ids';
const timestampRoot = process.argv[2]; // Full timestamped export dir like ./notion_exports/export_2025-04-09_15-29-56

if (!token || !fileToken) {
  console.error("❌ Missing NOTION_TOKEN or FILE_TOKEN in .env");
  process.exit(1);
}

if (!timestampRoot) {
  console.error("❌ Missing target export directory. Did you forget to pass it in?");
  process.exit(1);
}

const rawIds = fs.readFileSync(pageFile, 'utf-8');
const pageUrls = rawIds
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

const exporter = new NotionExporter(token, fileToken);

const getTitleSlug = (url) => {
  const match = url.match(/notion\.so\/([^\/]+?)-[a-f0-9]{32}$/);
  return match ? match[1] : 'Untitled_Page';
};

const slugify = (str) =>
  str.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_');

(async () => {
  for (const url of pageUrls) {
    const title = getTitleSlug(url);
    const idMatch = url.match(/[a-f0-9]{32}$/);
    const blockId = idMatch ? idMatch[0] : 'unknown_id';
    const folderName = `${slugify(title)} ${blockId.slice(0, 4)}...`;
    const outputPath = path.join(timestampRoot, folderName);

    console.log(`📄 Exporting: ${title} (${blockId})`);

    try {
      await exporter.getMdFiles(url, outputPath);
      console.log(`✅ Saved to: ${outputPath}`);
    } catch (err) {
      console.error(`❌ Failed to export ${url}:`);
      console.error(err?.message || err);
    }
  }
})();
