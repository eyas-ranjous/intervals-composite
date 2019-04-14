/**
 * intervals-composite
 * @copyright 2018 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

const intervals = {};
let counter = 0;

exports.count = () => counter;

exports.interval = (options) => {
  const { cb, ms } = options;
  let id = null;

  if (!(typeof cb === 'function')) {
    throw new Error(`interval: cb "${cb}" is not a valid cb function`);
  }
  if (!(+ms > 0)) {
    throw new Error(`interval: ms "${ms}" is not a valid ms number`);
  }

  const start = () => { id = setInterval(cb, ms); };
  const clear = () => clearInterval(id);
  return { start, clear };
};

exports.add = (options) => {
  const { label, cb, ms } = options;
  if (intervals[label] !== undefined) {
    throw new Error(`add: interval "${label}" already added`);
  }
  intervals[label] = this.interval({ cb, ms });
  counter += 1;
};

exports.get = label => intervals[label] || null;

exports.remove = (label) => {
  if (intervals[label] !== undefined) {
    intervals[label].clear();
    delete intervals[label];
    counter -= 1;
  }
};

exports.removeAll = () => (
  Object.keys(intervals).forEach(label => this.remove(label))
);

exports.start = () => (
  Object.keys(intervals).forEach(label => intervals[label].start())
);

exports.clear = () => (
  Object.keys(intervals).forEach(label => intervals[label].clear())
);

exports.startOne = (label) => {
  if (intervals[label] === undefined) {
    throw new Error(`startOne: interval "${label}" not added`);
  }
  intervals[label].start();
};

exports.clearOne = (label) => {
  if (intervals[label] === undefined) {
    throw new Error(`clearOne: interval "${label}" not added`);
  }
  intervals[label].clear();
};

exports.startSome = labels => (
  labels.forEach(label => intervals[label].start())
);

exports.clearSome = labels => (
  labels.forEach(label => intervals[label].clear())
);

exports.startExcept = labels => (
  Object.keys(intervals).forEach(
    label => !labels.includes(label) && intervals[label].start()
  )
);

exports.clearExcept = labels => (
  Object.keys(intervals).forEach(
    label => !labels.includes(label) && intervals[label].clear()
  )
);
