import { TBase } from "./TBase";

export class TBaseFloat extends TBase {
    /** 
     * @override
     * @type {typeof Number} 
     */
    _primitive = Number;
}