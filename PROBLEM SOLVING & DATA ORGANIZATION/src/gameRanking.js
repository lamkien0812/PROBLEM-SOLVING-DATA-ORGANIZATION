/**
 * Small min-heap implementation used to retain only the Top N scores.
 */
class MinHeap {
  constructor(limit) {
    this.limit = limit;
    this.items = [];
  }

  add(item) {
    if (this.items.length < this.limit) {
      this.items.push(item);
      this.up(this.items.length - 1);
      return;
    }
    if (item.score > this.items[0].score) {
      this.items[0] = item;
      this.down(0);
    }
  }

  values() {
    return [...this.items];
  }

  up(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.items[parent].score <= this.items[index].score) break;
      [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
      index = parent;
    }
  }

  down(index) {
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;

      if (left < this.items.length && this.items[left].score < this.items[smallest].score) smallest = left;
      if (right < this.items.length && this.items[right].score < this.items[smallest].score) smallest = right;
      if (smallest === index) break;

      [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
      index = smallest;
    }
  }
}

class GameRanking {
  constructor(limit = 10) {
    if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit must be positive');
    this.limit = limit;
    this.players = new Map();
  }

  /** @param {string} player @param {number} score */
  addScore(player, score) {
    if (typeof player !== 'string' || player.trim() === '') throw new Error('player name is required');
    if (!Number.isFinite(score)) throw new TypeError('score must be a number');
    this.players.set(player.trim(), score);
  }

  /** @returns {Array<{player:string,score:number}>} */
  topN() {
    const heap = new MinHeap(this.limit);
    for (const [player, score] of this.players) heap.add({ player, score });
    return heap.values().sort((a, b) => b.score - a.score || a.player.localeCompare(b.player));
  }
}

module.exports = { GameRanking, MinHeap };
