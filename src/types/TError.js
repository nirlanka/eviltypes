import { assert } from "../assert";
import { TBase } from "./TBase";

export class TError extends TBase {
    _primitive = String;

    /** @override */
    assert(/** @type {string} */ value) {
        assert(() => value !== undefined);
    }
}