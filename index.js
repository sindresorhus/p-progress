'use strict';
const pMap = require('p-map');

const sum = iterable => {
	let total = 0;

	for (const value of iterable.values()) {
		total += value;
	}

	return total;
};

class PProgress extends Promise {
	static fn(input) {
		return (...arguments_) => {
			return new PProgress(async (resolve, reject, progress) => {
				arguments_.push(progress);
				try {
					resolve(await input(...arguments_));
				} catch (error) {
					reject(error);
				}
			});
		};
	}

	static all(promises, options) {
		if (
			options && typeof options.concurrency === 'number' &&
			!(promises.every(promise => typeof promise === 'function'))
		) {
			throw new TypeError('When `options.concurrency` is set, the first argument must be an Array of Promise-returning functions');
		}

		return PProgress.fn(progress => {
			const progressMap = new Map();
			const iterator = promises[Symbol.iterator]();

			const reportProgress = () => {
				progress(sum(progressMap) / promises.length);
			};

			const mapper = async () => {
				const next = iterator.next().value;
				const promise = typeof next === 'function' ? next() : next;
				progressMap.set(promise, 0);

				if (promise instanceof PProgress) {
					promise.onProgress(percentage => {
						progressMap.set(promise, percentage);
						reportProgress();
					});
				}

				const value = await promise;
				progressMap.set(promise, 1);
				reportProgress();
				return value;
			};

			// TODO: This is kinda ugly. Find a better way to do this.
			// Maybe `p-map` could accept a number as the first argument?
			return pMap(new Array(promises.length), mapper, options);
		})();
	}

	constructor(executor) {
		const setProgress = progress => {
			if (progress > 1 || progress < 0) {
				throw new TypeError('The progress percentage should be a number between 0 and 1');
			}

			(async () => {
				// We wait for the next microtask tick so `super` is called before we use `this`
				await Promise.resolve();

				// Note: we don't really have guarantees over
				// the order in which async operations are evaluated,
				// so if we get an out-of-order progress, we'll just discard it.
				if (progress <= this._progress) {
					return;
				}

				this._progress = progress;

				for (const listener of this._listeners) {
					listener(progress);
				}
			})();
		};

		super((resolve, reject) => {
			executor(
				value => {
					setProgress(1);
					resolve(value);
				},
				reject,
				progress => {
					if (progress !== 1) {
						setProgress(progress);
					}
				}
			);
		});

		this._listeners = new Set();
		this._setProgress = setProgress;
		this._progress = 0;
	}

	get progress() {
		return this._progress;
	}

	onProgress(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(`Expected a \`Function\`, got \`${typeof callback}\``);
		}

		this._listeners.add(callback);
		return this;
	}

	then(onFulfilled, onRejected) {
		// eslint-disable-next-line promise/prefer-await-to-then
		const child = super.then(onFulfilled, onRejected);
		this._listeners.add(progress => {
			child._setProgress(progress);
		});
		return child;
	}
}

module.exports = PProgress;
