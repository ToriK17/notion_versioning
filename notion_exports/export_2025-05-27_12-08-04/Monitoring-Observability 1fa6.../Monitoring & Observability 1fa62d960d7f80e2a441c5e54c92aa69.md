# Monitoring & Observability

### **Introduction to Observability (Logs, Metrics, Traces - MELT)**

Observability is like asking your app, *“How messed up are you right now?”* and hoping it answers before the users start tweeting angrily.

- **Observability** is the capability of understanding what’s going on inside a system based on the data it emits. It’s the evolved form of *"monitoring"*, which mostly tells you *that* something broke, not *why*.
- The MELT stack:
    - **Metrics**: Numeric data over time (e.g., CPU usage, request count).
        - Metrics say *"something’s wrong"*
    - **Events**: State changes (optional in MELT, but relevant in security/ops).
        - Events are **discrete, timestamped state changes** in a system. Think of them as "something just happened" messages. They’re more *semantic* than logs (which are usually text dumps) and more *sporadic* than metrics (which are collected at regular intervals).
        - *what triggers alerts*
    - **Logs**: Timestamped text records of events (e.g., errors, requests).
        - logs say *"what happened"*
    - **Traces**: Show the path of a request through a distributed system.
        - traces say *"where it happened."*

You’ll be expected to juggle all three while pretending everything is fine.

### **What is Telemetry Data?**

Think of telemetry as your app constantly whispering *"here’s what I’m doing, on a telephone."*

- **Definition**: Telemetry data is the automated data emitted from software, infrastructure, or devices to provide insight into their behavior and performance.
- **Importance**:
    - Enables proactive monitoring and rapid debugging.
    - Critical for detecting anomalies or security threats in real time.
    - It’s the bread and butter for observability tools, SIEMs, and your future employer’s entire value prop.

### **Types of Telemetry Data (Metrics, Logs, Traces - Deep Dive)**

- **Metrics**:
    - Structured numerical values.
    - Low cardinality, high efficiency. *
    - Examples: CPU usage, memory load, API latency.
    - Aggregated over time. Great for dashboards and alerts.
- **Events:**
    - A user logs in (authentication success/fail)
    - A new file is uploaded
    - A security alert is triggered
    - A service changes from `healthy` to `degraded`
    - Firewall rules updated
    - New container spun up
- **Logs**:
    - Text-based, often unstructured or semi-structured.
    - Can be verbose (hello, stack traces).
    - Useful for root cause analysis and auditing.
    - Painful at scale unless indexed properly (hello, ELK bills).
- **Traces**:
    - Track a request through multiple systems/services.
    - Show timing between service hops (aka: “Where is my request taking a nap?”).
    - Usually tied to distributed systems using correlation IDs.
    - Critical for diagnosing microservice latency black holes.

Each type has a role. Together, they help you debug your production nightmares.

---

### **Application Performance Monitoring (APM)**

APM is the fancy cousin of observability. It’s what you buy when you want a vendor to tell you how broken your app is, instead of you figuring it out yourself.

- **Purpose**: To monitor the performance, availability, and usage of applications.
- **Core Features**:
    - Transaction tracing
    - Error tracking
    - Real user monitoring (RUM)
    - Infrastructure metrics
- **Common Data**: Response times, error rates, throughput, apdex scores.
- APM tools often bundle MELT under the hood.

Don’t call everything “APM”. It’s a subset of observability, not a synonym.

---

### **Tools & Technologies**

- **They are signal collectors and visualizers. The things that tell you when everything's on fire**
- **Scout APM** – Yes, classic APM. Measures performance, tracks bottlenecks, gives you breakdowns of where time is spent in your app.
- **Datadog** – APM on steroids. Also does metrics, logs, traces, and infrastructure monitoring. It’s basically the Death Star of observability tools.
- **Honeybadger** – More of an error monitoring tool (crashes, exceptions), with a sprinkle of uptime monitoring. Less robust than full-blown APM, but still helpful.
- **Prometheus:** Metrics collection and querying. Pull-based model, time-series database. Used with Grafana for dashboards.
- **Grafana**: Visualization tool. Dashboards for Prometheus, Loki, Elastic, etc. Good for impressing non-technical stakeholders with colorful charts.
- **Jaeger**: Distributed tracing system. Open source, originally by Uber. Visualizes request paths across services.
- **ELK Stack** (Elasticsearch, Logstash, Kibana): Log storage, processing, and visualization. Powerful, flexible, expensive (both in $$$ and brainpower). Often used in security environments for log correlation.
- **OpenTelemetry (OTel)**: CNCF standard for collecting telemetry data (metrics, logs, traces). Vendor-agnostic, flexible instrumentation. Future-proof choice for modern observability pipelines.

* **Cardinality** means: *how many unique values can a field have?*

Examples:

- Field: `status_code`
    
    Values: `200`, `404`, `500`
    
    → **Low cardinality** (few unique values)
    
- Field: `user_id`
    
    Values: Thousands or millions of unique user IDs
    
    → **High cardinality**
    

Metrics are most efficient when they track **low-cardinality data**, like:

- Total requests per second
- Error count per endpoint
- CPU usage by instance