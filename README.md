# tooleks

A set of tools for JavaScript development.

Try it on [RunKit](https://npm.runkit.com/tooleks).

## Installation

```
npm install --save tooleks
```

## Documentation

[https://tooleks.github.io/tooleks-js](https://tooleks.github.io/tooleks-js)

## Overview

### `Container` class

Simple yet powerful dependency injection container implementation. 

* Supports instance, factory and service bindings.
* Supports nested dependencies.
* Easily detects circular dependencies.
* Supports TypeScript decorators.

```JavaScript
const { Container } = require('tooleks');

const container = new Container();

// Register instance (constant) binding.
container.instance('DB.ConnectionString', 'mongodb://...');

class UserRepository {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }
}

// Register factory function binding.
container.factory(
  'Infrastructure.UserRepository',
  (connectionString) => new UserRepository(connectionString),
  ['DB.ConnectionString'],
);

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
}

// Register service class binding.
container.service(
  'Application.AuthService',
  AuthService,
  ['Infrastructure.UserRepository'],
);

// Retrieve an instance of service.
const authService = container.get('Application.AuthService');

console.log(authService); // AuthService { userRepository: UserRepository { connectionString: 'mongodb://...' } }
```

TypeScript example with [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

```TypeScript
import { staticContainer, Injectable, Inject } from 'tooleks';

// Register instance (constant) binding.
staticContainer.instance('DB.ConnectionString', 'mongodb://...');

// Register service class binding using decorators.
@Injectable('Infrastructure.UserRepository')
class UserRepository {
  readonly connectionString: string;

  constructor(@Inject('DB.ConnectionString') connectionString: string) {
    this.connectionString = connectionString;
  }
}

// Register service class binding using decorators.
@Injectable('Application.AuthService')
class AuthService {
  readonly userRepository: UserRepository;

  constructor(@Inject('Infrastructure.UserRepository') userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}

// Retrieve an instance of service.
const authService = staticContainer.get('Application.AuthService') as AuthService;

console.log(authService); // AuthService { userRepository: UserRepository { connectionString: 'mongodb://...' } }
```

### `EventEmitter` class

Asynchronous event emitter implementation with support of `Promise` and `async`/`await` syntax.

```JavaScript
const { EventEmitter } = require('tooleks');

const eventEmitter = new EventEmitter();

(async () => {

  // Register event listener function.
  eventEmitter.on('User.Update', (user) => {
    return new Promise((resolve) => {
      console.log(`Processing User.Update event for ${user.name}...`);
      setTimeout(resolve, 1000);
    });
  });

  console.log('Before User.Update event.');

  const user = {
    name: 'johndoe',
  };

  // Emit event with data.
  await eventEmitter.emit('User.Update', user);

  console.log('After User.Update event.');

})();
```

### `Mapper` class

Utility to transform one data structures to another.

```JavaScript
const { Mapper } = require('tooleks');

const mapper = new Mapper();

// Register mapping function.
mapper.register('API.User', 'Domain.User', (user) => {
  return {
    name: user.username,
    fullName: `${user.firstName} ${user.lastName}`,
  };
});

const apiUser = {
  username: 'john.doe',
  firstName: 'John',
  lastName: 'Doe',
};

// Map data structure.
const domainUser = mapper.map('API.User', 'Domain.User', apiUser);

console.log(domainUser); // { name: 'john.doe', fullName: 'John Doe' }
```

### `optional` function

Utility to suppress errors or empty results of function calls.

```JavaScript
const { optional } = require('tooleks');

const user = {
  name: 'john.doe',
  getWebsite() {
    throw new Error('Website not found.');
  },
};

// Wrap property call.
const userCompany = optional(() => user.company, 'Default');

console.log(userCompany); // 'Default'

// Wrap method/function call.
const userWebsite = optional(() => user.getWebsite(), `https://www.google.com/search?q=${user.name}`);

console.log(userWebsite); // 'https://www.google.com/search?q=john.doe'
```

### `timeout` function

`Promise` based implementation of native `setTimeout` function.

```JavaScript
const { timeout } = require('tooleks');

(async () => {

  console.log('Before timeout.');
  
  // Wait for specified timeout then resolve Promise.
  await timeout(1000);

  console.log('After 1000 milliseconds timeout.');

})();
```

### `waitUntil` function

Utility to wait until a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value returned from a function.

```JavaScript
const { waitUntil } = require('tooleks');

let value = null;

// Wait until variable will contain truthy value.
waitUntil(() => value).then((value) => {
  console.log(`${value} received after 1000 milliseconds.`);
});

setTimeout(() => {
  value = 'Hello!';
}, 1000);
```
