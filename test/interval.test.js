const { expect } = require('chai');
const sinon = require('sinon');
const Interval = require('../src/interval');

describe('Interval tests', () => {
  const cbMock = sinon.spy();
  let interval;

  describe('constructor({ cb, ms, label })', () => {
    it('creates an instance', () => {
      interval = new Interval({
        label: 'test-interval',
        ms: 20,
        cb: cbMock
      });
      expect(interval).to.be.instanceof(Interval);
      expect(interval.isRunning()).to.equal(false);
    });

    it('throws an error if cb is invalid function', () => {
      expect(() => new Interval({ ms: 10 })).to.throw(Error)
        .and.to.have.property('message', 'Interval: invalid callback function');
    });

    it('throws an error if ms is invalid number', () => {
      expect(() => new Interval({ cb: sinon.stub() })).to.throw(Error)
        .and.to.have.property('message', 'Interval: invalid ms number');
    });
  });

  describe('.getLabel()', () => {
    it('gets the label', () => {
      expect(interval.getLabel()).to.equal('test-interval');
    });
  });

  describe('.getMs()', () => {
    it('gets the ms', () => {
      expect(interval.getMs()).to.equal(20);
    });
  });

  describe('.getCb()', () => {
    it('gets the cb', () => {
      expect(interval.getCb()).to.equal(cbMock);
    });
  });

  describe('.start()', () => {
    it('starts the interval', (done) => {
      interval.start();
      setTimeout(() => {
        expect(cbMock.calledOnce).to.equal(true);
        done();
      }, 30);
    });
  });

  describe('.isRunning()', () => {
    it('checks if the interval is running', () => {
      expect(interval.isRunning()).to.equal(true);
    });
  });

  describe('.clear()', () => {
    it('clears the interval', () => {
      interval.clear();
      expect(interval.isRunning()).to.equal(false);
    });
  });
});
