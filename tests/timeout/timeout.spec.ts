import { assert } from 'chai';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import timeout from '../../src/timeout/timeout';

describe('timeout/timeout', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should resolve promise after default timeout', () => {
    const promise = timeout();

    clock.tick(1);

    return promise.then(() => {
      assert.strictEqual(clock.now, 1);
    });
  });

  it('should resolve promise after specified timeout', () => {
    const promise = timeout(1000);

    clock.tick(1000);

    return promise.then(() => {
      assert.strictEqual(clock.now, 1000);
    });
  });
});
