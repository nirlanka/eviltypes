import { assertPrimitive } from './assertPrimitive';

export function assertTypePrimitive(
    /** @type {TBase} */ instance,
    /** @type {typeof TBase} */ type,
) {
    assertPrimitive(() => instance.constructor.name === type.name);
}


