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

## More Rails 7 magic `encrypts :auth_token` — What It Actually Does:

Rails 7.1 gives us the shiny, delicious `encrypts` feature, which uses **Active Record Encryption** to make sure that the field’s value is:

- 🔒 Encrypted **at rest** (in your DB)
- 🔓 Decrypted **on access** in your code
- 🧼 Totally transparent (you interact with it like a normal attribute)

So your DB gets gibberish like: `auth_token = "q1kYfG2G35ksj0293jASZk==--k8oZ”`

But rails gets: `user.auth_token # => "8eb6f9ab1fe37ae60c35e37fa8a2c750"`

This is different from Rails Credentials System this uses Rails' **built-in encryption config**

**The Gotcha I ran into:**

you WILL need to open this guy up again before you just willy nilly encrypt things:

`EDITOR="code --wait" rails credentials:edit --environment development`

You will need to add a block like this:

```jsx
active_record_encryption:
primary_key: 7a9d98d77c0834d75c6f03df7ed3c429
deterministic_key: 2e3dc2ee6b2ea67a5d4eafe5e4f29bfe
key_derivation_salt: aef5c77cd4cc26140d30b69c62cb7d72```
```

They can’t be just any number this is the formula:

`primary_key`

- This is the **main symmetric key** used to encrypt/decrypt your data.
- Needs to be a **hex-encoded 256-bit (32-byte)** key. So:
    - 32 bytes = 64 hex characters
    - Must be securely generated (not something like `"1234abcd"` unless you want to end up on `@badcryptokeys`)

`deterministic_key`

- This is used for **deterministic encryption**, which allows encrypted data to be **searchable** (e.g., same input → same encrypted output).
- Same rules: 256-bit, hex-encoded. Still sensitive. Still needs to be random.

`key_derivation_salt`

- Used to make the key derivation process more secure (helps prevent rainbow table attacks).
- Not a key itself, just a **salt**. Can be any random 128-bit value (or larger), also hex-encoded.
- It doesn’t need to be secret, but it does need to be **consistent** for your environment (don’t rotate it unless you want to re-encrypt all your data).

## WARNING:

**Don’t change them once in use unless you’re ready to re-encrypt everything.**

- These keys are **critical**—changing them without a migration path means all previously encrypted data becomes cosmic soup.

[Rails credentials system](https://www.notion.so/Rails-credentials-system-1d662d960d7f801c845ced9fe0c6d382?pvs=21)

[Sessions & CSRF](https://www.notion.so/Sessions-CSRF-1d962d960d7f80d299a8ed7a801b8d4e?pvs=21)