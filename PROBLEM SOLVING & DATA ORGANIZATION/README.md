# Problem Solving & Data Organization - JavaScript

## 1. Student Information

- Full name: Lam Ngoc Kien
- Student ID: 134010126001
- Class: K26ISTG01
- Language: JavaScript (Node.js)

## 2. Project Overview

This individual project solves the required problems from three areas:

1. Basic algorithms: 5 problems.
2. Data organization: 3 problems.
3. Optimization: shortest path in a 2D maze using BFS and A*.

The project uses plain JavaScript with Node.js and the built-in Node test runner, so no unnecessary external dependency is required.

## 3. Requirements Covered

### Part 1 - Basic Algorithms

- Find the N-th prime number.
- Reverse a string without built-in reverse functions.
- Check palindrome while ignoring spaces and punctuation.
- Find the K-th largest integer.
- Count character frequencies using Map.

### Part 2 - Data Organization

Selected problems:

- Contact Manager: `Map` keyed by normalized name.
- Game Ranking: min-heap keeps only the best Top 10 scores.
- LRU Cache: `Map` preserves insertion order and supports O(1) access/update/delete.

### Part 3 - Optimization

- BFS shortest path in a 2D maze.
- A* shortest path in the same maze.
- Benchmark comparing both algorithms.

## 4. Folder Structure

src/
  basicAlgorithms.js
  contactManager.js
  gameRanking.js
  lruCache.js
  maze.js
  main.js

tests/
  basicAlgorithms.test.js
  dataStructures.test.js
  maze.test.js

docs/
  COMPLEXITY.md
  BENCHMARK.md
  INDIVIDUAL_REPORT.docx
  INDIVIDUAL_REPORT.pdf
  DEMO.md
  diagrams/
    architecture.svg
    maze-algorithms.svg

benchmark.js
package.json
```

## 5. Installation

Install Node.js 18+.


## 6. Run the Program

```bash
npm start
```

The console menu supports:

1. Run basic algorithms demo
2. Run data structure demo
3. Run maze BFS vs A* demo
4. Run benchmark
0. Exit
```

## 7. Run Unit Tests

```bash
npm test
```

## 8. Run Benchmark

```bash
npm run benchmark
```

The benchmark creates the same maze several times, runs BFS and A*, and reports average execution time.

## 9. Complexity Summary

| Problem | Main structure | Time | Space |
|---|---|---:|---:|
| N-th prime (trial division) | Array | O(n sqrt(p)) | O(n) |
| Reverse string | Array-like string traversal | O(n) | O(n) |
| Palindrome | String / two pointers | O(n) | O(n) |
| K-th largest | Array + sorting | O(n log n) | O(n) |
| Character frequency | Map | O(n) | O(u) |
| Contact Manager search | Map | O(1) average | O(n) |
| Game Ranking Top 10 | Min-heap | O(log 10) per score | O(10) |
| LRU Cache get/put | Map | O(1) average | O(capacity) |
| Maze BFS | Queue | O(V + E) | O(V) |
| Maze A* | Priority queue | O(V log V) worst case | O(V) |

## 10. GitHub Submission Checklist

- Replace the student placeholders above.
- Create a public GitHub repository.
- Commit daily with clear messages.
- Upload the complete project.
- Add the GitHub URL to the individual report.
- Optionally upload a demo video and add the video URL to the report.

## 11. Example Commit Messages

feat: solve five basic algorithms
feat: add contact manager using map
feat: add game ranking min heap
feat: implement LRU cache
feat: implement BFS and A* maze search
 test: add edge case unit tests
perf: benchmark BFS and A*
docs: complete complexity analysis
```
