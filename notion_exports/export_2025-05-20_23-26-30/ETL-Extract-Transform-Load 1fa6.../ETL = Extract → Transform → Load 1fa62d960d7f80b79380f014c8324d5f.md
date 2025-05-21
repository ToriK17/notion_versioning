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