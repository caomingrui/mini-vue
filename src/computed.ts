import { activeEffect, ReactiveEffect } from "./reactive";
import type { ComputedRefImplType } from "./types";


const computed = <T = any>(callback: () => T): ComputedRefImplType => {

    function ComputedRefImpl (this: ComputedRefImplType) {
        let _this = this;
        this._dirty = true;
        this._value = null;
        this.dep = new Set();
        this.effect = new ReactiveEffect(callback,  function () {
            // if (!_this._dirty) {
            _this._dirty = true;
            _this.dep.forEach((item) => {
                if (item.scheduler) {
                    item.scheduler();
                }
                else {
                    item.run();
                }
            });
            // }
        });
        this.active = true;
        this.isRef = true;

        return {
            ...this,
            get value () {
                if (activeEffect) {
                    this.dep.add(activeEffect);
                }

                if (this._dirty) {
                    this._dirty = false;
                }
                this._value = this.effect.run();
                return this._value;
            },
            set value (newValue) {
                console.log('newValue', newValue)
            },
        }
    }

    return new (ComputedRefImpl as any)();
}

export default computed;
