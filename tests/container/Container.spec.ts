import { assert } from 'chai';
import { fake } from 'sinon';
import Container from '../../src/container/Container';

describe('container/Container', () => {
  let container: Container;

  class ZeroDepsService {
    //
  }

  class TwoDepsService {
    constructor(public a: ZeroDepsService, public b: ZeroDepsService) {
      //
    }
  }

  class ThreeDepsService {
    // tslint:disable-next-line max-line-length
    constructor(public a: ZeroDepsService, public b: ZeroDepsService, public c: TwoDepsService) {
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
    container.instance('A', ZeroDepsService);
    assert.isTrue(container.has('A'));
  });

  it('should return false for not registered service', () => {
    assert.isFalse(container.delete('A'));
  });

  it('should return true for registered service', () => {
    container.instance('A', ZeroDepsService);
    assert.isTrue(container.delete('A'));
    assert.isFalse(container.delete('A'));
  });

  it('should throw an error when retrieving not registered service', () => {
    assert.throws(() => container.get('A'), Error, 'A not found.');
  });

  it('should register аn instance and retrieve the same instance', () => {
    const simpleService = new ZeroDepsService();
    container.instance('A', simpleService);
    assert.strictEqual(container.get('A'), simpleService);
    assert.strictEqual(container.get('A'), container.get('A'));
  });

  it('should register a service with no dependencies and retrieve an instance', () => {
    container.service('A', ZeroDepsService);
    assert.instanceOf(container.get('A'), ZeroDepsService);
  });

  it('should register a service with no dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    assert.notEqual(container.get('A'), container.get('A'));
  });

  it('should register a service with dependencies and retrieve an instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    assert.instanceOf(container.get('C'), TwoDepsService);
  });

  it('should register a service with dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    assert.notEqual(container.get('C'), container.get('C'));
  });

  it('should register a service with nested dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    container.service('D', ThreeDepsService, ['A', 'B', 'C']);
    assert.instanceOf(container.get('D'), ThreeDepsService);
  });

  it('should register a service with nested dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    container.service('D', ThreeDepsService, ['A', 'B', 'C']);
    assert.notEqual(container.get('D'), container.get('D'));
  });

  it('should register a factory with no dependencies and retrieve an instance', () => {
    const serviceFactory = () => new ZeroDepsService();
    container.factory('A', serviceFactory);
    assert.instanceOf(container.get('A'), ZeroDepsService);
  });

  it('should register a factory with no dependencies and retrieve a new instance', () => {
    const serviceFactory = () => new ZeroDepsService();
    container.factory('A', serviceFactory);
    assert.notEqual(container.get('A'), container.get('A'));
  });

  it('should register a factory with dependencies and retrieve an instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    // tslint:disable-next-line max-line-length
    const serviceFactory = (a: ZeroDepsService, b: ZeroDepsService) => new TwoDepsService(a, b);
    container.factory('C', serviceFactory, ['A', 'B']);
    assert.instanceOf(container.get('C'), TwoDepsService);
  });

  it('should register a factory with dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    // tslint:disable-next-line max-line-length
    const serviceFactory = (a: ZeroDepsService, b: ZeroDepsService) => new TwoDepsService(a, b);
    container.factory('C', serviceFactory, ['A', 'B']);
    assert.notEqual(container.get('C'), container.get('C'));
  });

  it('should register a factory with nested dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    // tslint:disable-next-line max-line-length
    const serviceFactory = (a: ZeroDepsService, b: ZeroDepsService, c: TwoDepsService) => new ThreeDepsService(a, b, c);
    container.factory('D', serviceFactory, ['A', 'B', 'C']);
    assert.instanceOf(container.get('D'), ThreeDepsService);
  });

  it('should register a factory with nested dependencies and retrieve a new instance', () => {
    container.service('A', ZeroDepsService);
    container.service('B', ZeroDepsService);
    container.service('C', TwoDepsService, ['A', 'B']);
    const serviceFactory = (a: ZeroDepsService, b: ZeroDepsService, c: TwoDepsService) => new ThreeDepsService(a, b, c);
    container.factory('D', serviceFactory, ['A', 'B', 'C']);
    assert.notEqual(container.get('D'), container.get('D'));
  });

  it('should throw an error when circular dependency detected', () => {
    container.factory('A', fake(), ['B']);
    // tslint:disable-next-line max-line-length
    assert.throws(() => container.factory('B', fake(), ['A']), Error, 'Circular dependency detected for B.');
  });

  it('should throw an error when nested circular dependency detected', () => {
    container.factory('A', fake(), ['B']);
    container.factory('B', fake(), ['D']);
    // tslint:disable-next-line max-line-length
    assert.throws(() => container.factory('D', fake(), ['A']), Error, 'Circular dependency detected for D.');
  });
});
