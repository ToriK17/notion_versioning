# Length-Extension Attack

This is a **vulnerability in some hash functions**, like SHA-256, when used naively.

It applies to constructs like:

```jsx
hash(secret + message)
```

### What the attack does:

- The attacker **doesn't know the secret**, but they know `hash(secret + message)`
- They can calculate `hash(secret + message + new_data)` **without knowing the secret**
- That lets them "append" new data to a signed message and produce a valid-looking hash

> 🔐 HMAC protects against this by using inner + outer hashing and paddings — it doesn’t just hash secret + message.
> 

So: **HMAC defeats length-extension attacks.** Plain hashing like `hash(secret + message)` is vulnerable.