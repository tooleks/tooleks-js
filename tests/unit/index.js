import asyncTest from "./async";
import DependencyContainerTest from "./DependencyContainer";
import EventEmitterTest from "./EventEmitter";
import MapperTest from "./Mapper";
import utilsTest from "./utils";

export default function(library) {
    asyncTest(library);
    DependencyContainerTest(library);
    EventEmitterTest(library);
    MapperTest(library);
    utilsTest(library);
}
