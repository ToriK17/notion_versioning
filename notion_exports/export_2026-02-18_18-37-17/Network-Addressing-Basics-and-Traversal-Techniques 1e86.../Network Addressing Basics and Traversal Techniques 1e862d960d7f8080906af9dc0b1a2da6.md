# Network Addressing Basics and Traversal Techniques

## 🌐 What Is Network Addressing?

**Network addressing** is how devices on a network (like computers, phones, and routers) are **identified** so they can **send and receive data** to the right place — kind of like mailing addresses for the internet.

### 🧭 Key Types of Addresses:

### 1. **IP Address (Internet Protocol Address)**

This is the most common type of network address. It tells devices **where you are** on a network.

- **IPv4**: Looks like `192.168.1.10` — 4 numbers, 0–255
    - Example: Your phone might be `192.168.1.4` on your home Wi-Fi.
- **IPv6**: Looks like `2001:0db8:85a3::8a2e:0370:7334` — newer, longer format to handle more devices.

📝 Every device on a network **must** have an IP address.

### 2. **MAC Address (Media Access Control)**

- A **hardware-level** address built into your network card.
- Looks like: `00:1A:2B:3C:4D:5E`
- Used **within a local network** to deliver packets to the correct device.

🔒 Unlike IP addresses, MAC addresses usually don’t change.

### 3. **Port Numbers**

- These identify **specific applications/services** on a device.
- Example:
    - Web traffic (HTTP) → Port **80**
    - Secure web traffic (HTTPS) → Port **443**
    - Video call app → Might use port **49152**

Together with IPs, they form a **"socket":**

📦 `192.168.1.10:443` = Send data to device `.10`, app on port `443`.

### 🧱 Public vs Private IPs:

| **Type** | **Example** | **Used Where** | **Routable on the Internet?** |
| --- | --- | --- | --- |
| Private | 192.168.x.x / 10.x.x.x | Inside home/corporate networks | ❌ No |
| Public | 8.8.8.8 (Google DNS) | On the open internet | ✅ Yes |

➡️ NAT exists to let **private addresses talk to the public internet**.

### 🔄 Static vs Dynamic Addresses:

- **Static**: Manually assigned, doesn’t change
- **Dynamic**: Given by DHCP: Dynamic Host Configuration Protocol (like your home router), may change over time

### Summary

| Term | What It Is | Why It Matters |
| --- | --- | --- |
| **IP Address** | Logical device address | Allows routing across networks |
| **MAC Address** | Physical device ID | Used inside local networks |
| **Port** | Application identifier | Targets the correct software |
| **Public IP** | Globally reachable | Needed for servers and NAT |
| **Private IP** | Local network only | Used in homes, behind NAT |
| **Static/Dynamic** | Fixed vs changeable | Affects reliability and setup |

### 🧱 NAT (Network Address Translation)

- **Category**: Network Layer (Layer 3) technique
- **Function**: Modifies IP address/port info in packet headers to allow multiple devices on a private network to share one public IP.
- **Common Use Case**: Home routers, corporate firewalls.
- **Standards Body**: Defined by RFC 3022 and related NAT RFCs.

### 🔍 STUN (Session Traversal Utilities for NAT)

- **Category**: NAT traversal protocol
- **Function**: Helps clients discover their public-facing IP/port from behind NAT.
- **Layer**: Application Layer (Layer 7), but supports **transport-level negotiation** (often over UDP).
- **Common Use Case**: WebRTC, VoIP, real-time peer-to-peer connections.
- **Standards Body**: Defined by RFC 5389

---

### 🧠 In Practice, Engineers Consider:

- **NAT**: A foundational networking technique that *impacts routing, firewall design, and address planning*.
- **STUN**: A tool used in **NAT traversal strategies**, which are often grouped under **Real-Time Communication (RTC)** or **peer-to-peer networking protocols**.

---

### Related Technologies:

| **Protocol/Technique** | **Purpose** | **Where It Fits** |
| --- | --- | --- |
| NAT | IP address/port translation | Network architecture |
| STUN | Public IP discovery behind NAT | NAT traversal |
| TURN | Relay traffic when STUN fails | NAT traversal |
| ICE | Orchestrates STUN, TURN, etc. | Real-time media negotiation (WebRTC) |
| UPnP / NAT-PMP | Port forwarding automation | Home networking |

---

So in short:

- **NAT** is a core networking concept.
- **STUN** is a specialized **application-level tool** for navigating the challenges NAT creates.