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
});

const allProgressPromise = PProgress.all([
	delay(103),
	progressPromise(),
	delay(55),
	delay(209),
]);

allProgressPromise.onProgress(console.log);

await allProgressPromise;
