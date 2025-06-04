import { TError } from "./types/TError";
import { assertPrimitive } from "./utils/assertPrimitive";

export function assert(/** @type {() => Boolean} */ testFn) {
    const err = assertPrimitive(testFn);
    if (err) {
        const errToThrow = (new TError()).set(err);
        if (__DEV_DEBUG_TESTS__) {
            console.error(errToThrow);
            return;
        }

        throw errToThrow;
    }
}