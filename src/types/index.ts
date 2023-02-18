import { ReactiveEffect } from "../reactive";

export type ProxyHandler<T extends object> = {
    get?: (target: T, key: string | symbol, receiver: any) => any,
    set?: (target: T, key: string | symbol, value: unknown, receiver: any) => boolean
}

export type WatchCallback<OldT = any, PreT = any> = (value: OldT, oldValue: PreT) => any;

type computedType<T = any> = ReactiveEffect<T>;

export type WatchEffect<T = any> = (() => T) | ComputedRefImplType;


export type ComputedRefImplType = {
    _dirty: boolean,
    _value: any,
    dep: Set<computedType>,
    effect: ReactiveEffect,
    active: boolean,
    isRef: boolean,
    value: any
}
