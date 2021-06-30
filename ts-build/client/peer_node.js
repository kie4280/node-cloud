"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ngrok_1 = __importDefault(require("ngrok"));
async function startNG() {
    const url = await ngrok_1.default.connect({
        region: nodeConfig.ngrok_region,
        addr: "https://localhost:3003",
        authtoken: nodeConfig.ngrok_authkey,
    });
    console.log(url);
}
//# sourceMappingURL=peer_node.js.map