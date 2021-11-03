import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import pProgress, {PProgress} from './index.js';

const fixture = Symbol('fixture');
const errorFixture = new Error('fixture');

test('new PProgress()', async t => {
	t.plan(45);

	const promise = new PProgress(async (resolve, reject, progress) => {
		progress(0.1);
		await delay(50);
		progress(0.3);
		await delay(100);
		progress(0.4);
		await delay(20);
		progress(0.9);
		await delay(50);
		progress(1);
		progress(1);
		progress(1);
		resolve(fixture);
	});

	t.true(promise instanceof Promise);

	promise.onProgress(progress => {
		t.is(progress, promise.progress);
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	promise.onProgress(progress => {
		t.is(progress, promise.progress);
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	promise.then(result => [result, result]).then(results => {
		t.true(Array.isArray(results));
		for (const result of results) {
			t.is(result, fixture);
		}
	})
		.onProgress(progress => {
			t.is(progress, promise.progress);
			t.true(progress >= 0 && progress <= 1, `${progress}`);
		});

	promise.catch(() => {}).onProgress(progress => {
		t.is(progress, promise.progress);
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.is(await promise, fixture);
	await delay(1);
});

test('pProgress()', async t => {
	t.plan(4);

	const fn = input => pProgress(async progress => {
		progress(0.1);
		await delay(50);
		progress(0.6);
		await delay(100);
		progress(1);
		return input;
	});

	const promise = fn(fixture);

	promise.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.is(await promise, fixture);
});

test('PProgress.all()', async t => {
	const fixtureFunction = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(100);
		return input;
	});

	const fixtureFunction2 = input => pProgress(async progress => {
		progress(0.14);
		await delay(52);
		progress(0.37);
		await delay(104);
		progress(0.41);
		await delay(26);
		progress(0.93);
		await delay(55);
		return input;
	});

	const promise = PProgress.all([
		delay(103),
		fixtureFunction(fixture),
		delay(55),
		fixtureFunction2(fixture),
		delay(14),
		delay(209),
	]);

	promise.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.deepEqual(await promise, [
		undefined,
		fixture,
		undefined,
		fixture,
		undefined,
		undefined,
	]);
});

test('PProgress.all() with concurrency = 1', async t => {
	const fixtureFunction = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(50);
		return input;
	});

	const fixtureFunction2 = input => pProgress(async progress => {
		progress(0.41);
		await delay(50);
		progress(0.93);
		await delay(50);
		return input;
	});

	// Should throw when first argument is array of promises instead of promise-returning functions
	await t.throwsAsync(PProgress.all([fixtureFunction(fixture), fixtureFunction2(fixture)], {
		concurrency: 1,
	}), {
		instanceOf: TypeError,
	});

	const end = timeSpan();
	const promise = PProgress.all([
		() => fixtureFunction(fixture),
		() => fixtureFunction2(fixture),
	], {
		concurrency: 1,
	});

	promise.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.deepEqual(await promise, [
		fixture,
		fixture,
	]);

	t.true(inRange(end(), {
		start: 200, // 4 delays of 50ms each
		end: 300, // Reasonable padding
	}));
});

test('PProgress.allSettled()', async t => {
	const fixtureFunction = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(100);
		return input;
	});

	const fixtureFunction2 = input => pProgress(async progress => {
		progress(0.14);
		await delay(52);
		progress(0.37);
		await delay(104);
		progress(0.41);
		await delay(26);
		progress(0.93);
		await delay(55);
		throw input;
	});

	const promise = PProgress.allSettled([
		delay(103),
		fixtureFunction(fixture),
		delay(55),
		fixtureFunction2(errorFixture),
		delay(14),
		delay(209),
	]);

	promise.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.deepEqual(await promise, [
		{
			status: 'fulfilled',
			value: undefined,
		},
		{
			status: 'fulfilled',
			value: fixture,
		},
		{
			status: 'fulfilled',
			value: undefined,
		},
		{
			status: 'rejected',
			reason: errorFixture,
		},
		{
			status: 'fulfilled',
			value: undefined,
		},
		{
			status: 'fulfilled',
			value: undefined,
		},
	]);
});

test('PProgress.allSettled() with concurrency = 1', async t => {
	const fixtureFunction = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(50);
		return input;
	});

	const fixtureFunction2 = input => pProgress(async progress => {
		progress(0.41);
		await delay(50);
		progress(0.93);
		await delay(50);
		throw input;
	});

	// Should throw when first argument is array of promises instead of promise-returning functions
	await t.throwsAsync(PProgress.allSettled([fixtureFunction(fixture)], {
		concurrency: 1,
	}), {
		instanceOf: TypeError,
	});

	const end = timeSpan();
	const promise = PProgress.allSettled([
		() => fixtureFunction(fixture),
		() => fixtureFunction2(errorFixture),
	], {
		concurrency: 1,
	});

	promise.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1, `${progress}`);
	});

	t.deepEqual(await promise, [
		{
			status: 'fulfilled',
			value: fixture,
		},
		{
			status: 'rejected',
			reason: errorFixture,
		},
	]);

	t.true(inRange(end(), {
		start: 200, // 4 delays of 50ms each
		end: 300, // Reasonable padding
	}));
});
