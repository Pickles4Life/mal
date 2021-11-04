import readline from './rl';

const READ = (input: string) => {
	return input;
};

const EVAL = (input: string) => {
	return input;
};

const PRINT = (input: string) => {
	return input;
};

const rep = (input: string) => {
	const ast = READ(input);
	const result = EVAL(ast);
	return PRINT(result);
};

for (;;) {
	const line = readline();
	if (line == null) {
		break;
	}
	console.log(rep(line));
}
