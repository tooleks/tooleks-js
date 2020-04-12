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

```JavaScript
const { Container } = require('tooleks');

const container = new Container();

// Register instance (constant) definition.
container.instance('DB.ConnectionString', 'mongodb://...');

class UserRepository {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }
}

// Register factory function definition.
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

// Register service class definition.
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

// Register instance (constant) definition.
staticContainer.instance('DB.ConnectionString', 'mongodb://...');

// Register service class definition.
@Injectable('Infrastructure.UserRepository')
class UserRepository {
  readonly connectionString: string;

  constructor(@Inject('DB.ConnectionString') connectionString: string) {
    this.connectionString = connectionString;
  }
}

// Register service class definition.
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

  eventEmitter.on('User.Update', (user) => {
    return new Promise((resolve) => {
      console.log(`Processing User.Update event for ${user.name}...`);
      setTimeout(resolve, 1000);
    });
  });

  const user = {
    name: 'johndoe',
  };

  console.log('Before User.Update event.');

  await eventEmitter.emit('User.Update', user);

  console.log('After User.Update event.');

})();
```

### `Mapper` class

Utility to transform one data structures to another.

```JavaScript
const { Mapper } = require('tooleks');

const mapper = new Mapper();

mapper.register('API.User', 'Domain.User', (user) => {
  return {
    name: user.username,
    fullName: `${user.firstName} ${user.lastName}`,
  };
});

const apiUser = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
};

const domainUser = mapper.map('API.User', 'Domain.User', apiUser);

console.log(domainUser); // { name: 'johndoe', fullName: 'John Doe' }
```

### `optional` function

Utility to suppress errors or empty results of function calls.

```JavaScript
const { optional } = require('tooleks');

const user = {
  name: 'johndoe',
  getWebsite() {
    throw new Error('Website not found.');
  },
};

const userCompany = optional(() => user.company, 'Default');

console.log(userCompany); // 'Default'

const userWebsite = optional(() => user.getWebsite(), `https://www.google.com/search?q=${user.name}`);

console.log(userWebsite); // 'https://www.google.com/search?q=johndoe'
```

### `timeout` function

`Promise` based implementation of native `setTimeout` function.

```JavaScript
const { timeout } = require('tooleks');

(async () => {

  console.log('Before timeout...');

  await timeout(1000);

  console.log('After 1000 milliseconds timeout.');

})();
```

### `waitUntil` function

Utility to wait until a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value returned from a function.

```JavaScript
const { waitUntil } = require('tooleks');

let value = null;

waitUntil(() => value).then((value) => {
  console.log(`${value} received after 1000 milliseconds.`);
});

setTimeout(() => {
  value = 'Hello!';
}, 1000);
```
