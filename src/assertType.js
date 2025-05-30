import { assertTypePrimitive } from './utils/assertTypePrimitive';

/**
 * @returns {TError}
 */
export function assertType(
    /** @type {TBase} */ instance,
    /** @type {class} */ type,
) {
    const err = assertTypePrimitive(instance, type);
    return new TError().set(`[ASSERT FAILURE] ${err}`);
}


