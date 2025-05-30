import { assertPrimitive } from './assertPrimitive';

export function assertTypePrimitive(
    /** @type {object} */ instance,
    /** @type {class} */ type,
) {
    assertPrimitive(
        () => instance.constructor.name === type.name,
        "the same type as expected [EvilTypes]",
        [instance, type]
    );
}


