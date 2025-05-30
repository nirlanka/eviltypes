import { assertPrimitive } from "../utils/assertPrimitive";
import { assertTypePrimitive } from "../utils/assertTypePrimitive";

export class TBase {
    static _PRIMITIVES = [
        'number',
        'string',
        'object',
        'function',
    ];

    /** 
     * @abstract
     * @type {string}
     * Underlying primitive data type
     */
    primitive;

    _validate() {
        assertPrimitive(
            () => TBase._PRIMITIVES.some(x => x === this.primitive),
            "a valid primitive type name [EvilTypes]",
            [this.primitive]
        );
        assertPrimitive(
            () => (this._value !== undefined)
                ? (typeof this._value === this.primitive)
                : true,
            "a valid primitive type value [EvilTypes]",
            [this._value, this.primitive]
        );

        if (this.primitive === 'object') {
            assertPrimitive(
                () =>
                    (typeof this.types === 'object')
                    && Object.keys(this.types).every(k => typeof k === 'string')
                    && Object.values(this.types).every(v => typeof v === 'function'),
                "a valid typed object",
                [this.types, this.primitive]
            );

            for (const k in this.types) {
                assertTypePrimitive(this._value[k], this.types[k]);
            }
        }

        assertPrimitive(
            () => this.assert(this._value),
            "a valid value [EvilTypes]",
            [this._value],
        );
    }

    /**
     * @type {any} 
     */
    _value;

    /** @final */
    set(/** @type {any} */ v) {
        this._value = v;
        this._validate();
        return this;
    }

    /** 
     * @final
     * @returns {any} reference to the stored primitive value
     */
    get() {
        this._validate();
        return this._value;
    }

    /**
     * @abstract 
     * @returns {boolean}
     */
    assert(/** @type {any} */ value) {
        return true;
    }
}