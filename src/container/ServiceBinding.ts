import ContainerBinding from './ContainerBinding';
import ServiceEntry from './ServiceEntry';
import EntryIdentifier from './EntryIdentifier';

export default class ServiceBinding extends ContainerBinding {
  readonly service: ServiceEntry;

  constructor(service: ServiceEntry, dependencies: EntryIdentifier[] = []) {
    super(dependencies);
    this.service = service;
  }
}
