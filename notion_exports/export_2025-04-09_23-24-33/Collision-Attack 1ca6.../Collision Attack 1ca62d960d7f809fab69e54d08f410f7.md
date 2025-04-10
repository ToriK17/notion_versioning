# Collision Attack

A **collision attack** is when two different inputs produce the **same hash output**.

> If an attacker can create two documents (A and B) that hash to the same value, they can:
> 
1. Show `A` to get a signature
2. Replace it with `B` later — same hash = same signature
3. **Boom** — fraud or unauthorized access

This is why MD5 and SHA-1 are no longer considered secure (both have known collisions).