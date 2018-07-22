import * as src from "../src";
// import * as dist from "../dist";

import integrationTest from "./integration";
import unitTest from "./unit";

describe(`src library test`, function() {
    integrationTest(src);
    unitTest(src);
});

// describe(`dist library test`, function() {
//     integrationTest(dist);
//     unitTest(dist);
// });
