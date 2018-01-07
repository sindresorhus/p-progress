# p-progress [![Build Status](https://travis-ci.org/sindresorhus/p-progress.svg?branch=master)](https://travis-ci.org/sindresorhus/p-progress)

> Create a promise that reports progress

Useful for reporting progress to the user during long-running async operations.


## Install

```
$ npm install p-progress
```


## Usage

```js
const PProgress = require('p-progress');

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


## API

### instance = new PProgress(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), but with an appended `progress` parameter in `executor`.

`PProgress` is a subclass of `Promise`.

###### progress(percentage)

Type: `Function`

Call this with progress updates. It expects a number between 0 and 1.

Multiple calls with the same number will result in only one `onProgress()` event.

Progress percentage `1` is reported for you when the promise resolves. If you set it yourself, it will simply be ignored.

#### instance.progress

Type: `number`

The current progress percentage of the promise as a number between 0 and 1.

#### instance.onProgress(function)

Accepts a function that gets `instance.progress` as an argument and is called for every progress event.

### PProgress.fn(function)

Convenience method to make your promise-returning or async function report progress.

The function you specify will have the `progress()` function appended to its parameters.

```js
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

### PProgress.all(promises, [options])

Convenience method to run multiple promises and get a total progress of all of them. It counts normal promises with progress `0` when pending and progress `1` when resolved. For `PProgress` type promises, it listens to their `onProgress()` method for more fine grained progress reporting. You can mix and match normal promises and `PProgress` promises.

```js
const delay = require('delay');

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

#### promises

Type: `Array`

Array of promises or promise returning functions, similar to [p-series](https://github.com/sindresorhus/p-series).

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises.

To run the promises in series, set it to `1`.


## Related

- [p-cancelable](https://github.com/sindresorhus/p-cancelable) - Create a promise that can be canceled
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
