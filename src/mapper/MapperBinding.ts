import TypeIdentifier from './TypeIdentifier';

export default class MapperBinding {
  readonly from: TypeIdentifier;
  readonly to: TypeIdentifier;
  readonly handler: Function;

  constructor(from: TypeIdentifier, to: TypeIdentifier, handler: Function) {
    this.from = from;
    this.to = to;
    this.handler = handler;
  }

  match(from: TypeIdentifier, to: TypeIdentifier): boolean {
    return this.from === from && this.to === to;
  }
}
