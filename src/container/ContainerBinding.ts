import EntryIdentifier from './EntryIdentifier';

export default abstract class ContainerBinding {
  readonly dependencies: EntryIdentifier[];

  protected constructor(dependencies: EntryIdentifier[]) {
    this.dependencies = dependencies;
  }
}
