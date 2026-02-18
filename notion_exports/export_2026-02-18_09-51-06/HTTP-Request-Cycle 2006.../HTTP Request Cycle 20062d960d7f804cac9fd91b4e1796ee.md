# HTTP Request Cycle

### **Overview:**

When a user types a URL and hits enter, the browser first breaks that down into a DNS query to find the IP address of the domain. Once it resolves, it opens a TCP connection and initiates an HTTPS request—meaning the request is encrypted via TLS (formerly SSL).

That request may first hit a CDN like Cloudflare, which might return a cached response if it has one. If not, it sends the request to our origin server—possibly routed through a reverse proxy like NGINX.

Once it reaches our app server (say, Puma), it goes through the Rack middleware stack, where things like session handling, cookies, or auth filters kick in. Rack passes it to Rails, which uses routes.rb to dispatch it to a controller.

In the controller, business logic runs, queries hit ActiveRecord and the database, and the response—usually JSON or HTML—is generated.

That response moves back through Rack, back through the web server, potentially cached by the CDN, and returned to the user.

If we’re doing any async work—like sending emails, processing images, or heavy logic—that usually gets offloaded to Sidekiq, which uses Redis as a job queue so it doesn’t block the response.

Along the way, headers help shape behavior, cookies track session state, and all the magic gets abstracted away until someone asks me this question in an interview.

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

### 🔐 **SSL / TLS (HTTPS)**

TLS (formerly SSL) secures HTTP via encryption. Establishes a trust handshake, encrypts traffic, and ensures data integrity between browser and server.

**What It Does:**

- Encrypts data between browser and server
- Uses asymmetric cryptography to establish trust (handshake) and symmetric encryption for speed
- Prevents man-in-the-middle attacks and data snooping

### 🧵 **Sidekiq + Background Jobs**

Sidekiq uses Redis to queue background jobs. It offloads slow tasks (emails, uploads, webhooks) so users/ the request doesn’t have to wait for them. Like saying, “I’ll handle this later” but actually following through like a responsible adult.

**What It Does:**

- Sidekiq uses Redis to manage background job queues
- Non-critical or long-running tasks are offloaded (emails, file processing, APIs)
- Jobs are retried, monitored, and can be scheduled
- Keeps your web response fast and non-blocking