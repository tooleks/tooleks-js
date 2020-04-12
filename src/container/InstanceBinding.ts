import ContainerBinding from './ContainerBinding';
import InstanceEntry from './InstanceEntry';

export default class InstanceBinding extends ContainerBinding {
  readonly instance: InstanceEntry;

  constructor(instance: InstanceEntry) {
    super([]);
    this.instance = instance;
  }
}
