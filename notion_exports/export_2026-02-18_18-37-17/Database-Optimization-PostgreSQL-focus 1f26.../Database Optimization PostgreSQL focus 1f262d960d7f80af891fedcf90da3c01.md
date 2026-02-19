# Database Optimization: PostgreSQL focus

### ✅ Indexing

- Know when and why to use **BTREE** (default), **GIN** (for JSONB or full-text search), **HASH**, and **partial indexes**.
- Understand **multicolumn indexes** and the **order of columns** (WHERE vs ORDER BY impact).
- Tools: `EXPLAIN ANALYZE`, `pg_stat_statements`.

### ✅ Query Optimization

- Understand **query plans**.
- Use `EXPLAIN (ANALYZE, BUFFERS)` to identify slow steps.
- Avoid **N+1 queries** (yes, they happen in Go too).
- Normalize first. Denormalize later if performance demands it.

### ✅ Connection Pooling

- Know how many connections your app actually needs.
- For Go: look into `database/sql` connection pooling behavior and `db.SetMaxOpenConns`.

### ✅ Transactions and Locks

- How transactions interact with row locks (`FOR UPDATE`, etc).
- Watch for **deadlocks** and **long-running transactions**.

### ✅ JSONB (in case their schema uses it)

- Indexing strategies: GIN indexes on `jsonb_path_ops`.
- Tradeoffs of using structured vs unstructured data.

### Bonus 🧠: Show off by saying something like:

> “I’ve used pg_stat_statements to track high-cost queries and pair that with EXPLAIN (ANALYZE) to guide schema-level decisions.”
> 

They’ll be too stunned to speak. Then hire you.

---