## A set of tools for a JavaScript developer

### Installation

```bash
npm install --save tooleks
```

### Description

#### `Defer` class

The purpose of the `Defer` object is to expose the associated `Promise` instance that can be used for signaling the successful or unsuccessful completion of the task.

```JavaScript
const Defer = require("tooleks").Defer;

const defer = new Defer();

defer.resolve("resolvedValue");

defer.promisify().then((value) => {
    console.log(value); // "resolvedValue"
});
```

#### `EventEmitter` class

The purpose of the `EventEmitter` class is to notify listeners when the event occurs.

```JavaScript
const EventEmitter = require("tooleks").EventEmitter;

const eventEmitter = new EventEmitter();

const off = eventEmitter.on("userCreated", (user) => {
    console.log(user); // {id: 1, firstName: "Anna P.", lastName: "P."}
});

const user = {
    id: 1,
    firstName: "Anna",
    lastName: "P.",
};

const eventEmitter.emit("userCreated", user);

off();
```

#### `Mapper` class

The purpose of the `Mapper` class is to transform the initial data formats into the desired formats.

```JavaScript
const Mapper = require("tooleks").Mapper;

const mapper = new Mapper();

mapper.registerResolver("api.v1.user", "app.user", (user) => {
    return {
        id: user.id,
        fullName: user.firstName + " " + user.lastName,
    };
});

const user = {
    id: 1,
    firstName: "Anna",
    lastName: "P.",
};

const result = mapper.map(user, "api.v1.user", "app.user");

console.log(result); // {id: 1, fullName: "Anna P."}
```


#### `optional` function

The purpose of the `optional` function is to suppress possible errors while calling undefined properties or methods and return the default value instead.

```JavaScript
const optional = require("tooleks").optional;

const object = {};

const result = optional(() => optional.undefined.undefined, "defaultValue");

console.log(result); // "defaultValue"
```
