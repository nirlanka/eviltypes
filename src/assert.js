export function assert(
                /** @type {() => boolean} */ testFn,
                /** @type {string} */ textOnFail,
                /** @type {Array|Object} */ values,
) {
    try {
        const isTestPass = testFn();
        if (!isTestPass)
            throw Error(`Assert failure: NOT ${textOnFail}, with debug values: ${values ? JSON.stringify(values) : testFn}`);
    } catch (err) {
        console.error('[ASSERT FAILURE]', err);
    }
}
