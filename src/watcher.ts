import { doWatch } from './reactive'
import type { WatchEffect } from "./types";


function watchEffect <T = any>(effect: WatchEffect) {
    doWatch<T>(effect)
}

export default watchEffect;
