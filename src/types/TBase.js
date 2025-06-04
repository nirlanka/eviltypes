import { assertTypePrimitive } from "../utils/assertTypePrimitive";

export class TBase {
    /** 
     * @abstract
     * @type {typeof TBase}
     */
    _primitive;

    /**
     * @abstract
     * @type {Record<string, new (...args: TBase[]) => TBase>}
     */
    types = {};

    /**
     * @abstract
     * @type {any} 
     */
    _value = null;

    /** @final */
    set(/** @type {TBase} */ value) {
        this.assert(value);

        this._value = value;
        return this;
    }

    /** 
     * @final
     * @returns {TBase}
     */
    get() {
        return this._value;
    }

    /** @abstract */
    assert(/** @type {TBase} */ value) {
        assertTypePrimitive(value, this._primitive);
    }
}