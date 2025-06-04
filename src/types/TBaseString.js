import { TBase } from "./TBase";

export class TBaseString extends TBase {
    /** 
     * @override
     * @type {typeof String} 
     */
    _primitive = String;
}