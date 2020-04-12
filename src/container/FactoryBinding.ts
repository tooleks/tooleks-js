import ContainerBinding from './ContainerBinding';
import FactoryEntry from './FactoryEntry';
import EntryIdentifier from './EntryIdentifier';

export default class FactoryBinding extends ContainerBinding {
  readonly factory: FactoryEntry;

  constructor(factory: FactoryEntry, dependencies: EntryIdentifier[] = []) {
    super(dependencies);
    this.factory = factory;
  }
}
