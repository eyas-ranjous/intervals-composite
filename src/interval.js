/**
 * intervals-composite
 * @copyright 2020 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

/**
 * @class
 * represents an individual interval object
 */
class Interval {
  constructor({ cb, ms, label }) {
    if (!(typeof cb === 'function')) {
      throw new Error('Interval: invalid callback function');
    }

    if (!(+ms > 0)) {
      throw new Error('Interval: invalid ms number');
    }

    this._cb = cb;
    this._ms = ms;
    this._label = label || '';
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
   * @return {number}
   */
  getMs() {
    return this._ms;
  }

  /**
   * @public
   * @return {function}
   */
  getCb() {
    return this._cb;
  }

  /**
   * @public
   * @return {boolean}
   */
  isRunning() {
    // eslint-disable-next-line no-underscore-dangle
    return (this._timeout && !this._timeout._destroyed) || false;
  }

  /**
   * @public
   * @return {string}
   */
  toString() {
    return `${this._label}:${this._ms}`;
  }

  /**
   * @public
   * starts the interval
   */
  start() {
    this._timeout = setInterval(this._cb, this._ms);
  }

  /**
   * @public
   * clears the interval
   */
  clear() {
    clearInterval(this._timeout);
  }
}

module.exports = Interval;
