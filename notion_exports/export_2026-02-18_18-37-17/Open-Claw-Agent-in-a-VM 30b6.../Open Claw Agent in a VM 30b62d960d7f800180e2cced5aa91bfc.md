# Open Claw Agent in a VM

# Architecture Overview

- Python environment
- Playwright (browser control)
- Chromium (controlled browser)
- Agent loop script
- Memory storage
- API key for model backend

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