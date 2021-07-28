import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import pProgress, {PProgress} from './index.js';

const fixture = Symbol('fixture');
const errorFixture = new Error('fixture');

test('new PProgress()', async t => {
	t.plan(45);

	const p = new PProgress(async (resolve, reject, progress) => {
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

	t.true(p instanceof Promise);

	p.onProgress(progress => {
		t.is(progress, p.progress);
		t.true(progress >= 0 && progress <= 1);
	});

	p.onProgress(progress => {
		t.is(progress, p.progress);
		t.true(progress >= 0 && progress <= 1);
	});

	// eslint-disable-next-line promise/prefer-await-to-then
	p.then(result => [result, result]).then(results => {
		t.true(Array.isArray(results));
		for (const result of results) {
			t.is(result, fixture);
		}
	})
		.onProgress(progress => {
			t.is(progress, p.progress);
			t.true(progress >= 0 && progress <= 1);
		});

	// eslint-disable-next-line promise/prefer-await-to-then
	p.catch(() => {}).onProgress(progress => {
		t.is(progress, p.progress);
		t.true(progress >= 0 && progress <= 1);
	});

	t.is(await p, fixture);
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

	const p = fn(fixture);

	p.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1);
	});

	t.is(await p, fixture);
});

test('PProgress.all()', async t => {
	const fixtureFn = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(100);
		return input;
	});

	const fixtureFn2 = input => pProgress(async progress => {
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

	const p = PProgress.all([
		delay(103),
		fixtureFn(fixture),
		delay(55),
		fixtureFn2(fixture),
		delay(14),
		delay(209)
	]);

	p.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1);
	});

	t.deepEqual(await p, [
		undefined,
		fixture,
		undefined,
		fixture,
		undefined,
		undefined
	]);
});

test('PProgress.all() with concurrency = 1', async t => {
	const fixtureFn = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(50);
		return input;
	});

	const fixtureFn2 = input => pProgress(async progress => {
		progress(0.41);
		await delay(50);
		progress(0.93);
		await delay(50);
		return input;
	});

	// Should throw when first argument is array of promises instead of promise-returning functions
	t.throws(() => PProgress.all([fixtureFn(fixture), fixtureFn2(fixture)], {
		concurrency: 1
	}), {
		instanceOf: TypeError
	});

	const end = timeSpan();
	const p = PProgress.all([
		() => fixtureFn(fixture),
		() => fixtureFn2(fixture)
	], {
		concurrency: 1
	});

	p.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1);
	});

	t.deepEqual(await p, [
		fixture,
		fixture
	]);

	t.true(inRange(end(), {
		start: 200, // 4 delays of 50ms each
		end: 250 // Reasonable padding
	}));
});

test('PProgress.allSettled()', async t => {
	const fixtureFn = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(100);
		return input;
	});

	const fixtureFn2 = input => pProgress(async progress => {
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

	const p = PProgress.allSettled([
		delay(103),
		fixtureFn(fixture),
		delay(55),
		fixtureFn2(errorFixture),
		delay(14),
		delay(209)
	]);

	p.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1);
	});

	t.deepEqual(await p, [
		{
			status: 'fulfilled',
			value: undefined
		},
		{
			status: 'fulfilled',
			value: fixture
		},
		{
			status: 'fulfilled',
			value: undefined
		},
		{
			status: 'rejected',
			reason: errorFixture
		},
		{
			status: 'fulfilled',
			value: undefined
		},
		{
			status: 'fulfilled',
			value: undefined
		}
	]);
});

test('PProgress.allSettled() with concurrency = 1', async t => {
	const fixtureFn = input => pProgress(async progress => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(50);
		return input;
	});

	const fixtureFn2 = input => pProgress(async progress => {
		progress(0.41);
		await delay(50);
		progress(0.93);
		await delay(50);
		throw input;
	});

	// Should throw when first argument is array of promises instead of promise-returning functions
	t.throws(() => PProgress.allSettled([fixtureFn(fixture)], {
		concurrency: 1
	}), {
		instanceOf: TypeError
	});

	const end = timeSpan();
	const p = PProgress.allSettled([
		() => fixtureFn(fixture),
		() => fixtureFn2(errorFixture)
	], {
		concurrency: 1
	});

	p.onProgress(progress => {
		t.true(progress >= 0 && progress <= 1);
	});

	t.deepEqual(await p, [
		{
			status: 'fulfilled',
			value: fixture
		},
		{
			status: 'rejected',
			reason: errorFixture
		}
	]);

	t.true(inRange(end(), {
		start: 200, // 4 delays of 50ms each
		end: 250 // Reasonable padding
	}));
});
