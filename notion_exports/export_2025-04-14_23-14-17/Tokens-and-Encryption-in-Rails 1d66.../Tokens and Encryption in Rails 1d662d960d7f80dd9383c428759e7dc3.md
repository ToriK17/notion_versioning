# Tokens and Encryption in Rails

Notes from building https://github.com/ToriK17/toknsmith

 **- Rails 7.1's new feature `has_encrypted`**, lets you automatically encrypt and decrypt values *on the fly*, without you manually writing a bunch of `OpenSSL` gobbledygook.

### Why You’d Do This

**Tokens are unreadable in the DB**

- If someone dumps your database the attacker sees gibberish instead of the actual token.
- Without the secret key stored in your Rails app, they can't decrypt it. If something bad happens you’ll still get sued, but for *less* money.

**You still get validation and access in code**

- Unlike hashing (which is one-way and turns your token into a black hole), encryption is reversible *with the right key*.
- So inside your app, Rails decrypts it when you call `my_model.token_value`, like *expensive, well-tested magic*.
- You can still run validations (e.g., presence, length) on the **plaintext** before it gets encrypted, so your model doesn’t just run with bad data.

**Takeaways**

Option to not *store* your data in plain text like cavemen. We get security points without sacrificing functionality.

### `has_encrypted`

It’s like `attr_encrypted`, but made by the Rails core team so it’s likely more stable than the gem that provides easy attribute-level encryption for your ActiveRecord models.

### Is it dangerous to validate the plaintext before it's encrypted?

It depends on *how* the validation happens and *where* the plaintext exists during the lifecycle of the object.
When you assign a value to an encrypted attribute like `token_value`, Rails decrypts/encrypts that value in memory, within your application. At no point is the plaintext saved to the database, unless you manually override something.

When you validate `presence` or `length`, you are validating the **in-memory plaintext**, before encryption. That’s normal and generally safe.

### Potential gotchas

1. **Plaintext is in memory.** It's living in your app's RAM. If your server is compromised, the attacker could theoretically pull it from memory. Same goes for logs or error messages that *accidentally* include the plaintext. Solution: Don’t log or inspect the objects
    1. When debugging log metadata, not data. Think `token_data.present?` instead of just `token_data` and log decrypted data ***only*** in development or when a secure flag is toggled.
2. **Timing attacks.** If you’re doing anything fancy with validation (like custom logic that responds differently depending on the token’s content), it *might* create a tiny timing difference in how long a request takes. That could be measurable with enough attempts. Solution: Keep validation simple.
    1. I looked into rate limiting for this issue however this doesn’t fix the actual problem. It just makes exploiting the timing flaw *annoying.* So yes, it **helps**, but the *real fix* is to make your validation logic take the same amount of time no matter what the input is. The real solution is **constant time** **operations (research this more later)**
3. **Leaky error messages.** If a validation fails, you might be exposing hints in error messages. Hint at the issue instead of naming what exactly is wrong.
4. **Manual pre-processing = bad idea** If you’re doing any kind of manipulation *before* encryption (like trimming whitespace, formatting, splitting), and you *store* that intermediate state somewhere, then yes, you're in danger.

[Rails credentials system](https://www.notion.so/Rails-credentials-system-1d662d960d7f801c845ced9fe0c6d382?pvs=21)