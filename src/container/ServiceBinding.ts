import ContainerBinding from './ContainerBinding';
import Service from './Service';
import EntryIdentifier from './EntryIdentifier';

export default class ServiceBinding extends ContainerBinding {
  readonly service: Service;

  constructor(service: Service, dependencies: EntryIdentifier[] = []) {
    super(dependencies);
    this.service = service;
  }
}
