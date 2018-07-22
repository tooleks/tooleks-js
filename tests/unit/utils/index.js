import typesTest from "./types";
import cloneTest from "./clone";
import optionalTest from "./optional";

export default function(library) {
    typesTest(library);
    cloneTest(library);
    optionalTest(library);
}
