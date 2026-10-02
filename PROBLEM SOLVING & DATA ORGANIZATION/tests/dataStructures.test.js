const test = require('node:test');
const assert = require('node:assert/strict');
const { ContactManager } = require('../src/contactManager');
const { GameRanking } = require('../src/gameRanking');
const { LRUCache } = require('../src/lruCache');

test('ContactManager supports add, find, update and delete', () => {
  const manager = new ContactManager();
  manager.add({ name: 'Alice', phone: '123', email: 'alice@example.com' });
  assert.equal(manager.find('alice').phone, '123');
  assert.equal(manager.update('Alice', { phone: '999' }), true);
  assert.equal(manager.find('ALICE').phone, '999');
  assert.equal(manager.remove('Alice'), true);
  assert.equal(manager.find('Alice'), undefined);
});

test('ContactManager rejects duplicate names and invalid emails', () => {
  const manager = new ContactManager();
  manager.add({ name: 'Alice', phone: '123', email: 'alice@example.com' });
  assert.throws(() => manager.add({ name: 'alice', phone: '456', email: 'other@example.com' }), /already exists/);
  assert.throws(() => manager.add({ name: 'Bob', phone: '456', email: 'invalid' }), /valid email/);
});

test('GameRanking returns exactly top 10 players', () => {
  const ranking = new GameRanking(10);
  for (let i = 1; i <= 20; i += 1) ranking.addScore(`P${i}`, i);
  const top = ranking.topN();
  assert.equal(top.length, 10);
  assert.equal(top[0].score, 20);
  assert.equal(top[9].score, 11);
});

test('GameRanking updates the same player score', () => {
  const ranking = new GameRanking(2);
  ranking.addScore('A', 10);
  ranking.addScore('A', 50);
  ranking.addScore('B', 20);
  assert.deepEqual(ranking.topN(), [{ player: 'A', score: 50 }, { player: 'B', score: 20 }]);
});

test('LRUCache evicts the least recently used key', () => {
  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('B', 2);
  assert.equal(cache.get('A'), 1);
  cache.put('C', 3);
  assert.equal(cache.get('B'), undefined);
  assert.deepEqual(cache.keys(), ['A', 'C']);
});

test('LRUCache updates existing keys without increasing size', () => {
  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('A', 2);
  assert.equal(cache.size(), 1);
  assert.equal(cache.get('A'), 2);
});
