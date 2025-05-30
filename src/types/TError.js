import { TBase } from "./TBase";

export class TError extends TBase {
    primitive = 'string';

    assert(/** @type {string} */ value) {
        return !!value;
    }
}