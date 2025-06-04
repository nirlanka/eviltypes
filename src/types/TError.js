import { TBase } from "./TBase";

export class TError extends TBase {
    _primitive = String;

    assert(/** @type {string} */ value) {
        return !!value;
    }
}