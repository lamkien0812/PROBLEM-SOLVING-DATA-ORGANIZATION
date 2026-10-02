const { performance } = require('node:perf_hooks');
const fs = require('node:fs');
const path = require('node:path');
const { bfs, aStar, createBenchmarkMaze } = require('./src/maze');

function averageRuntime(fn, repeats) {
  let totalMs = 0;
  let lastResult;
  for (let i = 0; i < repeats; i += 1) {
    const start = performance.now();
    lastResult = fn();
    totalMs += performance.now() - start;
  }
  return { avgMs: totalMs / repeats, result: lastResult };
}

function runBenchmark() {
  const sizes = [30, 50, 70];
  const repeats = 30;
  const rows = ['size,repeats,bfs_avg_ms,bfs_distance,bfs_visited,astar_avg_ms,astar_distance,astar_visited'];

  for (const size of sizes) {
    const maze = createBenchmarkMaze(size, size);
    const startPoint = [0, 0];
    const goal = [size - 1, size - 1];
    const bfsRun = averageRuntime(() => bfs(maze, startPoint, goal), repeats);
    const astarRun = averageRuntime(() => aStar(maze, startPoint, goal), repeats);

    rows.push([
      `${size}x${size}`,
      repeats,
      bfsRun.avgMs.toFixed(4),
      bfsRun.result.distance,
      bfsRun.result.visited,
      astarRun.avgMs.toFixed(4),
      astarRun.result.distance,
      astarRun.result.visited,
    ].join(','));
  }

  const output = rows.join('\n');
  const file = path.join(__dirname, 'data', 'benchmark_results.csv');
  fs.writeFileSync(file, `${output}\n`, 'utf8');
  return output;
}

if (require.main === module) {
  console.log(runBenchmark());
}

module.exports = { runBenchmark };
