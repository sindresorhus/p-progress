import {expectType} from 'tsd';
import PProgress = require('.');
import {ProgressNotifier} from '.';

const progressPromise = new PProgress(async (resolve, reject, progress) => {
	expectType<(progress: number) => void>(progress);
});

progressPromise.onProgress(progress => {
	expectType<number>(progress);
});
expectType<number>(progressPromise.progress);

// PProgress.fn
expectType<() => PProgress<boolean>>(
	PProgress.fn(async progress => {
		expectType<(progress: number) => void>(progress);
		return true;
	})
);
expectType<(string: string) => PProgress<boolean>>(
	PProgress.fn(async (string: string, progress: ProgressNotifier) => {
		expectType<(progress: number) => void>(progress);
		return true;
	})
);
expectType<(string: string, boolean: boolean) => PProgress<boolean>>(
	PProgress.fn(
		async (string: string, boolean: boolean, progress: ProgressNotifier) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(string: string, boolean: boolean, number: number) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[]
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[],
		string2: string
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[],
		string2: string,
		boolean2: boolean
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			boolean2: boolean,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[],
		string2: string,
		boolean2: boolean,
		number2: number
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			boolean2: boolean,
			number2: number,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[],
		string2: string,
		boolean2: boolean,
		number2: number,
		symbol2: symbol
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			boolean2: boolean,
			number2: number,
			symbol2: symbol,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<
	(
		string: string,
		boolean: boolean,
		number: number,
		symbol: symbol,
		array: string[],
		string2: string,
		boolean2: boolean,
		number2: number,
		symbol2: symbol,
		array2: string[]
	) => PProgress<boolean>
>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			boolean2: boolean,
			number2: number,
			symbol2: symbol,
			array2: string[],
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);
expectType<(...args: unknown[]) => PProgress<boolean>>(
	PProgress.fn(
		async (
			string: string,
			boolean: boolean,
			number: number,
			symbol: symbol,
			array: string[],
			string2: string,
			boolean2: boolean,
			number2: number,
			symbol2: symbol,
			array2: string[],
			string3: string,
			progress: ProgressNotifier
		) => {
			expectType<(progress: number) => void>(progress);
			return true;
		}
	)
);

// PProgress.all
expectType<PProgress<[string]>>(
	PProgress.all([Promise.resolve('sindresorhus.com')])
);
expectType<PProgress<[string]>>(
	PProgress.all([() => Promise.resolve('sindresorhus.com')])
);
expectType<PProgress<[string]>>(
	PProgress.all([() => Promise.resolve('sindresorhus.com')], {concurrency: 1})
);
expectType<PProgress<[string, number]>>(
	PProgress.all([Promise.resolve('sindresorhus.com'), Promise.resolve(1)])
);
expectType<PProgress<[string, number]>>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1)
	])
);
expectType<PProgress<[string, number]>>(
	PProgress.all(
		[() => Promise.resolve('sindresorhus.com'), () => Promise.resolve(1)],
		{concurrency: 1}
	)
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true)
	])
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true)
	])
);
expectType<PProgress<[string, number, boolean]>>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true)
		],
		{concurrency: 1}
	)
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol())
	])
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol())
	])
);
expectType<PProgress<[string, number, boolean, symbol]>>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol())
		],
		{concurrency: 1}
	)
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo'])
	])
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo'])
	])
);
expectType<PProgress<[string, number, boolean, symbol, string[]]>>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo'])
		],
		{concurrency: 1}
	)
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com')
	])
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com')
	])
);
expectType<PProgress<[string, number, boolean, symbol, string[], string]>>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com')
		],
		{concurrency: 1}
	)
);
expectType<
	PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1)
	])
);
expectType<
	PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1)
	])
);
expectType<
	PProgress<[string, number, boolean, symbol, string[], string, number]>
>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1)
		],
		{concurrency: 1}
	)
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
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true)
	])
);
expectType<
	PProgress<
		[string, number, boolean, symbol, string[], string, number, boolean]
	>
>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true)
	])
);
expectType<
	PProgress<
		[string, number, boolean, symbol, string[], string, number, boolean]
	>
>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true)
		],
		{concurrency: 1}
	)
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
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol())
	])
);
expectType<
	PProgress<
		[string, number, boolean, symbol, string[], string, number, boolean, symbol]
	>
>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol())
	])
);
expectType<
	PProgress<
		[string, number, boolean, symbol, string[], string, number, boolean, symbol]
	>
>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol())
		],
		{concurrency: 1}
	)
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
			string[]
		]
	>
>(
	PProgress.all([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo'])
	])
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
			string[]
		]
	>
>(
	PProgress.all([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo'])
	])
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
			string[]
		]
	>
>(
	PProgress.all(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo'])
		],
		{concurrency: 1}
	)
);

expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>([
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve('sindresorhus.com'),
		Promise.resolve(1),
		Promise.resolve(true),
		Promise.resolve(Symbol()),
		Promise.resolve(['foo']),
		Promise.resolve(['foo'])
	])
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>([
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve('sindresorhus.com'),
		() => Promise.resolve(1),
		() => Promise.resolve(true),
		() => Promise.resolve(Symbol()),
		() => Promise.resolve(['foo']),
		() => Promise.resolve(['foo'])
	])
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		[
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve(['foo'])
		],
		{concurrency: 1}
	)
);

expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			Promise.resolve('sindresorhus.com'),
			Promise.resolve(1),
			Promise.resolve(true),
			Promise.resolve(Symbol()),
			Promise.resolve(['foo']),
			Promise.resolve('sindresorhus.com'),
			Promise.resolve(1),
			Promise.resolve(true),
			Promise.resolve(Symbol()),
			Promise.resolve(['foo']),
			Promise.resolve(['foo'])
		])
	)
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve(['foo'])
		])
	)
);
expectType<PProgress<Iterable<string | number | boolean | symbol | string[]>>>(
	PProgress.all<string | number | boolean | symbol | string[]>(
		new Set([
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve('sindresorhus.com'),
			() => Promise.resolve(1),
			() => Promise.resolve(true),
			() => Promise.resolve(Symbol()),
			() => Promise.resolve(['foo']),
			() => Promise.resolve(['foo'])
		]),
		{concurrency: 1}
	)
);
