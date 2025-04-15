# Rails credentials system

When you run: `bin/rails credentials:edit`

You're telling Rails: "Open my super-secret encrypted config file so I can put secrets in it, like API keys, in a way that’s encrypted”

### What happens:

Rails finds your **`config/credentials.yml.enc`** file.

- This file is encrypted.
- It's gibberish unless you also have the **master key**, which lives in:
    - `config/master.key`, or
    - the environment variable `RAILS_MASTER_KEY` (better imo than the file system)
- Whenever you open/ edit this file Rails **encrypts it again** using the master key and updates `credentials.yml.enc`.
- You can access these secrets like so: `Rails.application.credentials.some_api_key` or `Rails.application.credentials.dig(:aws, :access_key_id)`

It’s like a vault, except you keep handing the keys to anyone who pushes to your repo.

### Danger zones (a.k.a. how people mess this up):

1. Checking in `master.key` to git
2. Forgetting to share the key with your teammates
3. Using it for runtime secrets in multi-env setups: `credentials.yml.enc` is per environment *only* if you manually set that up. This means dev, stage, and prod all share. Rails gives you:
    - One file: `config/credentials.yml.enc`
    - One key: `config/master.key`
    - One unencrypted source of truth for all environments
    - Solution: You manually make environment-specific credentials files.
        - `bin/rails credentials:edit --environment production`
        
        This creates:
        
        - `config/credentials/production.yml.enc`
        - `config/credentials/production.key`

### Overview of the Rails Credentials System

- Decrypts your encrypted Rails credentials file
- Ideal Setup: Create a `credentials/<env>.yml.enc` file for each environment.
    - Store the key (`credentials/<env>.key`) securely in your deploy environment
    - config.require_master_key = true in environments to fail loudly if it doesn’t get its key
- Opens it in an editor so you can update your secrets
- Re-encrypts it after you save
- Makes you feel like a hacker, but honestly you’re just writing YAML with a blindfold on