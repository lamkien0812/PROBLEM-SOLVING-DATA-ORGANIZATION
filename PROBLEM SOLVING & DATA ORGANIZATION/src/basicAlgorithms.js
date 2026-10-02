/**
 * Return the n-th prime number (1-indexed).
 * @param {number} n
 * @returns {number}
 */
function nthPrime(n) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError('n must be a positive integer');
  }

  let count = 0;
  let candidate = 1;
  while (count < n) {
    candidate += 1;
    if (isPrime(candidate)) count += 1;
  }
  return candidate;
}

/** @param {number} value @returns {boolean} */
function isPrime(value) {
  if (value < 2 || !Number.isInteger(value)) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;

  for (let divisor = 3; divisor * divisor <= value; divisor += 2) {
    if (value % divisor === 0) return false;
  }
  return true;
}

/**
 * Reverse a string without using Array.prototype.reverse().
 * @param {string} input
 * @returns {string}
 */
function reverseString(input) {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  let result = '';
  for (let i = input.length - 1; i >= 0; i -= 1) {
    result += input[i];
  }
  return result;
}

/**
 * Check palindrome while ignoring spaces and punctuation.
 * Case is ignored.
 * @param {string} input
 * @returns {boolean}
 */
function isPalindrome(input) {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  let left = 0;
  let right = input.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(input[left])) left += 1;
    while (left < right && !isAlphaNumeric(input[right])) right -= 1;

    if (input[left].toLowerCase() !== input[right].toLowerCase()) return false;
    left += 1;
    right -= 1;
  }
  return true;
}

/** @param {string} char @returns {boolean} */
function isAlphaNumeric(char) {
  return /^[a-z0-9]$/i.test(char);
}

/**
 * Find the k-th largest distinct integer.
 * @param {number[]} numbers
 * @param {number} k
 * @returns {number}
 */
function kthLargest(numbers, k) {
  if (!Array.isArray(numbers)) throw new TypeError('numbers must be an array');
  if (!Number.isInteger(k) || k < 1 || k > numbers.length) {
    throw new RangeError('k must be between 1 and the array length');
  }
  for (const n of numbers) {
    if (!Number.isInteger(n)) throw new TypeError('all array values must be integers');
  }

  const sorted = [...new Set(numbers)].sort((a, b) => b - a);
  if (k > sorted.length) throw new RangeError('k exceeds the number of distinct values');
  return sorted[k - 1];
}

/**
 * Count each character using Map.
 * @param {string} input
 * @returns {Map<string, number>}
 */
function characterFrequency(input) {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  const frequencies = new Map();
  for (const char of input) {
    frequencies.set(char, (frequencies.get(char) ?? 0) + 1);
  }
  return frequencies;
}

module.exports = {
  isPrime,
  nthPrime,
  reverseString,
  isPalindrome,
  kthLargest,
  characterFrequency,
};
