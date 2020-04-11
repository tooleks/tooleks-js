import { assert } from 'chai';
import { SinonFakeTimers, stub, useFakeTimers } from 'sinon';
import waitUntil from '../../src/waitUntil/waitUntil';

describe('waitUntil/waitUntil', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should call given function with given interval', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(250);
    assert.strictEqual(func.callCount, 1);

    clock.tick(500);
    assert.strictEqual(func.callCount, 3);

    clock.tick(750);
    assert.strictEqual(func.callCount, 4);

    clock.tick(1000);
    assert.strictEqual(func.callCount, 4);

    return promise.catch(() => {
      // Promise must be resolved.
    });
  });

  it('should stop calling given function after timeout', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(1000);
    assert.strictEqual(func.callCount, 4);

    clock.tick(250);
    assert.strictEqual(func.callCount, 4);

    return promise.catch(() => {
      // Promise must be resolved.
    });
  });

  it('should stop calling given function after error is thrown', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(250);
    assert.strictEqual(func.callCount, 1);

    func.throws();

    clock.tick(750);
    assert.strictEqual(func.callCount, 2);

    return promise.catch(() => {
      // Promise must be resolved.
    });
  });

  it('should stop calling given function after value is returned', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(250);
    assert.strictEqual(func.callCount, 1);

    func.returns(true);

    clock.tick(750);
    assert.strictEqual(func.callCount, 2);

    return promise;
  });

  it('should resolve if given function returns truthy value', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(500);

    func.returns(42);

    clock.tick(250);

    return promise.then((value) => {
      assert.strictEqual(clock.now, 750);
      assert.strictEqual(value, 42);
    });
  });

  it('should reject if given function returns falsy value after given timeout', () => {
    const func = stub().returns(null);

    const promise = waitUntil(func, 1000, 250);

    clock.tick(1000);

    return promise.catch((error) => {
      assert.strictEqual(clock.now, 1000);
      assert.instanceOf(error, Error, 'Resolver function did not return truthy value during given timeout (1000ms).');
      // Promise must be resolved.
    });
  });
});
