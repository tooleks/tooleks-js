import { assert } from 'chai';
import { fake } from 'sinon';
import optional from '../../src/optional/optional';

describe('optional/optional', () => {
  it('should return the value from resolver function', () => {
    assert.strictEqual(optional(fake.returns(42)), 42);
  });

  it('should return default value when resolver function returns null', () => {
    assert.strictEqual(optional(fake.returns(null)), null);
  });

  it('should return default value when resolver function returns void', () => {
    assert.strictEqual(optional(fake.returns(undefined)), null);
  });

  it('should return default value when resolver function throws an Error', () => {
    assert.strictEqual(optional(fake.throws(new Error())), null);
  });

  it('should return custom default value when resolver function returns null', () => {
    assert.strictEqual(optional(fake.returns(null), 42), 42);
  });

  it('should return custom default value when resolver function returns void', () => {
    assert.strictEqual(optional(fake.returns(undefined), 42), 42);
  });

  it('should return custom default value when resolver function throws an Error', () => {
    assert.strictEqual(optional(fake.throws(new Error()), 42), 42);
  });
});
