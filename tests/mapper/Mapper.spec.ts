import { assert } from 'chai';
import { SinonStub, spy, stub } from 'sinon';
import Mapper from '../../src/mapper/Mapper';
import faker from 'faker';

describe('mapper/Mapper', () => {
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper();
  });

  it('should return false if mapping does not exist', () => {
    assert.isFalse(mapper.has('A', 'B'));
  });

  it('should return true if mapping exists', () => {
    mapper.register('A', 'B', spy());
    assert.isTrue(mapper.has('A', 'B'));
  });

  it('should throw an error if mapping does not exist', () => {
    const args = [
      { message: faker.lorem.text() },
      { message: faker.lorem.text() },
    ];

    // tslint:disable-next-line max-line-length
    assert.throws(() => mapper.map('A', 'B', ...args), Error, 'A to B binding not found.');
  });

  it('should call handler function and return the result of call if mapping exists', () => {
    const handler = stub().returns(42);

    mapper.register('A', 'B', handler);

    const args = [
      { message: faker.lorem.text() },
      { message: faker.lorem.text() },
    ];

    const result = mapper.map('A', 'B', ...args);

    assert.isTrue(handler.calledOnce);
    assert.isTrue(handler.calledWithExactly(...args));
    assert.strictEqual(result, 42);
  });
});
