import isArrayTest from "./isArray";
import isBooleanTest from "./isBoolean";
import isDefinedTest from "./isDefined";
import isFunctionTest from "./isFunction";
import isNullTest from "./isNull";
import isNumberTest from "./isNumber";
import isNumericTest from "./isNumeric";
import isObjectTest from "./isObject";
import isStringTest from "./isString";
import isUndefinedTest from "./isUndefined";

export default function(library) {
    isArrayTest(library);
    isBooleanTest(library);
    isDefinedTest(library);
    isFunctionTest(library);
    isNullTest(library);
    isNumberTest(library);
    isNumericTest(library);
    isObjectTest(library);
    isStringTest(library);
    isUndefinedTest(library);
}
