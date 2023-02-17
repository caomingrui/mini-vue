import { doWatch } from "./reactive";
import type { WatchEffect, WatchCallback } from "./types";

const watch = <T = any>(effect: WatchEffect<T>, callback: WatchCallback) => {
    doWatch<T>(effect, callback)
}

export default watch;
