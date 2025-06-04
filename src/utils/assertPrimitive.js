/**
 * @returns {Error}
 */
export function assertPrimitive(/** @type {() => Boolean} */ testFn) {
    let err;

    try {
        const isTestPass = testFn();
        if (!isTestPass)
            throw Error(`Assert failure: ${testFn}`);
    } catch (_err) {
        err = _err;
        err = Error(`[ASSERT FAILURE]`);
    }

    return err && err.message;
}
