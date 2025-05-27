# HTTP Request Cycle

### 🛡️ **Headers**

**What They Do:**

- Define metadata about the request/response
- Control cache behavior (`Cache-Control`)
- Define content type (`Content-Type`)
- Set cookies and auth tokens (`Set-Cookie`, `Authorization`)
- Manage CORS (`Access-Control-Allow-Origin`)
- Affect SEO/security (`X-Frame-Options`, `Strict-Transport-Security`)

### 🌐 **CDNs**

**What They Do:**

- Cache static content (HTML, JS, images) close to users
- Reduce latency and server load
- Handle DDoS protection, edge logic, and failover
- Sometimes serve entire websites from edge nodes

**CDNs (like Cloudflare) cache content close to users.** Meaning they create a server (called a "PoP" - Point of Presence) near the user for faster load times. This is opposed to sending data all the way from the origin server every time. This can cache static content (HTML, JS, images), reduce latency and server load, handle DDoS protection, edge logic, and failover, and sometimes serve entire websites from edge nodes.

So they reduce load times, protect against attacks, and sometimes respond without hitting your origin server at all.

However, if you have highly dynamic data then they will add an extra layer of complexity as you will need to add logic for cache invalidation.