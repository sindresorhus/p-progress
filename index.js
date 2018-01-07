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
		return (...args) => {
			return new PProgress((resolve, reject, progress) => {
				args.push(progress);
				input(...args).then(resolve, reject);
			});
		};
	}

	static all(promises, options) {
		return PProgress.fn(progress => {
			const progressMap = new Map();
			const iterator = promises[Symbol.iterator]();

			const reportProgress = () => {
				progress(sum(progressMap) / promises.length);
			};

			const mapper = async () => {
				const next = iterator.next().value;
				const promise = (typeof next === 'function') ? next() : next;
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
		const progressFn = progress => {
			if (progress > 1 || progress < 0) {
				throw new TypeError('The progress percentage should be a number between 0 and 1');
			}

			// We run this in the next microtask tick so `super` is called before we use `this`
			Promise.resolve().then(() => {
				if (progress === this._progress) {
					return;
				} else if (progress < this._progress) {
					throw new Error('The progress percentage can\'t be lower than the last progress event');
				}

				this._progress = progress;

				for (const listener of this._listeners) {
					listener(progress);
				}
			});
		};

		super((resolve, reject) => {
			executor(
				value => {
					progressFn(1);
					resolve(value);
				},
				reject,
				progress => {
					if (progress !== 1) {
						progressFn(progress);
					}
				}
			);
		});

		this._listeners = new Set();
		this._progressFn = progressFn;
		this._progress = 0;
	}

	get progress() {
		return this._progress;
	}

	onProgress(cb) {
		if (typeof cb !== 'function') {
			throw new TypeError(`Expected a \`Function\`, got \`${typeof cb}\``);
		}

		this._listeners.add(cb);
		return this;
	}
}

module.exports = PProgress;
