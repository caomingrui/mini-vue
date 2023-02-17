
export function isObject (obj: unknown): obj is object {
    return typeof obj === 'object' && obj != null;
}


export function isRef (source: Record<string, any>): source is {
    isRef: keyof any, value: any
}  {
    return !!source['isRef'];
}


export function isFunction (source: unknown): source is Function {
    return typeof source === 'function';
}
