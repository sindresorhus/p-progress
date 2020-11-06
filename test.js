import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import PProgress from '.';

const fixture = Symbol('fixture');

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
		results.forEach(result => t.is(result, fixture));
	})
		.onProgress(progress => {
			t.is(progress, p.progress);
			t.true(progress >= 0 && progress <= 1);
		});

	p.catch(() => {}).onProgress(progress => {
		t.is(progress, p.progress);
		t.true(progress >= 0 && progress <= 1);
	});

	t.is(await p, fixture);
});

test('PProgress.fn()', async t => {
	t.plan(4);

	const fn = PProgress.fn(async (input, progress) => {
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
	const fixtureFn = PProgress.fn(async (input, progress) => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(100);
		return input;
	});

	const fixtureFn2 = PProgress.fn(async (input, progress) => {
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
	const fixtureFn = PProgress.fn(async (input, progress) => {
		progress(0.16);
		await delay(50);
		progress(0.55);
		await delay(50);
		return input;
	});

	const fixtureFn2 = PProgress.fn(async (input, progress) => {
		progress(0.41);
		await delay(50);
		progress(0.93);
		await delay(50);
		return input;
	});

	// Should throw when first argument is array of promises instead of promise-returning functions
	t.throws(() => PProgress.all([fixtureFn(fixture), fixtureFn2(fixture)], {
		concurrency: 1
	}), TypeError);

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
