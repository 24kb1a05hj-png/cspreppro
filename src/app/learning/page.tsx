"use client";
import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, Lightbulb, BarChart3, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LearningModule {
  id: number;
  slug: string;
  title: string;
  tag: string;
  badgeColor: string;
  color: string;
  textColor: string;
  description: string;
  readingContent: string[];
  questions: Question[];
}

const modules: LearningModule[] = [
  {
    id: 1,
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    tag: 'DSA',
    badgeColor: 'bg-blue-100 text-blue-700',
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    description: 'Master Big-O analysis, fundamental linear and non-linear data structures, dynamic programming, and search/sort algorithms.',
    readingContent: [
      "Data structures serve as specialized formats for organizing, processing, retrieving, and storing data efficiently in memory. Fundamental linear structures—such as dynamic arrays, singly and doubly linked lists, stacks, and queues—form the bedrock of algorithmic problem-solving. Arrays deliver immediate O(1) random access via direct memory offset indexing with high CPU cache locality, but incur O(n) worst-case time for insertions and array resizing. In contrast, linked lists enable O(1) insertions at known node references without contiguous memory constraints, but demand O(n) sequential traversal and auxiliary pointer storage.",
      "Non-linear data structures, specifically trees and graphs, model hierarchical and interconnected relationships. Binary Search Trees (BST) provide O(log n) average-case search, insertion, and deletion, but can degenerate into O(n) linear chains under unbalanced insertions. Self-balancing trees such as AVL and Red-Black trees preserve strict logarithmic depth via automated rotations. Graphs, represented through adjacency lists or adjacency matrices, underpin complex network modeling. Breadth-First Search (BFS) utilizes a First-In-First-Out (FIFO) queue to traverse level-by-level, making it ideal for shortest paths in unweighted graphs, while Depth-First Search (DFS) relies on recursion or explicit stacks for topological ordering and cycle detection.",
      "Algorithmic paradigms establish systematic blueprints for problem resolution. Divide-and-conquer splits problems into subproblems, solves them recursively, and combines results—as demonstrated in MergeSort (guaranteed O(n log n)) and QuickSort (average O(n log n), worst-case O(n²)). Greedy algorithms make locally optimal decisions at each step, yielding globally optimal outcomes for problems exhibiting optimal substructure, such as Dijkstra's single-source shortest path and Prim's minimum spanning tree. When subproblems overlap, Dynamic Programming eliminates redundant computations by storing intermediate subproblem solutions via memoization (top-down) or tabulation (bottom-up).",
      "Mastering technical interview algorithms demands deep familiarity with Big-O asymptotic analysis across time and space domains. In high-frequency interview scenarios, hash tables provide amortized O(1) lookups by mapping keys through hash functions to bucket arrays, though hash collisions must be resolved via chaining or open addressing. Combining structures—such as using a doubly linked list with a hash map for O(1) Least Recently Used (LRU) cache eviction, or utilizing two-pointer windows to solve subarray constraints—proves essential for delivering production-grade algorithmic performance."
    ],
    questions: [
      {
        question: "Which data structure provides O(1) amortized average time complexity for lookup, insertion, and deletion?",
        options: ["Binary Search Tree", "Linked List", "Hash Table", "Binary Heap"],
        correctIndex: 2,
        explanation: "Hash Tables map keys to bucket indices via a hash function, delivering O(1) amortized average-time lookups, inserts, and deletions."
      },
      {
        question: "What is the worst-case time complexity of the standard QuickSort algorithm?",
        options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
        correctIndex: 1,
        explanation: "QuickSort degrades to O(n^2) when chosen pivots result in unbalanced partitions, such as selecting an extreme element in an already sorted array."
      },
      {
        question: "Which data structure is fundamentally utilized to implement Breadth-First Search (BFS) traversal?",
        options: ["FIFO Queue", "LIFO Stack", "Priority Queue", "Disjoint-Set Union"],
        correctIndex: 0,
        explanation: "Breadth-First Search explores vertices level by level, requiring a FIFO (First-In-First-Out) Queue to process discovered neighbors in arrival order."
      },
      {
        question: "What is an essential prerequisite before applying Binary Search directly on an array?",
        options: ["The array elements must be sorted", "All array elements must be unique", "The array size must be a power of two", "The array must be stored as a linked list"],
        correctIndex: 0,
        explanation: "Binary Search relies on monotonic ordering to discard half of the search interval in each step, which strictly requires a sorted collection."
      },
      {
        question: "Which operational principle dictates how elements are added to and removed from a Stack?",
        options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Round Robin", "Priority Dequeue"],
        correctIndex: 1,
        explanation: "A Stack adheres to the Last In First Out (LIFO) principle; the element most recently pushed onto the stack is the first to be popped off."
      },
      {
        question: "What is the time complexity of prepending a new element at the head of a singly linked list with a known head pointer?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctIndex: 2,
        explanation: "Prepending at the head requires creating a new node, pointing its next pointer to the current head, and updating the head pointer—taking O(1) constant time."
      },
      {
        question: "Dijkstra's algorithm is formulated to solve which classic algorithmic problem?",
        options: ["Minimum Spanning Tree in arbitrary graphs", "Single-source shortest paths in graphs with non-negative edge weights", "Bipartite graph maximum matching", "Topological sorting in directed acyclic graphs"],
        correctIndex: 1,
        explanation: "Dijkstra's algorithm greedily determines the shortest path from a single source node to all other vertices in graphs with non-negative edge weights."
      },
      {
        question: "Depth-First Search (DFS) traversal primarily relies on which execution mechanism to manage state and backtracking?",
        options: ["FIFO Queue", "Call Stack or explicit Stack", "Min-Heap", "Bitmask Vector"],
        correctIndex: 1,
        explanation: "DFS traverses branches as deep as possible before backtracking, naturally driven by the call stack in recursive implementations or an explicit stack."
      },
      {
        question: "What defining characteristic distinguishes an AVL tree from an unbalanced Binary Search Tree?",
        options: ["It stores keys solely in leaf nodes", "It maintains a balance factor between -1 and 1 via tree rotations", "It guarantees O(1) search time in all cases", "It restricts branching to at most four children per node"],
        correctIndex: 1,
        explanation: "An AVL tree is a self-balancing BST where the heights of left and right subtrees at any node differ by at most one, enforced via rotations to preserve O(log n) operations."
      },
      {
        question: "Dynamic Programming is specifically applicable to problems that exhibit optimal substructure and which other core property?",
        options: ["Greedy choice property", "Overlapping subproblems", "Independent recursive tasks", "Strict monotonicity"],
        correctIndex: 1,
        explanation: "Dynamic Programming solves optimization problems efficiently by caching results for overlapping subproblems whose solutions compose the optimal global solution."
      }
    ]
  },
  {
    id: 2,
    slug: 'oop',
    title: 'Object-Oriented Programming',
    tag: 'OOP',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    description: 'Explore encapsulation, inheritance, polymorphism, abstraction, SOLID architecture principles, and design patterns.',
    readingContent: [
      "Object-Oriented Programming (OOP) is an architectural paradigm organized around objects that encapsulate data fields (state) and associated procedures (methods). The four cardinal pillars of OOP establish modularity and code reuse. Encapsulation safeguards internal state by requiring external access through well-defined public interfaces, enforcing business invariants. Abstraction hides intricate internal mechanics behind simple client contracts. Inheritance enables derived classes to acquire characteristics of parent classes, while Polymorphism allows distinct types to respond uniquely to identical method calls through dynamic dispatch and interface implementations.",
      "Scalable and resilient software architectures heavily rely on Robert C. Martin's SOLID design principles. The Single Responsibility Principle dictates that a class must have only one reason to change, minimizing blast radius when requirements evolve. The Open/Closed Principle establishes that software entities should be open for extension but closed for modification. The Liskov Substitution Principle demands that subtypes remain completely substitutable for their base types without breaking caller expectations. Interface Segregation discourages bloated monolithic interfaces in favor of fine-grained role interfaces, and Dependency Inversion requires high-level business modules to depend upon abstractions rather than concrete lower-level implementations.",
      "Modern engineering consensus strongly advocates for 'Composition over Inheritance'. While deep class inheritance trees frequently produce fragile base class problems and tight coupling, object composition models flexible 'has-a' relationships that can be altered dynamically at runtime. The Gang of Four (GoF) design patterns standardize battle-tested object configurations across three primary categories: Creational patterns (e.g., Singleton for single-instance control, Factory and Builder for decoupled construction), Structural patterns (e.g., Adapter for interface compatibility, Decorator for dynamic feature extension), and Behavioral patterns (e.g., Observer for event-driven pub-sub, Strategy for interchangeable algorithms).",
      "Robust object-oriented development also necessitates a thorough understanding of object lifecycle management and memory dynamics. Languages manage memory allocation across stack frames (for primitive values and reference pointers) and the heap (for dynamic object instances). Distinguishing between shallow copies (copying memory references) and deep copies (duplicating full object graphs) prevents unintended mutation side effects. Furthermore, employing immutable domain objects eliminates race conditions in concurrent multi-threaded environments, ensuring deterministic application state."
    ],
    questions: [
      {
        question: "Which pillar of OOP is primarily responsible for hiding an object's internal state and enforcing access via public methods?",
        options: ["Polymorphism", "Encapsulation", "Inheritance", "Reflection"],
        correctIndex: 1,
        explanation: "Encapsulation bundles data and modifying methods together while restricting direct external field access, protecting object integrity."
      },
      {
        question: "According to the Single Responsibility Principle (the 'S' in SOLID), what should be true about a class?",
        options: ["It should contain only a single public method", "It should have one, and only one, reason to change", "It should only implement a single interface", "It must be instantiated only once in a runtime"],
        correctIndex: 1,
        explanation: "The Single Responsibility Principle asserts that a class should encapsulate a single, focused responsibility and thus have only one reason to change."
      },
      {
        question: "The Open/Closed Principle (the 'O' in SOLID) dictates that software entities should be:",
        options: ["Open for modification, but closed for extension", "Open for extension, but closed for modification", "Open for inheritance, but closed for interfaces", "Open to all network callers, but closed to third-party packages"],
        correctIndex: 1,
        explanation: "The Open/Closed Principle states that classes and modules should be extensible to support new features without modifying existing, tested code."
      },
      {
        question: "Which design pattern defines a one-to-many relationship where state changes in a subject automatically alert registered observers?",
        options: ["Observer Pattern", "Factory Method Pattern", "Decorator Pattern", "Singleton Pattern"],
        correctIndex: 0,
        explanation: "The Observer pattern enables event-driven publish-subscribe behavior, notifying all subscribed observer objects whenever the subject changes state."
      },
      {
        question: "What is the primary difference between Method Overloading and Method Overriding?",
        options: ["Overloading occurs at runtime; Overriding occurs at compile time", "Overloading defines methods with identical names but different signatures in the same class; Overriding redefines a base class method in a subclass with the same signature", "Overloading requires the abstract keyword; Overriding requires the static keyword", "Overloading cannot return a different type; Overriding must change parameter counts"],
        correctIndex: 1,
        explanation: "Method Overloading is compile-time polymorphism within the same class using distinct signatures. Method Overriding is runtime polymorphism replacing a base method in a derived class."
      },
      {
        question: "Which principle is violated if a subclass overrides a base method in a way that breaks caller assumptions or causes runtime failures?",
        options: ["Interface Segregation Principle", "Liskov Substitution Principle", "Open/Closed Principle", "Law of Demeter"],
        correctIndex: 1,
        explanation: "The Liskov Substitution Principle demands that derived types must seamlessly replace base types without altering system correctness or violating behavioral contracts."
      },
      {
        question: "Why is 'Composition over Inheritance' widely considered a best practice in modern software design?",
        options: ["Composition enables dynamic runtime behavior replacement and avoids brittle, deeply coupled hierarchies", "Composition uses zero heap memory allocation", "Inheritance cannot support polymorphism in modern languages", "Inheritance prevents code reusability across multiple files"],
        correctIndex: 0,
        explanation: "Composition favors flexible 'has-a' associations that can be composed and configured at runtime, avoiding fragile base class pitfalls inherent in rigid inheritance trees."
      },
      {
        question: "Which creational design pattern ensures that a class has exactly one instance and provides a global access point to it?",
        options: ["Prototype Pattern", "Builder Pattern", "Singleton Pattern", "Facade Pattern"],
        correctIndex: 2,
        explanation: "The Singleton Pattern restricts class instantiation to a single object and coordinates access through a globally shared static access method."
      },
      {
        question: "Which structural design pattern allows incompatible interfaces to collaborate by converting the interface of a class into one expected by clients?",
        options: ["Adapter Pattern", "Composite Pattern", "Proxy Pattern", "Flyweight Pattern"],
        correctIndex: 0,
        explanation: "The Adapter pattern translates calls between two incompatible interfaces, acting as a translator wrapper between legacy or third-party code and client requirements."
      },
      {
        question: "What is the 'Diamond Problem' in object-oriented programming?",
        options: ["Memory leaks caused by circular references between objects", "Ambiguity when a class inherits from two parent classes that both derive from a common ancestor class", "Performance degradation from deeply nested virtual method calls", "Deadlocks arising in multi-threaded constructor invocations"],
        correctIndex: 1,
        explanation: "The Diamond Problem occurs in multiple-inheritance systems when two parent classes inherit from the same base class, creating ambiguity over which superclass method to execute."
      }
    ]
  },
  {
    id: 3,
    slug: 'sql',
    title: 'SQL & Databases',
    tag: 'Databases',
    badgeColor: 'bg-amber-100 text-amber-700',
    color: 'bg-amber-600',
    textColor: 'text-amber-600',
    description: 'Learn relational modeling, ACID guarantees, query optimization, B+ Tree indexing, normalization, and distributed database trade-offs.',
    readingContent: [
      "Relational Database Management Systems (RDBMS) organize information into structured relations (tables) governed by strict schemas, domain constraints, primary keys, and foreign keys. Relational algebra operations—selection, projection, Cartesian products, and joins—form the mathematical foundation of Structured Query Language (SQL). Reliable transaction execution is guaranteed through ACID properties: Atomicity guarantees all-or-nothing execution; Consistency ensures database invariants remain valid; Isolation prevents concurrent transactions from interfering; and Durability guarantees committed writes survive catastrophic hardware crashes.",
      "Query performance hinges on index structures and query execution plans. Relational engines predominantly rely on B+ Trees for primary and secondary indexes. B+ Trees maintain high fan-out, shallow tree depth, and sequential leaf-node pointer links, making them exceptionally efficient for disk block I/O, point lookups, and range scans. Database optimizers evaluate cost metrics to choose between index seeks, index scans, or full table scans, alongside join strategies such as Nested Loop Joins, Hash Joins, and Merge Joins. Profiling slow queries with EXPLAIN plans allows developers to eliminate full table scans and avoid costly unindexed joins.",
      "Database normalization systematically organizes schemas to eliminate data redundancy and prevent insertion, update, and deletion anomalies. Progressive normal forms enforce stricter standards: First Normal Form (1NF) mandates atomic column values; Second Normal Form (2NF) eliminates partial key dependencies; and Third Normal Form (3NF) requires every non-key column to depend directly and solely on the primary key, removing transitive dependencies. In modern analytical systems (OLAP) and distributed high-throughput stores, controlled denormalization is purposefully embraced to trade disk space for faster read queries by bypassing multi-table JOIN operations.",
      "Modern distributed architectures frequently incorporate NoSQL data stores tailored to specific data access patterns: key-value caches like Redis for ultra-low microsecond latency, document stores like MongoDB for flexible hierarchical JSON payloads, wide-column stores like Cassandra for petabyte-scale time-series writes, and graph databases like Neo4j. Distributed databases navigate the constraints of the CAP Theorem, acknowledging that across network partitions, systems must choose between strong Consistency or high Availability. Horizontal scaling techniques like database sharding partition massive datasets across clusters based on shard keys."
    ],
    questions: [
      {
        question: "In database transaction management, what does the 'I' in ACID stand for and guarantee?",
        options: ["Indexability: Queries are automatically accelerated by B-Trees", "Isolation: Concurrent transaction executions produce the same state as if executed serially", "Integrity: Enforces strict foreign key referential rules", "Immutability: Committed records can never be updated or deleted"],
        correctIndex: 1,
        explanation: "Isolation ensures that concurrent transactions execute independently without interfering with each other's intermediate uncommitted states."
      },
      {
        question: "Which SQL join returns all rows from the left table and matched rows from the right table, filling missing values with NULL?",
        options: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN (LEFT OUTER JOIN)", "CROSS JOIN"],
        correctIndex: 2,
        explanation: "A LEFT OUTER JOIN preserves every record from the left table and pairs it with matching right table rows, populating NULLs when no match exists."
      },
      {
        question: "Which data structure is most widely used by relational database engines for primary indexing and range scan support?",
        options: ["B+ Tree", "Binary Search Tree", "Bloom Filter", "Skip List"],
        correctIndex: 0,
        explanation: "B+ Trees provide high branching factors that minimize disk I/O, along with linked leaf nodes that enable fast sequential range scans."
      },
      {
        question: "A relational table satisfies Third Normal Form (3NF) if it is in 2NF and what additional requirement is met?",
        options: ["All columns must be part of the primary key", "There are no transitive dependencies between non-key attributes and the primary key", "Foreign keys cannot point to external schemas", "All text fields are limited to fixed-length characters"],
        correctIndex: 1,
        explanation: "3NF requires that no non-key attribute is transitively dependent on the primary key (i.e. every non-key column must depend directly and solely on the key)."
      },
      {
        question: "What is the core semantic difference between the SQL WHERE clause and the HAVING clause?",
        options: ["WHERE filters rows before aggregation; HAVING filters grouped results after GROUP BY", "WHERE only works with numbers; HAVING only works with strings", "HAVING can only be used in subqueries; WHERE can only be used in top queries", "There is no functional difference; they are aliases"],
        correctIndex: 0,
        explanation: "The WHERE clause filters individual records before grouping occurs, while HAVING evaluates aggregate conditions on grouped rows after GROUP BY."
      },
      {
        question: "Under transaction isolation levels, what constitutes a 'Dirty Read'?",
        options: ["Reading uncommitted data written by a concurrent transaction that might later roll back", "Re-reading data and seeing new rows inserted by another committed transaction", "Reading data twice and observing different values due to committed updates", "Executing a query that triggers a full table scan instead of an index seek"],
        correctIndex: 0,
        explanation: "A Dirty Read occurs when a transaction reads uncommitted modifications made by another concurrent transaction, which could be subsequently rolled back."
      },
      {
        question: "What is a key difference between a PRIMARY KEY and a UNIQUE constraint in standard relational databases?",
        options: ["A PRIMARY KEY disallows NULL values, whereas a UNIQUE constraint permits at least one NULL value", "A table can declare multiple PRIMARY KEY constraints, but only one UNIQUE constraint", "UNIQUE constraints do not generate underlying indexes", "PRIMARY KEY constraints can only be applied to integer columns"],
        correctIndex: 0,
        explanation: "A table can have only one PRIMARY KEY which strictly forbids NULLs, while multiple UNIQUE constraints can exist and generally allow NULL values."
      },
      {
        question: "Which database system is famous for being an in-memory key-value data structure store used widely for high-speed caching?",
        options: ["PostgreSQL", "Apache Cassandra", "Redis", "Neo4j"],
        correctIndex: 2,
        explanation: "Redis is an in-memory, key-value data store providing sub-millisecond response times for caching, pub-sub messaging, and session persistence."
      },
      {
        question: "What is the primary architectural objective of Database Sharding?",
        options: ["Creating offsite automated backups", "Horizontally partitioning datasets across independent database servers to scale storage and throughput", "Compressing historical tables to minimize disk footprints", "Enforcing referential integrity across multiple schemas"],
        correctIndex: 1,
        explanation: "Sharding splits a large database horizontally across multiple server nodes based on a shard key, enabling horizontal scale-out."
      },
      {
        question: "According to the CAP Theorem, in the event of a network partition (P), what trade-off must a distributed system make?",
        options: ["Between Consistency (C) and Availability (A)", "Between Speed and Durability", "Between Encryption and Latency", "Between Vertical Scaling and Horizontal Scaling"],
        correctIndex: 0,
        explanation: "The CAP theorem demonstrates that when a network partition occurs, a distributed system must sacrifice either Availability or Consistency."
      }
    ]
  },
  {
    id: 4,
    slug: 'system-design',
    title: 'System Design',
    tag: 'Architecture',
    badgeColor: 'bg-purple-100 text-purple-700',
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    description: 'Design distributed architectures, microservices, load balancers, caching layers, message queues, and fault-tolerant cloud infrastructures.',
    readingContent: [
      "System design encompasses defining the architecture, modules, interfaces, and data flows of large-scale systems to meet rigorous functional and non-functional requirements. Scalability is achieved either vertically (scaling up single-server CPU, memory, and NVMe disks) or horizontally (scaling out by distributing load across an elastic fleet of commoditized server nodes). High-availability architectures eliminate single points of failure (SPOFs) through redundant stateless application tiers, database read-replicas, multi-region deployments, and automated failover protocols.",
      "Traffic distribution and caching layers are crucial for mitigating latency and preventing origin server saturation. Load balancers operating at Layer 4 (transport/TCP) or Layer 7 (application/HTTP) distribute incoming traffic using algorithms like Round Robin, Least Connections, and IP Hash. Multi-layer caching strategies place data closer to consumers: Content Delivery Networks (CDNs) cache static media and terminate TLS at edge points of presence, while in-memory caches like Redis employ Cache-Aside, Write-Through, or Write-Back policies alongside LRU (Least Recently Used) eviction to serve millions of read requests per second.",
      "Decoupling systems through asynchronous messaging patterns is fundamental to resilience and scalability. Message brokers and event streaming platforms (such as Apache Kafka and RabbitMQ) mediate communication between microservices, acting as shock absorbers during traffic spikes and enabling event-driven workflows. Unlike transient message queues, distributed append-only commit logs like Kafka retain partitioned messages across disk clusters, empowering independent consumer groups to process and replay event streams at their own velocity with guaranteed ordering per partition.",
      "Architecting for reliability requires defensive strategies against inevitable network and hardware faults. Implementing Circuit Breakers prevents failing downstream services from triggering cascading outages across an entire distributed platform. Complementary resilience patterns include retries with exponential backoff and randomized jitter to avoid thundering herd problems, and rate limiting algorithms like Token Bucket or Leaky Bucket to protect APIs from abuse. Consistent Hashing is employed in distributed storage to evenly distribute keys across dynamic node pools while minimizing data migration during node scaling."
    ],
    questions: [
      {
        question: "What is the primary benefit of Consistent Hashing in a distributed cache or storage cluster?",
        options: ["It eliminates end-to-end network transmission latency", "It minimizes key remapping to only k/n keys when server nodes join or leave the cluster", "It guarantees zero disk storage utilization", "It enforces synchronous replication across all nodes"],
        correctIndex: 1,
        explanation: "Consistent Hashing maps servers and keys onto a circular hash ring, ensuring that adding or removing a node only impacts k/n keys on average."
      },
      {
        question: "How does the Cache-Aside (Lazy Loading) pattern operate during read requests?",
        options: ["The application queries the cache first; on a cache miss, it reads from the database and updates the cache", "All writes update the cache and database simultaneously", "Writes go solely to cache and are flushed asynchronously to the database", "The database automatically pushes all changes to the cache via triggers"],
        correctIndex: 0,
        explanation: "In Cache-Aside, the application inspects the cache first. Upon a cache miss, it fetches data from the database and populates the cache for subsequent requests."
      },
      {
        question: "What failure scenario does the Circuit Breaker pattern prevent in distributed microservices?",
        options: ["SQL injection attacks on public endpoints", "Cascading system failures caused by repeatedly invoking an unhealthy downstream service", "Data loss during sudden database disk failure", "Network packet loss across wide area networks"],
        correctIndex: 1,
        explanation: "A Circuit Breaker trips to 'Open' when downstream service failures exceed a threshold, failing fast to prevent caller threads from exhausting resources."
      },
      {
        question: "Which rate-limiting algorithm permits temporary bursts of traffic up to a maximum capacity while replenishing tokens at a constant rate?",
        options: ["Token Bucket", "Fixed Window Counter", "Leaky Bucket as a Traffic Shaper", "Sliding Log Counter"],
        correctIndex: 0,
        explanation: "The Token Bucket algorithm accumulates tokens at a fixed refill rate up to a maximum bucket limit, allowing bursts when tokens are available."
      },
      {
        question: "What distinguishes Horizontal Scaling from Vertical Scaling?",
        options: ["Horizontal scaling upgrades CPU and memory on a single machine; Vertical scaling adds more servers", "Horizontal scaling adds more machine instances to distribute the workload; Vertical scaling adds hardware resources to an existing machine", "Horizontal scaling only works with relational databases; Vertical scaling only works with NoSQL", "Vertical scaling eliminates single points of failure across data centers"],
        correctIndex: 1,
        explanation: "Vertical scaling (scaling up) upgrades an existing server's hardware, while horizontal scaling (scaling out) adds more node instances to share traffic."
      },
      {
        question: "What is the primary role of a Content Delivery Network (CDN) in web architecture?",
        options: ["Executing relational database transactions at scale", "Caching static and media assets at edge servers geographically closer to end users to reduce latency", "Replacing application web servers entirely", "Managing distributed consensus in microservices"],
        correctIndex: 1,
        explanation: "A CDN caches content across a global network of edge PoPs, drastically reducing round-trip latency and offloading origin servers."
      },
      {
        question: "What architectural feature differentiates Apache Kafka from traditional message brokers like RabbitMQ?",
        options: ["Kafka is an append-only distributed commit log where consumers independently track their own read offsets", "Kafka automatically deletes messages as soon as a single subscriber reads them", "Kafka does not persist messages to disk storage", "Kafka only supports synchronous peer-to-peer messaging"],
        correctIndex: 0,
        explanation: "Kafka is designed as a partitioned, distributed, append-only commit log where events are persisted on disk and consumer groups independently advance their read offsets."
      },
      {
        question: "In system reliability, approximately how much unscheduled downtime per year is permitted under a 99.99% availability SLA ('four nines')?",
        options: ["Approximately 52.6 minutes per year", "Approximately 8.76 hours per year", "Approximately 3.65 days per year", "Approximately 30 seconds per year"],
        correctIndex: 0,
        explanation: "A 99.99% availability SLA permits no more than approximately 52.6 minutes of unscheduled downtime across an entire 365-day year."
      },
      {
        question: "Why are stateless application servers preferred in horizontally scalable web architectures?",
        options: ["Stateless servers store all user session state in local server RAM", "Any server can handle any user request, allowing seamless autoscaling and load balancing without sticky sessions", "Stateless servers do not require database connections", "Stateless servers are immune to network failures"],
        correctIndex: 1,
        explanation: "Stateless application servers do not preserve client session state locally, meaning any incoming request can be routed to any healthy instance by a load balancer."
      },
      {
        question: "What is the primary risk associated with a Write-Back (Write-Behind) caching strategy?",
        options: ["Significantly higher write latency observed by the client", "Potential data loss if the cache server crashes before dirty blocks are flushed to persistent storage", "Total unavailability of read operations while writes are queued", "Severe database connection saturation during peak traffic"],
        correctIndex: 1,
        explanation: "Write-Back acknowledges writes immediately upon updating cache memory and writes asynchronously to disk, creating risk of data loss if the cache crashes prematurely."
      }
    ]
  }
];

export default function StudyHub() {
  const [view, setView] = useState<'list' | 'material' | 'quiz' | 'cumulative'>('list');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [quizDuration, setQuizDuration] = useState(0);

  const activeModule = modules.find(m => m.id === activeModuleId);

  // Aggregate all questions for cumulative quiz (10 * 4 = 40 questions)
  const allQuestions = modules.flatMap(m => m.questions);
  const activeQuestions = view === 'cumulative' ? allQuestions : (activeModule?.questions || []);
  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Track elapsed time during quiz
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if ((view === 'quiz' || view === 'cumulative') && !isQuizFinished && quizStartTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.max(1, Math.floor((Date.now() - quizStartTime) / 1000)));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [view, isQuizFinished, quizStartTime]);

  const openMaterial = (id: number) => {
    setActiveModuleId(id);
    setView('material');
  };

  const startQuiz = (type: 'module' | 'cumulative') => {
    const questionsForQuiz = type === 'cumulative' ? allQuestions : (modules.find(m => m.id === activeModuleId)?.questions || []);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers(new Array(questionsForQuiz.length).fill(null));
    setIsQuizFinished(false);
    const now = Date.now();
    setQuizStartTime(now);
    setElapsedSeconds(0);
    setQuizDuration(0);
    setView(type === 'cumulative' ? 'cumulative' : 'quiz');
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(idx);
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = idx;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Finish quiz
      const finalDuration = quizStartTime ? Math.max(1, Math.floor((Date.now() - quizStartTime) / 1000)) : elapsedSeconds;
      setQuizDuration(finalDuration);
      setIsQuizFinished(true);
    }
  };

  const goBack = () => {
    setView('list');
    setActiveModuleId(null);
    setIsQuizFinished(false);
    setSelectedOption(null);
  };

  // Format seconds to human-readable string
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  // Calculate score and analytics
  const score = userAnswers.reduce<number>((acc, ans, idx) => {
    if (ans === activeQuestions[idx]?.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalQuestions = activeQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Color-coded styling based on score percentage
  const getAnalyticsTheme = (pct: number) => {
    if (pct >= 70) {
      return {
        badge: 'bg-green-100 text-green-800 border-green-300',
        cardBg: 'bg-green-50/60 border-green-200',
        titleColor: 'text-green-900',
        accentColor: 'text-green-600',
        label: 'Great Job! Passing Score Achieved'
      };
    } else if (pct >= 50) {
      return {
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        cardBg: 'bg-yellow-50/60 border-yellow-200',
        titleColor: 'text-yellow-900',
        accentColor: 'text-yellow-600',
        label: 'Needs Review (50% - 69%)'
      };
    } else {
      return {
        badge: 'bg-red-100 text-red-800 border-red-300',
        cardBg: 'bg-red-50/60 border-red-200',
        titleColor: 'text-red-900',
        accentColor: 'text-red-600',
        label: 'Needs Intensive Study (< 50%)'
      };
    }
  };

  const analyticsTheme = getAnalyticsTheme(percentage);

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 
              className="text-3xl font-extrabold tracking-tight inline-block"
              style={{
                background: 'linear-gradient(to right, #f1f5f9, #c7d2fe, #e9d5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Study Hub
            </h1>
            <p className="text-indigo-200/80 text-base mt-1">
              Curated computer science reading materials, 10 realistic interview questions per topic, and detailed performance analytics.
            </p>
          </div>
          {view === 'list' && (
            <button
              onClick={() => startQuiz('cumulative')}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <Lightbulb className="w-5 h-5 text-indigo-200" />
              Take Cumulative Quiz (40 Questions)
            </button>
          )}
        </div>

        {/* View 1: Module Cards List */}
        {view === 'list' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => openMaterial(mod.id)}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${mod.badgeColor}`}>
                        {mod.tag}
                      </span>
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> 10 Quiz Questions
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                      {mod.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {mod.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">4 Core Sections • Complete Guide</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Read & Practice <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cumulative Quiz Banner Card */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" /> Full Assessment
                </div>
                <h3 className="text-2xl font-bold">Ready for the Complete Technical Interview Challenge?</h3>
                <p className="text-indigo-200 text-sm leading-relaxed">
                  Test your holistic knowledge across all 4 domains: DSA, Object-Oriented Programming, SQL & Databases, and System Design with our 40-question cumulative assessment.
                </p>
              </div>
              <button
                onClick={() => startQuiz('cumulative')}
                className="whitespace-nowrap inline-flex items-center justify-center gap-2 bg-white text-indigo-900 font-bold px-6 py-3.5 rounded-xl hover:bg-indigo-50 shadow transition-all cursor-pointer"
              >
                Start Cumulative Quiz <ArrowRight className="w-5 h-5 text-indigo-900" />
              </button>
            </div>
          </div>
        )}

        {/* View 2: Detailed Learning Material View */}
        {view === 'material' && activeModule && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer w-max"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Topics
              </button>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${activeModule.badgeColor}`}>
                  {activeModule.tag}
                </span>
                <span className="text-xs text-gray-500 font-medium">10 Questions Quiz Included</span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{activeModule.title}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{activeModule.description}</p>
            </div>

            {/* Educational content sections */}
            <div className="space-y-6 pt-2 text-gray-800 leading-relaxed">
              {activeModule.readingContent.map((paragraph, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-500 mb-2">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-700">
                      {idx + 1}
                    </span>
                    <span>Section {idx + 1}</span>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Launch Quiz Footer */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-indigo-50/40 p-6 rounded-xl border">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Finished Reading?</h4>
                <p className="text-sm text-gray-600">Take the 10-question topic quiz to test your comprehension and view detailed performance analytics.</p>
              </div>
              <button
                onClick={() => startQuiz('module')}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <CheckCircle className="w-5 h-5" /> Take Topic Quiz (10 Questions)
              </button>
            </div>
          </div>
        )}

        {/* View 3 & 4: Quiz Interface & Analytics */}
        {(view === 'quiz' || view === 'cumulative') && (
          <div className="max-w-3xl mx-auto">
            {isQuizFinished ? (
              /* Quiz Analytics Screen */
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Exit to Study Hub
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {view === 'cumulative' ? 'Cumulative Quiz' : activeModule?.title}
                  </span>
                </div>

                {/* Score Summary Banner */}
                <div className={`p-8 rounded-2xl border ${analyticsTheme.cardBg} text-center space-y-4`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase shadow-sm bg-white">
                    <BarChart3 className="w-4 h-4" />
                    {analyticsTheme.label}
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                    {score} <span className="text-2xl font-bold text-gray-500">/ {totalQuestions}</span>
                  </h2>

                  <p className="text-lg font-semibold text-gray-700">
                    Accuracy: <span className={analyticsTheme.accentColor}>{percentage}%</span>
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-lg mx-auto">
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs text-center">
                      <span className="text-xs text-gray-500 font-medium block">Total Score</span>
                      <span className="text-lg font-bold text-gray-900">{score} of {totalQuestions}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs text-center">
                      <span className="text-xs text-gray-500 font-medium block">Percentage</span>
                      <span className={`text-lg font-bold ${analyticsTheme.accentColor}`}>{percentage}%</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs text-center col-span-2 sm:col-span-1">
                      <span className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> Time Taken
                      </span>
                      <span className="text-lg font-bold text-gray-900">{formatTime(quizDuration)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button
                      onClick={() => startQuiz(view === 'cumulative' ? 'cumulative' : 'module')}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" /> Retake Quiz
                    </button>
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                    >
                      Back to Study Hub
                    </button>
                  </div>
                </div>

                {/* Detailed Questions Review List */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-600" />
                      Detailed Question Review
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {score} Correct • {totalQuestions - score} Incorrect
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeQuestions.map((q, qIdx) => {
                      const userChoice = userAnswers[qIdx];
                      const isCorrect = userChoice === q.correctIndex;

                      return (
                        <div
                          key={qIdx}
                          className={`p-5 rounded-xl border transition-all ${
                            isCorrect ? 'border-green-200 bg-green-50/20' : 'border-red-200 bg-red-50/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                              )}
                              <span className="font-bold text-sm text-gray-900">
                                Question {qIdx + 1}
                              </span>
                            </div>
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>

                          <h4 className="text-base font-semibold text-gray-900 mb-4">{q.question}</h4>

                          {/* Options preview */}
                          <div className="space-y-2 mb-4 text-sm">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userChoice === optIdx;
                              const isTargetCorrect = optIdx === q.correctIndex;

                              let optionStyle = 'border-gray-200 bg-white text-gray-600';
                              if (isTargetCorrect) {
                                optionStyle = 'border-green-400 bg-green-50 text-green-900 font-semibold';
                              } else if (isSelected && !isCorrect) {
                                optionStyle = 'border-red-400 bg-red-50 text-red-900 line-through';
                              }

                              return (
                                <div
                                  key={optIdx}
                                  className={`p-3 rounded-lg border flex items-center justify-between ${optionStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isTargetCorrect && (
                                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                                      Correct Answer
                                    </span>
                                  )}
                                  {isSelected && !isTargetCorrect && (
                                    <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                                      Your Choice
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation Card */}
                          <div className="bg-blue-50/80 border border-blue-200/60 rounded-lg p-3.5 text-sm text-blue-950 flex items-start gap-2.5">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-bold block text-blue-900 text-xs mb-0.5 uppercase tracking-wide">
                                Explanation
                              </span>
                              <p className="leading-relaxed">{q.explanation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Return Buttons */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Study Hub
                    </button>
                    <button
                      onClick={() => startQuiz(view === 'cumulative' ? 'cumulative' : 'module')}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-sm"
                    >
                      Retake Quiz <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Quiz Question Screen */
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm flex flex-col min-h-[460px]">
                {/* Header with Exit and Live Timer */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <button
                    onClick={goBack}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Exit Quiz
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{formatTime(elapsedSeconds)}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      Question {currentQuestionIndex + 1} of {activeQuestions.length}
                    </span>
                  </div>
                </div>

                {/* Question Info Bar */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {view === 'cumulative' ? 'Cumulative Assessment' : activeModule?.title}
                  </span>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 transition-all duration-300 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question text */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 leading-snug">
                  {currentQuestion?.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 flex-1 mb-6">
                  {currentQuestion?.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const showFeedback = selectedOption !== null;

                    let optionClasses =
                      'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ';

                    if (!showFeedback) {
                      optionClasses +=
                        'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-gray-800 bg-white';
                    } else if (isCorrect) {
                      optionClasses += 'border-green-500 bg-green-50 text-green-900 font-semibold';
                    } else if (isSelected) {
                      optionClasses += 'border-red-500 bg-red-50 text-red-900';
                    } else {
                      optionClasses += 'border-gray-200 text-gray-400 opacity-60 bg-gray-50';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={showFeedback}
                        className={optionClasses}
                      >
                        <div className="flex items-center gap-3">
                          {showFeedback && isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : showFeedback && isSelected && !isCorrect ? (
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-base font-medium">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Advance Button */}
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-4 border-t border-gray-100"
                  >
                    <div className="p-4 bg-blue-50/90 border border-blue-200 rounded-xl text-sm text-blue-950">
                      <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        Explanation
                      </div>
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-base shadow-sm transition-all cursor-pointer"
                    >
                      {currentQuestionIndex < activeQuestions.length - 1 ? (
                        <>
                          Next Question <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Complete Quiz & View Analytics <BarChart3 className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
