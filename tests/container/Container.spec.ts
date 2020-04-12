import { assert } from 'chai';
import { fake } from 'sinon';
import Container from '../../src/container/Container';

describe('container/Container', () => {
  let container: Container;

  class A {
    //
  }

  class B {
    constructor(public a: A) {
      //
    }
  }

  class C {
    constructor(public a: A, public b: B) {
      //
    }
  }

  beforeEach(() => {
    container = new Container();
  });

  it('should return false for not registered service', () => {
    assert.isFalse(container.has('A'));
  });

  it('should return true for registered service', () => {
    assert.isFalse(container.has('A'));
    container.instance('A', A);
    assert.isTrue(container.has('A'));
  });

  it('should return false for not registered service', () => {
    assert.isFalse(container.delete('A'));
  });

  it('should return true for registered service', () => {
    container.instance('A', A);
    assert.isTrue(container.delete('A'));
    assert.isFalse(container.delete('A'));
  });

  it('should throw an error when retrieving not registered service', () => {
    assert.throws(() => container.get('A'), Error, 'A not found.');
  });

  it('should register аn instance and retrieve the same instance', () => {
    const a = new A();
    container.instance('A', a);
    assert.strictEqual(container.get('A'), a);
    assert.strictEqual(container.get('A'), container.get('A'));
  });

  it('should register a service with no dependencies and retrieve an instance', () => {
    container.service('A', A);
    assert.instanceOf(container.get('A'), A);
  });

  it('should register a service with no dependencies and retrieve a new instance', () => {
    container.service('A', A);
    assert.notEqual(container.get('A'), container.get('A'));
  });

  it('should register a service with dependencies and retrieve an instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    assert.instanceOf(container.get('B'), B);
  });

  it('should register a service with dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    assert.notEqual(container.get('B'), container.get('B'));
  });

  it('should register a service with nested dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    container.service('C', C, ['A', 'B']);
    assert.instanceOf(container.get('C'), C);
  });

  it('should register a service with nested dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    container.service('C', C, ['A', 'B']);
    assert.notEqual(container.get('C'), container.get('C'));
  });

  it('should register a factory with no dependencies and retrieve an instance', () => {
    const makeA = () => new A();
    container.factory('A', makeA);
    assert.instanceOf(container.get('A'), A);
  });

  it('should register a factory with no dependencies and retrieve a new instance', () => {
    const makeA = () => new A();
    container.factory('A', makeA);
    assert.notEqual(container.get('A'), container.get('A'));
  });

  it('should register a factory with dependencies and retrieve an instance', () => {
    container.service('A', A);
    container.service('B', B);
    // tslint:disable-next-line max-line-length
    const makeC = (a: A, b: B) => new C(a, b);
    container.factory('C', makeC, ['A', 'B']);
    assert.instanceOf(container.get('C'), C);
  });

  it('should register a factory with dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    // tslint:disable-next-line max-line-length
    const makeC = (a: A, b: B) => new C(a, b);
    container.factory('C', makeC, ['A', 'B']);
    assert.notEqual(container.get('C'), container.get('C'));
  });

  it('should register a factory with nested dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    // tslint:disable-next-line max-line-length
    const makeC = (a: A, b: B) => new C(a, b);
    container.factory('C', makeC, ['A', 'B']);
    assert.instanceOf(container.get('C'), C);
  });

  it('should register a factory with nested dependencies and retrieve a new instance', () => {
    container.service('A', A);
    container.service('B', B, ['A']);
    const makeC = (a: A, b: B) => new C(a, b);
    container.factory('C', makeC, ['A', 'B']);
    assert.notEqual(container.get('C'), container.get('C'));
  });

  it('should throw an error when circular dependency detected', () => {
    container.factory('A', fake(), ['B']);
    // tslint:disable-next-line max-line-length
    assert.throws(() => container.factory('B', fake(), ['A']), Error, 'Circular dependency detected for B.');
  });

  it('should throw an error when nested circular dependency detected', () => {
    container.factory('A', fake(), ['B']);
    container.factory('B', fake(), ['C']);
    // tslint:disable-next-line max-line-length
    assert.throws(() => container.factory('C', fake(), ['A']), Error, 'Circular dependency detected for C.');
  });
});
