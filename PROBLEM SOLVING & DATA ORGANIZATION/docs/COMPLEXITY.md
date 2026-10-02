# Complexity Analysis

## Part 1

### 1. N-th Prime
The implementation tests candidates using trial division up to the square root. If the N-th prime is p, the rough worst-case time is O(n * sqrt(p)) with O(n) output-independent working space.

### 2. Reverse String
One pass from right to left gives O(n) time and O(n) output space.

### 3. Palindrome
Two pointers skip punctuation and spaces and compare each relevant character once. Time is O(n), with O(n) for the JavaScript string representation/output and O(1) algorithmic auxiliary state.

### 4. K-th Largest
The implementation removes duplicates, copies, and sorts descending. Time is O(n log n), space is O(n).

### 5. Character Frequency
A Map stores the frequency of each distinct character. Time is O(n), space is O(u), where u is the number of distinct characters.

## Part 2

### Contact Manager - Map
Names are normalized and used as Map keys. Average add, find and delete are O(1). Space is O(n).

### Game Ranking - Min Heap of size 10
Only the best 10 scores are retained. Each insertion is O(log 10), effectively constant time, while scanning all players costs O(m log 10), where m is the number of players. Space is O(10).

### LRU Cache - Map
JavaScript Map preserves insertion order. A cache hit removes and reinserts the key, making average get/put O(1). Space is O(capacity).

## Part 3

### BFS
On a grid with V cells and E neighbor edges, BFS is O(V + E), which is O(V) for a fixed-degree grid. It guarantees a shortest path in an unweighted maze. Space is O(V).

### A*
A* uses a min-priority queue ordered by f(n) = g(n) + h(n). With the Manhattan heuristic on a 4-direction grid, the heuristic is admissible. The implementation has O(V log V) worst-case behavior due to the heap and O(V) space.
