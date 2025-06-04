import { assertTypePrimitive } from './utils/assertTypePrimitive';

/**
 * @returns {TError}
 */
export function assertType(
    /** @type {TBase} */ instance,
    /** @type {typeof TBase} */ type,
) {
    const err = assertTypePrimitive(instance, type);
    return err ? new TError().set(err) : undefined;
}
