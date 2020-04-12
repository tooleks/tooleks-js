import { assert } from 'chai';
import { Inject, Injectable } from '../../src/container/Decorators';
import staticContainer from '../../src/container/staticContainer';

describe('container/Decorators', () => {
  @Injectable('A')
  class A {
    //
  }

  @Injectable('B')
  class B {
    constructor(@Inject('A') public a: A) {
      //
    }
  }

  @Injectable('C')
  class C {
    constructor(@Inject('A') public a: A, @Inject('B') public b: B) {
      //
    }
  }

  it('should retrieve a new instance of service without dependencies', () => {
    assert.instanceOf(staticContainer.get('A'), A);
    assert.notEqual(staticContainer.get('A'), staticContainer.get('A'));
  });

  it('should retrieve a new instance of service with nested dependencies', () => {
    assert.instanceOf(staticContainer.get('C'), C);
    assert.notEqual(staticContainer.get('C'), staticContainer.get('C'));
    const c = staticContainer.get('C') as C;
    assert.instanceOf(c.a, A);
    assert.instanceOf(c.b, B);
    assert.instanceOf(c.b.a, A);
  });
});
