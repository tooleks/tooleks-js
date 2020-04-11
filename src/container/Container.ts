import EntryIdentifier from './EntryIdentifier';
import ServiceBinding from './ServiceBinding';
import FactoryBinding from './FactoryBinding';
import ContainerError from './ContainerError';
import ContainerBinding from './ContainerBinding';
import InstanceBinding from './InstanceBinding';
import Factory from './Factory';
import Service from './Service';

export default class Container {
  private readonly bindings: Map<EntryIdentifier, ContainerBinding>;

  constructor() {
    this.bindings = new Map();
  }

  /**
   * Registers a new service class binding in the container.
   */
  service(identifier: EntryIdentifier, service: Service, dependencies: EntryIdentifier[] = []): Container {
    const binding = new ServiceBinding(service, dependencies);
    this.detectCircularDependencies(identifier, binding);
    this.bindings.set(identifier, binding);
    return this;
  }

  /**
   * Registers a new factory function binding in the container.
   */
  factory(identifier: EntryIdentifier, factory: Factory, dependencies: EntryIdentifier[] = []): Container {
    const binding = new FactoryBinding(factory, dependencies);
    this.detectCircularDependencies(identifier, binding);
    this.bindings.set(identifier, binding);
    return this;
  }

  /**
   * Registers an existing instance as shared in the container.
   */
  instance(identifier: EntryIdentifier, instance: any): Container {
    const binding = new InstanceBinding(instance);
    this.bindings.set(identifier, binding);
    return this;
  }

  /**
   * Returns true if the container can return an entry for the given identifier.
   * Returns false otherwise.
   */
  has(identifier: EntryIdentifier): boolean {
    return this.bindings.has(identifier);
  }

  /**
   * Deletes an entry for the given identifier from the container.
   * Returns true if an entry was found and deleted.
   * Returns false otherwise.
   */
  delete(identifier: EntryIdentifier): boolean {
    return this.bindings.delete(identifier);
  }

  /**
   * Resolves an entry of the container by its identifier and returns it.
   *
   * @throws ContainerError
   */
  get<T>(identifier: EntryIdentifier): T {
    if (!this.has(identifier)) {
      throw new ContainerError(`${identifier} not found.`);
    }

    const binding = this.bindings.get(identifier) as ContainerBinding;

    if (binding instanceof ServiceBinding) {
      const dependencies = this.resolveDependencies(binding);
      return new binding.service(...dependencies);
    }

    if (binding instanceof FactoryBinding) {
      const dependencies = this.resolveDependencies(binding);
      return binding.factory(...dependencies);
    }

    if (binding instanceof InstanceBinding) {
      return binding.instance;
    }

    /* istanbul ignore next */
    throw new ContainerError('Unknown binding type.');
  }

  private resolveDependencies(binding: ContainerBinding): any[] {
    return binding.dependencies.map(dependency => this.get(dependency));
  }

  private detectCircularDependencies(identifier: EntryIdentifier, binding: ContainerBinding): void {
    binding.dependencies.forEach((dependency) => {
      if (dependency === identifier) {
        throw new ContainerError(`Circular dependency detected for ${identifier}.`);
      } else if (this.has(dependency)) {
        this.detectCircularDependencies(identifier, this.bindings.get(dependency) as ContainerBinding);
      }
    });
  }
}
