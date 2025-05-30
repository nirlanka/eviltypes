import { TError } from "./types/TError";
import { assertPrimitive } from "./utils/assertPrimitive";

/**
 * @returns {TError}
 */
export function assert(
    /** @type {() => boolean} */ testFn,
    /** @type {string} */ textOnFail,
    /** @type {Array|Object} */ values,
) {
    const err = assertPrimitive(testFn, textOnFail, values);
    return err ? new TError().set(`[ASSERT FAILURE] ${err}`) : undefined;
}