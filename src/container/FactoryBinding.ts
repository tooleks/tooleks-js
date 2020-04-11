import ContainerBinding from './ContainerBinding';
import Factory from './Factory';
import EntryIdentifier from './EntryIdentifier';

export default class FactoryBinding extends ContainerBinding {
  readonly factory: Factory;

  constructor(factory: Factory, dependencies: EntryIdentifier[] = []) {
    super(dependencies);
    this.factory = factory;
  }
}
