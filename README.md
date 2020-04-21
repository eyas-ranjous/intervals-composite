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
    * [.getLabel()](#getlabel--)
    * [.getMs()](#getms)
    * [.getCb()](#getcb)
    * [.start()](#start-)
    * [.isRunning](#isrunning-)
    * [.clear()](#clear-)
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

<table>
  <tr><th align="center" colspan="3">constructor(params)</th></tr>
  <tr><td><b>name</b></td><td align="center"><b>type</b></td><td align="center"><b>props</b></td></tr>
  <tr>
    <td>params</td>
    <td>object</td>
    <td>
      cb <i>function</i><br><br>
      ms <i>number</i><br><br>
      label <i>string</i><br><br>
    </td>
  </tr>
</table>

##### Example
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
gets the interval label.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>string</td>
 </tr>
</table>

##### Example
```js
console.log(interval.getLabel()); // 'test-interval'
```

#### .getMs()
gets the interval ms.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>number</td>
 </tr>
</table>

##### Example
```js
console.log(interval.getMs()); // 3000
```

#### .getCb()
gets the interval callback.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>function</td>
 </tr>
</table>

##### Example
```js
console.log(interval.getCb()); // [Function: someFunction]
```

#### .start() 
starts the interval.

##### Example
```js
interval.start();
```

#### .isRunning() 
checks if the interval is running.

##### Example
```js
console.log(interval.isRunning()); // true
```

#### .clear() 
clears the interval

##### Example
```js
interval.clear();
```

### IntervalComposite

#### Construction

```js
const dataLoaders = new IntervalComposite('data-loaders');
```

#### .add(interval)
adds an interval.

```js
dataLoaders.add(new Interval({
  cb: () => { /* some code */ },
  ms: 70000,
  label: 'users' 
}));

dataLoaders.add(new Interval({
  cb: () => { /* some code */ },
  ms: 30000,
  label: 'products' 
}));

dataLoaders.add(new Interval({
  cb: () => { /* some code */ },
  ms: 10000,
  label: 'orders' 
}));
```

#### .has(label)
checks if a label exists.

```js
console.log(intervalcomposite.has('orders')); // true
```

#### .get(label)
gets an interval by its label.

```js
const ordersInterval = intervalcomposite.get('orders');

console.log(ordersInterval.getLabel()); // orders
console.log(ordersInterval.isRunning()); // false
```

#### .getLabel()
gets the composite label.

```js
console.log(dataLoaders.getLabel()); // data-loaders
```

#### .forEach()
traverses the intervals.

```js
IntervalComposite.forEach((interval) => {
  console.log(interval.getLabel());
});

/*
users
products
orders
*/
```

#### .filter()
filters the intervals using a callback.

```js
const filtered = IntervalComposite.filter((i) => i.getMs() > 20000);

filtered.forEach((interval) => {
  console.log(interval.getLabel());
});
/*
users
products
*/
```

#### .toArray()
converts the composite into an array of intervals.

```js
console.log(intervalcomposite.toArray());
```

#### .count()
gets the count of intervals.

```js
console.log(intervalcomposite.count()); // 3
```

#### .start()
starts the intervals

```js
console.log(intervalcomposite.start()); // 3
```

#### .isRunning()
checks if the intervals are started.

```js
console.log(intervalcomposite.isRunning()); // true
```

#### .clear()
clears the intervals.
```js
intervalcomposite.clear();
console.log(intervalcomposite.isRunning()); // false
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/node-work/intervals-composite/blob/master/LICENSE)

