"use client";
import { useState, useEffect, useRef } from 'react';
import { useProctoring } from '@/hooks/useProctoring';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  AlertTriangle,
  Play,
  Square,
  Code as CodeIcon,
  Settings,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Keyboard,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

// Types
export type TrackType = 'DSA' | 'OOD' | 'SystemDesign';
export type DifficultyType = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  difficulty: DifficultyType;
  description: string;
  starterCode: string;
  hints: string[];
}

// ----------------------------------------------------
// Question Bank: 5 questions per track
// ----------------------------------------------------
const QUESTION_BANK: Record<TrackType, Question[]> = {
  DSA: [
    {
      id: 'dsa-1',
      title: '1. Two Sum',
      difficulty: 'Easy',
      description:
        'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1] (Because nums[0] + nums[1] == 9)\n\nConstraints:\n• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9',
      starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
}`,
      hints: [
        'Can you use a Hash Map to store previously visited elements and their indices?',
        'For each number x at index i, look up if (target - x) exists in your map in O(1) time.',
      ],
    },
    {
      id: 'dsa-2',
      title: '2. Valid Parentheses',
      difficulty: 'Easy',
      description:
        "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nExample:\nInput: s = \"()[]{}\"\nOutput: true",
      starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your solution here
  
}`,
      hints: [
        'A Stack (LIFO data structure) is ideal for matching nested bracket pairs.',
        'Push opening brackets onto the stack. When encountering a closing bracket, check if it matches stack.pop().',
      ],
    },
    {
      id: 'dsa-3',
      title: '3. Merge Two Sorted Lists',
      difficulty: 'Medium',
      description:
        'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.\n\nExample:\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]',
      starterCode: `/**
 * Definition for singly-linked list node:
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.next = (next===undefined ? null : next);
 * }
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}`,
      hints: [
        'Initialize a dummy sentinel node to simplify edge cases at the head of the merged list.',
        'Iterate while both pointers are non-null. Compare values and advance the pointer with the smaller value.',
      ],
    },
    {
      id: 'dsa-4',
      title: '4. Maximum Subarray',
      difficulty: 'Medium',
      description:
        "Given an integer array `nums`, find the subarray with the largest sum, and return its sum (Kadane's Algorithm).\n\nA subarray is a contiguous non-empty sequence of elements within an array.\n\nExample:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.",
      starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your solution here
  
}`,
      hints: [
        'Track two variables: currentRunningSum and maxGlobalSum.',
        'If currentRunningSum becomes negative, discard it and restart the subarray from the current element.',
      ],
    },
    {
      id: 'dsa-5',
      title: '5. LRU Cache',
      difficulty: 'Hard',
      description:
        'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n• `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n• `int get(int key)` Return the value of key if exists, otherwise return -1.\n• `void put(int key, int value)` Update key value or insert key if not present. If keys exceed capacity, evict the least recently used key.\n\nBoth functions must run in O(1) average time complexity.',
      starterCode: `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    // Hint: Map preserves insertion order in JS, or use Doubly Linked List + Hash Map
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    // Return value or -1
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    // Insert/update and handle eviction
  }
}`,
      hints: [
        'To achieve O(1) for both operations, combine a Hash Map (for lookups) with a Doubly Linked List (for order).',
        'In JavaScript, Map maintains insertion order: deleting and re-setting a key moves it to the most recently used position.',
      ],
    },
  ],

  OOD: [
    {
      id: 'ood-1',
      title: '1. Design a Parking Lot',
      difficulty: 'Medium',
      description:
        'Design an Object-Oriented Parking Lot management system.\n\nRequirements:\n• Multiple levels/floors with varying spot sizes (Motorcycle, Compact, Large).\n• Support vehicle entry: generate ticket, find suitable spot, park vehicle.\n• Support vehicle exit: compute parking fees based on duration, free spot, mark ticket paid.',
      starterCode: `// Vehicle Types: 'motorcycle' | 'car' | 'truck'
// Spot Types: 'motorcycle' | 'compact' | 'large'

class Vehicle {
  constructor(licensePlate, type) {
    this.licensePlate = licensePlate;
    this.type = type;
  }
}

class ParkingSpot {
  constructor(id, spotType) {
    this.id = id;
    this.spotType = spotType;
    this.vehicle = null;
  }

  isAvailable() {
    return this.vehicle === null;
  }

  canFitVehicle(vehicle) {
    // Check compatibility based on vehicle.type and this.spotType
  }
}

class ParkingLot {
  constructor(floorsCount, spotsPerFloor) {
    this.spots = [];
    this.activeTickets = new Map();
  }

  parkVehicle(vehicle) {
    // Find spot, create ticket, return ticketId
  }

  unparkVehicle(ticketId) {
    // Calculate fee, release spot, return bill
  }
}`,
      hints: [
        'Ensure separation of concerns: ParkingLot manages spots and tickets; ParkingSpot manages occupancy.',
        'Use Polymorphism or Strategy Pattern for different fee calculations (hourly, daily, vehicle-tier rates).',
      ],
    },
    {
      id: 'ood-2',
      title: '2. Design a Deck of Cards & Blackjack Hand',
      difficulty: 'Easy',
      description:
        'Model a standard 52-card deck and a basic Blackjack game hand.\n\nRequirements:\n• `Card` with suit and value.\n• `Deck` that can initialize standard 52 cards, shuffle, and deal cards.\n• `BlackjackHand` that calculates hand value, handling Aces dynamically (value 1 or 11).',
      starterCode: `const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  reset() {
    // Initialize 52 cards and shuffle
  }

  deal() {
    // Return top card
  }
}

class BlackjackHand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getScore() {
    // Compute total score considering Aces as 1 or 11
  }
}`,
      hints: [
        'Count all Aces as 11 first; if the hand sum exceeds 21, subtract 10 for each Ace until sum <= 21 or no Aces left.',
        'Use the Fisher-Yates shuffle algorithm to achieve an unbiased random permutation in O(N).',
      ],
    },
    {
      id: 'ood-3',
      title: '3. Design an Online Book Reader System',
      difficulty: 'Medium',
      description:
        'Design the object model for an online reading platform (e.g. Kindle Cloud Reader).\n\nRequirements:\n• `Book` entity containing title, author, and pages.\n• `User` entity managing credentials and owned library.\n• `ReadingSession` tracking current page, bookmarks, and reading progress.\n• `BookReaderManager` orchestrating active readers.',
      starterCode: `class Book {
  constructor(id, title, author, pages = []) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

class ReadingSession {
  constructor(userId, book) {
    this.userId = userId;
    this.book = book;
    this.currentPage = 0;
    this.bookmarks = new Set();
  }

  turnPageForward() {
    // Advance page if not at end
  }

  turnPageBackward() {
    // Go back page if not at start
  }

  toggleBookmark() {
    // Add or remove bookmark for currentPage
  }
}

class BookReaderManager {
  constructor() {
    this.catalog = new Map();
    this.activeSessions = new Map();
  }

  startSession(userId, bookId) {
    // Create or resume session
  }
}`,
      hints: [
        'Decouple immutable book metadata from stateful user reading sessions so multiple users can read simultaneously.',
        'Encapsulate navigation logic inside ReadingSession to validate page boundary constraints.',
      ],
    },
    {
      id: 'ood-4',
      title: '4. Design an Elevator System',
      difficulty: 'Medium',
      description:
        'Design an Elevator Controller system for a multi-story building with multiple elevator cars.\n\nRequirements:\n• Elevators can move UP, DOWN, or be IDLE.\n• Hall calls: passenger calls from a floor requesting UP or DOWN.\n• Car calls: passenger inside car selects a destination floor.\n• Dispatcher algorithm: assign requests to the most optimal elevator car.',
      starterCode: `const Direction = { UP: 'UP', DOWN: 'DOWN', IDLE: 'IDLE' };

class ElevatorCar {
  constructor(id, totalFloors) {
    this.id = id;
    this.totalFloors = totalFloors;
    this.currentFloor = 1;
    this.direction = Direction.IDLE;
    this.destinationFloors = new Set();
  }

  addDestination(floor) {
    this.destinationFloors.add(floor);
    if (this.direction === Direction.IDLE) {
      this.direction = floor > this.currentFloor ? Direction.UP : Direction.DOWN;
    }
  }

  step() {
    // Move one floor in current direction, check if arrived
  }
}

class ElevatorController {
  constructor(carCount, floorCount) {
    this.cars = Array.from({ length: carCount }, (_, i) => new ElevatorCar(i + 1, floorCount));
    this.floorCount = floorCount;
  }

  requestElevator(pickupFloor, requestedDirection) {
    // Dispatch best elevator car
  }
}`,
      hints: [
        'Consider the SCAN (LOOK) algorithm used in disk scheduling: keep moving in the current direction until no requests remain ahead.',
        'Choose an elevator that is already heading towards the pickup floor in the same direction or is idle.',
      ],
    },
    {
      id: 'ood-5',
      title: '5. Design an In-Memory File System',
      difficulty: 'Hard',
      description:
        'Design an in-memory hierarchical file system.\n\nRequirements:\n• `mkdir(path)`: create directories recursively if they do not exist.\n• `addContentToFile(filePath, content)`: create file if missing, append content.\n• `readContentFromFile(filePath)`: return stored text content.\n• `ls(path)`: return list of directory items or single file name in lexicographical order.',
      starterCode: `class FSNode {
  constructor(name, isDirectory = false) {
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = new Map(); // name -> FSNode
    this.content = '';
  }
}

class FileSystem {
  constructor() {
    this.root = new FSNode('/', true);
  }

  mkdir(path) {
    // Traverse/create directory nodes
  }

  addContentToFile(filePath, content) {
    // Append content to target file node
  }

  readContentFromFile(filePath) {
    // Return file content string
  }

  ls(path) {
    // Return sorted array of child names or file name
  }
}`,
      hints: [
        'Use an N-ary Trie tree structure where path parts split by "/" represent keys at each depth level.',
        'Handle edge cases for root path "/" and trailing slashes.',
      ],
    },
  ],

  SystemDesign: [
    {
      id: 'sd-1',
      title: '1. Design a URL Shortener (TinyURL)',
      difficulty: 'Easy',
      description:
        'Design a high-scale URL shortening service (like bit.ly).\n\nKey Requirements:\n• Generate a unique 7-character short URL from a long URL.\n• Handle redirect lookups with low latency (<20ms p99).\n• Custom aliases & expiration timestamps.\n• Discuss: Base62 encoding, Database schema (SQL vs NoSQL), 301 vs 302 redirects, and Cache invalidation.',
      starterCode: `/**
 * URL Shortener Architecture Spec:
 * 
 * 1. Base62 ID Generator:
 *    - 62 characters (0-9, a-z, A-Z)
 *    - 62^7 = ~3.5 Trillion unique short URLs
 * 
 * 2. Key Components:
 *    - API Gateway & Rate Limiter
 *    - Distributed Counter / Snowflake ID Generator
 *    - Read-Through Caching (Redis)
 *    - Primary Datastore (PostgreSQL / DynamoDB)
 */

class URLShortenerService {
  constructor() {
    this.db = new Map();       // shortCode -> { longUrl, createdAt, expiresAt }
    this.cache = new Map();    // Redis cache simulation
    this.counter = 1000000000; // Counter for Base62 encoding
    this.base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encodeBase62(num) {
    // Convert numerical ID into 7-char Base62 string
  }

  shorten(longUrl, customAlias = null) {
    // Check alias or generate Base62 shortcode, write to DB & warm cache
  }

  resolve(shortCode) {
    // Cache-aside check, fallback to DB, return long URL
  }
}`,
      hints: [
        'HTTP 301 (Permanent Redirect) reduces server load via browser caching, but HTTP 302 (Temporary Redirect) allows click tracking/analytics.',
        'A centralized distributed counter or Snowflake ID prevents ID collisions without expensive DB uniqueness checks.',
      ],
    },
    {
      id: 'sd-2',
      title: '2. Design a Distributed Rate Limiter',
      difficulty: 'Medium',
      description:
        'Design a scalable distributed API rate limiter to protect microservices from abuse.\n\nKey Requirements:\n• Support client identification (IP, API Key, User ID).\n• High throughput with negligible latency penalty (<5ms).\n• Implement Token Bucket or Sliding Window Log algorithm.\n• Handle race conditions across distributed cluster with Redis & Lua scripts.',
      starterCode: `/**
 * Distributed Rate Limiter
 * Algorithm: Token Bucket
 * 
 * Headers to return:
 * - X-RateLimit-Limit
 * - X-RateLimit-Remaining
 * - X-RateLimit-Reset
 */

class TokenBucketLimiter {
  constructor(capacity, refillTokensPerSec) {
    this.capacity = capacity;
    this.refillRate = refillTokensPerSec;
    this.buckets = new Map(); // key -> { tokens, lastRefillTimestamp }
  }

  refill(bucket) {
    const now = Date.now();
    const elapsedSeconds = (now - bucket.lastRefillTimestamp) / 1000;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsedSeconds * this.refillRate);
    bucket.lastRefillTimestamp = now;
  }

  allowRequest(key, cost = 1) {
    // Return { allowed: boolean, remaining: number, resetInSeconds: number }
  }
}`,
      hints: [
        'Token Bucket handles bursts gracefully while enforcing average rate limits.',
        'In distributed Redis setups, use Redis Lua scripts to execute get-refill-deduct atomically without race conditions.',
      ],
    },
    {
      id: 'sd-3',
      title: '3. Design a Real-Time Notification System',
      difficulty: 'Medium',
      description:
        'Design a high-volume multi-channel Notification System supporting Mobile Push (APNs, FCM), SMS (Twilio), and Email (SendGrid).\n\nKey Requirements:\n• Priority queues (Transactional / OTP vs Promotional / Marketing).\n• User preference opt-outs and channel routing.\n• Deduplication & idempotency guarantees (at-least-once with deduplication).\n• Retry policy with Exponential Backoff and Dead-Letter Queue (DLQ).',
      starterCode: `/**
 * Architecture Components:
 * - Ingestion API: Receives notification requests, generates idempotencyKey
 * - Queue Broker (Kafka / RabbitMQ): Priority topics
 * - Consumer Workers: Workers dedicated to SMS, Email, Push
 * - Third-Party Integrations: APNs, FCM, Twilio, SendGrid
 * - Rate Limiter: Prevent spamming individual users
 */

class NotificationService {
  constructor() {
    this.idempotencyCache = new Set();
    this.userPreferences = new Map(); // userId -> { email: boolean, sms: boolean, push: boolean }
    this.deadLetterQueue = [];
  }

  dispatch(notification) {
    // Validate idempotency, check user preferences, route to message channel
  }
}`,
      hints: [
        'Use an idempotency key (e.g. hash of userId + template + timestampWindow) stored in Redis with TTL to prevent duplicate sends.',
        'Isolate critical OTP / login emails into a high-priority queue separate from batch marketing digests.',
      ],
    },
    {
      id: 'sd-4',
      title: '4. Design an Image Upload & CDN Delivery Pipeline',
      difficulty: 'Medium',
      description:
        'Design a media hosting pipeline (similar to Instagram/Imgur image service).\n\nKey Requirements:\n• Scalable uploads without overwhelming application web servers (Direct S3 Pre-signed URLs).\n• Asynchronous image processing: thumbnail generation, WebP/AVIF conversion, watermark.\n• Edge caching and delivery via CloudFront / Cloudflare CDN.\n• Cache invalidation strategy and high availability.',
      starterCode: `/**
 * Image Delivery Architecture:
 * 
 * 1. Client -> Web API: Request Pre-signed S3 Upload URL
 * 2. Client -> S3 Bucket: Direct upload binary payload
 * 3. S3 Event -> SQS Queue -> Worker Lambda:
 *    - Resize to thumbnail (150x150), medium (600x600), full (1080p)
 *    - Convert to modern WebP format
 * 4. CDN (CloudFront):
 *    - Geo-distributed edge caches with TTL
 */

class ImagePipelineService {
  constructor() {
    this.imageMetadata = new Map();
  }

  generateUploadUrl(userId, filename, mimeType) {
    // Generate secure pre-signed PUT URL & S3 object key
  }

  onUploadComplete(imageKey) {
    // Trigger async processing pipeline
  }

  getCdnUrl(imageKey, variant = 'original') {
    // Return CDN edge URL with immutable cache control headers
  }
}`,
      hints: [
        'Direct S3 upload via pre-signed URLs keeps large file payloads off the application servers, eliminating bandwidth bottlenecks.',
        'Use content-addressable storage (SHA-256 hash of image as key) to automatically deduplicate identical images and make CDN caching immutable.',
      ],
    },
    {
      id: 'sd-5',
      title: '5. Design a Distributed Key-Value Store',
      difficulty: 'Hard',
      description:
        'Design a distributed, fault-tolerant Key-Value Store (similar to Amazon DynamoDB or Apache Cassandra).\n\nKey Requirements:\n• Consistent Hashing with virtual nodes for uniform partitioning.\n• Tunable Consistency via Quorum: N (replicas), W (write quorum), R (read quorum).\n• Vector Clocks for concurrent update conflict detection.\n• Anti-entropy protocol using Merkle Trees and gossip protocol for cluster membership.',
      starterCode: `/**
 * Dynamo-Style Distributed KV Store:
 * 
 * - Consistent Hash Ring with Virtual Nodes
 * - Quorum Replication: R + W > N ensures strong consistency
 * - Conflict Resolution: Vector Clocks or Last-Write-Wins (LWW)
 */

class ConsistentHashRing {
  constructor(virtualNodesPerPhysical = 3) {
    this.vNodes = virtualNodesPerPhysical;
    this.ring = new Map(); // hashInt -> physicalNodeId
    this.sortedKeys = [];
  }

  hash(key) {
    // MurmurHash / SHA-256 mapped to integer
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  addNode(nodeId) {
    // Place virtual nodes onto ring
  }

  getNode(key) {
    // Binary search for first node clockwise from hash(key)
  }
}

class DistributedKVStore {
  constructor(replicationFactor = 3, writeQuorum = 2, readQuorum = 2) {
    this.N = replicationFactor;
    this.W = writeQuorum;
    this.R = readQuorum;
    this.ring = new ConsistentHashRing();
    this.nodeStorage = new Map(); // nodeId -> Map(key -> value)
  }

  put(key, value) {
    // Coordinate write across W replica nodes
  }

  get(key) {
    // Coordinate read across R replica nodes
  }
}`,
      hints: [
        'When R + W > N, the read set and write set must overlap by at least one node, guaranteeing read of the most recent version.',
        'Virtual nodes solve the problem of non-uniform partition distribution when physical node count is small.',
      ],
    },
  ],
};

// Summary metrics type
interface InterviewSummaryData {
  track: TrackType;
  allocatedSeconds: number;
  timeUsedSeconds: number;
  questionsTotal: number;
  questionsAttempted: number;
  codeChangesCount: number;
  overallScore: number;
  integrityScore: number;
  codeScore: number;
  questionScore: number;
  transcriptScore: number;
  violationsCount: number;
  transcriptText: string;
  submissions: Array<{
    title: string;
    difficulty: DifficultyType;
    starterCode: string;
    submittedCode: string;
    isAttempted: boolean;
  }>;
  aiFeedback: string;
}

export default function Simulator() {
  const { violations, isTracking, error: proctorError, startProctoring, stopProctoring, videoRef } = useProctoring();
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();

  // Setup options
  const [setupMode, setSetupMode] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [track, setTrack] = useState<TrackType>('DSA');
  const [durationMinutes, setDurationMinutes] = useState<number>(5);

  // Live session state
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userCodes, setUserCodes] = useState<Record<number, string>>({});
  const [expandedHints, setExpandedHints] = useState<boolean>(false);
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [codeChangesCount, setCodeChangesCount] = useState<number>(0);
  const [startViolations, setStartViolations] = useState<number>(0);
  const [summaryData, setSummaryData] = useState<InterviewSummaryData | null>(null);
  const [activeSummaryTab, setActiveSummaryTab] = useState<number>(0);

  const questions = QUESTION_BANK[track];
  const currentQuestion = questions[currentQuestionIndex];
  const currentCode = userCodes[currentQuestionIndex] ?? currentQuestion?.starterCode ?? '';

  // Focus violations during session
  const sessionViolations = Math.max(0, violations - startViolations);

  // Speaking time estimate calculation
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  // Estimated ~130 words per minute => ~2.16 words/second
  const estimatedSpeakingSeconds = Math.round(wordCount / 2.16);
  const speakingMins = Math.floor(estimatedSpeakingSeconds / 60);
  const speakingSecs = estimatedSpeakingSeconds % 60;

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const safeSecs = Math.max(0, totalSeconds);
    const m = Math.floor(safeSecs / 60);
    const s = safeSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // Timer Implementation with auto-end
  // ----------------------------------------------------
  useEffect(() => {
    if (setupMode || isFinished) return;

    if (timeLeft <= 0) {
      handleEndInterview();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEndInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setupMode, isFinished, timeLeft]);

  // Keep camera feed attached if re-rendered
  useEffect(() => {
    if (!setupMode && !isFinished && isTracking && videoRef.current && !videoRef.current.srcObject) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {});
    }
  }, [setupMode, isFinished, isTracking, videoRef]);

  // ----------------------------------------------------
  // Begin Interview
  // ----------------------------------------------------
  const handleStartInterview = async () => {
    const totalSecs = durationMinutes * 60;
    setTimeLeft(totalSecs);
    setStartViolations(violations);
    setUserCodes({});
    setCurrentQuestionIndex(0);
    setCodeChangesCount(0);
    setVisitedQuestions(new Set([0]));
    setExpandedHints(false);
    if (setTranscript) setTranscript('');

    setSetupMode(false);
    setIsFinished(false);

    // Start video & audio proctoring
    await startProctoring();

    // Start speech recognition
    try {
      startListening();
    } catch (e) {
      console.warn('Speech recognition start failed or pending user grant', e);
    }
  };

  // ----------------------------------------------------
  // End Interview & Build Comprehensive Summary
  // ----------------------------------------------------
  const handleEndInterview = async () => {
    stopProctoring();
    stopListening();

    const allocated = durationMinutes * 60;
    const timeUsed = allocated - Math.max(0, timeLeft);
    const currentV = Math.max(0, violations - startViolations);

    // Calculate question submissions
    let attemptedCount = 0;
    let totalCodeVolume = 0;

    const submissions = questions.map((q, idx) => {
      const code = userCodes[idx] ?? q.starterCode;
      const isAttempted = code.trim() !== q.starterCode.trim() && code.trim().length > 0;
      if (isAttempted) {
        attemptedCount++;
        totalCodeVolume += Math.max(0, code.length - q.starterCode.length / 2);
      }
      return {
        title: q.title,
        difficulty: q.difficulty,
        starterCode: q.starterCode,
        submittedCode: code,
        isAttempted,
      };
    });

    // Scoring Breakdown:
    // 1. Code Score: up to 40 pts
    const codeScore = Math.min(40, Math.round((totalCodeVolume / 200) * 40));
    // 2. Question Coverage: up to 35 pts
    const questionScore = Math.round((attemptedCount / questions.length) * 35);
    // 3. Transcript verbal contribution: up to 25 pts
    const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
    const transcriptScore = Math.min(25, Math.round((words / 50) * 25));
    // 4. Violation penalty: 10 pts per focus violation
    const violationPenalty = currentV * 10;

    const rawOverall = codeScore + questionScore + transcriptScore - violationPenalty;
    const overallScore = Math.max(0, Math.min(100, Math.round(rawOverall)));
    const integrityScore = Math.max(0, 100 - currentV * 15);

    // Detailed feedback text
    let feedbackTier = 'Needs Practice';
    let recommendations = 'Focus on breaking down problems systematically and speaking out your logic.';
    if (overallScore >= 80) {
      feedbackTier = 'Strong Hire';
      recommendations = 'Exceptional problem-solving pace and technical articulation. Ready for onsite loops.';
    } else if (overallScore >= 60) {
      feedbackTier = 'Hire';
      recommendations = 'Good algorithmic instincts and active coding engagement. Continue refining edge cases.';
    } else if (overallScore >= 40) {
      feedbackTier = 'Leaning Hire';
      recommendations = 'Adequate foundation. Practice vocalizing time/space complexity analysis while typing.';
    }

    const aiFeedback = `Candidate Performance Rating: ${feedbackTier} (${overallScore}/100)

1. Technical Execution:
You attempted ${attemptedCount} of ${questions.length} questions in the ${track} track with ${codeChangesCount} total code edits. Your solutions demonstrate structured thinking and syntax awareness.

2. Verbal Communication & Explanation:
Recorded ${words} words spoken (estimated ~${Math.round(words / 2.16)}s of verbal communication). You actively communicated during problem solving, which mirrors real-world FAANG technical interview expectations.

3. Integrity & Focus Assessment:
You recorded ${currentV} focus violation(s), resulting in an Integrity Score of ${integrityScore}%. ${
      currentV === 0
        ? 'Flawless focus was maintained throughout the session with no window switching detected.'
        : 'Ensure your interview window remains active and avoid switching browser tabs during live rounds.'
    }

Advice for Next Steps:
${recommendations}`;

    const finalSummary: InterviewSummaryData = {
      track,
      allocatedSeconds: allocated,
      timeUsedSeconds: timeUsed,
      questionsTotal: questions.length,
      questionsAttempted: attemptedCount,
      codeChangesCount,
      overallScore,
      integrityScore,
      codeScore,
      questionScore,
      transcriptScore,
      violationsCount: currentV,
      transcriptText: transcript,
      submissions,
      aiFeedback,
    };

    setSummaryData(finalSummary);
    setIsFinished(true);

    // Post to API endpoint in background
    try {
      await fetch('/api/interview/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          question_title: `${track} Simulator (${attemptedCount}/${questions.length} completed)`,
          code_submission: submissions.map((s) => `// ${s.title}\n${s.submittedCode}`).join('\n\n/* ----- */\n\n'),
          transcript_text: transcript,
          violations_count: currentV,
        }),
      });
    } catch (err) {
      console.warn('Background submission log notice:', err);
    }
  };

  // ----------------------------------------------------
  // Switch Questions
  // ----------------------------------------------------
  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setExpandedHints(false);
    setVisitedQuestions((prev) => new Set([...prev, index]));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      handleSelectQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      handleSelectQuestion(currentQuestionIndex - 1);
    }
  };

  // ----------------------------------------------------
  // Code Editor update
  // ----------------------------------------------------
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setUserCodes((prev) => ({
      ...prev,
      [currentQuestionIndex]: val,
    }));
    setCodeChangesCount((prev) => prev + 1);
  };

  const handleResetStarterCode = () => {
    if (confirm('Reset this question back to the original starter code?')) {
      setUserCodes((prev) => ({
        ...prev,
        [currentQuestionIndex]: currentQuestion.starterCode,
      }));
    }
  };

  // Reset simulator to configuration screen
  const handleResetAll = () => {
    setIsFinished(false);
    setSetupMode(true);
    setSummaryData(null);
    setUserCodes({});
    setCurrentQuestionIndex(0);
    setCodeChangesCount(0);
    setVisitedQuestions(new Set([0]));
    if (setTranscript) setTranscript('');
  };

  // Helper for difficulty badge style
  const getDifficultyBadge = (diff: DifficultyType) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // ====================================================
  // SCREEN 1: Pre-Interview Setup Screen
  // ====================================================
  if (setupMode) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-8 text-white text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Live Interview Simulator</h1>
              <p className="text-indigo-100 text-sm max-w-md mx-auto">
                Real-time proctored technical interview simulation with automated speech recognition, live webcam focus tracking, and instant AI analytics.
              </p>
            </div>

            <div className="p-8 space-y-8">
              {/* Interview Track Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CodeIcon className="w-4 h-4 text-indigo-600" />
                  Select Interview Track
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'DSA' as TrackType, title: 'DSA', desc: 'Data Structures & Algorithms' },
                    { id: 'OOD' as TrackType, title: 'OOD', desc: 'Object-Oriented Design' },
                    { id: 'SystemDesign' as TrackType, title: 'System Design', desc: 'High-Scale Architecture' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTrack(item.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        track === item.id
                          ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="block font-bold text-gray-900 text-base">{item.title}</span>
                      <span className="block text-xs text-gray-500 mt-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview Duration Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Select Session Duration
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { minutes: 5, label: '5 Minutes', badge: 'Sprint Mode (Rapid)' },
                    { minutes: 10, label: '10 Minutes', badge: 'Standard Simulation' },
                  ].map((dur) => (
                    <button
                      key={dur.minutes}
                      type="button"
                      onClick={() => setDurationMinutes(dur.minutes)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        durationMinutes === dur.minutes
                          ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-lg">{dur.label}</span>
                        <Clock className={`w-4 h-4 ${durationMinutes === dur.minutes ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <span className="block text-xs text-gray-500 mt-1">{dur.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Before You Start Panel */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-5 text-amber-900">
                <div className="flex items-center gap-2 font-bold text-sm mb-2 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Before you start:
                </div>
                <ul className="text-xs space-y-2 pl-5 list-disc text-amber-800/90">
                  <li>
                    <strong>Microphone &amp; Webcam:</strong> You will be prompted for camera and microphone access for live proctoring and real-time speech transcription.
                  </li>
                  <li>
                    <strong>Focus Integrity:</strong> Navigating away from this tab or losing window focus is detected and logged as focus violations.
                  </li>
                  <li>
                    <strong>Free Navigation:</strong> You have 5 curated problems in this track. You may navigate between questions in any order.
                  </li>
                  <li>
                    <strong>Auto-End:</strong> When the countdown timer reaches zero, the interview auto-submits and computes your comprehensive evaluation.
                  </li>
                </ul>
              </div>

              {/* Begin Interview Button */}
              <button
                onClick={handleStartInterview}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-base hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <Play className="w-5 h-5 fill-current" />
                Begin Interview ({durationMinutes}m • 5 Questions)
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ====================================================
  // SCREEN 2: Comprehensive Interview Summary Page
  // ====================================================
  if (isFinished && summaryData) {
    const isPassing = summaryData.overallScore >= 60;
    const minutesUsed = Math.floor(summaryData.timeUsedSeconds / 60);
    const secondsUsed = summaryData.timeUsedSeconds % 60;
    const timeUsedStr = `${minutesUsed}m ${secondsUsed}s`;
    const allocatedStr = `${Math.floor(summaryData.allocatedSeconds / 60)}m 00s`;

    return (
      <ProtectedRoute>
        <div className="max-w-5xl mx-auto py-6 space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {summaryData.track} Track
                </span>
                <span className="text-xs text-gray-500">Session Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Interview Evaluation Summary</h1>
              <p className="text-sm text-gray-500 mt-1">
                Automated performance and integrity assessment report.
              </p>
            </div>
            <button
              onClick={handleResetAll}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 text-sm self-stretch md:self-auto justify-center"
            >
              <Play className="w-4 h-4 fill-current" /> Start New Interview
            </button>
          </div>

          {/* 4-Card Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Overall Score */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Overall Score</span>
                <BarChart3 className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-extrabold ${isPassing ? 'text-indigo-600' : 'text-amber-600'}`}>
                  {summaryData.overallScore}
                </span>
                <span className="text-gray-400 text-sm font-medium">/ 100</span>
              </div>
              <span
                className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                  summaryData.overallScore >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : summaryData.overallScore >= 60
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {summaryData.overallScore >= 80 ? 'Strong Hire' : summaryData.overallScore >= 60 ? 'Hire' : 'Needs Practice'}
              </span>
            </div>

            {/* Integrity Score */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Integrity Score</span>
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-4xl font-extrabold ${
                    summaryData.integrityScore >= 85
                      ? 'text-emerald-600'
                      : summaryData.integrityScore >= 50
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}
                >
                  {summaryData.integrityScore}
                </span>
                <span className="text-gray-400 text-sm font-medium">/ 100</span>
              </div>
              <span className="block text-xs text-gray-500 mt-2">
                {summaryData.violationsCount} focus violation{summaryData.violationsCount === 1 ? '' : 's'} recorded
              </span>
            </div>

            {/* Time Used vs Allocated */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Time Used</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">{timeUsedStr}</div>
              <span className="block text-xs text-gray-500 mt-2">Allocated duration: {allocatedStr}</span>
            </div>

            {/* Questions Attempted */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Questions Completed</span>
                <CodeIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold text-emerald-600">{summaryData.questionsAttempted}</span>
                <span className="text-gray-400 text-sm font-medium">/ {summaryData.questionsTotal}</span>
              </div>
              <span className="block text-xs text-gray-500 mt-2">
                {summaryData.codeChangesCount} code edit interactions
              </span>
            </div>
          </div>

          {/* AI Detailed Feedback Report */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Comprehensive AI Feedback &amp; Evaluation
            </h2>
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-5 text-indigo-950 text-sm whitespace-pre-line leading-relaxed font-sans">
              {summaryData.aiFeedback}
            </div>

            {/* Score Breakdown Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                  <span>Code Implementation</span>
                  <span>{summaryData.codeScore} / 40 pts</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(summaryData.codeScore / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                  <span>Question Coverage</span>
                  <span>{summaryData.questionScore} / 35 pts</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(summaryData.questionScore / 35) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                  <span>Verbal Explanation</span>
                  <span>{summaryData.transcriptScore} / 25 pts</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(summaryData.transcriptScore / 25) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Code Submissions for Each Question */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-indigo-600" />
                Submitted Code Solutions
              </h2>
              <span className="text-xs text-gray-500">Review solutions across all 5 questions</span>
            </div>

            {/* Question selector tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
              {summaryData.submissions.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSummaryTab(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    activeSummaryTab === i
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>Q{i + 1}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      sub.isAttempted ? 'bg-emerald-400' : 'bg-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Active Question Submission Display */}
            {summaryData.submissions[activeSummaryTab] && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-base">
                      {summaryData.submissions[activeSummaryTab].title}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getDifficultyBadge(
                        summaryData.submissions[activeSummaryTab].difficulty
                      )}`}
                    >
                      {summaryData.submissions[activeSummaryTab].difficulty}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                      summaryData.submissions[activeSummaryTab].isAttempted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {summaryData.submissions[activeSummaryTab].isAttempted ? 'Code Modified' : 'Starter Code (Unedited)'}
                  </span>
                </div>

                <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
                  <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 text-xs text-gray-400 font-mono flex items-center justify-between">
                    <span>Solution Draft</span>
                    <span>{summaryData.submissions[activeSummaryTab].submittedCode.length} characters</span>
                  </div>
                  <pre className="p-4 font-mono text-xs text-gray-200 overflow-x-auto max-h-80 leading-relaxed">
                    {summaryData.submissions[activeSummaryTab].submittedCode}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Transcript Log Review */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Speech Transcript Log
            </h2>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 max-h-48 overflow-y-auto leading-relaxed">
              {summaryData.transcriptText ? (
                <p className="whitespace-pre-wrap">{summaryData.transcriptText}</p>
              ) : (
                <p className="text-gray-400 italic">No verbal speech was detected during this interview session.</p>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleResetAll}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Another Interview Session
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ====================================================
  // SCREEN 3: Live Interview UI (3-column layout)
  // Left 2/3 width (`lg:col-span-2`)
  // Right 1/3 width (`lg:col-span-1`)
  // ====================================================
  const isUrgent = timeLeft < 60;

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-[calc(100vh-6.5rem)] max-w-7xl mx-auto space-y-3">
        {/* Top Bar: Title, Track, Violations, Pause/End */}
        <div className="flex flex-wrap items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm gap-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-bold text-gray-900">Live Interview Session</h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {track} Track
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Focus Violations Counter Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                sessionViolations > 0
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {sessionViolations} Focus Violation{sessionViolations === 1 ? '' : 's'}
            </div>

            {/* End Interview Button */}
            <button
              onClick={handleEndInterview}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="End session early and view report"
            >
              <Square className="w-3.5 h-3.5 fill-current" /> End &amp; Submit
            </button>
          </div>
        </div>

        {/* Proctoring Error Banner (if any) */}
        {proctorError && (
          <div className="p-3 bg-rose-50 text-rose-800 rounded-lg border border-rose-200 flex items-center gap-2 text-xs flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{proctorError}</span>
          </div>
        )}

        {/* Main 3-column / 2:1 Split Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 overflow-hidden">
          {/* ==============================================
              LEFT PANEL (2/3 width: lg:col-span-2)
              - Question display at top
              - Code editor below
              - Question navigation Previous/Next & counter
              ============================================== */}
          <div className="lg:col-span-2 flex flex-col h-full gap-3 overflow-hidden">
            {/* Question Display Card (Top) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col max-h-[40%] overflow-y-auto flex-shrink-0">
              {/* Question Header & Navigation */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-gray-900">{currentQuestion.title}</h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getDifficultyBadge(
                      currentQuestion.difficulty
                    )}`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                </div>

                {/* Quick question navigation pills */}
                <div className="flex items-center gap-1">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectQuestion(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentQuestionIndex === i
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : visitedQuestions.has(i)
                          ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={`Go to Question ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Description */}
              <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-sans mb-3">
                {currentQuestion.description}
              </div>

              {/* Expandable Hints Section */}
              <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setExpandedHints(!expandedHints)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-md transition-colors border border-amber-200/80"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>{expandedHints ? 'Hide Hints' : `Show Hints (${currentQuestion.hints.length})`}</span>
                  </button>

                  {/* Previous / Next buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium mr-1">
                      {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      title="Previous Question"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className="p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      title="Next Question"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {expandedHints && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 space-y-1.5 text-xs text-amber-900 mt-1">
                    {currentQuestion.hints.map((hint, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5">
                        <span className="font-bold text-amber-700">•</span>
                        <span>{hint}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Code Editor (Below) */}
            <div className="bg-gray-950 rounded-xl border border-gray-800 shadow-md flex-1 overflow-hidden flex flex-col min-h-0">
              {/* Editor Header */}
              <div className="bg-gray-900 px-4 py-2 flex items-center justify-between text-xs text-gray-300 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <CodeIcon className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-gray-200">Solution Editor (JavaScript / TypeScript)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{currentCode.length} chars</span>
                  <button
                    onClick={handleResetStarterCode}
                    className="text-gray-400 hover:text-gray-200 underline text-xs"
                    title="Reset to starter code"
                  >
                    Reset Code
                  </button>
                </div>
              </div>

              {/* Textarea Code Editor */}
              <textarea
                value={currentCode}
                onChange={handleCodeChange}
                spellCheck={false}
                placeholder="// Write your solution here..."
                className="flex-1 w-full bg-gray-950 text-gray-100 p-4 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 overflow-y-auto"
              />
            </div>
          </div>

          {/* ==============================================
              RIGHT PANEL (1/3 width: lg:col-span-1)
              - Countdown Timer (MM:SS format, red < 60s)
              - Webcam feed (small)
              - Transcript log with mic toggle
              - Live Analysis panel (visited, code changes, speaking time)
              - Focus Violations counter
              ============================================== */}
          <div className="lg:col-span-1 flex flex-col h-full gap-3 overflow-hidden">
            {/* 1. Countdown Timer Card */}
            <div
              className={`p-3.5 rounded-xl border shadow-sm transition-all flex-shrink-0 ${
                isUrgent
                  ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-600' : 'text-indigo-600'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">Remaining Time</span>
                </div>
                <span className={`text-2xl font-mono font-extrabold ${isUrgent ? 'text-rose-600' : 'text-gray-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200/80 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all duration-1000 ${
                    isUrgent ? 'bg-rose-600' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${(timeLeft / (durationMinutes * 60)) * 100}%` }}
                />
              </div>
            </div>

            {/* 2. Webcam Feed (Small) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-indigo-600" /> Proctoring Camera
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Active
                </span>
              </div>
              <div className="aspect-video bg-gray-950 relative max-h-36">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                {!isTracking && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-1 text-center p-2">
                    <VideoOff className="w-6 h-6" />
                    <span className="text-xs">Camera offline</span>
                  </div>
                )}
                {/* Floating focus status */}
                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" /> Focus Monitored
                </div>
              </div>
            </div>

            {/* 3. Live Analysis Panel */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex-shrink-0 space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-800 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-indigo-600" /> Live Analysis
                </span>
                <span className="text-[11px] text-gray-500">Real-time stats</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-center text-indigo-600 mb-1">
                    <CodeIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-extrabold text-gray-900">
                    {visitedQuestions.size}/{questions.length}
                  </div>
                  <span className="text-[10px] text-gray-500">Visited</span>
                </div>

                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-center text-indigo-600 mb-1">
                    <Keyboard className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-extrabold text-gray-900">{codeChangesCount}</div>
                  <span className="text-[10px] text-gray-500">Code Edits</span>
                </div>

                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-center text-indigo-600 mb-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-extrabold text-gray-900">
                    {speakingMins}m {speakingSecs}s
                  </div>
                  <span className="text-[10px] text-gray-500">Speaking</span>
                </div>
              </div>
            </div>

            {/* 4. Transcript Log with Mic Toggle */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col overflow-hidden min-h-0">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-xs flex-shrink-0">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-indigo-600" />
                  Speech-to-Text ({wordCount} words)
                </span>
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-1.5 rounded-full transition-colors ${
                    isListening
                      ? 'bg-rose-100 text-rose-600 hover:bg-rose-200 animate-pulse'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={isListening ? 'Stop Listening' : 'Start Listening'}
                >
                  {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 flex-1 overflow-y-auto text-xs text-gray-600 leading-relaxed font-sans break-words bg-white">
                {transcript ? (
                  <p className="whitespace-pre-wrap">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic text-[11px]">
                    No speech recorded yet. Speak through your microphone as you code. Speech is continuously transcribed and analyzed.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
