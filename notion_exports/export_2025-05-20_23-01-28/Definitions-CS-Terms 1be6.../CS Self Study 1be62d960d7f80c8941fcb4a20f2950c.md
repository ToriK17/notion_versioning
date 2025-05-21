# CS Self Study

### 1. **Contract**

A **contract** in CS is like a **promise or agreement** between two parts of a system about how they’ll interact. A **contract** defines the **expected behavior** of a component — like a function, class, or module — especially **how others are allowed to interact with it**. It doesn’t define *how* something works, just *what* it promises to do. 

Usually includes:

- **Inputs**: what you must provide
- **Outputs**: what you’ll get back
- **Side effects**: what might happen (e.g., mutation, I/O)

**Metaphor:**

A restaurant might say: “We’ll serve your food — if you give it to us on a plate.” That’s the contract. If you hand them a plate, they’ll take it. If you hand them soup in your hands, it’s not going to work. 😅

### 2. **Adapter (OOP Design Pattern)**

An **adapter** is a design pattern that **allows two incompatible systems to work together** by acting as a **translator**. It can also be a layer that allows **two otherwise incompatible things** to work together by translating between them. (ie) rack

Used when:

- Two components expect different input/output formats.
- You want to make a component reusable in new contexts.

### **Used in:**

- Object-oriented design (Adapter Pattern)
- Software architecture (middleware, plug-ins)
- Device drivers
- Frontend (e.g., converting API responses to UI-friendly formats)

**Metaphor:**

A power plug adapter that lets a U.S. laptop plug into a European outlet.

[Design Patterns](https://www.notion.so/Design-Patterns-1c162d960d7f80cdb99fe602f5c058d4?pvs=21)

### 3. **Protocol**

A **protocol** is a set of **formal rules** for how data is **structured, sent, and received** between systems. 

A **protocol** is a **set of rules** or a defined **standard** that different components agree to follow, so they can talk to each other. (ie) Rack is a **Ruby-level protocol** for how web servers and apps should talk.

Can exist at various levels:

- Network (HTTP, TCP/IP, FTP)
- Software (language-level protocols like WSGI, Rack)
- Communication between services (gRPC, JSON-RPC)

### **Used in:**

- Networking
- APIs
- Inter-process communication (IPC)
- Language runtime behavior

| Term | Focus | Analogy |
| --- | --- | --- |
| **Contract** | Expected behavior and guarantees | “This is what I promise to do” |
| **Adapter** | Making things compatible | “Here’s a translator between dialects” |
| **Protocol** | Rules for structured communication | “Here’s the language we all agree to speak” |

### 4. Hop

When data travels across the internet, it doesn’t go in one straight shot from your computer to a website. Instead, it goes through a chain of devices (like routers or switches) that pass the data along — **each one is called a *hop***.

Think of it like sending a letter through a postal system:

- You → Local Post Office → Regional Center → Another Center → Destination
    
    Each stop = a "hop".
    

In the context of a `traceroute`, every line is showing **one of those hops** — it's listing each device along the way from the sender to its destination.

### 5. Packets

When you load a webpage (or do anything online), the data gets broken up into small chunks called **packets**. Each packet travels across the internet through these hops and gets reassembled on the other end.

### Packets Dropping

When a hop fails to respond, it often means:

- The packet **reached that hop**, but
- That hop **didn't send a reply** (either due to a firewall, VPN, ISP problem)
- So the next hop can't be shown (hence `* *`)

This doesn’t always mean a critical failure — some routers are just configured to **not respond to traceroute** for security reasons.

But if the **rest of the route never completes**, it suggests that your packets are being **dropped**, i.e., lost or blocked before they can reach the destination.

### 5. Metaprogramming

Metaprogramming is the ability to write code that writes or changes other code at runtime. Ruby supports it because everything is an object—including classes and methods. It enables powerful abstractions like `attr_accessor` and DSLs like Rails routes, but can hurt readability and debuggability when overused.

- Code defines or modifies other code at runtime
- Methods or classes are created dynamically (not written in plain `def`)
- You intercept or manipulate method calls (`method_missing`, `send`)
- DSLs let you “write code that looks like English” using blocks, evals, and dynamic definitions

### 6. Bias

Bias is **error due to overly simplistic assumptions** in the model or algorithm.

A high-bias model doesn’t learn enough from the data. It is too rigid, missing potential patterns. It **underfits**—it’s too “dumb” or rigid. Too Simple.

**Think:** A straight line trying to fit a zigzag pattern.

### 7. Variance

Variance is **error due to too much sensitivity to the training data.**

A high-variance model learns the noise. It **overfits**—it’s too “smart” and memorizes everything. It performs poorly on new data. Too Complex.

**Think:** A squiggly line that fits every training point perfectly, but falls apart on test data.

### 8. Variance VS Bias

This comes up when talking about modeling or performance tradeoffs in code.

At its core, variance and bias are **types of error** that affect how well a model (or a system) performs.

They often trade off with each other—reducing one can increase the other. Good models **balance** bias and variance.

### 📊 In practice:

| Model | Bias | Variance | Result |
| --- | --- | --- | --- |
| Too simple | High | Low | Underfits |
| Too complex | Low | High | Overfits |
| Balanced | Low | Low | Just right ✅ |

In software: You can think of this in terms of code generalization too:

- **Too abstract = high variance** (overengineered, fragile)
- **Too rigid = high bias** (hardcoded logic, low flexibility)

### 8. Base64

Base64 is a **binary-to-text encoding** scheme that lets you **safely transmit binary data** (like files, images, or cryptographic material) using only **printable ASCII characters**.

[Base64 In-depth](https://www.notion.so/Base64-In-depth-1c962d960d7f80668837f0d67992b8b8?pvs=21)

### 9. JWT (JSON Web Token)

A JWT is a Base64-encoded token with three parts: a header, payload, and signature. The header specifies the algorithm used, the payload holds the user data or claims, and the signature ensures the token hasn't been tampered with. JWTs are stateless — they don’t require the server to store session data — and are commonly used in authentication and authorization for APIs and web applications.

[JWT Parts in-depth](https://www.notion.so/JWT-Parts-in-depth-1c962d960d7f808e97f6fc52f0aa552b?pvs=21)

### 10. Global Tech Standards

In tech, most of our global standards come from bodies like:

- **IETF** – Internet protocols (HTTP, MIME, TLS)
- **W3C** – Web standards (HTML, CSS, XML)
- **NIST** – U.S. national standards (crypto, measurement)
- **ISO/IEC** – International standards (e.g., PDF, JPEG, file formats)

These groups are **voluntary and collaborative**, but when vendors (like Google, Mozilla, Microsoft) **agree to follow them**, they become de facto universal.

### 11. MIME (Multipurpose Internet Mail Extensions)

It was introduced to solve early email’s big limitation: **ASCII text only**.

MIME is a **standard that extends email formats** to support:

- Text in character sets other than ASCII
- Attachments/ different content types (images, videos, documents, `application/json`)
- Multi-part messages (like both plain text and HTML in the same email)
- Character sets like UTF-8

It is a standard that was defined in **RFCs (Request for Comments)** published by the **IETF**.

[MIME Examples](https://www.notion.so/MIME-Examples-1ca62d960d7f800f8be3ffe967de7661?pvs=21)

### 12. IETF (Internet Engineering Task Force)

- A global open standards organization
- Writes and publishes **technical specifications for internet protocols**
- Anyone can propose ideas — they’re reviewed, discussed, revised, and published as RFCs
- MIME, HTTP, TLS, SMTP, DNS — all came from IETF RFCs

### 13. RFC (Request for Comments)

- A formal document published by the IETF or related bodies
- Describes internet standards, protocols, or experiments
- Each RFC is numbered and archived forever

### 14. Encoding

- **Purpose:** Make data safe and consistent for transmission or storage
- **Not secret**: Anyone can reverse it
- **Examples:** Base64, URL encoding, HTML encoding

**Analogy:** Writing a message in Morse code — it’s a different format, but not secret.

**Used for:** Data formatting (e.g., transmitting binary over HTTP, file attachments)

### 15. Encryption

- **Purpose:** Protect data confidentiality
- **Secret**: Requires a key to decrypt
- **Types:**
    - **Symmetric encryption** (same key to encrypt/decrypt): AES
    - **Asymmetric encryption** (public/private keys): RSA

**Analogy:** Locking a message in a box with a key — without the key, no one can read it.

**Used for:** Secure communications, files, web traffic (HTTPS), JWT encryption (JWE)

Aside: AES means Advanced Encryption Standard

### 16. Cryptographic Attacks

[Collision Attack](https://www.notion.so/Collision-Attack-1ca62d960d7f809fab69e54d08f410f7?pvs=21)

[Length-Extension Attack](https://www.notion.so/Length-Extension-Attack-1ca62d960d7f8091b238f2ff8c290913?pvs=21)

[Signing Algorithms & Cryptographic Primitives](https://www.notion.so/Signing-Algorithms-Cryptographic-Primitives-1c962d960d7f806bb9abdcb03e0acaa4?pvs=21)

**HMAC protects against both** length and collision attacks via double hashing and fixed padding

### 17. **Bit vs Byte**

A **bit** is the smallest unit of data in computing. It can be either `0` or `1` — representing an off/on state in a digital circuit.

A **byte** is a group of **8 bits**. It's the standard unit for measuring memory/storage size.

- 1 byte = 8 bits
- A single ASCII character (like `'a'`) is typically 1 byte

**Example:**

- `a` = 01100001 (8 bits) → 1 byte

[Units of Measurement](https://www.notion.so/Units-of-Measurement-1e062d960d7f801bb33cd3395eb07497?pvs=21)

### 18. Dry Licenses

In the pragmatic programmer: duplication doesn't mean the same code repeated multiple times, but the same behavior or knowledge represented multiple times. 

A single piece of behavior can be represented in two places in two completely different ways. The code isn't identical but it's still duplication.

The question to ask is: if one piece of code changes, is it a logical necessity that another piece of code has to change in the same way? If the answer is no, then it's not duplication, even if the code happens to be identical.

### 19. Licenses

A license tells people how they can legally use, modify, and share your code.

No license = technically don’t give anyone permission to use it at all.

Some common options:

- `MIT` → *"Do what you want, just don’t sue me." (what most people use)*
- `Apache 2.0` → Same as MIT but with patent protections
- `GPL` → Freedom fighter mode: if people use your code, their code must also be open-source
- `Unlicense` → "This is public domain, take it and go"

### 19. Multithreading vs. Multiprocessing

“The Office vs. The Clone Army”

### 🧵 **Multithreading**

- **Multiple threads inside one process** (like different tabs in the same Google Doc)
- They **share memory**
- Threads are *lightweight*, start fast, and use less memory
- But: Threads can trip over each other if they try to change the same thing at once, because *shared state = shared doom*

### 🧠 **Multiprocessing**

- **Each process is a separate program instance**, with its own memory and runtime
- *No shared memory* (unless you explicitly do inter-process communication)
- **Slower to start**, heavier on memory
- Much safer—if one crashes, it doesn’t take the others with it (unless you wrote them all, in which case: oof)

**Use Threads:** When you're waiting on *external stuff* (network, disk, database)

**Use Processes:** When you're doing *heavy computations* (image processing/ crypto mining)

### 20. I/O-bound vs CPU-bound: The Core Showdown

### **I/O-bound :Tasks that mostly *wait around* on** **external resources.**

(ie) Waiting for a slow database query, Fetching from an external API, Reading a file from disk, Uploading files to S3

These benefit from **threads**, because while one thread is waiting, others can do useful work. It’s like having one friend hold your place in line while you go grab snacks.

### CPU-bound: Tasks that max out your processor.

(ie) number crunching, data parsing, image manipulation, machine learning, running your game emulator, compressing video, sorting arrays, looping through all the users.

You want **more CPU cores** or **multiple processes** to spread the load.

### 21. Caching Best Practices

Best candidates for caching: primitives (strings, ints, JSON) and if you cache an object, freeze it or dup it

That advice applies *across caching layers*, but especially in **in-memory caches** like:

- `Rails.cache` with memory store (or memcached)
- Global variables (don't)
- Any homegrown RAM cache

### 22. CLI

It’s just a program you run in your terminal. That’s it. But how do they work? That’s a longer story.

[What is a CLI tool under the hood?](https://www.notion.so/What-is-a-CLI-tool-under-the-hood-1d762d960d7f80b586d8eee2704d7a33?pvs=21)

### 23. Sensitive Data

[Ultra Super Secret Secure System Practices](https://www.notion.so/Ultra-Super-Secret-Secure-System-Practices-1dc62d960d7f802a928de19a7ef20cf8?pvs=21)

### 24. OAuth

[OAuth](https://www.notion.so/OAuth-1e162d960d7f809db1daf1b5ad8ac35d?pvs=21)

### 25.  Shell Sessions

[**The Set Builtin**](https://www.notion.so/The-Set-Builtin-1e662d960d7f80e8a788e7563383a236?pvs=21)

### 26.  Marshal/ Unmarshal

The word "unmarshal" in the context of computer science and specifically data serialization (like JSON, XML, etc.) means the process of transforming data from a serialized format back into an in-memory data structure (like a struct or a map) that can be easily used by a program.

- **Marshal (Serialization):** Taking an object in your program (e.g., a `Product` struct) and **packing** it into a transportable format (e.g., a JSON string) so it can be sent over a network or stored in a file. You're essentially -flattening- the object into a sequence of bytes or a string.
- **Unmarshal (Deserialization):** Taking that transportable format (e.g., a JSON string received from an API) and **unpacking** it back into an object in your program (e.g., a `Product` struct) so you can access its individual fields and use the data. You're reconstructing the in-memory representation of the data.

### 27. Database Optimization

[Database Optimization: PostgreSQL focus](https://www.notion.so/Database-Optimization-PostgreSQL-focus-1f262d960d7f80af891fedcf90da3c01?pvs=21)

### 28. Tokens

[Tokens and Tokens and Tokens](https://www.notion.so/Tokens-and-Tokens-and-Tokens-1f862d960d7f8035a8cdca9b6687fed0?pvs=21)

### 29. System Monitoring & Observability

[Monitoring & Observability](https://www.notion.so/Monitoring-Observability-1fa62d960d7f80e2a441c5e54c92aa69?pvs=21)