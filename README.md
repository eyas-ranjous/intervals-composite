# intervals-composite

[![build:?](https://travis-ci.org/node-work/intervals-composite.svg?branch=master)](https://travis-ci.org/node-work/intervals-composite) [![npm](https://img.shields.io/npm/v/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/npm/dm/intervals-composite.svg)](https://www.npmjs.com/package/intervals-composite) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/intervals-composite)

Encapsulate javascript `.setInterval` & `.clearInterval` into an Interval class. It also adds an IntervalComposite that simplifies working with multiple intervals in an application.

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [Interval](#interval)
    * <a href="#construction-1">Construction</a>
    * <a href="#getlabel-1">.getLabel()</a>
    * [.getMs()](#getms)
    * [.getCb()](#getcb)
    * <a href="#start-1">.start()</a>
    * <a href="#isrunning-1">.isRunning()</a>
    * <a href="#clear-1">.clear()</a>
  * [IntervalComposite](#intervalcomposite)
    * <a href="#construction-2">Construction</a>
    * [.add(interval)](#addinterval)
    * [.has(label)](#haslabel)
    * <a href="#getlabel-2">.get(label)</a>
    * <a href="#getlabel-3">.getLabel()</a>
    * [.forEach(cb)](#foreachcb)
    * [.filter(cb, label)](#filtercb-label)
    * [.toArray()](#toarray)
    * [.count()](#count)
    * <a href="#start-2">.start()</a>
    * <a href="#isrunning-2">.isRunning()</a>
    * <a href="#clear-2">.clear()</a>
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

<h4><a id="construction-1"></a>Construction</h4>

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
  someFunction: () => console.log('test')
};

const interval = new Interval({
  cb: handler.someFunction,
  ms: 3000,
  label: 'test-interval'
});
```

<h4><a id="getLabel-1"></a>.getLabel()</h4>

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

<h4><a id="start-1"></a>.start()</h4>

starts the interval.

##### Example

```js
interval.start();
```

<h4><a id="isrunning-1"></a>.isRunning()</h4>

checks if the interval is running.

##### Example

```js
console.log(interval.isRunning()); // true

/*
test
test
test
.
.
.
*/
```

<h4><a id="clear-1"></a>.clear()</h4>

clears the interval

##### Example

```js
interval.clear();

console.log(interval.isRunning()); // false
```

### IntervalComposite

<h4><a id="construction-2"></a>Construction</h4>

<table>
  <tr><th align="center" colspan="2">constructor(label)</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr>
    <td>label</td>
    <td>string</td>
  </tr>
</table>

#### Example

```js
const dataLoaders = new IntervalComposite('data-loaders');
```

#### .add(interval)
adds an interval.

<table>
  <tr><th align="center" colspan="2">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr>
    <td>interval</td>
    <td>Interval</td>
  </tr>
</table>

#### Example

```js
dataLoaders.add(new Interval({
  cb: () => console.log('users'),
  ms: 7000,
  label: 'users' 
}));

dataLoaders.add(new Interval({
  cb: () => console.log('products'),
  ms: 3000,
  label: 'products' 
}));

dataLoaders.add(new Interval({
  cb: () => console.log('orders'),
  ms: 1000,
  label: 'orders' 
}));
```

#### .has(label)
checks if a label exists.

<table>
  <tr><th align="center" colspan="2">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr>
    <td>label</td>
    <td>string</td>
  </tr>
</table>

#### Example

```js
console.log(dataLoaders.has('orders')); // true
```

<h4><a id="getlabel-2"></a>.get(label)</h4>

gets an interval by its label.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>Interval</td>
 </tr>
</table>

##### Example

```js
const ordersInterval = dataLoaders.get('orders');

console.log(ordersInterval.getLabel()); // orders
console.log(ordersInterval.isRunning()); // false
```

<h4><a id="getlabel-3"></a>.getLabel()</h4>

gets the composite label.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>string</td>
 </tr>
</table>

##### Example
```js
console.log(dataLoaders.getLabel()); // data-loaders
```

#### .forEach(cb)
traverses the intervals.

<table>
  <tr><th align="center" colspan="2">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr>
    <td>cb</td>
    <td>function</td>
  </tr>
</table>

##### Example

```js
dataLoaders.forEach((interval) => {
  console.log(interval.getLabel());
});

/*
users
products
orders
*/
```

#### .filter(cb, label)
filters the intervals using a callback. It also accept an optional label to name the filtered composite.

<table>
  <tr><th align="center" colspan="2">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr>
    <td>cb</td>
    <td>function</td>
  </tr>
  <tr>
    <td>label</td>
    <td>string</td>
  </tr>
</table>

##### Example

```js
const slowLoaders = dataLoaders.filter((i) => i.getMs() > 1000, 'slow-intervals');

console.log(slowLoaders.getLabel()); // slow-intervals

slowLoaders.forEach((interval) => console.log(interval.getLabel()));
/*
users
products
*/
```

#### .toArray()
converts the composite into an array of intervals.

<table>
 <tr><th>return</th><th>item type</th></tr>
 <tr>
  <td>array</td>
  <td>Interval</td>
 </tr>
</table>

##### Example

```js
console.log(dataLoaders.toArray().map(i => i.getLabel()));

/*
[ 'users', 'products', 'orders' ]
*/
```

#### .count()
gets the count of intervals.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>number</td>
 </tr>
</table>

##### Example

```js
console.log(dataLoaders.count()); // 3
```

<h4><a id="start-2"></a>.start()</h4>

starts the intervals

##### Example

```js
dataLoaders.start();

/*
orders
orders
products
orders
orders
orders
products
orders
users
orders
orders
*/
```

<h4><a id="isrunning-2"></a>.isRunning()</h4>

checks if the intervals are started.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>boolean</td>
 </tr>
</table>

##### Example

```js
console.log(dataLoaders.isRunning()); // true
```

<h4><a id="clear-2"></a>.clear()</h4>

clears the intervals.

##### Example

```js
dataLoaders.clear();
console.log(dataLoaders.isRunning()); // false
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/node-work/intervals-composite/blob/master/LICENSE)

