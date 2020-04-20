/**
 * intervals-composite
 * @copyright 2020 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

/**
 * @class
 * represents an individual interval
 * that runs a callback every number of milliseconds
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
    this._timeout = null;
    this._isRunning = false;
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
    return this._isRunning;
  }

  /**
   * @public
   * starts the interval
   */
  start() {
    this._timeout = setInterval(this._cb, this._ms);
    this._isRunning = true;
  }

  /**
   * @public
   * clears the interval
   */
  clear() {
    clearInterval(this._timeout);
    this._isRunning = false;
    this._timeout = null;
  }
}

module.exports = Interval;
