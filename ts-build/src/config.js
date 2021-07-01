"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const fs_1 = __importDefault(require("fs"));
function loadConfig(filename = "nodeconfig.json") {
    const nodeConfig = JSON.parse(fs_1.default.readFileSync(filename).toString());
    return nodeConfig;
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map