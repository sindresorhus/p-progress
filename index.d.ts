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
	static fn<ReturnType>(
		input: (progress: PProgress.ProgressNotifier) => PromiseLike<ReturnType>
	): () => PProgress<ReturnType>;
	static fn<ParameterType1, ReturnType>(
		input: (
			parameter1: ParameterType1,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (parameter1: ParameterType1) => PProgress<ReturnType>;
	static fn<ParameterType1, ParameterType2, ReturnType>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2
	) => PProgress<ReturnType>;
	static fn<ParameterType1, ParameterType2, ParameterType3, ReturnType>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ParameterType6,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			parameter6: ParameterType6,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5,
		parameter6: ParameterType6
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ParameterType6,
		ParameterType7,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			parameter6: ParameterType6,
			parameter7: ParameterType7,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5,
		parameter6: ParameterType6,
		parameter7: ParameterType7
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ParameterType6,
		ParameterType7,
		ParameterType8,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			parameter6: ParameterType6,
			parameter7: ParameterType7,
			parameter8: ParameterType8,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5,
		parameter6: ParameterType6,
		parameter7: ParameterType7,
		parameter8: ParameterType8
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ParameterType6,
		ParameterType7,
		ParameterType8,
		ParameterType9,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			parameter6: ParameterType6,
			parameter7: ParameterType7,
			parameter8: ParameterType8,
			parameter9: ParameterType9,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5,
		parameter6: ParameterType6,
		parameter7: ParameterType7,
		parameter8: ParameterType8,
		parameter9: ParameterType9
	) => PProgress<ReturnType>;
	static fn<
		ParameterType1,
		ParameterType2,
		ParameterType3,
		ParameterType4,
		ParameterType5,
		ParameterType6,
		ParameterType7,
		ParameterType8,
		ParameterType9,
		ParameterType10,
		ReturnType
	>(
		input: (
			parameter1: ParameterType1,
			parameter2: ParameterType2,
			parameter3: ParameterType3,
			parameter4: ParameterType4,
			parameter5: ParameterType5,
			parameter6: ParameterType6,
			parameter7: ParameterType7,
			parameter8: ParameterType8,
			parameter9: ParameterType9,
			parameter10: ParameterType10,
			progress: PProgress.ProgressNotifier
		) => PromiseLike<ReturnType>
	): (
		parameter1: ParameterType1,
		parameter2: ParameterType2,
		parameter3: ParameterType3,
		parameter4: ParameterType4,
		parameter5: ParameterType5,
		parameter6: ParameterType6,
		parameter7: ParameterType7,
		parameter8: ParameterType8,
		parameter9: ParameterType9,
		parameter10: ParameterType10
	) => PProgress<ReturnType>;
	static fn<ReturnType>(
		input: (...args: any[]) => PromiseLike<ReturnType>
	): (...args: unknown[]) => PProgress<ReturnType>;

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
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8,
		ValueType9,
		ValueType10
	>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>,
			PProgress.PromiseFactory<ValueType6>,
			PProgress.PromiseFactory<ValueType7>,
			PProgress.PromiseFactory<ValueType8>,
			PProgress.PromiseFactory<ValueType9>,
			PProgress.PromiseFactory<ValueType10>
		],
		options: PProgress.Options
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8,
			ValueType9,
			ValueType10
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8,
		ValueType9
	>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>,
			PProgress.PromiseFactory<ValueType6>,
			PProgress.PromiseFactory<ValueType7>,
			PProgress.PromiseFactory<ValueType8>,
			PProgress.PromiseFactory<ValueType9>
		],
		options: PProgress.Options
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8,
			ValueType9
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8
	>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>,
			PProgress.PromiseFactory<ValueType6>,
			PProgress.PromiseFactory<ValueType7>,
			PProgress.PromiseFactory<ValueType8>
		],
		options: PProgress.Options
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7
	>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>,
			PProgress.PromiseFactory<ValueType6>,
			PProgress.PromiseFactory<ValueType7>
		],
		options: PProgress.Options
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6
	>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>,
			PProgress.PromiseFactory<ValueType6>
		],
		options: PProgress.Options
	): PProgress<
		[ValueType1, ValueType2, ValueType3, ValueType4, ValueType5, ValueType6]
	>;
	static all<ValueType1, ValueType2, ValueType3, ValueType4, ValueType5>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>,
			PProgress.PromiseFactory<ValueType5>
		],
		options: PProgress.Options
	): PProgress<[ValueType1, ValueType2, ValueType3, ValueType4, ValueType5]>;
	static all<ValueType1, ValueType2, ValueType3, ValueType4>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>,
			PProgress.PromiseFactory<ValueType4>
		],
		options: PProgress.Options
	): PProgress<[ValueType1, ValueType2, ValueType3, ValueType4]>;
	static all<ValueType1, ValueType2, ValueType3>(
		promises: [
			PProgress.PromiseFactory<ValueType1>,
			PProgress.PromiseFactory<ValueType2>,
			PProgress.PromiseFactory<ValueType3>
		],
		options: PProgress.Options
	): PProgress<[ValueType1, ValueType2, ValueType3]>;
	static all<ValueType1, ValueType2>(
		promises: [PProgress.PromiseFactory<ValueType1>, PProgress.PromiseFactory<ValueType2>],
		options: PProgress.Options
	): PProgress<[ValueType1, ValueType2]>;
	static all<ValueType1>(
		promises: [PProgress.PromiseFactory<ValueType1>],
		options: PProgress.Options
	): PProgress<[ValueType1]>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8,
		ValueType9,
		ValueType10
	>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>,
			PromiseLike<ValueType6> | PProgress.PromiseFactory<ValueType6>,
			PromiseLike<ValueType7> | PProgress.PromiseFactory<ValueType7>,
			PromiseLike<ValueType8> | PProgress.PromiseFactory<ValueType8>,
			PromiseLike<ValueType9> | PProgress.PromiseFactory<ValueType9>,
			PromiseLike<ValueType10> | PProgress.PromiseFactory<ValueType10>
		]
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8,
			ValueType9,
			ValueType10
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8,
		ValueType9
	>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>,
			PromiseLike<ValueType6> | PProgress.PromiseFactory<ValueType6>,
			PromiseLike<ValueType7> | PProgress.PromiseFactory<ValueType7>,
			PromiseLike<ValueType8> | PProgress.PromiseFactory<ValueType8>,
			PromiseLike<ValueType9> | PProgress.PromiseFactory<ValueType9>
		]
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8,
			ValueType9
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7,
		ValueType8
	>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>,
			PromiseLike<ValueType6> | PProgress.PromiseFactory<ValueType6>,
			PromiseLike<ValueType7> | PProgress.PromiseFactory<ValueType7>,
			PromiseLike<ValueType8> | PProgress.PromiseFactory<ValueType8>
		]
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7,
			ValueType8
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6,
		ValueType7
	>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>,
			PromiseLike<ValueType6> | PProgress.PromiseFactory<ValueType6>,
			PromiseLike<ValueType7> | PProgress.PromiseFactory<ValueType7>
		]
	): PProgress<
		[
			ValueType1,
			ValueType2,
			ValueType3,
			ValueType4,
			ValueType5,
			ValueType6,
			ValueType7
		]
	>;
	static all<
		ValueType1,
		ValueType2,
		ValueType3,
		ValueType4,
		ValueType5,
		ValueType6
	>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>,
			PromiseLike<ValueType6> | PProgress.PromiseFactory<ValueType6>
		]
	): PProgress<
		[ValueType1, ValueType2, ValueType3, ValueType4, ValueType5, ValueType6]
	>;
	static all<ValueType1, ValueType2, ValueType3, ValueType4, ValueType5>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>,
			PromiseLike<ValueType5> | PProgress.PromiseFactory<ValueType5>
		]
	): PProgress<[ValueType1, ValueType2, ValueType3, ValueType4, ValueType5]>;
	static all<ValueType1, ValueType2, ValueType3, ValueType4>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>,
			PromiseLike<ValueType4> | PProgress.PromiseFactory<ValueType4>
		]
	): PProgress<[ValueType1, ValueType2, ValueType3, ValueType4]>;
	static all<ValueType1, ValueType2, ValueType3>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>,
			PromiseLike<ValueType3> | PProgress.PromiseFactory<ValueType3>
		]
	): PProgress<[ValueType1, ValueType2, ValueType3]>;
	static all<ValueType1, ValueType2>(
		promises: [
			PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>,
			PromiseLike<ValueType2> | PProgress.PromiseFactory<ValueType2>
		]
	): PProgress<[ValueType1, ValueType2]>;
	static all<ValueType1>(
		promises: [PromiseLike<ValueType1> | PProgress.PromiseFactory<ValueType1>]
	): PProgress<[ValueType1]>;
	static all<AllValuesType>(
		promises: Iterable<PProgress.PromiseFactory<AllValuesType>>,
		options: PProgress.Options
	): PProgress<AllValuesType>;
	static all<AllValuesType>(
		promises: Iterable<
			PromiseLike<AllValuesType> | PProgress.PromiseFactory<AllValuesType>
		>
	): PProgress<AllValuesType>;

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
