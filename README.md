# intervals-composite

[![build:?](https://travis-ci.org/node-work/intervals-composite.svg?branch=master)](https://travis-ci.org/node-work/intervals-composite) [![npm](https://img.shields.io/npm/v/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/npm/dm/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/intervals-composite)

Encapsulate javascript `.setInterval` & `.clearInterval` into an Interval object. It also adds an IntervalComposite that enables working with multiple intervals in an application as an individual one.

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [Interval](#interval)
    * [Construction](#construction)
    * [.getLabel()](#getlabel)
    * [.getMs()](#getms)
    * [.getCb()](#getcb)
    * [.start()](#start)
    * [.clear()](#clear)
  * [IntervalComposite](#intervalcomposite)
    * [Construction](#construction)
    * [.add(interval)](#addinterval)
    * [.start()](#start)
    * [.clear()](#clear)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save intervals-composite
```

## API

### require

```js
const { Interval, IntervalComposite } = require('intervals-composite');
```

### import

```js
import { Interval, IntervalComposite } from 'intervals-composite';
```

### Interval
represents a single interval.

#### Construction

```js
const interval = new Interval({
  cb: () => console.log('test'),
  ms: 3000,
  label: 'test-interval'
});

// OR, if you have the callback in another object 

const handler = {
  someFunction: () => console.log()
};

const interval = new Interval({
  cb: handler.someFunction,
  ms: 3000,
  label: 'test-interval'
});
```

#### .getLabel()

#### .getMs()

#### .getCb()

#### .start()

#### .clear()

### IntervalComposite

#### Construction

#### .add(interval)

#### .start()

#### .clear()

## Usage
after installing the package, its exported object is cached on the first require so you only need to require it in any module that needs an ineterval to work with.

```js
const { Interval, IntervalComposite } = require('intervals-composite');
```

the exported object implements the following api:

### .interval(options)
Creates a single interval object without adding it to the collection.

the returned object encapsulates node global functions and exposes the following interface
#### .start()
start the interval

#### .clear()
clear the interval

```js
const testInterval = intervals.interval({
  cb: () => { /* some code */ },
  ms: 3000 // 3 seconds
});

// somewhere in the code, you can start it
testInterval.start();

// somewhere else in the code, you can clear it
testInterval.clear();
```

### .add(options)
Creates an interval and add it to the collection
```js
const intervals = require('intervals-composite');

// in some module
intervals.add({
  label: 'module_1_interval', // a unique name
  cb: () => { /* some code */ },
  ms: 3000
});

// in a different module
intervals.add({
  label: 'module_2_interval',
  cb: () => { /* some code */ },
  ms: 10000
});
```

### .count()
returns the count of intervals in the collection

```js
intervals.count(); // 2
```

### .get(label)
return an added interval object or null if it does not exist.

```js
const inetrval1 = intervals.get('module_1_interval');

// you can start this interval
interval1.start();

// or clear it
interval1.clear();
```

### .start()
starts all intervals in the collection.
```js
intervals.start();
```

### .clear()
clears all intervals in the collection. This is useful in the shutdown process to clear everything through one call.
```js
intervals.clear();
```

### .startOne(label)
starts one interval from the collection.
```js
intervals.startOne('module_1_interval');
```

### .clearOne(label)
clears one interval from the collections.
```js
intervals.clearOne('module_1_interval');
```

### .startSome(labels)
starts some intervals in the collection.
```js
intervals.startSome(['interval 1', 'interval 2']);
```

### .clearSome(labels)
clears some intervals in the collection.
```js
intervals.clearSome(['interval 1', 'interval 2']);
```

### .startExcept(labels)
starts all intervals except some in the collection.
```js
// start all intervals except "interval 1" & "interval 2"
intervals.startExcept(['interval 1', 'interval 2']);
```

### .clearExcept(labels)
clears all intervals except some in the collection.
```js
// clears all intervals except "interval 1" & "interval 2"
intervals.clearExcept(['interval 1', 'interval 2']);
```

### .remove(label)
clears and removes an interval from the collection by its label.

```js
intervals.remove('module_1_interval');

intervals.get('module_1_interval'); // null
```

### .removeAll()
clears and removes all intervals from the collection.
```
intervals.removeAll();

intervals.count(); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/node-work/intervals-composite/blob/master/LICENSE)

