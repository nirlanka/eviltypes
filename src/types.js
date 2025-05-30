import { assert } from './assert.js';

export function assertType(instance, type) {
    assert(
        () => instance.constructor.name === type.name,
        "the same type as expected [EvilTypes]",
        [instance, type]
    );
}

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
        assert(
            () => TBase._PRIMITIVES.some(x => x === this.primitive),
            "a valid primitive type name  [EvilTypes]",
            [this.primitive]
        );
        assert(
            () => (this._value !== undefined)
                ? (typeof this._value === this.primitive)
                : true,
            "a valid primitive type value [EvilTypes]",
            [this._value, this.primitive]
        );

        if (this.primitive === 'object') {
            assert(
                () =>
                    (typeof this.types === 'object')
                    && Object.keys(this.types).every(k => typeof k === 'string')
                    && Object.values(this.types).every(v => typeof v === 'function'),
                "a valid typed object",
                [this.types, this.primitive]
            );

            for (const k in this.types) {
                assertType(this._value[k], this.types[k]);
            }
        }

        assert(
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

export class TError extends TBase {
    primitive = 'string';

    assert(/** @type {string} */ value) {
        return !!value;
    }
}