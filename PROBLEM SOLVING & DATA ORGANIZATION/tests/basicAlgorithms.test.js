const test = require('node:test');
const assert = require('node:assert/strict');
const { isPrime, nthPrime, reverseString, isPalindrome, kthLargest, characterFrequency } = require('../src/basicAlgorithms');

test('isPrime identifies prime and non-prime values', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(9), false);
});

test('nthPrime finds 1st, 10th and 25th prime', () => {
  assert.equal(nthPrime(1), 2);
  assert.equal(nthPrime(10), 29);
  assert.equal(nthPrime(25), 97);
});

test('nthPrime rejects invalid input', () => {
  assert.throws(() => nthPrime(0), RangeError);
  assert.throws(() => nthPrime(1.2), RangeError);
});

test('reverseString works without reverse()', () => {
  assert.equal(reverseString('abc'), 'cba');
  assert.equal(reverseString(''), '');
  assert.equal(reverseString('JavaScript'), 'tpircSavaJ');
});

test('isPalindrome ignores spaces and punctuation', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.equal(isPalindrome('hello'), false);
  assert.equal(isPalindrome(''), true);
});

test('kthLargest returns kth distinct largest value', () => {
  assert.equal(kthLargest([3, 1, 5, 5, 4], 1), 5);
  assert.equal(kthLargest([3, 1, 5, 5, 4], 3), 3);
});

test('kthLargest rejects invalid k', () => {
  assert.throws(() => kthLargest([], 1), RangeError);
  assert.throws(() => kthLargest([1, 2], 0), RangeError);
  assert.throws(() => kthLargest([1, 2], 3), RangeError);
});

test('characterFrequency counts repeated characters', () => {
  assert.deepEqual(Object.fromEntries(characterFrequency('banana')), { b: 1, a: 3, n: 2 });
  assert.deepEqual(Object.fromEntries(characterFrequency('')), {});
});
