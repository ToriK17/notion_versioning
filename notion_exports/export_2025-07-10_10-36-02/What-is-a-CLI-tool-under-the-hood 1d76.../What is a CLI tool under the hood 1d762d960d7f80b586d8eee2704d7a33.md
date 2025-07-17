# What is a CLI tool under the hood?

So it is a program that has

It's a regular app with:

- an entrypoint (usually something like `bin/cli` or `main.rb` or `index.js`)
- a parser that figures out what command/flag/arg you gave it
- and logic that executes based on those inputs
- also figuring out how to annoy your users with arcane flags

### Three Big Categories of CLI tools

### 1. **Local utility tools**

These just do things on your local system. They don't talk to a server.

Examples:

- `ls` → lists files. No network call. No auth.
- `grep`, `sed`, `awk` → the old school CLI tools. Totally local.

### 2. **CLI clients for remote APIs**

- These authenticate you
- Send HTTP(S) requests
- Act as a GUI-less frontend for a remote service

Examples:

- `gh` (GitHub CLI) → sends GraphQL/REST requests to GitHub’s API
- `aws` → makes authenticated API calls to AWS
- `heroku` → logs in, then sends requests to Heroku’s cloud services
- `railway`, `vercel`, etc. → same thing. Tokens, HTTP, cloud magic

They’re basically fancy cURL wrappers.

### 3. **Hybrids**

Some tools do both local and remote things.

Example:

- `git` →
    - most of Git’s commands (like `git add`, `git commit`) don’t talk to anything online. They're local database commands.
    - The majority of commands (`status`, `commit`, `log`, `branch`, etc.) are just manipulating a local `.git` directory, which is basically a little key-value store with commitment issues.
    - Only `git push/pull/fetch` do HTTP/SCP/SSH. They talk to remote servers like GitHub or Bitbucket or wherever your poor decisions live.
- `docker`
    - `docker ps`, `docker build` → all local
    - `docker push`, `docker login` → remote
- `terraform`
    - Reads local config files
    - Talks to remote APIs (AWS, GCP, etc.)
    - Breaks your infra because of a typo

### 🔑 Authentication in CLI tools

When a CLI *does* talk to a remote service, it almost always uses one of:

- **API token** (stored in a config file or environment variable)
- **OAuth login** (open a browser, authenticate, get a token)
- **SSH key** (fancy and old-school)

And usually you’ll see these cached in:

- `~/.config/<toolname>/`
- `~/.<toolname>/`