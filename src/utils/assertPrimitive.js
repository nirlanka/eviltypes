/**
 * @returns {Error}
 */
export function assertPrimitive(
    /** @type {() => boolean} */ testFn,
    /** @type {string} */ textOnFail,
    /** @type {Array|Object} */ values,
) {
    let err;

    try {
        const isTestPass = testFn();
        if (!isTestPass)
            throw Error(`Assert failure: NOT ${textOnFail}, with debug values: ${values ? JSON.stringify(values) : testFn}`);
    } catch (_err) {
        err = _err;
        console.error(`[ASSERT FAILURE] ${err}`);
    }

    return err;
}
