import DeferTest from "./Defer";
import timeoutTest from "./timeout";
import waitUntilTest from "./waitUntil";

export default function(library) {
    DeferTest(library);
    timeoutTest(library);
    waitUntilTest(library);
}
