# Open Claw Agent in a VM

# Architecture Overview

- Python environment
- Playwright (browser control)
- Chromium (controlled browser)
- Agent loop script
- Memory storage
- API key for model backend

Compute layer → Mac (Ollama)

Execution layer → VM (Agent)

Network boundary → Local LAN only

# Environment Set Up

1. UTM + Ubuntu ARM
    1. Download UTM (Native for Apple Silicon)
    2. Initial Setup: Virtualize, Linux, 5722MiB (roughly 6GB), 4 CPU cores
    3. Boot ISO image [https://mac.getutm.app/gallery/ubuntu-20-04](https://cdimage.ubuntu.com/releases/24.04/release/)
    4. Because I have a M2 mac I need Ubuntu ARM64 ISO
    5. Hiccups I ran into: After installing Ubuntu in UTM
    - The VM was still trying to boot from the **ISO (CD/DVD)**
    - The installer finished and asked to remove installation media
    - We cleared the ISO
    - But the firmware didn’t automatically switch to the hard disk
    - Fix: UTM → CD/DVD → **Clear** then change the order in the VM menu to boot the iso image first
2. Use a VM to install tools
    1. Inside your VM, run:
    
    ```
    sudo apt install-y python3-venv
    ```
    
    Now create a project directory for your agent:
    
    ```
    mkdir ~/agent
    cd ~/agent
    ```
    
    Create a virtual environment:
    
    ```
    python3-m venv venv
    ```
    
    Activate it:
    
    ```
    source venv/bin/activate
    ```
    
    You’ll now see:
    
    ```
    (venv) agent@olivia-vm:~/agent$
    ```
    
    Now install Playwright:
    
    ```
    pip install playwright
    playwright install
    ```
    
    That installs everything inside the venv only.
    **What is venv?**
    Olivia’s own environment. when you leave you `deactivate` 
    
    This is **best practice** for agent builds.
    

# Building Olivia

build a minimal “browser-capable autonomous assistant.”

**Tooling:**

If it asks to install dependencies:

```
sudo apt install-y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libpango-1.0-0 libcairo2
```

Then:

```
playwright install chromium
```

Test it:

```
python
```

Then inside Python:

```
fromplaywright.sync_apiimportsync_playwright

withsync_playwright()asp:
browser=p.chromium.launch(headless=False)
page=browser.new_page()
page.goto("https://example.com")
```

If you see:
`<Response url='[https://example.com/](https://example.com/)' request=<Request url='[https://example.com/](https://example.com/)' method='GET'>>` 
Congrats it works she has hands!

**Now for the Brain:** 

I want to use Ollama for it’s cost effective-ness but since it’s expensive I want to try:

**Mac (host machine)**

- Runs Ollama
- Uses Apple Silicon + full RAM
- Much faster than the VM
- Exposes API at `localhost:11434`

**Ubuntu VM (Olivia)**

- Runs:
    - Playwright
    - Agent loop
    - Long-term memory
    - Task scheduler
- Calls Ollama over network this means we do need a network connection to the VM:

**Note:** From inside the VM, `localhost` does NOT mean your Mac.

Inside the VM:

`localhost` = Olivia

Not your Mac.

So you need Olivia to reach your Mac over the network.

### **Setting up the LLM with No API billing**

Run Ollama on your Mac

Starting the service:
`OLLAMA_HOST=0.0.0.0 ollama serve` 

connect to it via the VM (use your computer’s IP)
curl [http://<comp ip>:11434/api/tags](http://192.168.0.24:11434/api/tags)

Goal:

I want:

- Internal file ops allowed
- External network ops require confirmation

This is the Open Claw config that *finally* works for me:

![Screenshot 2026-02-19 at 1.43.43 PM.png](Open%20Claw%20Agent%20in%20a%20VM/Screenshot_2026-02-19_at_1.43.43_PM.png)

![Screenshot 2026-02-19 at 1.43.52 PM.png](Open%20Claw%20Agent%20in%20a%20VM/Screenshot_2026-02-19_at_1.43.52_PM.png)

Keep openclaw running in a new tab:
`pnpm openclaw gateway --port 18789 --verbose` 

Use a model that allows tool calling:
`ollama pull qwen2.5-coder:7b` 

Must be running in local terminal:

`OLLAMA_HOST=0.0.0.0 OLLAMA_CONTEXT_LENGTH=32768 ollama serve`

On the VM:
`pnpm openclaw gateway —port 18789 --verbose`

adjust settings:
`nano ~/.openclaw/openclaw.json`

verify tool capability cleanly.

`pnpm openclaw agent --agent main --message "Create a file called test.txt in the workspace with the text 'Olivia is online.'”`

Then:
`ls ~/.openclaw/workspace`

`cat ~/.openclaw/workspace/test.txt`

Where did my model get trained?
That was trained by **Meta** (Facebook’s AI research group).

### VM Trouble shooting:
`openclaw gateway stop` when it doesn’t start

then try to start it again: `pnpm openclaw gateway —port 18789 --verbose`

Check logs: `openclaw logs`

systemctl --user stop openclaw-gateway.service

systemctl --user start openclaw-gateway.service

Discord working!
`openclaw message send --channel discord --target 543195207257161730 --message "Hello from Lumia!”`

# Personality & Guardrails

Travel to:

`cd ~/.openclaw/workspace`

First. . .if you want your agent to name itself:

`pnpm openclaw agent --agent main --message "I want you to choose your own name — something you find beautiful or meaningful. What name would you give yourself and why?"`

## Getting Started

`openclaw tui`