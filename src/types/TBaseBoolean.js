import { TBase } from "./TBase";

export class TBaseBoolean extends TBase {
    /** 
     * @override
     * @type {typeof Boolean} 
     */
    _primitive = Boolean;
}