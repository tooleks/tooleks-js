## A set of tools for JavaScript development

### Installation

```bash
npm install --save tooleks
```

### Description

#### `Defer` class

The purpose of the `Defer` class is to expose the associated `Promise` instance that can be used for retrieving the result of the task.

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

#### `DependencyContainer` class

The purpose of the `DependencyContainer` class is to manage dependencies a lot of different objects with a lot of dependencies.

```JavaScript
const {DependencyContainer} = require("tooleks");

const dc = new DependencyContainer();

const users = [
    { firstName: "Anna P.", lastName: "P." }
];

function DataProvider(users) {
    this.users = users;
}

function UserService(dataProvider) {
    this.dataProvider = dataProvider;
}

dc.registerBinding("DataProvider", DataProvider, {
    dependencies: [() => users],
});
dc.registerBinding("UserService", UserService, {
    dependencies: ["DataProvider"],
    singleton: false,
});

const userService = dc.get("UserService");

console.log(userService); // UserService { dataProvider: DataProvider { users: [ [Object] ] } }
```

#### `EventEmitter` class

The purpose of the `EventEmitter` class is to notify listeners when the event occurs.

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

off();
```

#### `Mapper` class

The purpose of the `Mapper` class is to transform the initial data formats into the desired data formats.

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

#### `clone` extension

The purpose of `clone` extension is to provide a handy mechanism for objects deep cloning. It supports `Boolean`, `Number`, `String`, `Array`, `Map`, `Date`, `Object`, `Function` types.

```JavaScript
require("tooleks/ext-clone").enable();

const user = {
    firstName: "Anna",
    lastName: "P.",
};

const clonedUser = user.clone();

clonedUser.lastName = "Po.";

console.log(JSON.stringify(clonedUser) !== JSON.stringify(user)); // true
```

To customize the default behavior of `clone` extension for your class initialize the `clone` method.

```JavaScript
require("tooleks/ext-clone").enable();

function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.clone = function() {
    const firstName = this.firstName.clone();
    const lastName = this.lastName.clone();
    return new User(firstName, lastName);
};

const user = new User("Anna", "P.");

const clonedUser = user.clone();

clonedUser.lastName = "Po.";

console.log(clonedUser instanceof User); // true
console.log(JSON.stringify(clonedUser) !== JSON.stringify(user)); // true
```

#### `optional` function

The purpose of the `optional` function is to suppress errors while calling callback function and return the default value instead.

```JavaScript
const {optional} = require("tooleks");

const user = {
    firstName: "Anna",
    lastName: "P.",
};

const phoneNumber = optional(() => user.profile.phoneNumber, null);

console.log(phoneNumber); // null, damn it.
```
