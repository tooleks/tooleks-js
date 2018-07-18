## A set of tools for JavaScript development

### Installation

```bash
npm install --save tooleks
```

### Description

#### `Defer` class

`Defer` class exposes the associated `Promise` instance that can be used for retrieving the result of the task.

```JavaScript
const {Defer} = require("tooleks");

const defer = new Defer();

const user = {
    firstName: "Anna",
    lastName: "P.",
};

defer.resolve(user);

defer.promisify().then((user) => {
    console.log(user); // { firstName: "Anna P.", lastName: "P." }
});
```

#### `timeout` function

`timeout` function returns `Promise` that will be resolved after a specified number of milliseconds. It's a `Promise` based alternative to a native `setTimeout` function.

```JavaScript
const {timeout} = require("tooleks");

(async () => {
    console.log("Waiting (2s)...");
    await timeout(2000);
    console.log("Done!");
})();
```

#### `waitUntil` function

`waitUntil` function returns `Promise` that will be resolved when the passed callback will return truthy value and rejected when the passed callback will throw an error.

```JavaScript
const {waitUntil} = require("tooleks");

let externalLibrary;

waitUntil(() => externalLibrary).then((externalLibrary) => {
    console.log("Done!");
    externalLibrary.helloWorld(); // "Hello, world!"
});

console.log("Loading (2s)...");
setTimeout(() => {
    externalLibrary = {
        helloWorld: () => console.log("Hello, world!"),
    };
}, 2000);
```

#### `DependencyContainer` class

`DependencyContainer` class is a tool for managing class dependencies and performing dependency injection.

```JavaScript
const {DependencyContainer} = require("tooleks");

function DataProvider(data) {
    this.data = data;
}

function UserService(dataProvider) {
    this.dataProvider = dataProvider;
}

const dc = new DependencyContainer();

dc.registerBinding("DataProvider", DataProvider, {
    dependencies: [
        function() {
            return [
                {firstName: "Anna P.", lastName: "P."},
            ];
        },
    ],
    singleton: true,
});

const dataProvider = dc.get("DataProvider");

console.log(dataProvider instanceof DataProvider); // true
console.log(dataProvider === dc.get("DataProvider")); // true

dc.registerBinding("UserService", UserService, {
    dependencies: ["DataProvider"],
    singleton: false,
});

const userService = dc.get("UserService");

console.log(userService instanceof UserService); // true
console.log(dataProvider === dc.get("UserService")); // false
```

#### `EventEmitter` class

`EventEmitter` class notifies listeners when the event occurs.

```JavaScript
const {EventEmitter} = require("tooleks");

const eventEmitter = new EventEmitter();

const off = eventEmitter.on("userCreated", (user) => {
    console.log(user); // { firstName: "Anna P.", lastName: "P." }
});

const user = {
    firstName: "Anna",
    lastName: "P.",
};

eventEmitter.emit("userCreated", user);

off(); // Unsubscribe from the event.
```

`EventEmitter` class also exposes asynchronous method `emitAsync` that returns `Promise` that will be resolved when each of the listeners will be resolved.

```JavaScript
const {EventEmitter} = require("tooleks");

const eventEmitter = new EventEmitter();

const off = eventEmitter.on("userCreated", (user) => {
    console.log("Waiting (2s)...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(user); // { firstName: "Anna P.", lastName: "P." }
            resolve();
        }, 2000);
    });
});

const user = {
    firstName: "Anna",
    lastName: "P.",
};

(async () => {
    await eventEmitter.emitAsync("userCreated", user);
    console.log("Done!");
    off(); // Unsubscribe from the event.
})();
```

#### `Mapper` class

`Mapper` class transforms the initial data formats into the desired data formats.

```JavaScript
const {Mapper} = require("tooleks");

const mapper = new Mapper();

mapper.registerResolver("api.v1.user", "app.user", (user) => {
    return {
        fullName: user.firstName + " " + user.lastName,
    };
});

const user = {
    firstName: "Anna",
    lastName: "P.",
};

const mappedUser = mapper.map(user, "api.v1.user", "app.user");

console.log(mappedUser); // { fullName: "Anna P." }
```

#### `clone` function

`clone` function provides the mechanism for objects deep cloning. It supports `Array`, `Boolean`, `Date`, `Function`, `Map`, `Number`, `Object`, `RegExp`, `String` types.

```JavaScript
const {clone} = require("tooleks");

const user = {
    firstName: "Anna",
    lastName: "P.",
};

const clonedUser = clone(user);

clonedUser.lastName = "Po.";

console.log(JSON.stringify(clonedUser) !== JSON.stringify(user)); // true
```

To customize the default behavior of `clone` function for your class create the `clone` method.

```JavaScript
const {clone} = require("tooleks");

function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.clone = () => {
        const firstName = clone(this.firstName);
        const lastName = clone(this.lastName);
        return new User(firstName, lastName);
    };
}

const user = new User("Anna", "P.");

const clonedUser = clone(user);

clonedUser.lastName = "Po.";

console.log(clonedUser instanceof User); // true
console.log(JSON.stringify(clonedUser) !== JSON.stringify(user)); // true
```

#### `optional` function

`optional` function retrieves the result of callback call. If an error occurred or result is `undefined` returns a default value instead.

```JavaScript
const {optional} = require("tooleks");

const user = {
    firstName: "Anna",
    lastName: "P.",
};

const phoneNumber = optional(() => user.profile.phoneNumber, null);

console.log(phoneNumber); // null, damn it.
```

#### `types` functions

`types` functions are shortcut functions to check variable type.

```JavaScript
const {isArray, isBoolean, isDefined, isFunction, isNull, isNumber, isNumeric, isObject, isString, isUndefined} = require("tooleks");

console.log(isArray([])); // true
console.log(isBoolean(false)); // true
console.log(isDefined(undefined)); // false
console.log(isFunction(() => {})); // true
console.log(isNull(null)); // true
console.log(isNumber(42)); // true
console.log(isNumeric("42")); // true
console.log(isNumeric(NaN)); // false
console.log(isNumeric(Infinity)); // false
console.log(isObject({})); // true
console.log(isObject(null)); // false
console.log(isString("Forty two")); // true
console.log(isUndefined(undefined)); // true
```
