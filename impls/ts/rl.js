"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const ffi_napi_1 = __importDefault(require("ffi-napi"));
const RL_LIB = 'libreadline';
const HISTORY_FILE = path_1.default.join(os_1.default.homedir(), '.mal-history');
const rllib = ffi_napi_1.default.Library(RL_LIB, {
    readline: ['string', ['string']],
    add_history: ['int', ['string']],
});
let rlHistoryLoaded = false;
const readline = () => {
    const prompt = 'user> ';
    if (!rlHistoryLoaded) {
        rlHistoryLoaded = true;
        let lines = [];
        if (fs_1.default.existsSync(HISTORY_FILE)) {
            lines = fs_1.default.readFileSync(HISTORY_FILE).toString().split('\n');
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
            fs_1.default.appendFileSync(HISTORY_FILE, line + '\n');
        }
        catch (exc) { }
    }
    return line;
};
exports.default = readline;
//# sourceMappingURL=rl.js.map