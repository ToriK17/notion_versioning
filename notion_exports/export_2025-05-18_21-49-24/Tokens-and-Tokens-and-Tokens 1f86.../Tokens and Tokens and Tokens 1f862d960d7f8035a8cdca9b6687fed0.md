# Tokens and Tokens and Tokens

## 🔐 High-Level Overview of Tokens

Tokens are just glorified permission slips with scopes that allow you to do different things.

### 1. **PAT (Personal Access Token)**

- Used for authenticating users in place of passwords (especially in CI/CD and scripts).
- Scopes define what it can do (e.g., read repo, write packages).
- Long-lived or short-lived depending on platform.
- Usually tied to user identity (not ideal for services).

### 2. **OAuth Access Token**

- Issued via the OAuth flow, usually short-lived.
- Tied to a client ID and a user’s authorization.
- Used in APIs for delegated access: “I, the app, act on behalf of the user.”
- Can be JWTs or opaque blobs of sadness.

### 3. **ID Token**

- Also part of OAuth/OIDC but meant for identifying the user, not authorizing access.
- Includes identity claims (like name, email, or custom ones you can set up).
- Useful in front-end apps or wherever user identity must be confirmed.

### 4. **Refresh Token**

- Used to get new access tokens without re-authenticating.
- You’re not supposed to hoard these, but you could. . .

### 5. **Service Account Token**

- Tied to a non-human identity (like a bot or a system component).
- Common in Kubernetes and cloud platforms.
- Often stored in secret mounts or injected at runtime.

### 6. **Bootstrap Token**

- Temporary token used to **bootstrap** trust between a new service/node and the main control plane.
- Think of it as a one-time handshake token. Once trust is established, it’s usually discarded.
- Common in Kubernetes.

---

## 🚀 Bootstrap: Not the CSS thing in token world

In systems like **Kubernetes**, “bootstrap” refers to the process of spinning up a new node (worker or control plane) and making it trusted by the system.

### What Happens:

1. A **bootstrap token** is pre-generated by an admin or control plane.
2. A new node joins the cluster using this token.
3. Once accepted, the node:
    - Gets a signed certificate (via CSR—certificate signing request).
    - Receives long-term credentials (like a kubelet client cert).
    - Discards the bootstrap token like an empty juice box.

---

## 📜 Bootstrap Credentials:

Bootstrap credentials are short-lived and scoped tokens or keys that allow a new entity to authenticate **just enough** to get permanent credentials. They are heavily used in:

### 1. **Kubernetes**

- `kubeadm` uses bootstrap tokens from the `bootstrap.kubernetes.io/token` namespace.
- These tokens allow new kubelets to request a TLS certificate.

### 2. **Cloud Platforms (like AWS, GCP)**

- Temporary bootstrap tokens (or credentials) can be used to initiate the **IAM** role assumption dance, leading to long-term credentials.

### 3. **Zero Trust Architectures**

- Bootstrap credentials might be hardware-bound or come from TPMs, and are used to initiate a secure key exchange.

---

### Why Bootstrap Credentials Matter

- You *really* don’t want every node or service to have static credentials forever.
- Bootstrap credentials expire or are single-use—limiting the blast radius.
- They usually have limited scope: they can only say “Hi, I’m new, can I join?”—not “Delete all the prod data.”

---

### Summary:

| Token Type | Purpose | Who Uses It |
| --- | --- | --- |
| PAT | Human-to-service access | Developers, scripts |
| OAuth Access Token | Delegated access to APIs | Web & mobile apps |
| ID Token | Identity confirmation | Frontends, auth systems |
| Refresh Token | Renew access tokens | Auth flows |
| Service Account Token | Non-human access | Bots, servers |
| Bootstrap Token | Initial trust establishment | New nodes, services |

---