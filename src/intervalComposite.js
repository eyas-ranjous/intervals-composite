/**
 * intervals-composite
 * @copyright 2020 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

const Interval = require('./interval');

/**
 * @class
 * represents a composite of Intervals
 */
class IntervalComposite {
  constructor(label) {
    this._label = label || '';
    this._intervals = new Map();
  }

  /**
   * @public
   * checks if an interval exists
   * @param {string} label
   * @return {boolean}
   */
  has(label) {
    return this._intervals.has(label);
  }

  /**
   * @public
   * adds an interval to the composite
   * @param {Interval} interval
   * @throws {Error}
   */
  add(interval) {
    if (!(interval instanceof Interval)) {
      throw new Error('IntervalComposite.add invalid interval');
    }

    if (this.has(interval.getLabel())) {
      throw new Error(
        `IntervalComposite.add "${interval.getLabel()}" label already exists`
      );
    }

    this._intervals.set(interval.getLabel(), interval);
  }

  /**
   * @public
   * gets the interval by its label
   * @param {string} label
   * @return {Interval}
   */
  get(label) {
    if (!this._intervals.has(label)) return null;

    return this._intervals.get(label);
  }

  /**
   * @public
   * gets the composite label
   * @return {string}
   */
  getLabel() {
    return this._label;
  }

  /**
   * @public
   * loop on the intervals
   * @param {function} cb
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
   * @param {function} cb
   * @param {string} label
   * @return {IntervalComposite}
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
