type Awaited<ValueType> = ValueType extends undefined ? ValueType : ValueType extends PromiseLike<infer ResolveValueType> ? ResolveValueType : ValueType;

declare namespace PProgress {
	interface Options {
		/**
		Number of concurrently pending promises. Minimum: `1`.

		To run the promises in series, set it to `1`.

		When this option is set, the first argument must be an array of promise-returning functions.

		@default Infinity
		*/
		readonly concurrency: number;
	}

	type PromiseFactory<ValueType> = () => PromiseLike<ValueType>;
	type ProgressNotifier = (progress: number) => void;
}

// @ts-ignore `Promise.all` currently uses an incompatible combinatorics-based type definition (https://github.com/microsoft/TypeScript/issues/39788)
declare class PProgress<ValueType> extends Promise<ValueType> {
	/**
	The current progress percentage of the promise as a number between 0 and 1.
	*/
	readonly progress: number;

	/**
	Convenience method to make your promise-returning or async function report progress.

	The function you specify will have the `progress()` function appended to its parameters.

	@example
	```
	import PProgress = require('p-progress');

	const runJob = PProgress.fn(async (name, progress) => {
		const job = new Job(name);

		job.on('data', data => {
			progress(data.length / job.totalSize);
		});

		await job.run();
	});

	(async () => {
		const progressPromise = runJob('Gather rainbows');

		progressPromise.onProgress(console.log);
		//=> 0.09
		//=> 0.23
		//=> 0.59
		//=> 0.75
		//=> 1

		await progressPromise;
	})();
	```
	*/
	static fn<ReturnType, Arguments extends unknown[]>(
		input: (...arguments_: [...arguments_: Arguments, progress: PProgress.ProgressNotifier]) => PromiseLike<ReturnType> | ReturnType
	): (...arguments_: Arguments) => PProgress<ReturnType>;

	/**
	Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress `0` when pending and progress `1` when resolved. For `PProgress` type promises, it listens to their `onProgress()` method for more fine grained progress reporting. You can mix and match normal promises and `PProgress` promises.

	@param promises - Array of promises or promise-returning functions, similar to [p-all](https://github.com/sindresorhus/p-all).

	@example
	```
	import PProgress = require('p-progress');
	import delay = require('delay');

	const progressPromise = PProgress.fn(async progress => {
		progress(0.14);
		await delay(52);
		progress(0.37);
		await delay(104);
		progress(0.41);
		await delay(26);
		progress(0.93);
		await delay(55);
	});

	const allProgressPromise = PProgress.all([
		delay(103),
		progressPromise(),
		delay(55),
		delay(209)
	]);

	(async () => {
		allProgressPromise.onProgress(console.log);
		//=> 0.0925
		//=> 0.3425
		//=> 0.5925
		//=> 0.6025
		//=> 0.7325
		//=> 0.9825
		//=> 1

		await allProgressPromise;
	})();
	```
	*/
	static all<Promises extends Array<PProgress.PromiseFactory<unknown> | PromiseLike<unknown>>>(
		promises: readonly [...Promises],
		options?: PProgress.Options
	): PProgress<{
		[Promise_ in keyof Promises]: Promises[Promise_] extends PromiseLike<unknown> ? Awaited<Promises[Promise_]> : (Promises[Promise_] extends PProgress.PromiseFactory<unknown> ? Awaited<ReturnType<Promises[Promise_]>> : Promises[Promise_])
	}>;
	static all<ReturnValue>(
		promises: Iterable<PProgress.PromiseFactory<ReturnValue> | PromiseLike<ReturnValue>>,
		options?: PProgress.Options
	): PProgress<Iterable<ReturnValue>>;

	/**
	Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

	@param executor - Same as the `Promise` constructor but with an appended `progress` parameter in `executor`.

	@example
	```
	import PProgress = require('p-progress');

	const progressPromise = new PProgress((resolve, reject, progress) => {
		const job = new Job();

		job.on('data', data => {
			progress(data.length / job.totalSize);
		});

		job.on('finish', resolve);
		job.on('error', reject);
	});

	(async () => {
		progressPromise.onProgress(progress => {
			console.log(`${progress * 100}%`);
			//=> 9%
			//=> 23%
			//=> 59%
			//=> 75%
			//=> 100%
		});

		await progressPromise;
	})();
	```
	*/
	constructor(
		/**
		@param progress - Call this with progress updates. It expects a number between 0 and 1.

		Multiple calls with the same number will result in only one `onProgress()` event.

		Calling with a number lower than previously will be ignored.

		Progress percentage `1` is reported for you when the promise resolves. If you set it yourself, it will simply be ignored.
		*/
		executor: (
			resolve: (value?: ValueType | PromiseLike<ValueType>) => void,
			reject: (reason?: unknown) => void,
			progress: PProgress.ProgressNotifier
		) => void
	);

	/**
	Accepts a function that gets `instance.progress` as an argument and is called for every progress event.
	*/
	onProgress(callback: PProgress.ProgressNotifier): void;
}

export = PProgress;
