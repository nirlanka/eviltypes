import { TBase } from "./TBase";

export class TBaseObject extends TBase {
    /** 
     * @override
     * @type {typeof Object} 
     */
    _primitive = Object;
}