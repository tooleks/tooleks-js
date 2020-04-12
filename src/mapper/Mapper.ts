import TypeIdentifier from './TypeIdentifier';
import MapperBinding from './MapperBinding';
import MapperError from './MapperError';

export default class Mapper {
  private readonly bindings: MapperBinding[];

  constructor() {
    this.bindings = [];
  }

  /**
   * Registers a new mapping for the given identifiers.
   */
  register(from: TypeIdentifier, to: TypeIdentifier, handler: Function): Mapper {
    const binding = new MapperBinding(from, to, handler);
    this.bindings.push(binding);
    return this;
  }

  /**
   * Returns true if the mapper can map a value for the given identifiers.
   * Returns false otherwise.
   */
  has(from: TypeIdentifier, to: TypeIdentifier): boolean {
    return this.bindings.some(binding => binding.match(from, to));
  }

  /**
   * Maps a value for the given identifiers.
   */
  map(from: TypeIdentifier, to: TypeIdentifier, ...args: any[]): any {
    return this.get(from, to)(...args);
  }

  private get(from: TypeIdentifier, to: TypeIdentifier): Function {
    if (!this.has(from, to)) {
      throw new MapperError(`${from} to ${to} binding not found.`);
    }

    const binding = this.bindings.find(binding => binding.match(from, to)) as MapperBinding;

    return binding.handler;
  }
}
