# Rack and the middleware stack

Rack is a ***minimal interface*** that connects web servers (like Puma) with Ruby frameworks (Rails).

It is a library.

What we mean when we say minimal interface we mean it is not an application or a framework. It is more like a *contract* or a *protocol*. It is just the bridge not the builder. 

That contract is: “Give me an object that responds to `call(env)` and returns `[status, headers, body]`.

Rack is the **middleware layer** between your Rails app and the web server (like Puma). It provides a standard **interface contract** so Ruby web apps and servers can communicate.

**Rack** is saying to the **framework** (like Rails or Sinatra):

“If *you* give me a Ruby object that responds to `call(env)` and returns a 3-element array — `[status, headers, body]` — **then I'll handle the communication with the web server**. You don’t need to worry about low-level server details. I’ll make sure the server knows how to talk to you.”

### In other words:

- **Framework** (Rails): “I want to build web apps!”
- **Rack**: “Cool. Just implement `call(env)` and return a `[status, headers, body]`. I'll handle the connection to the server (like Puma).”
- **Web server** (Puma): “I’ll forward incoming HTTP requests to Rack and expect that format in return.”

### That contract is simple:

> Your app must respond to call(env) and return a 3-part array:
> 
> 
> `[status, headers, body]`
> 

That’s it. That’s the whole interface.

### In Rails:

- **The request**: comes into Puma → passed to Rack → Rack calls your app’s `call(env)`
- **The response**: is returned from your app → through Rack middleware stack → back to the web server → to the browser

### Rack Middleware:

Each layer in the stack can:

- Modify the request (add a cookie, authenticate)
- Halt the request (e.g., reject unauthorized users)
- Modify the response (add headers, log timing, etc.)

This is how `Rack::Attack`, `Rack::Logger`, `Rack::Session`, etc., all work.