const { expect } = require('chai');
const sinon = require('sinon');
const intervals = require('./index');

describe('intervals tests', () => {
  const cb = sinon.spy();

  it('should create & clear one interval', (done) => {
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
      .have.property(
        'message',
        'interval: cb "test" is not a valid cb function'
      );
  });

  it('should throw an error if ms is not a number', () => {
    expect(() => intervals.interval({ cb: sinon.stub(), ms: 'test' }))
      .to.throw(Error).and.to
      .have.property(
        'message',
        'interval: ms "test" is not a valid ms number'
      );
    expect(() => intervals.interval({ cb: sinon.stub(), ms: -100 }))
      .to.throw(Error).and.to
      .have.property(
        'message',
        'interval: ms "-100" is not a valid ms number'
      );
  });

  it('should start & clear intervals', (done) => {
    const ms = 20;
    intervals.add({ label: 'interval 1', cb, ms });
    intervals.add({ label: 'interval 2', cb, ms });
    intervals.add({ label: 'interval 3', cb, ms });
    intervals.start();
    setTimeout(() => {
      expect(cb.callCount).to.equal(4);
      intervals.clear();
      done();
    }, 30);
  });

  it('should start and clear one interval', (done) => {
    intervals.startOne('interval 2');
    setTimeout(() => {
      expect(cb.callCount).to.equal(5);
      intervals.clearOne('interval 2');
      done();
    }, 30);
  });

  it('should throw error when trying to start none-exsiting inteval', () => {
    expect(() => intervals.startOne('not_found')).to.throw(Error)
      .and.to.have.property(
        'message',
        'startOne: interval "not_found" not added'
      );

    expect(() => intervals.clearOne('not_found')).to.throw(Error)
      .and.to.have.property(
        'message',
        'clearOne: interval "not_found" not added'
      );
  });

  it('should start and clear some intervals', (done) => {
    intervals.startSome(['interval 1', 'interval 2']);
    setTimeout(() => {
      expect(cb.callCount).to.equal(7);
      intervals.clearSome(['interval 1', 'interval 2']);
      done();
    }, 30);
  });

  it('should start and clear intervals except some', (done) => {
    intervals.startExcept(['interval 1', 'interval 2']); // start interval 3
    setTimeout(() => {
      expect(cb.callCount).to.equal(8);
      intervals.clearExcept(['interval 1', 'interval 2']); // clears interval 3
      done();
    }, 30);
  });

  it('should throw an error when trying to add an existing interval', () => {
    expect(() => intervals.add({ label: 'interval 1' })).to.throw(Error)
      .and.to.have.property(
        'message',
        'add: interval "interval 1" already added'
      );
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
