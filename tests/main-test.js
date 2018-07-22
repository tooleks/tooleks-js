import * as src from "../src";
import * as distEs from "../dist/index.es";
import * as distUmd from "../dist/index.umd";

import integrationTest from "./integration";
import unitTest from "./unit";

describe(`Source ES module test`, function() {
    integrationTest(src);
    unitTest(src);
});

describe(`Distribution ES module test`, function() {
    integrationTest(distEs);
    unitTest(distEs);
});

describe(`Distribution UMD module test`, function() {
    integrationTest(distUmd);
    unitTest(distUmd);
});
