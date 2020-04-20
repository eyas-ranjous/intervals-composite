const { expect } = require('chai');
const sinon = require('sinon');
const Interval = require('../src/interval');
const IntervalComposite = require('../src/intervalComposite');

describe('IntervalComposite tests', () => {
  const cb1 = sinon.spy();
  const cb2 = sinon.spy();
  const cb3 = sinon.spy();
  let intervalComposite;

  describe('.constructor(label)', () => {
    it('creates an instance', () => {
      intervalComposite = new IntervalComposite('test-interval');
      expect(intervalComposite).to.be.instanceof(IntervalComposite);
    });
  });

  describe('.add(interval)', () => {
    it('adds intervals', () => {
      intervalComposite.add(new Interval({ cb: cb1, ms: 20, label: 'i1' }));
      intervalComposite.add(new Interval({ cb: cb2, ms: 25, label: 'i2' }));
      intervalComposite.add(new Interval({ cb: cb3, ms: 30, label: 'i3' }));
    });
  });

  describe('.getLabel()', () => {
    it('gets the label', () => {
      expect(intervalComposite.getLabel()).to.equal('test-interval');
    });
  });

  describe('count()', () => {
    it('gets the intervals count', () => {
      expect(intervalComposite.count()).to.equal(3);
    });
  });

  describe('.forEach(cb)', () => {
    it('loops on intervals', () => {
      const intervals = [];
      intervalComposite.forEach((interval) => intervals.push(interval));
      expect(intervals.map((i) => i.getLabel())).to.deep.equal([
        'i1', 'i2', 'i3'
      ]);
    });
  });

  describe('filter(cb, label)', () => {
    it('filters the intervals', () => {
      const filtered = intervalComposite.filter((i) => i.getMs() > 20);
      expect(filtered.toArray().map((i) => i.getLabel()))
        .to.deep.equal(['i2', 'i3']);
    });
  });

  describe('start()', () => {
    it('start the intervals', (done) => {
      intervalComposite.start();
      setTimeout(() => {
        expect(intervalComposite.get('i1').isRunning()).to.equal(true);
        expect(intervalComposite.get('i2').isRunning()).to.equal(true);
        expect(intervalComposite.get('i3').isRunning()).to.equal(true);
        expect(cb1.calledOnce).to.equal(true);
        expect(cb2.calledOnce).to.equal(true);
        expect(cb3.calledOnce).to.equal(true);
        done();
      }, 35);
    });
  });

  describe('.clear()', () => {
    it('clears the intervals', () => {
      intervalComposite.clear();
      expect(intervalComposite.get('i1').isRunning()).to.equal(false);
      expect(intervalComposite.get('i2').isRunning()).to.equal(false);
      expect(intervalComposite.get('i3').isRunning()).to.equal(false);
    });
  });
});
