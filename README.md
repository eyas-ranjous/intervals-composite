# intervals-composite

[![build:?](https://travis-ci.org/node-work/intervals-composite.svg?branch=master)](https://travis-ci.org/node-work/intervals-composite) [![npm](https://img.shields.io/npm/v/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/npm/dm/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/intervals-composite)

Encapsulate javascript `.setInterval` & `.clearInterval` into an Interval class. It also adds an IntervalComposite that enables working with multiple intervals in an application as an individual one.

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
    * [.isRunning](#isrunning)
    * [.clear()](#clear)
  * [IntervalComposite](#intervalcomposite)
    * [Construction](#construction)
    * [.add(interval)](#addinterval)
    * [.has(label)](#haslabel)
    * [.get(label)](#getlabel-)
    * [.getLabel()](#getlabel)
    * [.forEach(cb)](#foreachcb)
    * [.filter(cb, label)](#filtercb-label)
    * [.toArray()](#toarray)
    * [.count()](#count)
    * [.start()](#start)
    * [.isRunning()](#isrunning)
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

#### .isRunning()

#### .clear()

### IntervalComposite

#### Construction

#### .add(interval)

#### .has(label)

#### .get(label)

#### .getLabel()

#### .forEach()

#### .filter()

#### .toArray()

#### .count()

#### .start()

#### .isRunning()

#### .clear()

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/node-work/intervals-composite/blob/master/LICENSE)

