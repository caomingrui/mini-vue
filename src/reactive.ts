import { isObject, isRef, isFunction } from "../utils";
import type { ProxyHandler, WatchCallback, WatchEffect } from "./types";

const targetMap = new Map();
export let activeEffect: ReactiveEffect | null;
export let shouldTrack: boolean = true;

const baseHandlers = {
    get: (target: object, key: string | symbol, receiver: object) => {
        const res = Reflect.get(target, key, receiver)
        track(target, key);
        return res;
    },
    set: (target: Record<string | symbol, any>, key: string | symbol, value: unknown) => {
        target[key] = value;
        // const result = Reflect.set(target, key, receiver)
        trigger(target, key)
        return true;
    }
}


function track (target: object, key: string | symbol) {
    if (activeEffect && shouldTrack) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
    }
}

function trigger (target: object, key: string | symbol) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const deps: Set<ReactiveEffect> = depsMap.get(key);
    deps.forEach((item) => {
        if (item.scheduler) {
            item.scheduler()
        }
        else {
            item.run()
        }
    })
}


export function reactive<T extends object>(target: T): T;
export function reactive(target: object) {
    if (!isObject(target)) {
        console.error('throw: reactive data is no Object');
        return target;
    }

    return proxyData(target, baseHandlers);
}


const proxyData = (data: object, baseHandlers: ProxyHandler<any>) => {
    return new Proxy(data, baseHandlers)
}


export function doWatch<T = any> (source: WatchEffect<T> | object | WatchEffect<T>[], callback?: WatchCallback) {
    const getter = () => {
        if (isRef(source)) {
            return source.value;
        }
        else if (isFunction(source)) {
            return source();
        }
        else if (Array.isArray(source)) {
            source.forEach(item => {
                if (isRef(item)) {
                    return item.value;
                }
                else if (isFunction(item)) {
                    return item();
                }
            })
        }
    }


    let oldValue: any = null;
    let scheduler = function () {
        if (!effect.active) return;
        if (callback) {
            let newValue = effect.run();
            callback(newValue, oldValue);
            oldValue = newValue;
        }
        else {
            effect.run();
        }
    }
    const effect = new ReactiveEffect(getter, scheduler);

    return effect.run();
}


export class ReactiveEffect<T = any> {
    active = true;
    // deps: any[] = [];
    deferStop: boolean = false;

    constructor(public fn: () => T, public scheduler: (() => any) | null = null) {

    }

    public run () {
        if (!this.active) {
            return this.fn();
        }
        try {
            shouldTrack = true;
            activeEffect = this;
            return this.fn();
        }
        finally {
            activeEffect = null;
            shouldTrack = false;

            if (this.deferStop) {
                this.stop()
            }
        }
    }

    stop () {
        if (activeEffect === this) {
            this.deferStop = true
        }
        else if (this.active) {
            // cleanActiveEffect
            this.active = false;
        }
    }
}

export default reactive;
