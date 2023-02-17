import { doWatch } from './reactive'
import type { WatchEffect } from "./types";


function Watcher <T = any>(effect: WatchEffect<T>) {
    doWatch<T>(effect)
}

export default Watcher;
