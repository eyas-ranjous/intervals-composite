/**
 * intervals-composite
 * @copyright 2020 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

const Interval = require('./interval');

/**
 * @class
 * represents a composite of Interval objects
 */
class IntervalComposite {
  constructor(label) {
    this._label = label || '';
    this._intervals = new Map();
  }

  /**
   * @public
   * checks if an interval exists
   * @return {boolean}
   */
  has(interval) {
    if (!(interval instanceof Interval)) {
      throw new Error('IntervalComposite.has invalid Interval');
    }

    return this._intervals.has(interval.getLabel());
  }

  /**
   * @public
   * adds an interval to the composite
   * @param {object} interval props
   * @throws {Error}
   */
  add(interval) {
    if (!(interval instanceof Interval)) {
      throw new Error('IntervalComposite.add invalid interval');
    }

    if (this.has(interval)) {
      throw new Error(
        `IntervalComposite.add "${interval.getLabel()}" already added`
      );
    }

    this._intervals.set(interval.getLabel(), interval);
  }

  /**
   * @public
   * checks if an interval exists
   * @return {boolean}
   */
  get(label) {
    if (!this._intervals.has(label)) return null;

    return this._intervals.get(label);
  }

  /**
   * @public
   * @return {string}
   */
  getLabel() {
    return this._label;
  }

  /**
   * @public
   * loop on the intervals
   * @throws {Error}
   */
  forEach(cb) {
    if (typeof cb !== 'function') {
      throw new Error('IntervalComposite.forEach invalid callback');
    }

    this._intervals.forEach((interval) => cb(interval));
  }

  /**
   * @public
   * filters the intervals using a callback
   * @throws {Error}
   */
  filter(cb, label = '') {
    if (typeof cb !== 'function') {
      throw new Error('IntervalComposite.filter invalid callback');
    }
    const filtered = new IntervalComposite(label);
    this._intervals.forEach((interval) => {
      if (cb(interval)) {
        filtered.add(interval);
      }
    });
    return filtered;
  }

  /**
   * @public
   * @return {array}
   */
  toArray() {
    const intervals = [];
    this.forEach((interval) => intervals.push(interval));
    return intervals;
  }

  /**
   * @public
   * @return {number}
   */
  count() {
    return this._intervals.size;
  }

  /**
   * @public
   * starts all intervals
   */
  start() {
    this._intervals.forEach((interval) => interval.start());
  }

  /**
   * @public
   * clears all intervals
   */
  clear() {
    this._intervals.forEach((interval) => interval.clear());
  }
}

module.exports = IntervalComposite;
