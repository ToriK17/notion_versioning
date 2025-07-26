# Base64: Standard vs URL-safe Version

### Variants of Base64

| Type | Description |
| --- | --- |
| Standard | Uses `+` and `/` + padding `=` |
| URL-safe | Uses `-` and `_`, no padding |
| PEM | Adds line breaks every 64 characters (for certs) |

### **Standard Base64**

- Uses characters: `A–Z`, `a–z`, `0–9`, `+`, and `/`
- May end with padding: `=`, `==`
- Example: `YWJj+Z29vZA==`

**Problem:** `+`, `/`, and `=` can **break in URLs**, especially in query strings or when passed through certain systems (like email links).

---

### **URL-safe Base64**

- Replaces:
    - `+` with
    - `/` with `_`
- Omits padding (`=`)

**Why?**
So it’s safe to embed in URLs without encoding issues.

**Used in:**

- JWTs
- OAuth tokens
- File names or identifiers in web apps

**Example:**
Standard: `YWJj+Z29vZA==`

URL-safe: `YWJj-Z29vZA`