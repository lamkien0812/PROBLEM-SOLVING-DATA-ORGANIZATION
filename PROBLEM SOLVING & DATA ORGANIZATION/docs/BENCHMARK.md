# Benchmark Method

- Runtime: Node.js using `performance.now()`.
- Each maze size is executed 30 times for each algorithm.
- The same maze, start point, and goal are used for BFS and A* in each comparison.
- The benchmark reports average runtime, shortest distance, and number of visited cells.

Run:

```bash
npm run benchmark
```

Results are written to `data/benchmark_results.csv`.

Interpretation:

- BFS explores by layers and is predictable.
- A* uses a heuristic to focus the search toward the goal.
- A* can visit fewer cells on suitable mazes, while heap operations add overhead.
- Therefore, the fastest algorithm depends on maze shape and size, not only on asymptotic complexity.
