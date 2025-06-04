import { assert } from "../assert";
import { TBase } from "./TBase";

export class TBaseInteger extends TBase {
    /** 
     * @override
     * @type {typeof Number} 
     */
    _primitive = Number;

    /** @override */
    assert(/** @type {Number} */ value) {
        assert(() => Number.isInteger(value));
        assert(() => value > -1);
    }
}