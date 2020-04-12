import EntryIdentifier from './EntryIdentifier';
import ServiceEntry from './ServiceEntry';
import staticContainer from './staticContainer';

const metadata = new WeakMap<ServiceEntry, EntryIdentifier[]>();

// tslint:disable-next-line function-name
export function Injectable(identifier: EntryIdentifier) {
  return function (target: ServiceEntry) {
    let dependencies: EntryIdentifier[] = [];
    if (metadata.has(target)) {
      dependencies = metadata.get(target) as EntryIdentifier[];
    }
    staticContainer.service(identifier, target, dependencies);
  };
}

// tslint:disable-next-line function-name
export function Inject(identifier: EntryIdentifier): any {
  return function (target: any, methodKey: any, parameterIndex: number) {
    let dependencies: EntryIdentifier[] = [];
    if (metadata.has(target)) {
      dependencies = metadata.get(target) as EntryIdentifier[];
    } else {
      metadata.set(target, dependencies);
    }
    dependencies[parameterIndex] = identifier;
  };
}
