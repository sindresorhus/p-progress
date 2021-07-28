# p-progress

> Create a promise that reports progress

Useful for reporting progress to the user during long-running async operations.

## Install

```
$ npm install p-progress
```

## Usage

```js
import pProgress from 'p-progress';

const runJob = async name => pProgress(async progress => {
	const job = new Job(name);

	job.on('data', data => {
		progress(data.length / job.totalSize)
	});

	await job.run()
});

const progressPromise = runJob('Gather rainbows');

progressPromise.onProgress(console.log);
//=> 0.09
//=> 0.23
//=> 0.59
//=> 0.75
//=> 1

await progressPromise;
```

## API

### pProgress(function)

Convenience method to make your promise-returning or async function report progress.

The function you specify will be passed the `progress()` function as a parameter.

### instance = new PProgress(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), but with an appended `progress` parameter in `executor`.

`PProgress` is a subclass of `Promise`.

###### progress(percentage)

Type: `Function`

Call this with progress updates. It expects a number between 0 and 1.

Multiple calls with the same number will result in only one `onProgress()`
event.

Calling with a number lower than previously will be ignored.

Progress percentage `1` is reported for you when the promise resolves. If you set it yourself, it will simply be ignored.

#### instance.progress

Type: `number`

The current progress percentage of the promise as a number between 0 and 1.

#### instance.onProgress(function)

Accepts a function that gets `instance.progress` as an argument and is called for every progress event.

```js
import {PProgress} from 'p-progress';

const progressPromise = new PProgress((resolve, reject, progress) => {
	const job = new Job();

	job.on('data', data => {
		progress(data.length / job.totalSize);
	});

	job.on('finish', resolve);
	job.on('error', reject);
});

progressPromise.onProgress(progress => {
	console.log(`${progress * 100}%`);
	//=> 9%
	//=> 23%
	//=> 59%
	//=> 75%
	//=> 100%
});

await progressPromise;
```

### PProgress.all(promises, options?)

Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress `0` when pending and progress `1` when resolved. For `PProgress` type promises, it listens to their `onProgress()` method for more fine grained progress reporting. You can mix and match normal promises and `PProgress` promises.

### PProgress.allSettled(promises, options?)

Like [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) but also allowing you to get a total progress of all of them like [`PProgress.all`](#pprogressallpromises-options).

```js
import pProgress, {PProgress} from 'p-progress';
import delay from 'delay';

const progressPromise = () => pProgress(async progress => {
	progress(0.14);
	await delay(52);
	progress(0.37);
	await delay(104);
	progress(0.41);
	await delay(26);
	progress(0.93);
	await delay(55);
	return 1;
});

const progressPromise2 = () => pProgress(async progress => {
	progress(0.14);
	await delay(52);
	progress(0.37);
	await delay(104);
	progress(0.41);
	await delay(26);
	progress(0.93);
	await delay(55);
	throw new Error('Catch me if you can!');
});

const allProgressPromise = PProgress.allSettled([
	progressPromise(),
	progressPromise2()
]);

allProgressPromise.onProgress(console.log);
//=> 0.0925
//=> 0.3425
//=> 0.5925
//=> 0.6025
//=> 0.7325
//=> 0.9825
//=> 1

console.log(await allProgressPromise);
//=> [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: Error: Catch me if you can!}]
```

#### promises

Type: `Promise[]`

Array of promises or promise-returning functions, similar to [p-all](https://github.com/sindresorhus/p-all).

#### options

Type: `object`

##### concurrency

Type: `number`\
Default: `Infinity`\
Minimum: `1`

Number of concurrently pending promises.

To run the promises in series, set it to `1`.

When this option is set, the first argument must be an array of promise-returning functions.

## Related

- [p-cancelable](https://github.com/sindresorhus/p-cancelable) - Create a promise that can be canceled
- [More…](https://github.com/sindresorhus/promise-fun)
