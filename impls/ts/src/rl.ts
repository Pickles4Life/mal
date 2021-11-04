import path from 'path';
import os from 'os';
import fs from 'fs';
import ffi from 'ffi-napi';

const RL_LIB = 'libreadline';

const HISTORY_FILE = path.join(os.homedir(), '.mal-history');

const rllib = ffi.Library(RL_LIB, {
	readline: ['string', ['string']],
	add_history: ['int', ['string']],
});

let rlHistoryLoaded = false;

const readline = () => {
	const prompt = 'user> ';

	if (!rlHistoryLoaded) {
		rlHistoryLoaded = true;
		let lines: string[] = [];
		if (fs.existsSync(HISTORY_FILE)) {
			lines = fs.readFileSync(HISTORY_FILE).toString().split('\n');
		}

		lines = lines.slice(Math.max(lines.length - 2000, 0));
		for (let i = 0; i < lines.length; i++) {
			if (lines[i]) {
				rllib.add_history(lines[i]);
			}
		}
	}

	let line = rllib.readline(prompt);
	if (line) {
		rllib.add_history(line);
		try {
			fs.appendFileSync(HISTORY_FILE, line + '\n');
		} catch (exc) {}
	}

	return line;
};

export default readline;
