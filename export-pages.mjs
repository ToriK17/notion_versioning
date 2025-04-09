import * as exporterLib from 'notion-exporter';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const NotionExporter = exporterLib.default.default;
const token = process.env.NOTION_TOKEN;
const fileToken = process.env.FILE_TOKEN;
const pageFile = './.page_ids';
const outputBase = process.argv[2] || './notion_exports';

if (!token || !fileToken) {
  console.error("❌ Missing NOTION_TOKEN or FILE_TOKEN in .env");
  process.exit(1);
}

const rawIds = fs.readFileSync(pageFile, 'utf-8');
const pageUrls = rawIds
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

const exporter = new NotionExporter(token, fileToken);

(async () => {
  for (const url of pageUrls) {
    const idFragment = url.split('/').pop(); // grab last bit of the URL
    const safeFolder = url.replace(/[^a-zA-Z0-9-_]/g, '_');
    const outputPath = path.join(outputBase, safeFolder);

    console.log(`📄 Exporting: ${url}`);

    try {
      await exporter.getMdFiles(url, outputPath);
      console.log(`✅ Saved to: ${outputPath}`);
    } catch (err) {
      console.error(`❌ Failed to export ${url}:`);
      console.error(err?.message || err);
    }
  }
})();
