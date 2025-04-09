# Notion Versioning
[![Last Commit](https://img.shields.io/github/last-commit/ToriK17/notion_versioning)](https://github.com/ToriK17/notion_versioning)


Back up your Notion pages into Markdown and track them over time with Git.  
This repo turns your digital notes into a version-controlled file system.

## Why?

Because:
- Notion has limited native version history for free users
- Exporting by hand is tedious and gross
- Git is free

I made this to:
- Keep a versioned history of my personal Notion notes
- Automate daily backups via a local `cron` job
- Track content drift over time

## What it does

- Uses the [notion-exporter](https://github.com/yannbolliger/notion-exporter) package under the hood
- Reads Notion page URLs from a `.page_ids` file
- Downloads each page as Markdown
- Organizes exports under `notion_exports/export_<timestamp>/`
- Commits changes automatically to Git

## Usage

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/notion_versioning.git

2. Add your own Notion pages to `.page_ids`
   Clear out the notion_exports unless you want my notes

3. Set up your .env file
   You'll need to grab your `token_v2` and `file_token` cookies from Notion.
   More details at: [notion-exporter](https://github.com/yannbolliger/notion-exporter) 

4. Run the backup manually: `./daily-notion-backup.sh`

5. Set it up as a cron job (Optional)
  `cronntab -e`
  Then add something like:
  `0 7 * * * /path/to/daily-notion-backup.sh >> /tmp/notion_backup.log 2>&1`

## Disclaimer
This is a super simple personal project.
It exists mainly to soothe my irrational fear of losing digital thoughts.
Use it, fork it, ignore it—whatever sparks joy ✨

## License
MIT. You break it, you buy it. Just kidding. But also not really.