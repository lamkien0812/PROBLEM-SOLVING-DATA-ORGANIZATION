/**
 * LRU cache implemented with Map insertion order.
 */
class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new RangeError('capacity must be positive');
    this.capacity = capacity;
    this.cache = new Map();
  }

  /** @param {string} key */
  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /** @param {string} key @param {unknown} value */
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    while (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  /** @returns {string[]} */
  keys() {
    return [...this.cache.keys()];
  }

  size() {
    return this.cache.size;
  }
}

module.exports = { LRUCache };
