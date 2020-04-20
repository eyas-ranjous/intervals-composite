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

  describe('.toString()', () => {
    it('gets the string version', () => {
      expect(interval.toString()).to.equal('test-interval:20');
    });
  });

  describe('.clear()', () => {
    it('clears the interval', () => {
      interval.clear();
      expect(interval.isRunning()).to.equal(false);
    });
  });
});
