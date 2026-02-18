# Thread Safety & Concurrency in Puma

Puma is Rails’ default web server. It’s **multi-threaded**, which means it can handle multiple requests at the same time in different threads—**without forking new processes** like Unicorn or Passenger.

### Puma’s concurrency model:

- Starts N workers (optional, for multi-process on multi-core CPUs)
- Each worker spins up M threads
- Threads are much lighter weight than processes
- So Puma can handle more simultaneous requests without spinning up extra memory-heavy processes

### Theater Analogy

The Rails app is a community theater production, and **Puma** is the stage manager who organizes how many *productions* and *actors* you’re running at once.

### 👯‍♂️ N = Workers (Processes)

- Like separate **plays** being put on in different theaters.
- Each gets its **own Ruby VM**, separate memory, etc.
- Can’t talk to each other unless you go out of your way (e.g. Redis, database).
- **Multiprocessing** & Helps you scale across **CPU cores**. Each core can run a worker.

### 🧵 M = Threads (per worker)

- Like **actors** performing in the same play, switching roles really fast.
- They *share the same memory space*.
- **Multithreading** & Much lighter on memory than full processes.

### Thread safety

- Rails became thread-safe by default in Rails 5. But that doesn’t mean *you* are. Thread safety means that multiple threads can safely execute code at the same time without ruining everything forever.

### Why thread safety matters:

- If two threads touch the same object (say, a global variable or shared resource), things can break or leak

You are **not** thread-safe if:

- You use **global mutable state** without locking
- You write class-level variables or constants and mutate them during requests
- You memoize stuff in the wrong places (`@@`, `$`, `class << self`, `Thread.current` misuse)
- You do goofy things in initializers that weren't meant to be shared
- Use thread-safe caches (`Rails.cache`), queues (like Sidekiq), or mutexes

## 💔 Why not use something other than Puma?

Here are the usual suspects:

### 🐘 Passenger

- “Enterprise-friendly” (aka bloated and expensive)
- Easy to deploy if you're allergic to learning DevOps
- Less flexible with threading

### 🦄 Unicorn

- Old-school. Pure **multiprocess**.
- Good for thread-safety paranoia, because **no shared memory**.
- But heavier, slower, and now mostly a historical footnote in Rails textbooks.

### 🪓 Falcon

- New hotness. Fiber-based concurrency.
- Not battle-tested enough for real apps unless you're feeling spicy and enjoy edge case debugging.

Puma is the sweet spot for most people. It’s thread-safe, multi-process capable, and doesn’t explode when touched

## Test your app’s thread safety:

- [`thread_safety`](https://github.com/pda/thread_safe) gem
- Puma’s low-level logs
- Simulate chaos with tools like `wrk`, `ab`, or `hey` to bombard your server and watch it sweat

However after this deep dive it seems ‘hard’ to create the conditions for this as long as you’re just using `User.find` in controller actions or background jobs and not stashing the result in some shared memory location, you should be **fine**.