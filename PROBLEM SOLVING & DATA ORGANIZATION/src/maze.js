/** Simple binary min-heap priority queue for A*. */
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  push(item, priority) {
    const node = { item, priority };
    this.items.push(node);
    this.up(this.items.length - 1);
  }

  pop() {
    if (this.items.length === 0) return undefined;
    const root = this.items[0];
    const last = this.items.pop();
    if (this.items.length && last) {
      this.items[0] = last;
      this.down(0);
    }
    return root.item;
  }

  get size() {
    return this.items.length;
  }

  up(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.items[parent].priority <= this.items[index].priority) break;
      [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
      index = parent;
    }
  }

  down(index) {
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;
      if (left < this.items.length && this.items[left].priority < this.items[smallest].priority) smallest = left;
      if (right < this.items.length && this.items[right].priority < this.items[smallest].priority) smallest = right;
      if (smallest === index) break;
      [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
      index = smallest;
    }
  }
}

function validateMaze(maze, start, goal) {
  if (!Array.isArray(maze) || maze.length === 0 || !Array.isArray(maze[0]) || maze[0].length === 0) {
    throw new Error('maze must be a non-empty matrix');
  }
  const columns = maze[0].length;
  for (const row of maze) {
    if (!Array.isArray(row) || row.length !== columns) throw new Error('maze must be rectangular');
  }
  const validPoint = (p) => Array.isArray(p) && p.length === 2 && p.every(Number.isInteger)
    && p[0] >= 0 && p[0] < maze.length && p[1] >= 0 && p[1] < columns;
  if (!validPoint(start) || !validPoint(goal)) throw new Error('start/goal is out of bounds');
  if (maze[start[0]][start[1]] !== 0 || maze[goal[0]][goal[1]] !== 0) throw new Error('start and goal must be open cells');
}

function neighbors(maze, [r, c]) {
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const result = [];
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < maze.length && nc >= 0 && nc < maze[0].length && maze[nr][nc] === 0) {
      result.push([nr, nc]);
    }
  }
  return result;
}

function pointKey([r, c]) {
  return `${r},${c}`;
}

function reconstruct(parent, goal) {
  const path = [];
  let currentKey = pointKey(goal);
  while (currentKey) {
    const [r, c] = currentKey.split(',').map(Number);
    path.push([r, c]);
    currentKey = parent.get(currentKey);
  }
  return path.reverse();
}

/**
 * BFS shortest path on an unweighted 2D grid.
 * @returns {{path:number[][], visited:number, distance:number}}
 */
function bfs(maze, start, goal) {
  validateMaze(maze, start, goal);
  const queue = [start];
  let head = 0;
  const visited = new Set([pointKey(start)]);
  const parent = new Map();
  const distance = new Map([[pointKey(start), 0]]);

  while (head < queue.length) {
    const current = queue[head++];
    const currentKey = pointKey(current);
    if (current[0] === goal[0] && current[1] === goal[1]) {
      return { path: reconstruct(parent, goal), visited: visited.size, distance: distance.get(currentKey) };
    }

    for (const next of neighbors(maze, current)) {
      const key = pointKey(next);
      if (visited.has(key)) continue;
      visited.add(key);
      parent.set(key, currentKey);
      distance.set(key, distance.get(currentKey) + 1);
      queue.push(next);
    }
  }

  return { path: [], visited: visited.size, distance: -1 };
}

function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

/**
 * A* shortest path using Manhattan distance heuristic.
 * @returns {{path:number[][], visited:number, distance:number}}
 */
function aStar(maze, start, goal) {
  validateMaze(maze, start, goal);
  const open = new PriorityQueue();
  open.push(start, heuristic(start, goal));
  const parent = new Map();
  const gScore = new Map([[pointKey(start), 0]]);
  const closed = new Set();

  while (open.size) {
    const current = open.pop();
    const currentKey = pointKey(current);
    if (closed.has(currentKey)) continue;
    closed.add(currentKey);

    if (current[0] === goal[0] && current[1] === goal[1]) {
      return { path: reconstruct(parent, goal), visited: closed.size, distance: gScore.get(currentKey) };
    }

    for (const next of neighbors(maze, current)) {
      const key = pointKey(next);
      const candidateG = gScore.get(currentKey) + 1;
      const knownG = gScore.get(key);
      if (closed.has(key) || (knownG !== undefined && candidateG >= knownG)) continue;
      parent.set(key, currentKey);
      gScore.set(key, candidateG);
      open.push(next, candidateG + heuristic(next, goal));
    }
  }

  return { path: [], visited: closed.size, distance: -1 };
}

/** Create an open maze with vertical walls and one-cell gaps. */
function createBenchmarkMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let c = 3; c < cols - 3; c += 4) {
    for (let r = 1; r < rows - 1; r += 1) maze[r][c] = 1;
    const gap = 1 + ((c * 7) % (rows - 2));
    maze[gap][c] = 0;
  }
  return maze;
}

module.exports = { bfs, aStar, createBenchmarkMaze };
