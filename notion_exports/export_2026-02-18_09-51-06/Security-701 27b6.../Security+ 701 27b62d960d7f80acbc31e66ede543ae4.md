# Security+ 701

## Web Filtering & Security Controls

- **Web Filters**
    
    Block or allow web content based on predefined rules.
    
- **Agent-Based Web Filters**
    - Installed directly on client devices.
    - Enforce browsing policies regardless of employee location (on-site, remote, traveling).
    - Useful for organizations enforcing **AUPs (Acceptable Use Policies)** consistently.
- **Centralized Proxy**
    
    Routes all web traffic through a central device for filtering and monitoring.
    
    - Works well on corporate networks.
    - Less effective once users leave the network unless paired with VPN or other controls.

---

## Related Security Tools

- **DLP (Data Loss Prevention)**
    
    Prevents sensitive data from being exfiltrated or leaked (e.g., SSNs, credit card data).
    
- **IPS (Intrusion Prevention System)**
    
    Detects and blocks active threats in real-time (network- or host-based).
    
    - Stops malicious traffic before it can cause harm.

---

**Test Question:** If the goal is to enforce acceptable use policies (AUPs) for web browsing **no matter where the user is**, the correct control is **Agent-Based Web Filters.** 

## Hardware Security Modules (HSMs)

- **Definition:** Physical devices used to generate, store, and protect cryptographic keys.
- **Uses:**
    - Encryption during secure login and authentication.
    - Digital signing of data.
    - Payment security systems (e.g., credit card processing).
- **Advantages:**
    - Faster than software encryption systems.
    - Preferred when **performance and security** are priorities.
    - External or add-on device → can be installed to enhance an existing system.
- **Comparison:**
    - **TPM (Trusted Platform Module):** Performs similar functions but is soldered onto the motherboard (built-in, not removable).
    - **HSM:** External, modular, higher performance, flexible.
- **Not HSMs:**
    - **Routers** → direct traffic, not encryption.
    - **HIDS (Host-based Intrusion Detection Systems)** → detect suspicious behavior, not cryptographic processing.

✅ **Test Tip:** On the Security+ exam, if the question mentions *credit card systems, high-performance encryption, or external cryptographic devices*, the answer is usually **HSM**.

## Threat Vectors & Network Scanning

**Question:** Which threat vector can be identified by performing regular scans on internal networks?

**Answer:** ✅ **Open service ports**

---

### **Open Service Ports**

- **Definition:** Network ports left open for services that may not be needed.
- **Risk:** Attackers can exploit these to gain unauthorized access.
- **Detection:** Found by running **regular port scans** (e.g., Nmap, Nessus).
- **Best Practice:**
    - Close unused ports.
    - Use firewalls to limit exposure.
    - Only allow traffic for essential services.

---

### **Why not the others?**

- **Watering Holes:** Compromised websites a user frequently visits → identified by monitoring web activity, not internal scans.
- **Memory Leaks:** Application-level issue found by analyzing app behavior, not port scans.
- **Removable Devices:** Detected when scanning external hardware (USB, DVD), not by internal network scans.

---

✅ **Test Tip:** If the exam question mentions **scanning internal networks** → think of **open ports / unnecessary services** as the vulnerability.

## Network Monitoring Protocols

**Question:**

What protocol can be used to monitor network-attached devices?

**Answer:** ✅ **SNMP (Simple Network Management Protocol)**

---

### **SNMP (Simple Network Management Protocol)**

- **Definition:** A TCP/IP protocol used for **monitoring and managing network devices** (routers, switches, servers, printers, etc.).
- **Function:** Collects data such as device status, performance metrics, and error rates.
- **Usage:** Incorporated into **network management systems** for centralized oversight.
- **Security Concern:** SNMPv1 and SNMPv2 use cleartext community strings (passwords). Best practice is to use **SNMPv3** for authentication and encryption.

---

### **Why not the others?**

- **FTP (File Transfer Protocol):** Used for transferring files.
- **SMTP (Simple Mail Transfer Protocol):** Used for sending emails.
- **DNS (Domain Name System):** Translates domain names (e.g., google.com) into IP addresses.

---

✅ **Test Tip:** If the question asks about **monitoring devices / centralized management**, the correct answer is **SNMP**. If it asks about **file transfer, email, or name resolution**, go with FTP, SMTP, or DNS.

## Risk Management & Vulnerability Assessment

**Question:**

A security analyst has conducted a vulnerability assessment. They want to determine which vulnerabilities should be addressed to meet the company’s expectations for risk management.

**What factor does the analyst need?**

**Answer:** ✅ **Risk Tolerance**

---

### **Risk Tolerance**

- **Definition:** The level of risk an organization is **willing to accept** before taking action.
- **Usage:** Guides prioritization of which vulnerabilities must be fixed vs. which can be accepted or deferred.
- **Example:**
    - A bank = **low risk tolerance** (must patch almost everything quickly).
    - A small startup = **higher tolerance** (may only fix critical items).

---

### **Other Terms (why not them?)**

- **Exposure Factor:** Percentage of loss expected if a vulnerability is exploited (used in quantitative risk analysis).
- **Environmental Variables:** Industry-specific factors influencing vulnerability (e.g., healthcare HIPAA compliance).
- **Residual Risk:** The remaining risk after controls are applied.

---

✅ **Test Tip:** If the exam asks **which vulnerabilities to fix first** or **how to align with company expectations**, the keyword is **risk tolerance**.

## Monitoring Network Traffic for Attack Patterns

**Question:**

An administrator wants a network device that can watch for **well-known threats** and stop them quickly. What type of monitoring analyzes frames and packets of network traffic for attack patterns?

**Answer:** ✅ **Signature-based Monitoring**

---

### **Signature-Based Monitoring**

- **Definition:** Detects threats by comparing traffic against a database of **known attack signatures** (patterns).
- **Strengths:**
    - Lightweight and resource-efficient.
    - Good at quickly identifying **well-known attacks**.
- **Weaknesses:**
    - Cannot detect new/unknown (zero-day) threats until a signature is created.
    - Delayed protection → vulnerable during the time before updates are distributed.

---

### **Other Methods (why not them?)**

- **Anomaly-based:** Detects behavior that deviates from a baseline → better against **zero-day attacks**.
- **Stateless Firewall:** Filters only by rules (IP, port), no context.
- **Stateful Firewall:** Tracks ongoing connections, but doesn’t analyze for attack signatures.

---

✅ **Test Tip:** If the exam mentions **well-known threats / database of patterns**, the answer is **Signature-based**. If it mentions **unknown or zero-day threats**, the answer is usually **Anomaly-based**.

## Penetration Testing – Device Enumeration

**Question:**

During penetration testing, contractors are enumerating all devices connected to the network. What are they doing?

**Answer:** ✅ **Network Mapping**

---

### **Network Mapping**

- **Definition:** The process of identifying and documenting the **physical and logical connectivity** of a network.
- **Purpose:**
    - Helps build accurate network documentation.
    - Identifies unknown devices (which often pose higher risk since they may not be patched or hardened).
- **Tools:** Commonly done with **Nmap** and similar utilities.
- **Use in Security:** Critical step in **vulnerability discovery** and understanding network attack surface.

---

### **Why not the others?**

- **OSINT (Open Source Intelligence):** Uses publicly available data, not internal enumeration.
- **Dynamic Analysis:** Testing software by running it to see how it behaves.
- **Software-Defined Networking (SDN):** Network control managed by applications, not a mapping process.

---

✅ **Test Tip:** If a question mentions **enumerating devices / documenting connections**, think **network mapping**. If it mentions **using public info**, think **OSINT**.

## MD5 Hashing Vulnerabilities

**Question:**

MD5 is a common hashing algorithm that has known weaknesses. Of the following vulnerabilities, which is MD5 *most susceptible to*?

**Answer:** ✅ **Collision**

---

### **MD5 and Collisions**

- **Collision:** Occurs when **two different inputs produce the same hash value**.
- This breaks the **integrity guarantee** of hashing because attackers can substitute a malicious file that has the same MD5 hash as a legitimate one.
- **Why MD5 is Weak:**
    - Advances in computing make collisions easier to find.
    - Vulnerable to **rainbow table attacks** and **pre-image attacks** as well.
- **Still in Use:** Sometimes used for basic file integrity checks, but **not recommended for cryptographic security**.

---

### **Why not the others?**

- **Decryption:** MD5 isn’t encryption; you can’t “decrypt” a hash.
- **Brute Force Attacks:** More of a risk with weak passwords than with hashing algorithms.
- **Man-in-the-Middle:** Applies to unencrypted communications, not directly to hashing.

---

✅ **Test Tip:** If you see **MD5** on the exam, immediately think **collisions / weak integrity**. For secure alternatives, think **SHA-2 or SHA-3**.

---

## **Insider & User-Based Threats**

Question:

A sales employee shares their personal device’s internet connection with a client because the company doesn’t have guest Wi-Fi. What type of threat is occurring?

Answer: ✅ Shadow IT

**Shadow IT**

- Definition: When employees use unauthorized technology solutions (hardware, software, or services) without IT’s approval.
- Why it’s a risk:
    - IT staff may be unaware of it, leaving security gaps.
    - Can expose sensitive data or create vulnerabilities.
- 
- Example: Using personal devices, cloud storage (Dropbox, Google Drive), or hotspot sharing outside official IT controls.

**Why not the others?**

- Nation-State: Advanced persistent threats (APTs) tied to governments → targeted, long-term attacks.
- Organized Crime: Hacking for profit, targeting high-value assets.
- Hacktivists: Attack for political/social causes (e.g., defacing websites).

✅ Test Tip: If the question mentions employees using their own tech because IT isn’t providing it → the answer is Shadow IT.