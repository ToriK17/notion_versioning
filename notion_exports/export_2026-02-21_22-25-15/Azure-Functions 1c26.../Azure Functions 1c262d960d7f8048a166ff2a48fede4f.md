# Azure Functions

Getting Started on a new Mac:

Dependencies:

- Node:
    - `nvm install --lts`
- nvm:
    - `curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh) | bash`
    - `source ~/.nvm/nvm.sh`
- Then: `nvm install --lts` & `nvm use --lts`
- `brew tap azure functions`
- `brew install azure-functions-core-tools@4`
- `npm install -g azurite`
- `brew update && brew install azure-cli`
    - verify install `az --version`

### Scaffold a new project:

`func init . --worker-runtime node --language javascript`

### Template like a new function:

1. `func new` Initializes a new function
2. Choose something like `HTTP trigger` & name it

### Mimic Production in development:

- Download ngrok, this gives you a tunnel from the *actual internet* into your local machine.
- So this: [`https://04c4-97-122-105-159.ngrok-free.app`](https://04c4-97-122-105-159.ngrok-free.app/) is now publicly accessible and forwards to: [`http://localhost:7071`](http://localhost:7071/)
- It’s a “production URL” for local devs and people who love to feel powerful.