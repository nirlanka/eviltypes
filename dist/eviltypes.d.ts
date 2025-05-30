export abstract class TBase<T=any> {
    abstract primitive: string;

    set: (v: T) => this;
    get: () => this;

    abstract assert?: (value: T) => boolean;

    /** For primitive "object" */
    abstract types?: Record<string, new (...args: any[]) => TBase<any>>;
};