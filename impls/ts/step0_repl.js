"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rl_1 = __importDefault(require("./rl"));
const READ = (input) => {
    return input;
};
const EVAL = (input) => {
    return input;
};
const PRINT = (input) => {
    return input;
};
const rep = (input) => {
    const ast = READ(input);
    const result = EVAL(ast);
    return PRINT(result);
};
for (;;) {
    const line = rl_1.default();
    if (line == null) {
        break;
    }
    console.log(rep(line));
}
//# sourceMappingURL=step0_repl.js.map