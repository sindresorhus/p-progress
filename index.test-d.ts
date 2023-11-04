import {expectType} from 'tsd';
import pProgress, {PProgress, type ProgressNotifier, type PromiseSettledResult} from './index.js';

const progressPromise = new PProgress(async (resolve, reject, progress) => {
	expectType<(progress: number) => void>(progress);
});

progressPromise.onProgress(progress => {
	expectType<number>(progress);
});
expectType<number>(progressPromise.progress);

// PProgress
expectType<PProgress<boolean>>(
	pProgress(async (progress: ProgressNotifier) => {
		expectType<(progress: number) => void>(progress);
		return true;
	}),
);

// PProgress.all
expectType<PProgress<[string]>>(
	PProgress.all([Promise.resolve('sindresorhus.com')]),
);
expectType<PProgress<[string]>>(
	PProgress.all([async () => 'sindresorhus.com']),
);
expectType<PProgress<[string]>>(
	PProgress.all([async () => 'sindresorhus.com'], {concurrency: 1}),
);
expectType<PProgress<[string, number]>>(
	PProgress.all([Promise.resolve('sindresorhus.com'), Promise.resolve(1)]),
);
expectType<PProgress<[string, number]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
	]),
);
expectType<PProgress<[string, number]>>(
	PProgress.all(
		[async () => 'sindresorhus.com', async () => 1],
		{concurrency: 1},
	),
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
	]),
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
	]),
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
		],
		{concurrency: 1},
	),
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
	]),
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
	]),
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
		],
		{concurrency: 1},
	),
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
		],
		{concurrency: 1},
	),
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
		],
		{concurrency: 1},
	),
);
expectType<
PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
	]),
);
expectType<
PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
		async () => 1,
	]),
);
expectType<
PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
		],
		{concurrency: 1},
	),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean]
>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
	]),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean]
>
>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
	]),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean]
>
>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
		],
		{concurrency: 1},
	),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean, symbol]
>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
	]),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean, symbol]
>
>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
	]),
);
expectType<
PProgress<
[string, number, boolean, symbol, string[], string, number, boolean, symbol]
>
>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
		],
		{concurrency: 1},
	),
);
expectType<
PProgress<
[
	string,
	number,
	boolean,
	symbol,
	string[],
	string,
	number,
	boolean,
	symbol,
	string[],
]
>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
	]),
);
expectType<
PProgress<
[
	string,
	number,
	boolean,
	symbol,
	string[],
	string,
	number,
	boolean,
	symbol,
	string[],
]
>
>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
	]),
);
expectType<
PProgress<
[
	string,
	number,
	boolean,
	symbol,
	string[],
	string,
	number,
	boolean,
	symbol,
	string[],
]
>
>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
		],
		{concurrency: 1},
	),
);

expectType<PProgress<[string, number, boolean, symbol, string[], string, number, boolean, symbol, string[], string[]]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol('Test')),
		Promise.resolve(['foo']),
		Promise.resolve(['foo']),
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[], string, number, boolean, symbol, string[], string[]]>>(
	PProgress.all([
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => 'sindresorhus.com',
		async () => 1,
		async () => true,
		async () => Symbol('Test'),
		async () => ['foo'],
		async () => ['foo'],
	]),
);
expectType<PProgress<[string, number, boolean, symbol, string[], string, number, boolean, symbol, string[], string[]]>>(
	PProgress.all(
		[
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => ['foo'],
		],
		{concurrency: 1},
	),
);

expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			Promise.resolve('sindresorhus.com'),
			Promise.resolve(1),
			Promise.resolve(true),
			Promise.resolve(Symbol('Test')),
			Promise.resolve(['foo']),
			Promise.resolve('sindresorhus.com'),
			Promise.resolve(1),
			Promise.resolve(true),
			Promise.resolve(Symbol('Test')),
			Promise.resolve(['foo']),
			Promise.resolve(['foo']),
		]),
	),
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => ['foo'],
		]),
	),
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => 'sindresorhus.com',
			async () => 1,
			async () => true,
			async () => Symbol('Test'),
			async () => ['foo'],
			async () => ['foo'],
		]),
		{concurrency: 1},
	),
);
expectType<
PProgress<[PromiseSettledResult<string>, PromiseSettledResult<number>]>
>(
	PProgress.allSettled([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
	]),
);
