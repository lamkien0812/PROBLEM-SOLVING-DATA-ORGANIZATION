const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const { nthPrime, reverseString, isPalindrome, kthLargest, characterFrequency } = require('./basicAlgorithms');
const { ContactManager } = require('./contactManager');
const { GameRanking } = require('./gameRanking');
const { LRUCache } = require('./lruCache');
const { bfs, aStar, createBenchmarkMaze } = require('./maze');
const { runBenchmark } = require('../benchmark');

function runBasicDemo() {
  console.log('\n=== BASIC ALGORITHMS ===');
  console.log('10th prime:', nthPrime(10));
  console.log('Reverse:', reverseString('JavaScript'));
  console.log('Palindrome:', isPalindrome('A man, a plan, a canal: Panama'));
  console.log('3rd largest distinct:', kthLargest([5, 1, 9, 9, 7, 6], 3));
  console.log('Frequency:', Object.fromEntries(characterFrequency('hello world')));
}

function runDataStructureDemo() {
  console.log('\n=== DATA ORGANIZATION ===');

  const contacts = new ContactManager();
  contacts.add({ name: 'Nguyen An', phone: '0901000001', email: 'an@example.com' });
  contacts.add({ name: 'Tran Binh', phone: '0901000002', email: 'binh@example.com' });
  console.log('Contact search:', contacts.find('nguyen an'));

  const ranking = new GameRanking(10);
  for (let i = 1; i <= 12; i += 1) ranking.addScore(`Player${i}`, i * 100);
  console.log('Top 10:', ranking.topN());

  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('B', 2);
  cache.get('A');
  cache.put('C', 3);
  console.log('LRU keys:', cache.keys());
}

function runMazeDemo() {
  console.log('\n=== MAZE: BFS VS A* ===');
  const maze = createBenchmarkMaze(40, 60);
  const start = [0, 0];
  const goal = [39, 59];
  const bfsResult = bfs(maze, start, goal);
  const aStarResult = aStar(maze, start, goal);
  console.log(`BFS distance=${bfsResult.distance}, visited=${bfsResult.visited}`);
  console.log(`A*  distance=${aStarResult.distance}, visited=${aStarResult.visited}`);
}

async function main() {
  const rl = readline.createInterface({ input, output });
  try {
    while (true) {
      console.log('\n=======================================');
      console.log(' PROBLEM SOLVING & DATA ORGANIZATION ');
      console.log('=======================================');
      console.log('1. Basic algorithms');
      console.log('2. Data structures');
      console.log('3. Maze BFS vs A*');
      console.log('4. Benchmark');
      console.log('0. Exit');
      const choice = (await rl.question('Choose: ')).trim();

      if (choice === '1') runBasicDemo();
      else if (choice === '2') runDataStructureDemo();
      else if (choice === '3') runMazeDemo();
      else if (choice === '4') console.log(runBenchmark());
      else if (choice === '0') break;
      else console.log('Invalid choice.');
    }
  } finally {
    rl.close();
  }
}

if (require.main === module) main();

module.exports = { runBasicDemo, runDataStructureDemo, runMazeDemo };
