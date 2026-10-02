const test = require('node:test');
const assert = require('node:assert/strict');
const { bfs, aStar } = require('../src/maze');

test('BFS finds a shortest path in a simple maze', () => {
  const maze = [
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
  ];
  const result = bfs(maze, [0, 0], [2, 3]);
  assert.equal(result.distance, 5);
  assert.equal(result.path[0].join(','), '0,0');
  assert.equal(result.path.at(-1).join(','), '2,3');
});

test('A* matches BFS shortest distance', () => {
  const maze = [
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
  ];
  const b = bfs(maze, [0, 0], [2, 3]);
  const a = aStar(maze, [0, 0], [2, 3]);
  assert.equal(a.distance, b.distance);
  assert.equal(a.path[0].join(','), '0,0');
  assert.equal(a.path.at(-1).join(','), '2,3');
});

test('BFS and A* return no path when goal is unreachable', () => {
  const maze = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
  assert.equal(bfs(maze, [0, 0], [2, 2]).distance, -1);
  assert.equal(aStar(maze, [0, 0], [2, 2]).distance, -1);
});

test('Maze validation rejects invalid matrices', () => {
  assert.throws(() => bfs([], [0, 0], [0, 0]));
  assert.throws(() => aStar([[0, 0], [0]], [0, 0], [1, 0]));
});
