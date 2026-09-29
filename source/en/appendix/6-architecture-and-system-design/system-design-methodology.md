# System Design Methodology

::: tip Introduction
**System design is not about sketching architecture diagrams on a whim — it's a structured methodology.** Whether it's a system design interview question or real-world architecture design, both follow a similar thinking framework: first understand the problem, then estimate the scale, then design the solution, and finally dive deep into optimization.
:::

**What will you learn from this article?**

After reading this chapter, you will gain:

- **Design Process**: Master the four-step framework for system design
- **Capacity Estimation**: Learn the art of "back-of-envelope estimation"
- **Common Patterns**: Get familiar with core patterns like caching, database sharding, and message queues
- **Trade-off Thinking**: Understand the trade-off mindset in architecture design
- **Practical Case Studies**: Understand the design process through cases like URL shorteners and feed systems

| Chapter | Content | Core Concepts |
|-----|------|---------|
| **Chapter 1** | Four-Step Design Method | Requirements clarification, capacity estimation, architecture design, deep optimization |
| **Chapter 2** | Capacity Estimation | QPS, storage, bandwidth, back-of-envelope estimation |
| **Chapter 3** | Core Design Patterns | Caching, database sharding, message queues, CDN |
| **Chapter 4** | Trade-off Thinking | Consistency vs. availability, performance vs. cost |
| **Chapter 5** | Classic Case Studies | URL shortener, feed system, flash sale system |

---

## 1. The Four-Step System Design Method

System design is not about drawing architecture diagrams right away. Whether in an interview or in practice, you should follow a structured process.

<SystemDesignStepsDemo />

::: tip Why Clarify Requirements First?
Many people start drawing diagrams as soon as they get the prompt, only to design a system that is "correct but not what the interviewer wanted." Spending 5 minutes clarifying requirements can prevent 30 minutes of rework later.

Common clarification questions:
- What are the core features of the system? (Don't design every feature)
- What is the user scale? (Determines whether distribution is needed)
- What is the read/write ratio? (Determines caching strategy)
- How long does data need to be retained? (Determines the storage solution)
:::

---

## 2. Capacity Estimation: The Art of Back-of-Envelope Calculations

"Back-of-envelope estimation" is a core skill in system design. You don't need precise calculations — just knowing the order of magnitude is enough.

<CapacityEstimationDemo />

### Quick Reference for Common Conversions

| Magnitude | Conversion | Memory Trick |
|------|------|---------|
| 1 day | 86,400 seconds | ≈ 100K seconds |
| 100M requests/day | ≈ 1,200 QPS | Divide by 100K |
| 1 KB × 100M | ≈ 100 GB | 100M small records |
| 1 MB × 1M | ≈ 1 TB | 1M images |

### The 80/20 Rule in Estimation

Most systems follow the 80/20 rule: 20% of the data handles 80% of the requests. This means:

- **Cache size** ≈ Total data volume × 20%
- **Hot key QPS** ≈ Total QPS × 80% concentrated on 20% of keys
- **Cache hit rate** target ≈ 80%+ (below this suggests a caching strategy problem)

---

## 3. Core Design Patterns

Patterns that appear repeatedly in system design — mastering these will prepare you for most scenarios.

### 3.1 Caching Patterns

| Pattern | Read Path | Write Path | Use Cases |
|------|--------|--------|---------|
| Cache-Aside | Check cache first; on miss, query DB and backfill | Write DB first, then invalidate cache | General purpose, most commonly used |
| Read-Through | Cache layer automatically loads from DB | Same as Cache-Aside | Requires caching framework support |
| Write-Behind | Same as Cache-Aside | Write to cache first, async write to DB | Write-heavy, can tolerate data loss |

::: tip Why "Invalidate Cache" Instead of "Update Cache"?
Updating the cache is prone to data inconsistency in concurrent scenarios: threads A and B update simultaneously, A writes to DB first but B updates the cache first, resulting in B's stale value in the cache. Invalidating the cache causes the next read request to reload from DB, naturally avoiding this problem.
:::

### 3.2 Database Sharding

When a single table exceeds tens of millions of rows, or when a single database's QPS hits a bottleneck, it's time to consider database sharding.

| Strategy | Approach | Advantages | Disadvantages |
|------|------|------|------|
| Vertical sharding | Split databases by business domain | Business decoupling, independent scaling | Cross-database JOINs are difficult |
| Horizontal sharding | Split one table into multiple tables by rule | Controllable data volume per table | Shard key selection is critical |
| Vertical table splitting | Split large columns into a separate table | Reduces I/O, improves query efficiency | Requires additional JOINs |

**Shard Key Selection Principles**:
- Choose the most frequently queried field (e.g., user_id)
- Data distribution should be even to avoid hotspots
- Try to keep the same user's data on the same shard (minimizes cross-shard queries)

### 3.3 Message Queues

Message queues are the "shock absorbers" of distributed systems. Their core roles are decoupling, async processing, and peak shaving.

| Scenario | Without Queue | With Queue |
|------|---------|--------|
| Send notification after order | Order API calls notification service synchronously; notification failure causes order failure | Send message after order success; notification service consumes asynchronously |
| Flash sale | Burst traffic overwhelms the database | Requests enter queue first; backend processes at its own pace |
| Data synchronization | Service A calls Service B's API directly | Service A publishes event; Service B subscribes and handles it |

---

## 4. Trade-off Thinking: There Are No Silver Bullets

The essence of architecture design is trade-offs. Every decision has a cost — the key is understanding the cost and making choices appropriate for the current stage.

| Trade-off Dimension | Option A | Option B | Decision Basis |
|---------|--------|--------|---------|
| Consistency vs. Availability | Strong consistency (CP) | High availability (AP) | Can the business tolerate brief inconsistency? |
| Performance vs. Cost | Full caching | On-demand caching | Data volume and budget |
| Simplicity vs. Flexibility | Monolithic architecture | Microservices | Team size and business complexity |
| Real-time vs. Batch | Stream processing | Batch processing | Data timeliness requirements |
| Self-managed vs. Hosted | Build your own MySQL | Use cloud database RDS | Operations capability and cost |

::: tip Architecture Decision Records (ADR)
Every important architecture decision should be documented: **what was the context, what options were considered, why this one was chosen, and what the trade-offs are**. This isn't about assigning blame — it's about helping future teams understand "why it was designed this way."

The format is simple:
- **Title**: Using X instead of Y
- **Context**: What problem we encountered
- **Decision**: What solution we chose
- **Rationale**: Why we chose this
- **Consequences**: The drawbacks and risks of this decision
:::

### Common Trade-off Mistakes

| Mistake | Manifestation | Correct Approach |
|------|------|---------|
| Premature optimization | Sharding at 1,000 daily active users | Start with a single database; shard when you hit bottlenecks |
| Technology-driven | "I want to use Kafka" instead of "I need async processing" | Start from the problem, not the technology |
| Ignoring operations cost | Choosing the optimal solution that the team can't maintain | Solutions must match team capability |
| Pursuing perfect consistency | Using distributed transactions for every scenario | Eventual consistency is sufficient for most scenarios |

---

## 5. Classic Case Studies

Let's connect the methodology we've learned through three classic examples.

### 5.1 URL Shortener (TinyURL)

The URL shortener is a classic system design interview question — small but comprehensive.

**Requirements Clarification**:
- Core features: Long URL → short URL (write), short URL → redirect (read)
- Read/write ratio: approximately 100:1 (reads far outnumber writes)
- Daily redirects: 100 million
- Short URLs never expire

**Capacity Estimation**:

| Metric | Calculation | Result |
|------|------|------|
| Write QPS | 100M / 100 / 86,400 | ≈ 12 QPS |
| Read QPS | 100M / 86,400 | ≈ 1,200 QPS |
| Peak read QPS | 1,200 × 3 | ≈ 3,600 QPS |
| 5-year storage | 1M/day × 365 × 5 × 100B | ≈ 18 GB |
| Cache (20%) | 18 GB × 20% | ≈ 3.6 GB |

**Architecture Design**:

```
Write path: Client → API Server → ID Generator → Base62 Encode → Write to MySQL + Redis
Read path: Client → CDN → API Server → Redis lookup → 302 redirect
                                    ↓ (cache miss)
                                  MySQL query → backfill Redis
```

**Key Design Decisions**:
- Short code generation: Snowflake distributed ID + Base62 encoding to avoid hash collisions
- Caching strategy: Cache-Aside, CDN acceleration for hot short URLs
- Database: Single table suffices (18GB is small), index by short code

### 5.2 Feed System

Social platform feeds (WeChat Moments, Twitter home timeline) are another classic question.

**Core Challenge**: When a user publishes a post, how do all their followers see it?

| Approach | How It Works | Advantages | Disadvantages |
|------|------|------|------|
| Pull model | Aggregate followees' posts in real time at read time | Simple writes, less storage | Slow reads; high latency with many followees |
| Push model | Write to all followers' inboxes at publish time | Extremely fast reads | Severe write amplification for accounts with many followers |
| Hybrid (Push-Pull) | Push for regular users, pull for celebrities | Balanced read/write performance | Complex implementation |

**Hybrid Push-Pull Approach**:
- Followers < 10K: Push to all followers' feed caches at publish time (push model)
- Followers > 10K: Don't push; followers pull in real time when reading (pull model)
- When a user opens their feed: Merge pushed content + real-time pulled celebrity content, sorted by time

### 5.3 Flash Sale System

The core challenge of a flash sale: instant ultra-high concurrency + inventory must not be oversold.

**Traffic Characteristics**:
- Before the sale starts: Many users refresh the page waiting
- At the moment of sale: QPS can be 100x or more above normal
- After the sale ends: Traffic drops quickly

**Layered Peak Shaving Strategy**:

```
User request → CDN (static pages) → Gateway (rate limiting) → Message queue (peak shaving) → Inventory service (deduction)
```

| Layer | Strategy | Effect |
|------|------|------|
| Frontend | Button gray-out + random delay + CAPTCHA | Filters bots, disperses requests |
| CDN | Static resource caching | Reduces 90% of page requests |
| Gateway | Token bucket rate limiting | Only allows traffic the system can handle |
| Message queue | Requests queued, processed asynchronously | Peak shaving, protects the database |
| Inventory service | Redis pre-deduction + Lua atomic operations | Prevents overselling, millisecond response |

::: tip Core Principles of Flash Sales
1. **Intercept upstream whenever possible**: If you can block it at the CDN, don't let it reach the application layer
2. **Separate reads and writes**: Product detail pages use cache; only orders go to the database
3. **Async processing**: After the user clicks "buy," immediately return "queuing" and process in the background
4. **Fallback plans**: Rate limiting, circuit breaking, degradation — every layer needs a Plan B
:::

---

## Summary

System design is a highly practical skill. The core lies in structured thinking and making trade-offs.

Key takeaways from this chapter:

1. **Four-Step Framework**: Requirements clarification → capacity estimation → architecture design → deep optimization — every step is essential
2. **Back-of-Envelope Estimation**: Precision isn't needed — just knowing the order of magnitude guides architecture decisions
3. **Core Patterns**: Caching, database sharding, message queues, CDN, rate limiting, circuit breaking — these are the "building blocks" of system design
4. **Trade-off Thinking**: There are no perfect solutions, only solutions appropriate for the current stage — document the rationale and cost of every decision
5. **Classic Cases**: URL shorteners for fundamentals, feed systems for push-pull models, flash sales for high concurrency — mastering these three lets you reason by analogy

## Further Reading

- [System Design Interview](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) - Alex Xu's system design interview classic
- [Designing Data-Intensive Applications](https://dataintensive.net/) - Martin Kleppmann's data-intensive application design
- [The System Design Primer](https://github.com/donnemartin/system-design-primer) - The most comprehensive system design learning resource on GitHub
- [ByteByteGo](https://bytebytego.com/) - Alex Xu's visual system design blog
