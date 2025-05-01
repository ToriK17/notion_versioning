# Signing Algorithms & Cryptographic Primitives

### Signing Algorithms in JWTs

The `alg` field in the JWT header determines how the signature is generated. There are **two main categories** of algorithms:

Aside: These Algorithms are one-way functions, not reversible and not based on keys.

[SHA-256 Contexts:](https://www.notion.so/SHA-256-Contexts-1c962d960d7f806b8541def734217075?pvs=21)

---

### 🧂 **HMAC (Hash-Based Message Authentication Code)**

**(Symmetric key algorithms)**

> ✅ Same key is used to sign and verify the token
> 

| Algorithm | Description | Key Size | Use Case | Security / Notes |
| --- | --- | --- | --- | --- |
| HS256 | HMAC using SHA-256 | 256-bit key | Most common symmetric method | Secure when key is strong |
| HS384 | HMAC using SHA-384 | 384-bit key | Longer hash | More secure than HS256 |
| HS512 | HMAC using SHA-512 | 512-bit key | Even longer hash | Slightly slower, more secure |

> ⚠️ HMAC requires both the issuer and consumer to share a secret. Not ideal for multi-party systems or open/public token verification.
> 

---

### 🔐 **RSA / ECDSA (Asymmetric key algorithms)**

> ✅ Private key signs, public key verifies
> 

| Algorithm | Description | Use Case | Security / Notes |
| --- | --- | --- | --- |
| RS256 | RSA + SHA-256 | Common for OAuth, open APIs | Strong when key is >2048 bits |
| RS384 | RSA + SHA-384 | Longer hash | More secure than RS256 |
| RS512 | RSA + SHA-512 | Longest hash | Slowest but strongest |
| ES256 | ECDSA using P-256 curve | Modern alt to RSA (smaller keys) | Secure and efficient |
| ES384 | ECDSA using P-384 curve |  |  |
| ES512 | ECDSA using P-521 curve |  |  |
| PS256 | RSASSA-PSS (Probabilistic RSA) | More secure variant of RSA | Recommended over RS256 for future-proofing |

---

## 🔐 HMAC vs RSA/ECDSA: What's the difference?

### HMAC (e.g. HS256)

- One shared **secret key** (sign + verify)
- Simpler but less secure for large/multi-party systems
- Cannot verify origin without access to the shared key

### RSA/ECDSA (e.g. RS256, ES256)

- **Private key signs**, **public key verifies**
- Safer for distributed systems (public key can be shared freely)
- Easier to revoke/change credentials without compromising system

---

[**NIST:  National Institute of Standards and Technology**](https://www.notion.so/NIST-National-Institute-of-Standards-and-Technology-1c962d960d7f8069b4e4de993a47d998?pvs=21)

## Where do you get the HMAC key?

HMAC uses a **single secret key** (not a key pair).

You can **generate it yourself** using:

- A secure random number generator
- A key derivation function like **PBKDF2**
- Something like `openssl rand -hex 32` (for a 256-bit key)

> 🔑 It’s just a random string of bytes — no public/private component.
> 

You **don't** need to do math like you do for RSA key generation. It’s more like:

```jsx
openssl rand -hex 32
# => generates a 256-bit secret for HMAC-SHA25
```

This is the actual formula:

```jsx
HMAC(message, secret) = hash((secret XOR opad) + hash((secret XOR ipad) + message))
```

| Variable | What it Means |
| --- | --- |
| `message` | The original data you're authenticating |
| `secret` | The shared HMAC key (symmetric) |
| `hash` | A cryptographic hash function (e.g., SHA-256) |
| `ipad` | "Inner padding" – a predefined byte value (0x36 repeated) |
| `opad` | "Outer padding" – another predefined value (0x5c repeated) |
| `XOR` | Bitwise XOR operation between the key and the pad |
| `+` | Concatenation  |

The idea is: the inner hash binds the message to the secret, and the outer hash wraps that result again with the same secret — making it **resistant to length-extension and collision attacks**.

You don’t have to memorize this — just know that **the secret gets hashed twice with two different paddings**, making the result stronger than just `hash(secret + message)`.

## AES-GCM

- **AES** = Advanced Encryption Standard.
    
    It’s the vanilla, military-grade encryption algorithm that governments, banks, and even your mom’s favorite shopping app use. It turns readable stuff (plaintext) into unreadable garbage (ciphertext) using a secret key.
    
- **GCM** = Galois/Counter Mode.
    
    It’s a *mode* of AES that not only encrypts your stuff, but also **authenticates** it at the same time.
    
    Think of it like wrapping your data in a bulletproof vest **and** making it wear a name tag saying, "Hey, I'm legit!"
    

**In other words:**

- **AES** scrambles your data. Encryption.
- **GCM** *proves* that no one messed with your scrambled data. Authentication.
- **You collect the token** from the user or service.
- **Immediately, on the client side or as soon as possible,** you encrypt it *before* sending it to the server.
- That encryption uses **AES-GCM**, meaning:
    - The token is unreadable without the encryption key.
    - It comes with a **tag** (an "auth tag") that can later prove whether the data was altered.
- **Then you send the encrypted blob** (ciphertext + tag) to your server.
- Your server **stores it encrypted** ("at-rest") instead of in plain text.
- Later, when needed, the server **decrypts it** using the key *only if* the auth tag checks out.

### **What is the Authentication Tag?**

- It’s a small chunk of data (usually 16 bytes) generated **during encryption** using AES-GCM.
- It acts like a **tamper-evident seal**. If even *one bit* of the encrypted message is changed, the tag won’t match when decrypting—and the decryption fails.

---

### **Why Not Let Decryption Happen Anyway?**

Because then you'd be **decrypting garbage** and pretending it's still a sandwich.

**Without the tag:**

- You could decrypt maliciously altered data and never know.
- Attackers could flip bits in the ciphertext and mess with the plaintext outcome (this is called a *bit-flipping attack*).
- You might think you're decrypting a medical record or bank transaction, but surprise—it's been subtly altered by a nosy hacker.

**With the tag:**

- If the data was tampered with? *Boom*: decryption fails. No guessing, no silent corruption, no trusting shady bytes.

The authentication tag ensures that:

- You can **trust the data hasn’t been altered**.
- The **decryption process only succeeds if the data is authentic**.
- You **don’t make decisions based on fake or modified data**.

## Authenticated Encryption

Encryption that also proves the ciphertext hasn't been tampered with.

- Normally, encryption just scrambles the message.
- But attackers could still *alter* the scrambled message and cause chaos when it’s decrypted.
- **Authenticated Encryption (AE)** = encryption + *integrity check*.
- If the data gets *changed* or *corrupted*, the system **refuses to decrypt**.
- This gives us Confidentiality (no peeking), and Integrity (no tampering)

## AEAD

(**Authenticated Encryption with Associated Data**)

AES-GCM **is** a type of AEAD.

It’s a **concept**, a **category**—not a specific algorithm. AEAD means:

- You encrypt data (**confidentiality**)
- You also verify it hasn’t been tampered with (**integrity**)
- *Optionally*, you can attach extra data (called "associated data") that is authenticated but not encrypted (e.g. headers)

Other AEAD algorithms include:

- **ChaCha20-Poly1305** (cool name, used in mobile devices)
- **AES-CCM** (used in some embedded systems)

### **Why Does AEAD Matter?**

Because **just encrypting isn't enough**. If someone can change the ciphertext and we decrypt it anyway? Yikes. That’s a hacker’s playground. AEAD ensures encryption only works if *nothing's been messed with.*

### **Can I Add Custom Headers to AES-GCM?**

AES-GCM supports **Additional Authenticated Data (AAD)**—you can think of this like your "custom headers."

### What is AAD?

- Data that we **don't want to encrypt** (like headers or metadata)
- But we **do want to authenticate** (make sure it hasn't been tampered with)

So, for example, if the encrypted payload contains a user’s secret message, the AAD could include:

- Content-Type
- User ID
- Timestamp
- Application version

## Summary of Primitives

| Thing | What it actually does |
| --- | --- |
| **AES** | Encrypts/decrypts *data* (using a secret key). Symmetric encryption. |
| **GCM** | A mode that *adds authentication* to encryption. Think "encrypted and verified." |
| **HMAC** | Hash-based Message Authentication Code. *Proves* a message is real and untampered, without encrypting it. (Signature, not scrambling.) |
| **RSA** | Asymmetric encryption (two keys: public and private). Mainly used for encrypting *small things* (like keys, not large blobs of data). |
| **SHA-256** | A hashing function. Turns data into a fixed-length garbage string (one-way, no decryption). Good for fingerprints, NOT for hiding secrets. |