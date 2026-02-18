# ETL = Extract → Transform → Load

**Extract**

- Pull data out of somewhere. Could be a database (Postgres, MySQL), API, files (CSV, JSON), Kafka streams, etc.
- Imagine scraping data out of your app’s internal database.

**Transform**

- Clean, normalize, or reshape the data.
- This might mean converting timestamps to the same format, filtering out junk, aggregating user sessions, mapping country codes to actual country names, etc.
- This is often done in SQL or Python, sometimes inside a tool like dbt or Airflow.

**Load**

- Dump that shiny, cleaned-up data into its new home: a **data warehouse**, or sometimes a **data lake**.
- Now it’s ready to be queried, visualized, or handed over to a confused analyst.

### Data Warehouse

It’s a big fancy database optimized for **analytics**, not transactions. It doesn’t care about writing rows fast. It cares about reading huge amounts of data really fast so someone can make a chart about how many users logged in on x day.

Key features:

- Column-oriented storage (faster for big reads)
- Massive parallel processing
- Good for running long, expensive SQL queries

Examples: Snowflake, BigQuery, Amazon Redshift, ClickHouse

**Metabase** is a *BI tool* (Business Intelligence) — it reads from a data warehouse (or a read-only replica) and makes dashboards. 

Todo: **dbt** (Data Build Tool)

### Data Lake

It’s a giant dumping ground for *raw* data.

- Usually stored in cheap blob storage (like S3).
- Format? Who cares. JSON? CSV? Parquet? Go nuts.
- You throw all your data in there “just in case,” then build pipelines to extract/transform it later.

Think of it as the attic of your tech stack. It’s a mess, but everything’s technically “stored.”

In startups: rarely used. In enterprises: always talked about, usually neglected.

### How does one optimize a DB to become a Data Warehouse?

First you need to make your database behave less like an OLTP (Online Transaction Processing) system, and more like an OLAP (Online Analytical Processing) system.

**Making a DB Warehouse-ish**

1. **Denormalize Your Schema**

- Production DBs love normalization (splitting data into many tiny related tables).
- Warehouses hate that. Joins are expensive.
- Solution: Create **materialized views or flattened tables** with pre-joined, pre-aggregated data.
    - E.g., a giant table that combines `users`, `subscriptions`, and `activity_logs`.

**2. Partition Your Tables**

- Break big tables (e.g., `events`) into time-based partitions.
    - Example: `events_2024_01`, `events_2024_02`
- Speeds up queries that filter by time range, which is 95% of analytics.

3. **Use Columnar Storage (if possible)**

- Traditional Postgres stores rows.
- **Columnar storage** (like in Redshift or ClickHouse) lets you scan only the relevant columns. Super fast.
- Postgres 14+ with extensions like **cstore_fdw** supports columnar-ish storage.

4. **Add Analytics-Focused Indexes**

- Your prod indexes are for lookups (e.g., find user by ID).
- For analytics, index fields like `created_at`, `region`, `event_type`.

5. **Materialized Views or Summary Tables**

- Instead of calculating aggregates on the fly, schedule jobs to **precompute** them.
    - “Monthly revenue per region” should live in its own table, updated nightly.
- It’s like memoizing your queries so you don’t burn the house down at every dashboard refresh.

### 6. **Replicate to a Real Data Warehouse Eventually**

- Once your follower DB starts to sweat, offload to a real warehouse like:
    - **BigQuery** (cheap, serverless)
    - **Redshift** (AWS darling)
    - **Snowflake** (VC-fueled analytics volcano)
- Those are built for this exact use case.

###