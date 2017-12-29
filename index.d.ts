/**
 * Call this with progress updates. It expects a number between 0 and 1.
 * Multiple calls with the same number will result in only one onProgress() event.
 * Progress percentage 1 is reported for you when the promise resolves. If you set it yourself, it will simply be ignored.
 */
declare type PProgressCallback = (percentage: number) => void;

declare type PProgressExecutor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void, progress: PProgressCallback) => void;

declare interface PProgressAllOptions {
    /**
     * Number of concurrently pending promises
     *
     * To run the promises in series, set it to 1
     * Default: Infinity, Minimum: 1
     */
    concurrency: number;
}

/**
 * Create a promise that reports progress
 */
declare class PProgress<T> extends Promise<T> {

    /**
     * Convenience method to make your promise-returning or async function report progress
     * @param input
     */
    public static fn(input: any): void;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5, T6, T7]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5, T6]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4, T5]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>], options?: PProgressAllOptions): PProgress<[T1, T2, T3, T4]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>], options?: PProgressAllOptions): PProgress<[T1, T2, T3]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>], options?: PProgressAllOptions): PProgress<[T1, T2]>;

    /**
     * Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress 0 when pending and progress 1 when resolved. For PProgress type promises, it listens to their onProgress() method for more fine grained progress reporting. You can mix and match normal promises and PProgress promises
     * @param values An array of Promises or PProgress instances.
     * @returns A PProgress instance.
     */
    public static all<T>(values: (T | PromiseLike<T>)[], options?: PProgressAllOptions): PProgress<T[]>;

    /**
     * The current progress percentage of the promise as a number between 0 and 1
     */
    public readonly progress: number;

    constructor(executor: PProgressExecutor<T>);

    /**
     * Accepts a function that gets instance.progress as an argument and is called for every progress event
     * @param callback Function to call every time a progress is reported. Value passed will be number between 0 and 1
     */
    public onProgress(callback: (progress: number) => void): void;
}

export default PProgress;
