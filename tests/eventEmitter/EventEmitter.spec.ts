import { assert } from 'chai';
import { fake } from 'sinon';
import faker from 'faker';
import EventEmitter from '../../src/eventEmitter/EventEmitter';

describe('eventEmitter/EventEmitter', () => {
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    eventEmitter = new EventEmitter();
  });

  it('should return zero if no listeners were registered for event', () => {
    assert.strictEqual(eventEmitter.listenerCount('A'), 0);
  });

  it('should return number of listeners registered for event', () => {
    eventEmitter.on('A', fake());
    eventEmitter.on('A', fake());
    eventEmitter.on('A', fake());

    assert.strictEqual(eventEmitter.listenerCount('A'), 3);
  });

  it('should return number of listeners registered for multiple events', () => {
    eventEmitter.on('A', fake());
    eventEmitter.on('A', fake());
    eventEmitter.on('A', fake());

    eventEmitter.on('B', fake());
    eventEmitter.on('B', fake());

    assert.strictEqual(eventEmitter.listenerCount('A'), 3);
    assert.strictEqual(eventEmitter.listenerCount('B'), 2);
  });

  it('should return an empty array if no listeners registered for event', () => {
    assert.lengthOf(eventEmitter.listeners('A'), 0);
  });

  it('should return an array of listeners registered for event', () => {
    const a1 = fake();
    const a2 = fake();
    const a3 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);
    eventEmitter.on('A', a3);

    assert.deepStrictEqual(eventEmitter.listeners('A'), [a1, a2, a3]);
    assert.notEqual(eventEmitter.listeners('A'), eventEmitter.listeners('A'));
  });

  it('should return an array of listeners registered for multiple events', () => {
    const a1 = fake();
    const a2 = fake();
    const a3 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);
    eventEmitter.on('A', a3);

    const b1 = fake();
    const b2 = fake();

    eventEmitter.on('B', b1);
    eventEmitter.on('B', b2);

    assert.deepStrictEqual(eventEmitter.listeners('A'), [a1, a2, a3]);
    assert.notEqual(eventEmitter.listeners('A'), eventEmitter.listeners('A'));

    assert.deepStrictEqual(eventEmitter.listeners('B'), [b1, b2]);
    assert.notEqual(eventEmitter.listeners('B'), eventEmitter.listeners('B'));
  });

  it('should resolve false when no listeners registered for event', async () => {
    assert.isFalse(await eventEmitter.emit('A'));
  });

  it('should resolve true when listeners registered for event', async () => {
    eventEmitter.on('A', fake());
    assert.isTrue(await eventEmitter.emit('A'));
  });

  it('should not remove not registered listener for event', () => {
    const a1 = fake();
    const a2 = fake();

    eventEmitter.on('A', a1);

    assert.strictEqual(eventEmitter.listenerCount('A'), 1);

    eventEmitter.off('A', a2);

    assert.strictEqual(eventEmitter.listenerCount('A'), 1);
  });

  it('should remove registered listener for event', () => {
    const a1 = fake();
    const a2 = fake();
    const a3 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);
    eventEmitter.on('A', a3);

    assert.deepStrictEqual(eventEmitter.listeners('A'), [a1, a2, a3]);

    eventEmitter.off('A', a2);

    assert.deepStrictEqual(eventEmitter.listeners('A'), [a1, a3]);
  });

  it('should call listeners without arguments for event', async () => {
    const a1 = fake();
    const a2 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);

    await eventEmitter.emit('A');

    assert.isTrue(a1.calledOnce);
    assert.isTrue(a2.calledOnce);
    assert.isTrue(a2.calledAfter(a1));
  });

  it('should call listeners with arguments for event', async () => {
    const a1 = fake();
    const a2 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);

    const args = [
      { message: faker.lorem.text() },
      { message: faker.lorem.text() },
    ];

    await eventEmitter.emit('A', ...args);

    assert.isTrue(a1.calledOnce);
    assert.isTrue(a1.calledWithExactly(...args));
    assert.isTrue(a2.calledOnce);
    assert.isTrue(a2.calledWithExactly(...args));
    assert.isTrue(a2.calledAfter(a1));
  });

  it('should call listeners with arguments for multiple events', async () => {
    const a1 = fake();
    const a2 = fake();

    eventEmitter.on('A', a1);
    eventEmitter.on('A', a2);

    const b1 = fake();
    const b2 = fake();
    const b3 = fake();

    eventEmitter.on('B', b1);
    eventEmitter.on('B', b2);
    eventEmitter.on('B', b3);

    const args = [
      { message: faker.lorem.text() },
      { message: faker.lorem.text() },
    ];

    await eventEmitter.emit('A', ...args);

    assert.isTrue(a1.calledOnce);
    assert.isTrue(a1.calledWithExactly(...args));
    assert.isTrue(a2.calledOnce);
    assert.isTrue(a2.calledWithExactly(...args));
    assert.isTrue(a2.calledAfter(a1));

    assert.isTrue(b1.notCalled);
    assert.isTrue(b2.notCalled);
    assert.isTrue(b3.notCalled);

    await eventEmitter.emit('B', ...args);

    assert.isTrue(a1.calledOnce);
    assert.isTrue(a1.calledWithExactly(...args));
    assert.isTrue(a2.calledOnce);
    assert.isTrue(a2.calledWithExactly(...args));
    assert.isTrue(a2.calledAfter(a1));

    assert.isTrue(b1.calledOnce);
    assert.isTrue(b1.calledWithExactly(...args));
    assert.isTrue(b2.calledOnce);
    assert.isTrue(b2.calledWithExactly(...args));
    assert.isTrue(b2.calledAfter(b1));
    assert.isTrue(b3.calledOnce);
    assert.isTrue(b3.calledWithExactly(...args));
    assert.isTrue(b3.calledAfter(b2));
  });
});
