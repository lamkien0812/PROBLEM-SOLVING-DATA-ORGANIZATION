/**
 * Contact manager backed by Map for fast average-case lookup by name.
 */
class ContactManager {
  constructor() {
    this.contacts = new Map();
  }

  /** @param {{name:string, phone:string, email:string}} contact */
  add(contact) {
    validateContact(contact);
    const key = normalize(contact.name);
    if (this.contacts.has(key)) throw new Error('A contact with this name already exists');
    this.contacts.set(key, { ...contact });
  }

  /** @param {string} name */
  remove(name) {
    return this.contacts.delete(normalize(name));
  }

  /** @param {string} name @param {Partial<{phone:string,email:string}>} changes */
  update(name, changes) {
    const key = normalize(name);
    const existing = this.contacts.get(key);
    if (!existing) return false;
    const updated = { ...existing, ...changes, name: existing.name };
    validateContact(updated);
    this.contacts.set(key, updated);
    return true;
  }

  /** @param {string} name */
  find(name) {
    const result = this.contacts.get(normalize(name));
    return result ? { ...result } : undefined;
  }

  /** @returns {Array<{name:string,phone:string,email:string}>} */
  getAll() {
    return [...this.contacts.values()].map((item) => ({ ...item }));
  }
}

function normalize(name) {
  if (typeof name !== 'string' || name.trim() === '') throw new TypeError('name must not be empty');
  return name.trim().toLowerCase();
}

function validateContact(contact) {
  if (!contact || typeof contact !== 'object') throw new TypeError('contact must be an object');
  if (typeof contact.name !== 'string' || contact.name.trim() === '') throw new Error('name is required');
  if (typeof contact.phone !== 'string' || contact.phone.trim() === '') throw new Error('phone is required');
  if (typeof contact.email !== 'string' || !contact.email.includes('@')) throw new Error('valid email is required');
}

module.exports = { ContactManager };
