# Sessions & CSRF

This line put in a lot of sessions controllers:`skip_before_action :verify_authenticity_token` disables Rails’ built-in CSRF (Cross-Site Request Forgery) protection for the controller or action you put it on.

### What’s CSRF?

CSRF is a class of attack where:

- You’re logged in to `yourbank.com` in one tab
- Some evil website loads in another tab and makes a POST request to `yourbank.com/transfer` without your knowledge
- Since you’re already logged in (via cookies), the request succeeds and your money becomes someone else’s money

Rails tries to stop this by:

- Adding a hidden CSRF token to forms
- Verifying that token exists and matches what the server expects before processing non-GET requests

Which is great for **web apps with sessions and forms**.

### Why disable it on an API?

APIs don’t usually use **session cookies**, they use:

- Bearer tokens in headers (like your CLI is doing)
- Static API keys
- OAuth tokens
- Literally anything *but* cookies. . .

So when an API request comes in:

- There’s no CSRF token in the request
- Rails sees that and freaks out and returns a `422 Unprocessable Entity`

So adding the ‘magic’ line at the beginning tells rails: “Chill. This is an API. We don’t use your quaint little CSRF tokens here. We use Bearer tokens like grownups.”

### ✅ When to use `skip_before_action :verify_authenticity_token`?

- For API controllers (`ActionController::API` doesn’t include this by default, but if your base class is `ActionController::Base`, it does)
- For public endpoints like login, webhook receivers, etc.
- If you don’t use cookies for auth

### 🚫 When **not** to use it?

- On form-based, session-authenticated, cookie-using HTML controllers
- SessionsController for API login