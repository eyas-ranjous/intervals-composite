const { expect } = require('chai');
const sinon = require('sinon');
const intervals = require('./index');

describe('intervals tests', () => {
  it('should create & clear one interval', (done) => {
    const cb = sinon.spy();
    const ms = 20;
    const interval = intervals.interval({ cb, ms });
    interval.start();
    setTimeout(() => {
      expect(cb.calledOnce).to.equal(true);
      interval.clear();
      done();
    }, 30);
  });

  it('should throw an error if cb is not a function', () => {
    expect(() => intervals.interval({ cb: 'test', ms: 10 }))
      .to.throw(Error).and.to
      .have.property('message', 'cb "test" is not a valid callback function');
  });

  it('should throw an error if ms is not a number', () => {
    expect(() => intervals.interval({ cb: sinon.stub(), ms: 'test' }))
      .to.throw(Error).and.to
      .have.property('message', 'ms "test" is not a valid milliseconds number');
    expect(() => intervals.interval({ cb: sinon.stub(), ms: -100 }))
      .to.throw(Error).and.to
      .have.property('message', 'ms "-100" is not a valid milliseconds number');
  });

  it('should add & clear many intervals', (done) => {
    const cb = sinon.spy();
    const ms = 20;
    intervals.add({ label: 'interval 1', cb, ms });
    intervals.add({ label: 'interval 2', cb, ms });
    intervals.add({ label: 'interval 3', cb, ms });
    intervals.start();
    setTimeout(() => {
      expect(cb.calledThrice).to.equal(true);
      intervals.clear();
      done();
    }, 30);
  });

  it('should throw an error when trying to add an existing interval', () => {
    expect(() => intervals.add({ label: 'interval 1' })).to.throw(Error)
      .and.to.have.property('message', 'interval "interval 1" already added');
  });

  it(
    'should have the count of added intervals',
    () => expect(intervals.count()).to.equal(3)
  );

  it('should get an interval by its label', () => {
    expect(intervals.get('interval 1')).to.be.an('object');
    expect(intervals.get('interval 11')).to.equal(null);
  });

  it('should remove an interval by its label', () => {
    intervals.remove('interval 1');
    expect(intervals.count()).to.equal(2);
    intervals.remove('interval 11');
    expect(intervals.count()).to.equal(2);
  });

  it('should remove all intervals', () => {
    intervals.removeAll();
    expect(intervals.count()).to.equal(0);
  });
});
