import ContainerBinding from './ContainerBinding';

export default class InstanceBinding extends ContainerBinding {
  readonly instance: any;

  constructor(instance: any) {
    super([]);
    this.instance = instance;
  }
}
